# ✅ Cloud Run Deployment Checklist

Use this checklist to ensure smooth deployment of your Analytics Dashboard to Google Cloud Run.

## Before Deployment

### 1. Prerequisites
- [ ] Google Cloud Platform account created
- [ ] GCP Project created (note the Project ID)
- [ ] Billing enabled on the project
- [ ] Google Cloud SDK installed (or ready to use Cloud Shell)

### 2. Project Setup
- [ ] Decided on a project name/ID
- [ ] Chosen a deployment region (default: us-central1)
- [ ] Reviewed estimated costs (typically $0-2/month for demo)

### 3. Files Verified
- [ ] `Dockerfile` exists
- [ ] `nginx.conf` exists
- [ ] `deploy-cloudrun.sh` or `deploy-cloudrun.bat` exists
- [ ] `.dockerignore` exists
- [ ] `.gcloudignore` exists

## Deployment Steps

### 1. Authenticate
- [ ] Logged in to Google Cloud: `gcloud auth login`
- [ ] Set project: `gcloud config set project YOUR_PROJECT_ID`
- [ ] Verified authentication: `gcloud auth list`

### 2. Enable APIs
- [ ] Cloud Build API enabled
- [ ] Cloud Run API enabled
- [ ] Container Registry API enabled
*(The deployment script does this automatically)*

### 3. Configure Environment
```bash
# Set these before running the script
export GCP_PROJECT_ID="your-actual-project-id"
export GCP_REGION="us-central1"  # or your preferred region
```

- [ ] Environment variables set
- [ ] Project ID is correct
- [ ] Region is appropriate for your location

### 4. Run Deployment
- [ ] Executed deployment script: `./deploy-cloudrun.sh` or `deploy-cloudrun.bat`
- [ ] Build completed successfully (3-5 minutes)
- [ ] Deployment completed successfully (1-2 minutes)
- [ ] Service URL received

## Post-Deployment Verification

### 1. Test Dashboard
- [ ] Opened the service URL in browser
- [ ] Dashboard loads correctly
- [ ] All tabs work (Campaign Performance, Display Analytics, Demographics, Campaign Data)
- [ ] Charts render properly
- [ ] Tables display data
- [ ] No console errors

### 2. Check Configuration
- [ ] Service is running: `gcloud run services list`
- [ ] Service details: `gcloud run services describe analytics-dashboard --region us-central1`
- [ ] Correct region deployed
- [ ] Public access enabled (for demo)

### 3. Monitor Service
- [ ] Logs accessible: `gcloud logging read --limit 50`
- [ ] No errors in logs
- [ ] Service responding quickly
- [ ] Health check passing

## Share with Stakeholders

### 1. Prepare Demo
- [ ] Service URL copied
- [ ] Tested on different browsers (Chrome, Firefox, Safari, Edge)
- [ ] Tested on mobile devices
- [ ] Screenshots taken (optional)

### 2. Share Access
- [ ] Sent URL to stakeholders
- [ ] Included brief description
- [ ] Noted that it's a prototype/demo
- [ ] Explained mock data usage

### 3. Gather Feedback
- [ ] Set up feedback collection method
- [ ] Note key areas for feedback
- [ ] Plan for incorporating feedback

## Optional Enhancements

### 1. Custom Domain
- [ ] Domain registered
- [ ] DNS configured
- [ ] Domain mapped to service
- [ ] SSL certificate verified

### 2. Authentication (if needed)
- [ ] Authentication configured
- [ ] Users granted access
- [ ] Access verified
- [ ] Documentation updated

### 3. Monitoring & Alerts
- [ ] Uptime checks configured
- [ ] Error rate alerts set
- [ ] Cost alerts enabled
- [ ] Dashboard favorites bookmarked

### 4. CI/CD (optional)
- [ ] GitHub/GitLab repository connected
- [ ] Automated deployment configured
- [ ] Build triggers set up
- [ ] Deployment notifications enabled

## Cost Management

### 1. Monitor Usage
- [ ] Billing dashboard checked: https://console.cloud.google.com/billing
- [ ] Budget alerts configured
- [ ] Usage within free tier confirmed
- [ ] Auto-scaling working correctly

### 2. Optimize if Needed
- [ ] Adjusted memory/CPU settings
- [ ] Set appropriate max instances
- [ ] Configured min-instances (if needed)
- [ ] Reviewed and optimized cold starts

## Maintenance

### 1. Regular Tasks
- [ ] Check logs weekly
- [ ] Monitor costs monthly
- [ ] Update dependencies periodically
- [ ] Test functionality after GCP updates

### 2. Updates
- [ ] Process for updating dashboard defined
- [ ] Redeploy command ready: `./deploy-cloudrun.sh`
- [ ] Rollback plan documented
- [ ] Stakeholders notified of updates

## Cleanup (When Done)

### 1. End of Demo Period
- [ ] Stakeholder feedback collected
- [ ] Screenshots/recordings saved
- [ ] Next steps decided

### 2. Delete Resources
If no longer needed:
- [ ] Service deleted: `gcloud run services delete analytics-dashboard`
- [ ] Images deleted: `gcloud container images delete gcr.io/PROJECT_ID/analytics-dashboard`
- [ ] Billing verified stopped

## Troubleshooting Checklist

If something goes wrong:

### Build Issues
- [ ] Checked Dockerfile syntax
- [ ] Verified all dependencies in package.json
- [ ] Tested Docker build locally
- [ ] Reviewed build logs: `gcloud builds log BUILD_ID`

### Deployment Issues
- [ ] Verified correct project ID
- [ ] Checked API enablement
- [ ] Confirmed billing is active
- [ ] Reviewed IAM permissions

### Runtime Issues
- [ ] Checked service logs
- [ ] Verified port 8080 configuration
- [ ] Tested nginx configuration
- [ ] Confirmed health check endpoint

### Performance Issues
- [ ] Increased memory allocation
- [ ] Added more CPU
- [ ] Set min-instances to 1
- [ ] Enabled Cloud CDN

## Success Criteria

Deployment is successful when:
- [ ] ✅ Dashboard is accessible via public URL
- [ ] ✅ All features work as expected
- [ ] ✅ No critical errors in logs
- [ ] ✅ Performance is acceptable (<2s load time)
- [ ] ✅ Cost is within budget
- [ ] ✅ Stakeholders can access and use it
- [ ] ✅ Feedback process is in place

## Quick Reference Commands

```bash
# Deploy
./deploy-cloudrun.sh

# Get URL
gcloud run services describe analytics-dashboard --region us-central1 --format='value(status.url)'

# View logs
gcloud logging read "resource.type=cloud_run_revision AND resource.labels.service_name=analytics-dashboard" --limit 50

# Update service
gcloud run services update analytics-dashboard --memory 1Gi

# Delete service
gcloud run services delete analytics-dashboard --region us-central1

# Check costs
gcloud billing accounts list
```

## Notes & Issues

Use this section to track any issues or special notes:

**Deployment Date:** _______________

**Project ID:** _______________

**Service URL:** _______________

**Issues Encountered:**
- 
- 

**Special Configurations:**
- 
- 

**Follow-up Tasks:**
- 
- 

---

**Status:** [ ] Not Started  [ ] In Progress  [ ] Completed  [ ] Issues

**Next Review Date:** _______________

