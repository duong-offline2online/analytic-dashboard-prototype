# Cloud Run Deployment Architecture

## Overview

This document explains how the Analytics Dashboard is deployed and served on Google Cloud Run.

## Architecture Diagram

```
┌─────────────────────────────────────────────────────────────────┐
│                      DEPLOYMENT FLOW                             │
└─────────────────────────────────────────────────────────────────┘

┌──────────────┐      ┌──────────────┐      ┌──────────────┐
│   Your PC    │─────▶│ Cloud Build  │─────▶│ Container    │
│              │      │              │      │ Registry     │
│ Source Code  │      │ Docker Build │      │ (Image)      │
└──────────────┘      └──────────────┘      └──────────────┘
                             │                      │
                             │                      ▼
                             │              ┌──────────────┐
                             └─────────────▶│  Cloud Run   │
                                            │              │
                                            │ Nginx Server │
                                            │ + Dashboard  │
                                            └──────────────┘
                                                   │
                                                   ▼
                                            ┌──────────────┐
                                            │    HTTPS     │
                                            │   Your URL   │
                                            └──────────────┘
                                                   │
                                                   ▼
                                            ┌──────────────┐
                                            │    Users     │
                                            │  Worldwide   │
                                            └──────────────┘
```

## Deployment Components

### 1. Build Phase

```
Source Files              Docker Image
┌──────────────┐         ┌──────────────┐
│ React Code   │         │ Node.js 18   │
│ CSS Styles   │  ───▶   │ + Build      │
│ JavaScript   │         │ + Nginx      │
│ Assets       │         │ + Static     │
└──────────────┘         └──────────────┘
   package.json              Dockerfile
```

**What happens:**
1. Node.js dependencies installed
2. React app built (npm run build)
3. Static files generated (HTML, CSS, JS)
4. Nginx configured to serve files
5. Docker image created
6. Image pushed to Google Container Registry

### 2. Runtime Architecture

```
┌─────────────────────────────────────────────┐
│           Cloud Run Container               │
│                                             │
│  ┌───────────────────────────────────┐     │
│  │         Nginx (Port 8080)         │     │
│  │                                   │     │
│  │  ┌─────────────────────────────┐ │     │
│  │  │   Static File Server        │ │     │
│  │  │                             │ │     │
│  │  │  - index.html               │ │     │
│  │  │  - bundle.js                │ │     │
│  │  │  - styles.css               │ │     │
│  │  │  - assets/                  │ │     │
│  │  └─────────────────────────────┘ │     │
│  │                                   │     │
│  │  Health Check: /health → 200 OK  │     │
│  └───────────────────────────────────┘     │
│                                             │
└─────────────────────────────────────────────┘
```

### 3. Traffic Flow

```
User Request
    │
    ▼
Google Cloud Load Balancer (HTTPS)
    │
    ▼
Cloud Run Service (HTTPS)
    │
    ├─ Health Check (/health)
    │  └─ Return 200 OK
    │
    └─ Dashboard Request (/)
       ├─ index.html
       ├─ JavaScript bundles
       ├─ CSS files
       └─ Assets (images, fonts)
```

## Resource Configuration

### Default Settings

```yaml
Service: analytics-dashboard
Region: us-central1
Platform: managed

Resources:
  CPU: 1 vCPU
  Memory: 512Mi
  Port: 8080

Scaling:
  Min Instances: 0 (scale to zero)
  Max Instances: 10
  Concurrency: 80 requests/instance

Network:
  Access: Public (unauthenticated)
  Protocol: HTTPS (auto-configured)
  Domain: *.run.app (auto-generated)
```

### Auto-Scaling Behavior

```
Request Load          Instances
0 requests      ──▶   0 instances (idle)
1-80 requests   ──▶   1 instance
81-160 requests ──▶   2 instances
161-240 requests ──▶  3 instances
...
800+ requests   ──▶   10 instances (max)
```

**Cold Start:** First request after idle may take 1-3 seconds

## File Structure in Container

```
/usr/share/nginx/html/
├── index.html                  (Entry point)
├── assets/
│   ├── index-abc123.js        (Main bundle)
│   ├── vendor-def456.js       (Dependencies)
│   └── index-ghi789.css       (Styles)
└── (other static assets)

/etc/nginx/conf.d/
└── default.conf               (Nginx configuration)
```

## Security & Performance

### Security Features

```
┌─────────────────────────────────────┐
│   Security Layers                   │
├─────────────────────────────────────┤
│ ✓ HTTPS/TLS (automatic)            │
│ ✓ X-Frame-Options: SAMEORIGIN      │
│ ✓ X-Content-Type-Options: nosniff  │
│ ✓ X-XSS-Protection: enabled        │
│ ✓ Container isolation               │
│ ✓ IAM access controls               │
└─────────────────────────────────────┘
```

### Performance Optimizations

