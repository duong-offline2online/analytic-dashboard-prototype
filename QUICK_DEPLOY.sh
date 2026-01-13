#!/bin/bash
# Quick deployment script for Analytics Dashboard to Google Cloud Run
# Usage: ./QUICK_DEPLOY.sh [service-name] [region] [memory]
# Example: ./QUICK_DEPLOY.sh my-dashboard us-central1 1Gi

SERVICE_NAME=${1:-analytics-dashboard}
REGION=${2:-asia-southeast1}
MEMORY=${3:-512Mi}

echo "🚀 Deploying Analytics Dashboard..."
echo "   Service: $SERVICE_NAME"
echo "   Region: $REGION"
echo "   Memory: $MEMORY"
echo ""

gcloud builds submit --config=cloudbuild.yaml \
  --substitutions=_SERVICE_NAME=$SERVICE_NAME,_REGION=$REGION,_MEMORY=$MEMORY

if [ $? -eq 0 ]; then
  echo ""
  echo "✅ Deployment started successfully!"
  echo ""
  echo "📍 Get your service URL:"
  echo "   gcloud run services describe $SERVICE_NAME --region=$REGION --format='value(status.url)'"
  echo ""
  echo "📊 Monitor deployment:"
  echo "   gcloud run services describe $SERVICE_NAME --region=$REGION"
  echo ""
else
  echo "❌ Deployment failed. Check logs above for details."
  exit 1
fi
