# ☁️ Quick Start: Deploy to Cloud Run

## 🚀 Deploy in 3 Steps

### Step 1: Install Google Cloud SDK
```bash
# Download and install from:
https://cloud.google.com/sdk/docs/install

# Or use Cloud Shell (no installation needed):
https://console.cloud.google.com/cloudshell
```

### Step 2: Set Your Project ID
```bash
# Replace with your actual GCP project ID
export GCP_PROJECT_ID="your-project-id-here"

# Windows users:
set GCP_PROJECT_ID=your-project-id-here
```

### Step 3: Deploy!

**On Windows:**
```cmd
deploy-cloudrun.bat
```

**On Linux/Mac:**
```bash
chmod +x deploy-cloudrun.sh
./deploy-cloudrun.sh
```

**Or manually:**
```bash
gcloud builds submit --tag gcr.io/$GCP_PROJECT_ID/analytics-dashboard
gcloud run deploy analytics-dashboard \
  --image gcr.io/$GCP_PROJECT_ID/analytics-dashboard \
  --platform managed \
  --region us-central1 \
  --allow-unauthenticated
```

## ✅ That's It!

Your dashboard will be live at:
```
https://analytics-dashboard-xxxxxxxxxx-uc.a.run.app
```

The URL will be displayed after deployment completes.

## 💰 Cost

- **Free tier**: 2 million requests/month
- **Demo usage**: Typically $0-2/month
- **Auto-scaling**: Scales to zero when not in use

## 🔧 Common Issues

### "gcloud: command not found"
→ Install Google Cloud SDK (see Step 1)

### "Project not found"
→ Create a project at https://console.cloud.google.com

### "API not enabled"
→ The script will enable APIs automatically

## 📚 More Details

See [DEPLOY_CLOUDRUN.md](./DEPLOY_CLOUDRUN.md) for:
- Custom domains
- Authentication
- Environment variables
- Monitoring & logs
- CI/CD integration

## 🆘 Need Help?

1. Check logs: `gcloud logging read --limit 50`
2. View service: `gcloud run services describe analytics-dashboard --region us-central1`
3. GCP Documentation: https://cloud.google.com/run/docs