```
┌─────────────────────────────────────┐
│   Performance Features              │
├─────────────────────────────────────┤
│ ✓ Gzip compression (text files)    │
│ ✓ Static asset caching (1 year)    │
│ ✓ HTTP/2 support                    │
│ ✓ Global CDN (automatic)            │
│ ✓ Connection keep-alive             │
│ ✓ Efficient nginx config            │
└─────────────────────────────────────┘
```

## Deployment Lifecycle

### Initial Deployment

```
1. Submit Code
   └─ gcloud builds submit

2. Build Image (3-5 min)
   ├─ Install dependencies
   ├─ Build React app
   ├─ Create Docker image
   └─ Push to registry

3. Deploy Service (1-2 min)
   ├─ Pull image
   ├─ Start container
   ├─ Configure networking
   ├─ Health check
   └─ Route traffic

4. Live! (Total: ~5-7 min)
```

### Update Deployment

```
1. Code Changes
   └─ Edit source files

2. Redeploy
   └─ ./deploy-cloudrun.sh

3. Cloud Run
   ├─ Build new revision
   ├─ Deploy new revision
   ├─ Gradual traffic migration
   └─ Keep old revision (rollback)

4. Zero Downtime!
```

## Cost Structure

### Resource Usage

```
Component         Cost per Use        Free Tier/Month
──────────────────────────────────────────────────────
Requests          $0.40 per 1M       2M requests
CPU Time          $0.000024 per      360,000 vCPU-sec
                  vCPU-second
Memory            $0.0000025 per     180,000 GiB-sec
                  GiB-second
Storage (image)   $0.026 per GB      Minimal
Bandwidth         $0.12 per GB       1 GB (outbound)
──────────────────────────────────────────────────────
```

### Example Cost Scenarios

```
Demo Usage (1,000 views/day):
  Requests:  30,000/month     = $0.00 (free tier)
  CPU:       50,000 sec/month = $0.00 (free tier)
  Memory:    25,000 GiB-sec   = $0.00 (free tier)
  Total:     ~$0/month         ✓ FREE

Medium Usage (10,000 views/day):
  Requests:  300,000/month    = $0.00 (free tier)
  CPU:       500,000 sec/month = $3.36
  Memory:    250,000 GiB-sec  = $0.18
  Total:     ~$3-5/month

Heavy Usage (100,000 views/day):
  Requests:  3,000,000/month  = $0.40
  CPU:       5,000,000 sec/month = $33.60
  Memory:    2,500,000 GiB-sec = $1.78
  Total:     ~$35-50/month
```

## Monitoring Points

### Key Metrics to Watch

```
┌──────────────────────────────────────┐
│ Metric          │ Threshold          │
├──────────────────────────────────────┤
│ Request Count   │ -                  │
│ Request Latency │ < 2 seconds        │
│ Error Rate      │ < 1%               │
│ CPU Usage       │ < 80%              │
│ Memory Usage    │ < 80%              │
│ Instance Count  │ < max (10)         │
│ Cold Starts     │ Minimize           │
└──────────────────────────────────────┘
```

### Logging & Debugging

```
Log Types Available:
├─ Request Logs (access logs)
├─ Application Logs (nginx logs)
├─ System Logs (container logs)
└─ Audit Logs (deployment logs)

Access via:
├─ Cloud Console UI
├─ gcloud logging command
└─ Cloud Logging API
```

## Regions & Availability

### Available Regions

```
Americas:
├─ us-central1 (Iowa)
├─ us-east1 (South Carolina)
├─ us-west1 (Oregon)
└─ northamerica-northeast1 (Montreal)

Europe:
├─ europe-west1 (Belgium)
├─ europe-west4 (Netherlands)
└─ europe-north1 (Finland)

Asia:
├─ asia-east1 (Taiwan)
├─ asia-northeast1 (Tokyo)
└─ asia-southeast1 (Singapore)
```

### Multi-Region Setup (Optional)

```
For global audience:

┌─────────────┐    ┌─────────────┐    ┌─────────────┐
│  US Region  │    │ EU Region   │    │ Asia Region │
│  Primary    │    │  Secondary  │    │  Secondary  │
└─────────────┘    └─────────────┘    └─────────────┘
       │                  │                   │
       └──────────────────┴───────────────────┘
                          │
                          ▼
              ┌───────────────────────┐
              │ Global Load Balancer  │
              │ (Cloud CDN enabled)   │
              └───────────────────────┘
```

## Summary

The Analytics Dashboard is deployed as:
- ✅ **Containerized** React app with Nginx
- ✅ **Serverless** on Cloud Run (auto-scaling)
- ✅ **HTTPS** enabled (automatic SSL)
- ✅ **Global** availability via CDN
- ✅ **Cost-effective** with generous free tier
- ✅ **Fast** deployment (~5-7 minutes)
- ✅ **Zero maintenance** infrastructure

Perfect for demos, prototypes, and production workloads!

