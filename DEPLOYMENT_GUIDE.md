# Analytics Dashboard - Deployment Guide

## Overview
This guide covers deploying the Analytics Dashboard to Google Cloud Run using Cloud Build. The configuration is fully parameterized for flexibility across environments.

---

## Prerequisites

1. **Google Cloud Project** - Active GCP project with billing enabled
2. **Cloud Build API** - Enabled in your GCP project
3. **Cloud Run API** - Enabled in your GCP project
4. **Container Registry** - Enabled for image storage
5. **gcloud CLI** - Installed and authenticated (`gcloud auth login`)

### Enable Required APIs

```bash
gcloud services enable cloudbuild.googleapis.com
gcloud services enable run.googleapis.com
gcloud services enable containerregistry.googleapis.com
```

---

## Deployment Methods

### Method 1: Manual Build Submission (Quick Deployment)

Deploy to Cloud Run with default settings (Singapore region):

```bash
gcloud builds submit --config=cloudbuild.yaml
```

### Method 2: Custom Parameters

Deploy with custom parameters:

```bash
gcloud builds submit --config=cloudbuild.yaml \
  --substitutions=_SERVICE_NAME=my-dashboard,_REGION=us-central1,_MEMORY=1Gi
```

### Method 3: Cloud Build Trigger (CI/CD)

Set up automatic deployments from GitHub/GitLab:

1. **Connect Repository:**
   ```bash
   gcloud builds connect --repository-name=analytics-dashboard \
     --repository-owner=<YOUR_GITHUB_USERNAME>
   ```

2. **Create Trigger** (via Google Cloud Console):
   - Go to Cloud Build → Triggers
   - Click "Create Trigger"
   - Select your repository
   - Choose branch (e.g., `main`, `master`)
   - Set build configuration to `cloudbuild.yaml`
   - Add substitution variables for custom parameters

---

## Configuration Parameters

All parameters have sensible defaults but can be customized:

| Parameter | Default | Description |
|-----------|---------|-------------|
| `_SERVICE_NAME` | `analytics-dashboard` | Cloud Run service name |
| `_REGION` | `asia-southeast1` | GCP region (Singapore) |
| `_MEMORY` | `512Mi` | Memory per instance |
| `_CPU` | `1` | CPU allocation |
| `_MIN_INSTANCES` | `0` | Minimum instances (auto-scale down) |
| `_MAX_INSTANCES` | `10` | Maximum instances (auto-scale limit) |
| `_PORT` | `8080` | Container port |
| `_ALLOW_UNAUTHENTICATED` | `true` | Public access (no authentication) |

---

## Deployment Examples

### Example 1: Default Singapore Deployment

```bash
gcloud builds submit --config=cloudbuild.yaml
```

### Example 2: US Production Deployment

```bash
gcloud builds submit --config=cloudbuild.yaml \
  --substitutions=_SERVICE_NAME=analytics-prod,_REGION=us-central1,_MEMORY=1Gi,_MAX_INSTANCES=20
```

### Example 3: Private EU Service

```bash
gcloud builds submit --config=cloudbuild.yaml \
  --substitutions=_SERVICE_NAME=analytics-eu,_REGION=europe-west1,_ALLOW_UNAUTHENTICATED=false
```

---

## Monitoring Deployments

### Watch Build Progress

```bash
# View live build logs
gcloud builds log -f <BUILD_ID>

# List recent builds
gcloud builds list --limit=10
```

### Check Cloud Run Service

```bash
# View service details
gcloud run services describe analytics-dashboard --region=asia-southeast1

# View service URL
gcloud run services describe analytics-dashboard \
  --region=asia-southeast1 --format='value(status.url)'
```

---

## Troubleshooting

### Build Fails

Check build logs:
```bash
gcloud builds log <BUILD_ID>
```

### Service Won't Start

Check Cloud Run logs:
```bash
gcloud logging read "resource.type=cloud_run_revision AND resource.labels.service_name=analytics-dashboard" --limit=50
```

---

## Rollback Strategy

### Rollback to Previous Revision

```bash
# List revisions
gcloud run revisions list --service=analytics-dashboard

# Set traffic to older revision
gcloud run services update-traffic analytics-dashboard \
  --to-revisions=<REVISION_NAME>=100
```

---

**Last Updated:** January 14, 2026
**Status:** Production Ready
