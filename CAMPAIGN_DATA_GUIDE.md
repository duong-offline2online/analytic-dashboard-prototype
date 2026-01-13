# Campaign Data Page - Quick Start Guide

## How to Access

1. Start your development server:
   ```bash
   npm run dev
   ```

2. Open the dashboard in your browser

3. Click on the **"Campaign Data"** tab (4th tab in the navigation)

## What You'll See

### Top Section - Summary Metrics (6 Cards)
```
┌─────────────────┬─────────────────┬─────────────────┬─────────────────┬─────────────────┬─────────────────┐
│ Total Campaigns │ Total Playbacks │ Avg Campaign    │ Avg Share of    │ Avg Engagement  │ Avg QR          │
│                 │                 │ Duration        │ Time            │ Score           │ Interaction     │
│      4          │     2,856       │     37s         │     9.2%        │      85         │      38         │
└─────────────────┴─────────────────┴─────────────────┴─────────────────┴─────────────────┴─────────────────┘
```

### Charts Section

#### 1. Campaign Playback Count
Bar chart showing total plays per campaign

#### 2. Campaign Engagement & Location Scores
Multi-bar chart comparing 3 scores:
- Engagement Score (purple)
- Display Location Score (green)
- Store Location Score (orange)

#### 3. QR Control Interaction Scores
Bar chart showing QR scan rates for campaigns with QR codes

#### 4. Total Campaign Playback Duration
Bar chart showing cumulative hours each campaign has played

#### 5. Campaign Playback Timeline
Line chart showing hourly playback patterns over the last 7 days

### Tables Section

#### Campaign Summary Table
Aggregated data per campaign with columns:
- Campaign ID
- Campaign Name
- Duration (seconds)
- Start Timestamp
- End Timestamp
- Playback Count
- Total Duration (hours)
- Engagement Score (with progress bar)
- Display Score (with progress bar)
- Store Score (with progress bar)
- QR Score (with progress bar or N/A)
- Creative Count (badge)
- Display Count (badge)

#### Detailed Playback Records (Last 50)
Individual playback events with columns:
- Campaign ID
- Creative ID
- Display ID
- Store
- Start Timestamp
- End Timestamp
- Duration
- Engagement Score
- Display Score
- Store Score
- QR Score
- Share of Time (%)
- Spot Position

### Bottom Section - Metric Definitions
Info panel explaining all metrics in plain language

## Key Metrics Explained

| Metric | Description | Example Value |
|--------|-------------|---------------|
| Campaign Duration | Length of video/creative in seconds | 30s |
| Start Timestamp | When playback started | 2025-12-30 14:23:15 |
| End Timestamp | When playback ended | 2025-12-30 14:23:45 |
| Playback Count | Number of times played | 342 |
| Total Playback Duration | Cumulative play time | 2.85 hours |
| Engagement Score | Performance metric (0-100) | 87 |
| Display Location Score | Location quality score | 82 |
| Store Location Score | Store placement score | 90 |
| QR Interaction Score | QR scan rate (0-100) | 45 |
| Share of Time | % of loop duration | 10.0% |
| Spot Position | Position in rotation | 3 of 6 |

## Features

✅ **Export Functionality**
- Export Campaign Summary
- Export Detailed Records

✅ **Visual Score Indicators**
- Progress bars for all scores
- Color-coded values
- Easy-to-read badges

✅ **Responsive Design**
- Works on all screen sizes
- Charts adapt to viewport
- Tables scroll horizontally on mobile

✅ **Consistent Styling**
- Matches existing dashboard theme
- Same color palette
- Unified typography

## Sample Data

The page displays **7 days** of mock data including:
- 4 campaigns (C-001 to C-004)
- 3 creative variations per campaign
- 5 displays across 3 stores
- ~2,800+ individual playback records
- Realistic hourly patterns (more plays during 9am-9pm)
- QR data for select campaigns

## Testing the Page

### Things to Try:

1. **Compare Campaigns**
   - Look at the bar charts to see which campaigns perform best
   - Check playback counts vs engagement scores

2. **Identify Peak Times**
   - Use the timeline chart to see when campaigns play most
   - Spot patterns in hourly distribution

3. **Analyze QR Performance**
   - Check which campaigns have QR codes
   - Compare their interaction scores

4. **Review Detailed Records**
   - Scroll through the detailed table
   - Look for specific timestamps
   - Check spot positions and share of time

5. **Understand Campaign Coverage**
   - See how many displays each campaign uses
   - Check which stores are running campaigns
   - Count creative variations per campaign

## Next Steps

Once you're familiar with the page, you can:

1. **Customize the data** - Modify `mockData.js` to change campaigns
2. **Add filtering** - Implement date range or campaign filtering
3. **Connect to API** - Replace mock data with real backend data
4. **Add export** - Implement actual CSV/Excel download
5. **Enhance interactivity** - Add drill-down or click-through features

## Need Help?

Refer to:
- `CAMPAIGN_DATA_PAGE.md` - Full technical documentation
- `METRICS_DOCUMENTATION.md` - Complete metrics definitions
- `README.md` - General dashboard documentation

