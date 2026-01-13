@echo off
REM Analytics Dashboard - Cloud Run Deployment Script (Windows)
REM This script deploys the dashboard to Google Cloud Run

setlocal EnableDelayedExpansion

REM Configuration
if "%GCP_PROJECT_ID%"=="" (
    set PROJECT_ID=your-project-id
) else (
    set PROJECT_ID=%GCP_PROJECT_ID%
)

if "%GCP_REGION%"=="" (
    set REGION=us-central1
) else (
    set REGION=%GCP_REGION%
)

set SERVICE_NAME=analytics-dashboard
set IMAGE_NAME=gcr.io/%PROJECT_ID%/%SERVICE_NAME%

echo.
echo 🚀 Deploying Analytics Dashboard to Cloud Run
echo ================================================
echo Project ID: %PROJECT_ID%
echo Region: %REGION%
echo Service Name: %SERVICE_NAME%
echo.

REM Check if gcloud is installed
where gcloud >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo ❌ Error: gcloud CLI is not installed
    echo Please install from: https://cloud.google.com/sdk/docs/install
    exit /b 1
)

REM Check if user is authenticated
gcloud auth list --filter=status:ACTIVE --format="value(account)" | findstr /r "." >nul
if %ERRORLEVEL% NEQ 0 (
    echo ⚠️  Not authenticated with gcloud
    echo Running: gcloud auth login
    gcloud auth login
)

REM Set project
echo 📋 Setting GCP project...
gcloud config set project %PROJECT_ID%

REM Enable required APIs
echo 🔧 Enabling required APIs...
gcloud services enable cloudbuild.googleapis.com
gcloud services enable run.googleapis.com
gcloud services enable containerregistry.googleapis.com

REM Build the Docker image
echo 🏗️  Building Docker image...
gcloud builds submit --tag %IMAGE_NAME%

REM Deploy to Cloud Run
echo 🚀 Deploying to Cloud Run...
gcloud run deploy %SERVICE_NAME% ^
  --image %IMAGE_NAME% ^
  --platform managed ^
  --region %REGION% ^
  --allow-unauthenticated ^
  --port 8080 ^
  --memory 512Mi ^
  --cpu 1 ^
  --min-instances 0 ^
  --max-instances 10 ^
  --set-env-vars "NODE_ENV=production"

REM Get the service URL
for /f "tokens=*" %%i in ('gcloud run services describe %SERVICE_NAME% --platform managed --region %REGION% --format "value(status.url)"') do set SERVICE_URL=%%i

echo.
echo ✅ Deployment complete!
echo ================================================
echo 🌐 Your dashboard is live at:
echo    %SERVICE_URL%
echo.
echo 📊 View logs:
echo    gcloud logging read "resource.type=cloud_run_revision AND resource.labels.service_name=%SERVICE_NAME%" --limit 50
echo.
echo 🔍 Service details:
echo    gcloud run services describe %SERVICE_NAME% --region %REGION%
echo.

endlocal

