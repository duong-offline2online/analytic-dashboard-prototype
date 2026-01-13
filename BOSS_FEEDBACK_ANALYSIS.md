# Boss Feedback Analysis & Requirements Documentation

**Date:** January 14, 2026  
**Project:** Analytics Dashboard - Campaign Performance & Retail Insights  
**Status:** Requirements Analysis & Implementation Planning

---

## Executive Summary

Based on the boss's feedback on the proposed Campaign Performance Dashboard, this document provides a detailed analysis of the required changes and enhancements to the analytics platform. The feedback indicates that the current Campaign Performance tab implementation needs to be **completely redesigned** to align with actual business requirements.

The boss's feedback (marked with red X's across the current implementation) clearly indicates:
- ❌ Current metrics and visualizations are NOT aligned with business needs
- ❌ Missing critical campaign performance indicators
- ❌ Lack of proper filtering and segmentation capabilities
- ❌ Need for separate Campaign Performance Dashboard within Retail Insights

---

## Current State Analysis

### What Currently Exists:
1. **Retail Insights Section** with three tabs:
   - Visitor Insights (with basic visitor stats)
   - Store Insights (store performance metrics)
   - Upcoming Appointments (booking management)

2. **Campaign Effectiveness Dashboard** (Standalone):
   - Campaign Performance tab
   - Display Analytics tab
   - Audience Demographics tab
   - Campaign Data tab

### Critical Gap Identified:
The boss wants the **Campaign Performance Dashboard integrated INTO Retail Insights** as a new fourth tab, not as a separate standalone dashboard.

---

## Part 1: Retail Insights Enhancements

### 2.1 Update Existing Retail Insights - Visitor Insights Tab

#### Current Implementation:
- Basic "Total Visitors (By Day)" chart
- Simple visitor count statistics
- No computer vision integration

#### Required Changes (2.1.1):

**Feature: Computer Vision Enhanced Passerby Analysis**

1. **Enable Computer Vision Toggle**
   - Add UI control to enable/disable Computer Vision on specific displays
   - Purpose: Enhance store passerby traffic analysis
   - Technical Integration: Connect to CV API/service for display-level control

2. **Enhanced Chart Data**
   - Add "Passerby Audience" data layer to existing "Total Visitor (by day)" Chart
   - Distinction:
     - **Visitors**: People who entered the store
     - **Passerby Audience**: People who passed by (detected via CV)

3. **Demographic Segmentation for Passersby**
   - Add interactive controls (icons/buttons) to toggle views:
     - **By Gender**: Show passerby data split by Male/Female
     - **By Age Range**: Show passerby data split by age brackets (18-24, 25-34, 35-44, 45-54, 55+)
   - Visual Implementation: Click icons to switch between:
     - Total Passerby View (default)
     - Gender-segmented View
     - Age Range-segmented View

**Data Requirements:**
```
- passerbyTotal: Total people detected passing by
- passerbyByGender: { male: count, female: count }
- passerbyByAge: { '18-24': count, '25-34': count, '35-44': count, '45-54': count, '55+': count }
- timestamp/date for time-series visualization
```

---

## Part 2: New Campaign Performance Tab

### 2.2 Campaign Performance Dashboard (New Tab in Retail Insights)

**Location:** Add as 4th tab in Retail Insights section  
**Tab Order:**
1. Visitor Insights
2. Store Insights
3. Upcoming Appointments
4. **Campaign Performance** ← NEW

---

### 2.2.1 Dashboard Filters (Top Section)

**Required Filter Controls:**

1. **Time Period Selector**
   - Dropdown/Date Range Picker
   - Options:
     - Today
     - Yesterday
     - Last 7 Days
     - Last 30 Days
     - Last 90 Days
     - Custom Range (date picker)
   - Default: Last 7 Days

2. **Brand/Advertiser Filter**
   - Dropdown (Multi-select capable)
   - Options: List of all brands/advertisers
   - Default: "All Brands/Advertisers"
   - Shows campaigns from selected brands only

3. **Store/Location Filter**
   - Dropdown (Multi-select capable)
   - Options: List of all stores/branches
   - Default: "All Stores"
   - Geographic-based filtering

4. **Campaign Filter**
   - Dropdown (Multi-select capable)
   - Options: List of all campaigns
   - Default: "All Campaigns"
   - Cascades from Brand filter (shows only campaigns for selected brands)

