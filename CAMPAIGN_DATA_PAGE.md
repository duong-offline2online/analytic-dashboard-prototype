# Campaign Data Page Documentation

## Overview
A comprehensive Campaign Data analytics page has been added to the dashboard, providing detailed metrics and insights about campaign performance, playback statistics, and interactions.

## New Features

### 1. New Tab: "Campaign Data"
Added as the 4th tab in the main dashboard interface, accessible alongside:
- Campaign Performance
- Display Analytics
- Audience Demographics
- **Campaign Data** (NEW)

## Metrics Implemented

### Campaign-Level Metrics:
1. **Campaign Duration** - Length of the campaign creative in seconds (mapped to Ad Duration)
2. **Start Timestamp** - Exact date and time of every individual play (YYYY-MM-DD HH:MM:SS format)
3. **End Timestamp** - Exact date and time when playback ends (YYYY-MM-DD HH:MM:SS format)
4. **Campaign ID** - Unique identifier for each campaign
5. **Creative ID** - Unique identifier for creative variations
6. **Playback Count** - Total number of times the campaign has been played in full
7. **Total Playback Duration** - Cumulative time (in hours/days) the campaign has played
8. **Total Campaign Engagement Score** - Average engagement score across all displays
9. **Total Display Location Score** - Average performance based on all display locations
10. **Total Store Location Score** - Average performance based on all store locations
11. **QR Control Interaction Score** - QR scan/interaction rate for campaigns with QR codes
12. **Total QR Control Interaction Score** - Average QR interaction across all displays
13. **Share of Time (SOT)** - Percentage of loop/hour that the campaign occupies
14. **Spot Position** - Position in the playback loop (e.g., "Spot 1 of 6")

## Components Added

### Summary Cards (Top Row)
- **Total Campaigns** - Shows active vs total campaigns
- **Total Playbacks** - Total number of playback events
- **Avg Campaign Duration** - Average spot length across campaigns
- **Avg Share of Time** - Average percentage of loop duration
- **Avg Engagement Score** - Average engagement performance
- **Avg QR Interaction** - Average QR scan rate for campaigns with QR codes

### Charts & Visualizations

1. **Campaign Playback Count (Bar Chart)**
   - Shows total plays per campaign over the last 7 days
   - Helps identify most-played campaigns

2. **Campaign Engagement & Location Scores (Multi-Bar Chart)**
   - Compares engagement, display location, and store location scores
   - Enables comparison of campaign performance across different dimensions

3. **QR Control Interaction Scores (Bar Chart)**
   - Displays only campaigns with QR codes
   - Shows which campaigns generate the most QR interactions

4. **Total Campaign Playback Duration (Bar Chart)**
   - Shows total hours each campaign has played
   - Helps understand campaign exposure time

5. **Campaign Playback Timeline (Line Chart)**
   - Hourly playback count over time
   - Shows temporal patterns in campaign playback

### Data Tables

1. **Campaign Summary Table**
   - Aggregated view per campaign
   - Columns: Campaign ID, Name, Duration, Start/End Time, Playback Count, Total Duration, All Scores, Creative Count, Display Count
   - Export functionality for summary data

2. **Detailed Playback Records Table**
   - Shows last 50 individual playback events
   - Columns: Campaign ID, Creative ID, Display ID, Store, Timestamps, Duration, All Scores, Share of Time, Spot Position
   - Export functionality for detailed records

### Information Panel
- Comprehensive metric definitions
- Explains each metric and its calculation
- Helps users understand the data

## Mock Data Generation

### New Functions in `mockData.js`:

1. **`generateCampaignPlaybackData()`**
   - Generates realistic playback records for 7 days
   - Includes all timestamps, scores, and positioning data
   - Simulates varying traffic patterns (higher during business hours)

2. **`generateCampaignSummary()`**
   - Aggregates playback data by campaign
   - Calculates averages and totals
   - Tracks unique creatives, displays, and stores per campaign

## Data Structure

### Playback Record:
```javascript
{
  campaignId: 'C-001',
  campaignName: 'Summer Sale 2025',
  creativeId: 'CR-A',
  displayId: 'D-001',
  storeName: 'Flagship Store',
  duration: 30,
  startTimestamp: '2025-12-30 14:23:15',
  endTimestamp: '2025-12-30 14:23:45',
  playbackCount: 1,
  engagementScore: 87,
  displayLocationScore: 82,
  storeLocationScore: 90,
  qrInteractionScore: 45,
  shareOfTime: 10.0,
  spotPosition: '3 of 6',
  date: '2025-12-30',
  hour: 14
}
```

### Campaign Summary:
```javascript
{
  campaignId: 'C-001',
  campaignName: 'Summer Sale 2025',
  duration: 30,
  startTimestamp: '2025-12-24 08:12:34',
  endTimestamp: '2025-12-30 21:45:12',
  playbackCount: 342,
  totalPlaybackDuration: '2.85', // hours
  totalPlaybackDurationDays: '0.12', // days
  avgEngagementScore: 87,
  avgDisplayLocationScore: 82,
  avgStoreLocationScore: 90,
  avgQRInteractionScore: 42,
  creativeCount: 3,
  displayCount: 2,
  storeCount: 2,
  status: 'active'
}
```

## Technical Implementation

### Files Modified:
1. **`src/mockData.js`** - Added campaign playback data generation
2. **`src/App.jsx`** - Added Campaign Data tab with all visualizations

### Key Features:
- Responsive design matching existing dashboard style
- Consistent color scheme with rest of dashboard
- Export buttons for both summary and detailed data
- Score visualizations with progress bars
- Proper timestamp formatting
- Filterable and sortable data (infrastructure in place)

## Usage

1. Navigate to the dashboard
2. Click on the "Campaign Data" tab (4th tab)
3. View summary metrics at the top
4. Explore various charts for insights
5. Review detailed tables for granular data
6. Use export buttons to download data
7. Read metric definitions in the info panel

## Future Enhancements (Possible)
- Real-time data updates
- Date range filtering for campaign data
- Campaign comparison tool
- Drill-down capability from summary to details
- CSV/Excel export functionality
- Advanced filtering on tables
- Search functionality
- Sorting on all table columns
- Integration with actual campaign management API

## Notes
- All timestamps use YYYY-MM-DD HH:MM:SS format as specified
- Share of Time calculated based on 5-minute loop (300 seconds)
- QR scores only shown for campaigns with QR codes (others show N/A)
- Spot positions simulate 6-spot rotation loops
- Mock data generates 7 days of hourly playback records

