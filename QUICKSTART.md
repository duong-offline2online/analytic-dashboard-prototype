# Quick Start Guide

## Running the Dashboard Prototype

Follow these steps to run the Campaign Effectiveness Dashboard prototype:

### Step 1: Install Dependencies
Open your terminal in the project directory and run:
```bash
npm install
```

### Step 2: Start Development Server
```bash
npm run dev
```

The dashboard should automatically open in your browser at `http://localhost:3000`

If it doesn't open automatically, manually navigate to: **http://localhost:3000**

### Step 3: Explore the Dashboard

The prototype includes:

#### 📊 Top Metrics (6 Cards)
- **Total Passersby**: Complete audience count
- **ROTS**: Realistic opportunity to see (viewability estimate)
- **VAC**: Visibility adjusted contacts (attention-filtered)
- **Campaign Views**: Actual confirmed views
- **Avg. View Duration**: How long people look
- **Engagement Score**: Overall performance metric (0-100)

#### 📈 Interactive Charts
1. **Hourly Traffic Chart** - Shows passersby, ROTS, and views over time
2. **Demographics Breakdown** - Age and gender distribution
3. **View Duration Pie Chart** - How long people engage
4. **Real-time Activity** - Last 60 minutes of data

#### 📋 Data Tables
1. **Display Performance** - Individual display metrics with engagement scores
2. **Active Campaigns** - Campaign-level performance across displays

#### 🎯 Key Features to Show Your Boss

1. **Conversion Funnel Visualization**
   - Passersby → ROTS (78.4% conversion)
   - ROTS → VAC (59.9% conversion)  
   - VAC → Views (89.2% conversion)

2. **Engagement Score Algorithm**
   - Automatically calculated 0-100 score
   - Based on view frequency + duration + conversion rate
   - Continuously optimized per display/campaign

3. **Demographic Insights**
   - Gender and age breakdown for every metric
   - Helps optimize campaign targeting

4. **Time-based Analysis**
   - Minute-by-minute real-time tracking
   - Hourly patterns over multiple days
   - Peak traffic identification

## Presenting to Your Boss

### Key Discussion Points:

1. **"What problem does this solve?"**
   - Quantifies campaign effectiveness beyond impressions
   - Provides actionable insights for content optimization
   - Tracks full funnel from foot traffic to engagement

2. **"What makes this different?"**
   - ROTS & VAC metrics are industry-standard for OOH advertising
   - Engagement scoring provides single KPI for performance
   - Real-time demographic breakdown drives targeting

3. **"What's next after approval?"**
   - Connect to real camera/sensor data
   - Add predictive analytics for campaign optimization
   - Build automated alerts for low-performing displays
   - Create custom reports and scheduled exports

## Customization for Demo

You can adjust these values in `src/mockData.js` to simulate different scenarios:

- **High Performance Campaign**: Increase view rates to 60-70%
- **Low Performance**: Decrease to 20-30%
- **Peak Hours**: Adjust traffic patterns in `generateTimeSeriesData()`
- **Different Demographics**: Modify `generateDemographicData()`

## Troubleshooting

### Port Already in Use
If port 3000 is busy, the dev server will use the next available port (3001, 3002, etc.)

### Blank Screen
Check the browser console (F12) for any errors

### Charts Not Showing
Ensure Recharts installed correctly:
```bash
npm install recharts --save
```

## Mock Data Overview

The prototype generates realistic data for:
- **5 Different Displays** across multiple stores
- **2 Active Campaigns** 
- **7 Days** of historical data
- **10 Demographic Segments** (Age/Gender)
- **Real-time updates** (last 60 minutes)

All data refreshes on page reload to simulate different scenarios.

## Screenshots for Presentation

Consider capturing these views:
1. Full dashboard overview
2. Engagement score comparison across displays
3. Demographics breakdown chart
4. Real-time activity chart
5. Display performance table with scores

## Next Steps After Feedback

Based on your boss's feedback, we can:
- Add more metrics or visualizations
- Adjust the UI/styling to match brand guidelines
- Create additional views (individual display drill-down, etc.)
- Add interactive filtering and export features
- Integrate with existing systems

---

**Need Help?** Check the main README.md for more details or contact the development team.