**Filter Behavior:**
- All filters work together (AND logic)
- Changing any filter updates ALL dashboard sections in real-time
- Display loading state during data refresh
- Show "No data available" when filters result in empty dataset

---

### 2.2.2 Summary Tiles (Key Metrics Cards)

**Layout:** 6 metric cards in responsive grid (3 columns on desktop, 2 on tablet, 1 on mobile)

**Metric Card 1: Total Passerby Audience**
```
Icon: Users/People icon
Label: Total Passerby Audience
Value: [formatted number] (e.g., 25,500)
Change: +12.5% vs last period
Subtitle: Detected by Computer Vision
Color Theme: Blue (#3b82f6)
```

**Metric Card 2: Total Campaign Playback Duration**
```
Icon: Clock/Timer icon
Label: Total Campaign Playback Duration
Value: [formatted time] (e.g., 19,990 hrs or 19,990:30:15)
Change: +8.3% vs last period
Subtitle: Cumulative across all displays
Color Theme: Green (#10b981)
```

**Metric Card 3: Total Campaign Playback Count**
```
Icon: Play/Refresh icon
Label: Total Campaign Playback Count
Value: [formatted number] (e.g., 11,975)
Change: +15.2% vs last period
Subtitle: Number of times campaign played
Color Theme: Orange (#f59e0b)
```

**Metric Card 4: Total Campaign Views**
```
Icon: Eye icon
Label: Total Campaign Views
Value: [formatted number] (e.g., 8,450)
Change: +18.7% vs last period
Subtitle: Confirmed views by passersby
Color Theme: Pink (#ec4899)
Calculation: Passersby who actually viewed the campaign
```

**Metric Card 5: Average View Duration**
```
Icon: Clock/Watch icon
Label: Average View Duration
Value: [seconds] (e.g., 3.8s)
Change: +0.4s vs last period
Subtitle: Per campaign view
Color Theme: Purple (#8b5cf6)
Calculation: Total view time / Total views
```

**Metric Card 6: Engagement Score**
```
Icon: Award/Star icon
Label: Engagement Score
Value: [score 0-100] (e.g., 85)
Change: +3pts vs last period
Subtitle: Excellent performance
Color Theme: Teal (#14b8a6)
Calculation: Weighted score based on views, duration, and interaction
```

**Data Requirements:**
```javascript
{
  totalPassersby: number,
  totalPlaybackDuration: number, // in seconds
  totalPlaybackCount: number,
  totalViews: number,
  averageViewDuration: number, // in seconds
  engagementScore: number, // 0-100
  changeVsPreviousPeriod: {
    passersby: percentage,
    playbackDuration: percentage,
    playbackCount: percentage,
    views: percentage,
    viewDuration: number, // absolute change in seconds
    engagementScore: number // absolute change in points
  }
}
```

---

### 2.2.3 Passerby Audience & Campaign Engagement Breakdown

**Section Title:** "Audience & Engagement Over Time"

**Chart Type:** Multi-line Time Series Chart or Stacked Area Chart

**Time Granularity:**
- **By Hour**: When date range ≤ 3 days
- **By Day**: When date range > 3 days

**Data Series (All on same chart):**
1. Total Passerby Audience (Blue line)
2. Total Campaign Playback Duration (Green line/area)
3. Total Campaign Playback Count (Orange line)
4. Total Campaign Views (Pink line)
5. Total Campaign Engagement Score (Purple line)

**Interactive Features:**

1. **Legend Controls**
   - Click to show/hide individual data series
   - Hover to highlight specific series

2. **Gender & Age Range Filter**
   - Toggle buttons above chart:
     - [ All ] [ Male ] [ Female ]
     - [ All Ages ] [ 18-24 ] [ 25-34 ] [ 35-44 ] [ 45-54 ] [ 55+ ]
   - Filters apply to ALL metrics shown in chart
   - Multiple selections allowed (checkbox-style)

3. **Tooltip on Hover**
   - Shows all values for selected time point
   - Formatted with proper units (count, duration, score)

**Chart Features:**
- Responsive and full-width
- Zoom/pan capabilities for large datasets
- Export to PNG/CSV functionality
- Y-axis scales automatically or allows manual range

