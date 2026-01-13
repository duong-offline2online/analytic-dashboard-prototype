# Campaign Effectiveness Dashboard - Prototype

This is a static UI prototype for the Campaign Effectiveness Dashboard, designed to showcase display and campaign performance metrics.

## 🚀 Quick Links

- **[Deploy to Cloud Run](./CLOUDRUN_QUICKSTART.md)** - Deploy for demo in 3 steps
- **[Detailed Deployment Guide](./DEPLOY_CLOUDRUN.md)** - Complete Cloud Run documentation
- **[Local Development](#installation--running)** - Run locally for development

## Features

### Key Metrics Displayed

1. **Passerby Audience**
   - Total passerby count per display
   - Breakdown by gender and age groups
   - Tracked per minute/hour with time series visualization

2. **Campaign Views**
   - Total views from passersby who looked at campaigns
   - Demographic breakdown (gender/age)
   - Temporal analysis (minute/hour)

3. **Campaign View Timing**
   - Duration distribution of campaign views
   - Average view time per display/campaign
   - Engagement depth analysis

4. **ROTS (Realistic Opportunity to See)**
   - Estimated viewable audience based on display positioning
   - Conversion rate from passersby to viewable contacts
   - Display viewability metrics

5. **VAC (Visibility Adjusted Contacts)**
   - Attention-filtered contacts from ROTS
   - Eye-tracking simulation
   - Quality of exposure metrics

6. **Campaign Engagement Score**
   - Automated scoring (0-100) based on:
     - View frequency
     - View duration
     - Conversion through funnel (Passersby → ROTS → VAC → Views)
   - Performance comparison across displays and campaigns

## Installation & Running

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Setup Instructions

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm run dev
```

3. Open your browser to `http://localhost:5173`

## ☁️ Cloud Deployment

### Deploy to Google Cloud Run

**Quick Deploy:**
```bash
# Set your GCP project ID
export GCP_PROJECT_ID="your-project-id"

# Run deployment script
./deploy-cloudrun.sh  # Linux/Mac
deploy-cloudrun.bat   # Windows
```

**Or deploy manually:**
```bash
gcloud builds submit --tag gcr.io/$GCP_PROJECT_ID/analytics-dashboard
gcloud run deploy analytics-dashboard \
  --image gcr.io/$GCP_PROJECT_ID/analytics-dashboard \
  --platform managed \
  --region us-central1 \
  --allow-unauthenticated
```

**📖 Full Documentation:**
- [Quick Start Guide](./CLOUDRUN_QUICKSTART.md) - 3-step deployment
- [Complete Guide](./DEPLOY_CLOUDRUN.md) - Detailed instructions, troubleshooting, and configuration

**Cost:** Typically $0-2/month for demo usage with free tier

## Dashboard Components

### Summary Cards
- 6 key metric cards at the top showing overall performance
- Color-coded icons for each metric type
- Trend indicators (vs. previous period)

### Interactive Filters
- Date range selector (Today, Yesterday, Last 7/30 Days, Custom)
- Display filter (All displays or specific display)
- Campaign filter (All campaigns or specific campaign)
- Export and refresh functionality

### Visualizations

1. **Hourly Traffic & Views Chart** - Area chart showing passersby, ROTS, and views over time
2. **Demographics Chart** - Bar chart breaking down audience by age and gender
3. **View Duration Pie Chart** - Distribution of view durations
4. **Real-time Activity** - Line chart showing last 60 minutes of activity

### Data Tables

1. **Display Performance Table**
   - All active displays with full metrics
   - Engagement scores with visual indicators
   - Status and performance comparison

2. **Active Campaigns Table**
   - Campaign overview with date ranges
   - Cross-display performance
   - Engagement scores

### Metric Definitions Panel
- Clear explanations of all metrics
- Calculation methodologies
- Visual context for stakeholder understanding

## Technology Stack

- **React 18** - UI framework
- **Recharts** - Data visualization library
- **Lucide React** - Modern icon library
- **Vite** - Fast build tool and dev server

## Mock Data

The prototype uses realistic mock data to simulate:
- 7 days of hourly traffic data
- 5 different displays across multiple stores
- 2 active campaigns
- Real-time minute-by-minute updates
- Demographic breakdowns (10 age/gender segments)
- View duration distributions

## Customization

To modify the dashboard:

1. **Update metrics**: Edit `src/mockData.js`
2. **Change styling**: Edit `src/App.css`
3. **Add components**: Modify `src/App.jsx`

## Next Steps (Post-Approval)

After getting feedback from stakeholders:

1. **Backend Integration**
   - Connect to real analytics API
   - Implement real-time data streaming
   - Add authentication and authorization

2. **Enhanced Features**
   - Interactive drill-down capabilities
   - Custom date range picker
   - Advanced filtering and sorting
   - Export to PDF/Excel
   - Email scheduling for reports

3. **Advanced Analytics**
   - Predictive engagement scoring
   - A/B testing for campaigns
   - Heatmap visualization
   - Conversion funnel analysis

4. **Performance Optimization**
   - Data caching strategies
   - Lazy loading for large datasets
   - Server-side rendering for faster load times

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

Internal use only - Proprietary

