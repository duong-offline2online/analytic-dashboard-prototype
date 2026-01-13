# Deploying Analytics Dashboard to Google Cloud Run

## Prerequisites

1. **Google Cloud Platform Account**
   - Create a GCP account at https://cloud.google.com
   - Create a new project or use existing one
   - Enable billing for the project

2. **Install Google Cloud SDK**
   - Download from: https://cloud.google.com/sdk/docs/install
   - Or use Cloud Shell (built-in terminal in GCP Console)

3. **Set Environment Variables (Optional)**
   ```bash
   # Linux/Mac
   export GCP_PROJECT_ID="your-project-id"
   export GCP_REGION="us-central1"
   
   # Windows (PowerShell)
   $env:GCP_PROJECT_ID="your-project-id"
   $env:GCP_REGION="us-central1"
   
   # Windows (Command Prompt)
   set GCP_PROJECT_ID=your-project-id
   set GCP_REGION=us-central1
   ```

## Quick Deployment

### Option 1: Using Deployment Script (Recommended)

**On Windows:**
```cmd
deploy-cloudrun.bat
```

**On Linux/Mac:**
```bash
chmod +x deploy-cloudrun.sh
./deploy-cloudrun.sh
```

The script will:
- ✅ Check if gcloud CLI is installed
- ✅ Authenticate with Google Cloud
- ✅ Enable required APIs
- ✅ Build Docker image
- ✅ Deploy to Cloud Run
- ✅ Display the live URL

### Option 2: Manual Deployment

1. **Authenticate with Google Cloud**
   ```bash
   gcloud auth login
   ```

2. **Set your project ID**
   ```bash
   gcloud config set project YOUR_PROJECT_ID
   ```

3. **Enable required APIs**
   ```bash
   gcloud services enable cloudbuild.googleapis.com
   gcloud services enable run.googleapis.com
   gcloud services enable containerregistry.googleapis.com
   ```

4. **Build the Docker image**
   ```bash
   gcloud builds submit --tag gcr.io/YOUR_PROJECT_ID/analytics-dashboard
   ```

5. **Deploy to Cloud Run**
   ```bash
   gcloud run deploy analytics-dashboard \
     --image gcr.io/YOUR_PROJECT_ID/analytics-dashboard \
     --platform managed \
     --region us-central1 \
     --allow-unauthenticated \
     --port 8080 \
     --memory 512Mi \
     --cpu 1
   ```

6. **Get the service URL**
   ```bash
   gcloud run services describe analytics-dashboard \
     --region us-central1 \
     --format 'value(status.url)'
   ```

## Configuration Options

### Change Region
Available regions: `us-central1`, `us-east1`, `europe-west1`, `asia-east1`, etc.

```bash
# Update in script or use environment variable
export GCP_REGION="europe-west1"
```

### Adjust Resources
Edit the deployment command in the script:

```bash
--memory 1Gi        # Increase memory (default: 512Mi)
--cpu 2             # Increase CPU (default: 1)
--max-instances 20  # Increase max instances (default: 10)
--min-instances 1   # Keep 1 instance warm (default: 0)
```

### Enable Authentication
To require authentication:

```bash
# Deploy with authentication required
gcloud run deploy analytics-dashboard \
  --image gcr.io/YOUR_PROJECT_ID/analytics-dashboard \
  --no-allow-unauthenticated \
  # ... other flags
```

Then grant access:
```bash
gcloud run services add-iam-policy-binding analytics-dashboard \
  --region us-central1 \
  --member="user:email@example.com" \
  --role="roles/run.invoker"
```

## Cost Estimation

Cloud Run pricing (as of 2024):
- **CPU**: $0.00002400 per vCPU-second
- **Memory**: $0.00000250 per GiB-second
- **Requests**: $0.40 per million requests
- **Free tier**: 2 million requests/month, 360,000 vCPU-seconds, 180,000 GiB-seconds

**Estimated cost for demo:**
- Light usage (1000 views/day): ~$0-2/month
- Medium usage (10,000 views/day): ~$5-15/month

## Monitoring & Management

### View Logs
```bash
gcloud logging read "resource.type=cloud_run_revision AND resource.labels.service_name=analytics-dashboard" --limit 50
```

### View Service Details
```bash
gcloud run services describe analytics-dashboard --region us-central1
```

### Update Deployment
After making changes, redeploy:
```bash
./deploy-cloudrun.sh  # or deploy-cloudrun.bat on Windows
```

### Delete Service (Cleanup)
```bash
gcloud run services delete analytics-dashboard --region us-central1
```

### Scale to Zero
Cloud Run automatically scales to zero when not in use. No manual action needed!

## Troubleshooting

### Error: "gcloud: command not found"
- Install Google Cloud SDK: https://cloud.google.com/sdk/docs/install

### Error: "Permission denied"
- Make script executable: `chmod +x deploy-cloudrun.sh`

### Error: "API not enabled"
- Run: `gcloud services enable cloudbuild.googleapis.com run.googleapis.com`

### Build Fails
- Check Dockerfile syntax
- Ensure all dependencies in package.json
- Try building locally: `docker build -t test .`

### Service Won't Start
- Check logs: `gcloud logging read --limit 50`
- Verify port 8080 is exposed
- Check nginx.conf configuration

### Slow Performance
- Increase memory: `--memory 1Gi`
- Set min instances to 1: `--min-instances 1`
- Use Artifact Registry instead of Container Registry (faster)

## Custom Domain (Optional)

1. **Map custom domain**
   ```bash
   gcloud run domain-mappings create \
     --service analytics-dashboard \
     --domain dashboard.yourdomain.com \
     --region us-central1
   ```

2. **Update DNS records** as instructed by the command output

## Environment Variables

Add environment variables during deployment:

```bash
gcloud run deploy analytics-dashboard \
  --set-env-vars "API_URL=https://api.example.com,DEBUG=false"
```

Or use a .env.yaml file:
```yaml
# env.yaml
API_URL: "https://api.example.com"
DEBUG: "false"
```

```bash
gcloud run deploy analytics-dashboard --env-vars-file env.yaml
```

## CI/CD Integration

For automated deployments, add to your CI/CD pipeline:

```yaml
# Example GitHub Actions
- name: Deploy to Cloud Run
  uses: google-github-actions/deploy-cloudrun@v1
  with:
    service: analytics-dashboard
    image: gcr.io/${{ secrets.GCP_PROJECT_ID }}/analytics-dashboard
    region: us-central1
```

## Support

- **Cloud Run Documentation**: https://cloud.google.com/run/docs
- **Pricing Calculator**: https://cloud.google.com/products/calculator
- **GCP Support**: https://cloud.google.com/support

## Next Steps

After deployment:
1. ✅ Test the live URL
2. ✅ Set up monitoring alerts
3. ✅ Configure custom domain (optional)
4. ✅ Enable Cloud CDN for faster global access
5. ✅ Set up CI/CD for automated deployments