**Data Requirements:**
```javascript
{
  timeSeriesData: [
    {
      timestamp: ISO8601,
      hourOrDay: string,
      passerbyTotal: number,
      passerbyByGender: { male: number, female: number },
      passerbyByAge: { '18-24': number, '25-34': number, ... },
      playbackDuration: number,
      playbackCount: number,
      views: number,
      viewsByGender: { male: number, female: number },
      viewsByAge: { '18-24': number, '25-34': number, ... },
      engagementScore: number
    },
    // ... more time points
  ]
}
```

---

### 2.2.4 Campaign Performance by Display Type

**Section Title:** "Performance by Display Type"

**Layout:** Data Table with sortable columns

**Table Columns:**

1. **Display Type** (Column 1)
   - Type name (e.g., "Store Entrance Display", "Mall Corridor Display")
   - Status indicator (Active/Inactive)
   - Icon representing display type

2. **Status** (Column 2)
   - Badge showing "Active" or "Inactive"
   - Color-coded (Green = Active, Gray = Inactive)
   - Count of displays of this type

3. **Total Passerby Audience** (Column 3)
   - Formatted number
   - Sortable
   - Percentage of total in parentheses

4. **Total Playback Duration** (Column 4)
   - Formatted time (HH:MM:SS or hours)
   - Sortable
   - Percentage of total in parentheses

5. **Total Playback Count** (Column 5)
   - Formatted number
   - Sortable
   - Percentage of total in parentheses

6. **Total Views** (Column 6)
   - Formatted number
   - View rate percentage (views/passersby)
   - Sortable

7. **Engagement Score** (Column 7)
   - Score 0-100
   - Visual indicator bar
   - Color-coded (Red < 50, Yellow 50-75, Green > 75)
   - Sortable

**Features:**
- Sort by any column (ascending/descending)
- Default sort: By Total Passerby Audience (descending)
- Pagination if > 10 display types
- Export to CSV functionality
- Row click to drill down to display-specific details

**Visual Enhancements:**
- Mini sparkline charts in columns to show trends
- Color-coded performance indicators
- Highlight top 3 performers with subtle background

**Data Requirements:**
```javascript
{
  displayTypePerformance: [
    {
      displayType: string,
      displayTypeId: string,
      status: 'active' | 'inactive',
      activeDisplayCount: number,
      totalPassersby: number,
      totalPlaybackDuration: number,
      totalPlaybackCount: number,
      totalViews: number,
      engagementScore: number,
      trend: 'up' | 'down' | 'stable'
    },
    // ... more display types
  ]
}
```

---

### 2.2.5 Campaign Performance by State/Location

**Section Title:** "Performance by Geographic Location"

**Layout:** Split View - Map + Data Table

#### Left Side: Interactive Map

**Map Features:**
1. **Geographic Visualization**
   - Pin/marker for each store location (Lat/Long)
   - Marker size proportional to passerby audience or engagement score
   - Color-coded by performance level:
     - Green: High performance (score > 75)
     - Yellow: Medium performance (score 50-75)
     - Red: Low performance (score < 50)

2. **Interactive Elements**
   - Click marker to highlight in table
   - Hover to show quick stats tooltip
   - Zoom/pan controls
   - Clustering for nearby locations

3. **State-Level Aggregation Toggle**
   - Switch between:
     - Individual store view (default)
     - State/region aggregated view

#### Right Side: Location Performance Table

**Table Columns:**

1. **State/Location** (Column 1)
   - State name or Store name (depending on view mode)
   - City/address subtitle
   - Store count in parentheses (for state view)

2. **Total Passerby Audience** (Column 2)
   - Formatted number
   - Trend indicator (↑↓→)
   - Sortable

3. **Total Playback Duration** (Column 3)
   - Formatted time
   - Sortable

4. **Total Playback Count** (Column 4)
   - Formatted number
   - Sortable

5. **Total Views** (Column 5)
   - Formatted number
   - View rate percentage
   - Sortable

6. **Engagement Score** (Column 6)
   - Score with visual bar
   - Color-coded
   - Sortable

**Features:**
- Click row to center map on location
- Sort by any column
- Search/filter by location name
- Export data
- Drill down from state to individual stores

**Data Requirements:**
```javascript
{
  locationPerformance: [
    {
      storeId: string,
      storeName: string,
      state: string,
      city: string,
      latitude: number,
      longitude: number,
      totalPassersby: number,
      totalPlaybackDuration: number,
      totalPlaybackCount: number,
      totalViews: number,
      engagementScore: number,
      trend: 'up' | 'down' | 'stable',
      changeVsPrevious: number // percentage
    },
    // ... more locations
  ],
  stateAggregation: [
    {
      state: string,
      storeCount: number,
      totalPassersby: number,
      totalPlaybackDuration: number,
      totalPlaybackCount: number,
      totalViews: number,
      avgEngagementScore: number
    },
    // ... more states
  ]
}
```

---

## Implementation Priority & Phasing

### Phase 1: Foundation (Week 1)
1. Add "Campaign Performance" tab to Retail Insights
2. Implement all 4 filter controls (Time Period, Brand/Advertiser, Store, Campaign)
3. Create 6 summary metric cards with mock data
4. Set up data flow architecture

### Phase 2: Core Visualizations (Week 2)
1. Implement time-series chart (2.2.3) with all data series
2. Add gender and age range filters for chart
3. Create display type performance table (2.2.4)
4. Implement sorting and basic interactions

### Phase 3: Geographic Features (Week 3)
1. Integrate map component (2.2.5)
2. Implement location performance table
3. Add map-table interaction synchronization
4. Implement state-level aggregation

### Phase 4: Enhanced Visitor Insights (Week 4)
1. Add Computer Vision toggle to Visitor Insights tab (2.1.1)
2. Enhance "Total Visitors" chart with passerby data
3. Add gender/age segmentation controls
4. Integrate CV data API

### Phase 5: Polish & Optimization (Week 5)
1. Performance optimization for large datasets
2. Add export functionality across all sections
3. Implement real-time data refresh
4. User acceptance testing and refinements

---

## Key Definitions & Metrics

### Passerby Audience
**Definition:** Total number of people detected passing by display locations, captured through computer vision technology.  
**Measurement:** Automated counting via CV cameras  
**Purpose:** Understand total potential audience exposure

### Campaign Playback Duration
**Definition:** Total cumulative time campaigns were displayed/played across all displays.  
**Unit:** Hours:Minutes:Seconds or total hours  
**Calculation:** Sum of (playback duration × playback count) for all displays

### Campaign Playback Count
**Definition:** Number of times a campaign was played/displayed.  
**Count Trigger:** Each complete play-through of campaign content  
**Note:** Multiple playbacks to same person counted separately

### Campaign Views
**Definition:** Number of confirmed views by passersby, where a "view" requires:
- Person detected in viewing zone (via CV)
- Minimum dwell time threshold met (e.g., ≥ 2 seconds looking at display)
- Face/attention direction confirms viewing

**Relationship:** Views ≤ Passersby (not everyone who passes by will view)

### View Duration
**Definition:** Length of time a person actively viewed the campaign content.  
**Measurement:** From first attention detection to last attention detection  
**Average View Duration:** Total view time / Total view count

### Engagement Score
**Definition:** Composite score (0-100) measuring campaign effectiveness.  
**Formula Components:**
- View Rate: (Views / Passersby) × 30 points
- Average View Duration normalized to 10s = 30 points
- Interaction/Action Rate × 40 points (if applicable)

**Interpretation:**
- 0-40: Poor performance
- 41-60: Below average
- 61-75: Good performance
- 76-90: Excellent performance
- 91-100: Outstanding performance

### ROTS (Realistic Opportunity To See)
**Definition:** Number of passersby in position to see display, considering viewability factors (angle, distance, obstructions).  
**Calculation:** Passersby × Viewability Factor (e.g., 0.85)

### VAC (Viewable Attention Contact)
**Definition:** Subset of ROTS where attention was actually directed toward display.  
**Measurement:** CV detection of face/gaze direction  
**Calculation:** Based on viewing angle thresholds and attention duration

---

## Technical Considerations

### Data Sources Required
1. **Computer Vision API**
   - Real-time passerby detection
   - Gender/age classification
   - Attention/gaze tracking
   - Dwell time measurement

2. **Campaign Management System**
   - Campaign metadata (name, brand, duration, content)
   - Playback logs (when, where, how long)
   - Display assignments

3. **Display Management System**
   - Display metadata (type, location, lat/long, status)
   - Store/location information
   - Display groupings and hierarchies

4. **Analytics Database**
   - Aggregated metrics storage
   - Time-series data
   - Historical comparisons

### Performance Requirements
- Dashboard load time: < 3 seconds
- Filter application: < 1 second
- Support 90 days of hourly data
- Handle 100+ concurrent users

### Browser Compatibility
- Modern browsers (Chrome, Firefox, Safari, Edge)
- Responsive design (mobile, tablet, desktop)
- Graceful degradation for older browsers

---

## Success Criteria

### Functional Requirements Met
✅ All 4 filter controls working correctly  
✅ All 6 summary metrics displaying accurately  
✅ Time-series chart with all data series  
✅ Gender/age filtering operational  
✅ Display type performance table complete  
✅ Geographic map and table functioning  
✅ Computer Vision integration in Visitor Insights  

### User Acceptance Criteria
✅ Dashboard loads within 3 seconds  
✅ Filters update all sections in real-time  
✅ Data exports work correctly  
✅ Mobile responsive design  
✅ No console errors  
✅ Boss approves final implementation  

### Business Value Delivered
✅ Complete visibility into campaign performance  
✅ Ability to optimize by location and display type  
✅ Data-driven decision making for campaign planning  
✅ ROI measurement for campaigns  
✅ Enhanced understanding of audience behavior  

---

## Appendix: Comparison with Current Implementation

### What to REMOVE from Current Implementation:
❌ Standalone "Campaign Effectiveness Dashboard"  
❌ Current Campaign Performance metrics (not aligned with requirements)  
❌ Audience Demographics tab (merge into Campaign Performance filters)  
❌ Display Analytics tab (consolidated into Display Type section)  
❌ Metric cards showing ROTS, VAC (still used but not primary KPIs)

### What to KEEP:
✅ General layout structure and design system  
✅ Recharts visualization library  
✅ Filter pattern and UI components  
✅ Mock data generation approach  
✅ Responsive grid system  

### What to ADD:
➕ New Campaign Performance tab in Retail Insights  
➕ 4 comprehensive filter controls  
➕ 6 new metric cards (passerby, playback, views, duration, engagement)  
➕ Time-series engagement breakdown chart  
➕ Display type performance table  
➕ Geographic map visualization  
➕ Location performance table  
➕ Computer Vision integration in Visitor Insights  
➕ Gender/age segmentation controls  

---

## Questions for Clarification

1. **Computer Vision Integration:**
   - What CV platform/API will be used?
   - Is CV already deployed, or part of this project?
   - What data format does CV system provide?

2. **Data Availability:**
   - Is historical campaign data available for last 90 days?
   - Real-time data feed or batch updates?
   - Data refresh frequency requirements?

3. **Brand/Advertiser:**
   - Is this multi-tenant (multiple brands per account)?
   - Permission model for cross-brand data visibility?

4. **Geographic Scope:**
   - How many states/locations?
   - International locations or domestic only?
   - Map provider preference (Google Maps, Mapbox, etc.)?

5. **Export Functionality:**
   - Required export formats (CSV, PDF, Excel)?
   - Export all data or filtered view only?
   - Scheduled exports needed?

---

## Conclusion

The boss's feedback represents a **significant pivot** from the current implementation to a more comprehensive, business-aligned Campaign Performance Dashboard. The key changes are:

1. **Integration into Retail Insights** rather than standalone dashboard
2. **Focus on Passerby Audience and Computer Vision data** as primary metrics
3. **Campaign-centric metrics** (playback duration, count, views) vs. generic analytics
4. **Enhanced filtering** by brand, store, and campaign
5. **Geographic performance visualization** for location-based optimization
6. **Display type segmentation** for hardware/placement optimization

This represents approximately **4-5 weeks of development work** with proper phasing and requires integration with computer vision systems and campaign management platforms.

**Next Steps:**
1. Get clarification on technical questions above
2. Create detailed wireframes for boss approval
3. Set up development environment with required APIs
4. Begin Phase 1 implementation

---

**Document Version:** 1.0  
**Last Updated:** January 14, 2026  
**Author:** Development Team  
**Review Status:** Pending Boss Approval

