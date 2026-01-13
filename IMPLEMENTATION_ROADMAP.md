# Campaign Performance Dashboard - Implementation Roadmap

**Project:** Analytics Dashboard Enhancement  
**Based On:** Boss Feedback - January 14, 2026  
**Reference:** BOSS_FEEDBACK_ANALYSIS.md

---

## 🎯 Overview

Transform the analytics dashboard based on boss feedback to create a comprehensive Campaign Performance system integrated into Retail Insights with Computer Vision capabilities.

---

## 📊 Current State vs. Required State

### Current State ❌
```
Dashboard Structure:
├── Campaigns
├── Displays & Devices
├── Stores / Branches
└── Retail Insights
    ├── Visitor Insights (basic)
    ├── Store Insights
    └── Upcoming Appointments

Separate: Campaign Effectiveness Dashboard (standalone)
```

### Required State ✅
```
Dashboard Structure:
├── Campaigns
├── Displays & Devices
├── Stores / Branches
└── Retail Insights
    ├── Visitor Insights (enhanced with CV + passerby data)
    ├── Store Insights
    ├── Upcoming Appointments
    └── Campaign Performance (NEW - comprehensive dashboard)
```

---

## 🏗️ Architecture: Campaign Performance Tab

```
┌─────────────────────────────────────────────────────────────────┐
│                     CAMPAIGN PERFORMANCE TAB                     │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │ FILTERS (Sticky Header)                                   │  │
│  │ [Time Period ▼] [Brand/Advertiser ▼] [Store ▼] [Campaign ▼] │
│  └──────────────────────────────────────────────────────────┘  │
│                                                                  │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │ SUMMARY METRICS (6 Cards)                                 │  │
│  │ ┌──────┐ ┌──────┐ ┌──────┐ ┌──────┐ ┌──────┐ ┌──────┐  │  │
│  │ │Passer││Playback││Playback││Campaign││Avg View││Engage││  │  │
│  │ │  by  ││Duration││ Count  ││ Views  ││Duration││Score ││  │  │
│  │ │25,500││19,990h ││11,975  ││ 8,450  ││  3.8s  ││  85  ││  │  │
│  │ └──────┘ └──────┘ └──────┘ └──────┘ └──────┘ └──────┘  │  │
│  └──────────────────────────────────────────────────────────┘  │
│                                                                  │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │ ENGAGEMENT OVER TIME (Multi-line Chart)                   │  │
│  │ Filters: [All/Male/Female] [All Ages / 18-24 / 25-34...] │  │
│  │                                                            │  │
│  │      ┌─────────────────────────────────────────┐         │  │
│  │  200 │     ╱╲    ╱╲         ╱╲                 │         │  │
│  │  150 │   ╱    ╲╱    ╲     ╱    ╲    ╱╲        │         │  │
│  │  100 │ ╱              ╲ ╱        ╲╱    ╲      │         │  │
│  │   50 │                 ╲                 ╲    │         │  │
│  │    0 └─────────────────────────────────────────┘         │  │
│  │       Mon   Tue   Wed   Thu   Fri   Sat   Sun           │  │
│  │                                                            │  │
│  │  Legend: — Passersby — Playback — Views — Engagement     │  │
│  └──────────────────────────────────────────────────────────┘  │
│                                                                  │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │ PERFORMANCE BY DISPLAY TYPE (Table)                       │  │
│  │ ┌──────────────┬────────┬──────────┬──────────┬────────┐ │  │
│  │ │ Display Type │ Status │ Passerby │ Playback │ Engage │ │  │
│  │ ├──────────────┼────────┼──────────┼──────────┼────────┤ │  │
│  │ │ Entrance     │ Active │  5,420   │ 4h 30m   │  87    │ │  │
│  │ │ Mall Corridor│ Active │  3,820   │ 3h 15m   │  92    │ │  │
│  │ │ Checkout     │ Active │  2,180   │ 2h 45m   │  85    │ │  │
│  │ └──────────────┴────────┴──────────┴──────────┴────────┘ │  │
│  └──────────────────────────────────────────────────────────┘  │
│                                                                  │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │ PERFORMANCE BY LOCATION (Map + Table)                     │  │
│  │ ┌─────────────────┐ ┌────────────────────────────────┐  │  │
│  │ │                 │ │ State    Passerby  Engagement  │  │  │
│  │ │   🗺️ MAP       │ │ ───────────────────────────────  │  │
│  │ │                 │ │ CA        12,500      87       │  │  │
│  │ │   📍 Stores     │ │ NY         9,800      82       │  │  │
│  │ │                 │ │ TX         7,200      79       │  │  │
│  │ │                 │ │                                 │  │  │
│  │ └─────────────────┘ └────────────────────────────────┘  │  │
│  └──────────────────────────────────────────────────────────┘  │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘
```

---

## 🔄 Data Flow Architecture

```
┌─────────────────────┐
│  Computer Vision    │
│      System         │ ← Passerby detection, gender/age, gaze tracking
└──────────┬──────────┘
           │
           ▼
┌─────────────────────┐
│  Campaign Mgmt      │
│      System         │ ← Campaign metadata, playback logs
└──────────┬──────────┘
           │
           ▼
┌─────────────────────┐
│  Analytics API      │ ← Aggregation & processing
└──────────┬──────────┘
           │
           ▼
┌─────────────────────┐
│  React Dashboard    │ ← Visualization & interaction
│  (Frontend)         │
└─────────────────────┘
```

---

## 📋 Implementation Checklist

### Phase 1: Foundation ⏱️ Week 1
- [ ] Create new "Campaign Performance" tab in Retail Insights
- [ ] Implement Time Period filter (dropdown with preset ranges + custom)
- [ ] Implement Brand/Advertiser filter (multi-select dropdown)
- [ ] Implement Store/Location filter (multi-select dropdown)
- [ ] Implement Campaign filter (cascading from Brand filter)
- [ ] Create filter state management (React hooks/context)
- [ ] Build filter-to-API query mapper
- [ ] Test filter combinations and edge cases

### Phase 2: Summary Metrics ⏱️ Week 1-2
- [ ] Design metric card component (reusable)
- [ ] Implement 6 metric cards:
  - [ ] Total Passerby Audience
  - [ ] Total Campaign Playback Duration
  - [ ] Total Campaign Playback Count
  - [ ] Total Campaign Views
  - [ ] Average View Duration
  - [ ] Engagement Score
- [ ] Add "vs. last period" comparison logic
- [ ] Implement loading states for metrics
- [ ] Create mock data generator for metrics
- [ ] Style with color coding and icons

### Phase 3: Time-Series Chart ⏱️ Week 2
- [ ] Build time-series chart component (Recharts)
- [ ] Implement 5 data series:
  - [ ] Passerby Audience line
  - [ ] Playback Duration line
  - [ ] Playback Count line
  - [ ] Campaign Views line
  - [ ] Engagement Score line
- [ ] Add legend with show/hide toggle
- [ ] Implement Gender filter buttons (All/Male/Female)
- [ ] Implement Age Range filter buttons
- [ ] Add hover tooltips with all metrics
- [ ] Implement responsive scaling
- [ ] Add zoom/pan functionality (optional)
- [ ] Test with hourly vs daily granularity

### Phase 4: Display Type Performance ⏱️ Week 2-3
- [ ] Create sortable data table component
- [ ] Implement 7 columns:
  - [ ] Display Type (with icon)
  - [ ] Status (badge)
  - [ ] Total Passerby Audience
  - [ ] Total Playback Duration
  - [ ] Total Playback Count
  - [ ] Total Views
  - [ ] Engagement Score (with visual bar)
- [ ] Add sorting functionality (click headers)
- [ ] Implement color-coded performance indicators
- [ ] Add percentage calculations
- [ ] Create row hover effects
- [ ] Add pagination (if > 10 rows)
- [ ] Implement CSV export

### Phase 5: Geographic Visualization ⏱️ Week 3
- [ ] Select and integrate map library (Mapbox/Google Maps/Leaflet)
- [ ] Implement interactive map component
- [ ] Plot store locations as markers (lat/long)
- [ ] Size markers by passerby audience
- [ ] Color markers by engagement score
- [ ] Add marker clustering for nearby stores
- [ ] Implement marker click → highlight table row
- [ ] Add map controls (zoom, pan, reset)
- [ ] Build location performance table
- [ ] Implement state-level aggregation toggle
- [ ] Sync map ↔ table selection
- [ ] Add search/filter for locations

### Phase 6: Visitor Insights Enhancement ⏱️ Week 4
- [ ] Navigate to existing Visitor Insights tab
- [ ] Add "Enable Computer Vision" toggle UI
- [ ] Update "Total Visitors (By Day)" chart to include passerby data
- [ ] Add new data layer for passerby audience
- [ ] Implement Gender segmentation toggle
- [ ] Implement Age Range segmentation toggle
- [ ] Update chart legend and colors
- [ ] Add tooltips with segmented data
- [ ] Create mock CV data generator
- [ ] Test toggle interactions

### Phase 7: Data Integration ⏱️ Week 4-5
- [ ] Define API endpoints for all data requirements
- [ ] Create API service layer (fetch functions)
- [ ] Implement data transformers (API → component format)
- [ ] Add error handling for API calls
- [ ] Implement loading states across dashboard
- [ ] Add retry logic for failed requests
- [ ] Create data caching strategy
- [ ] Test with real API endpoints
- [ ] Performance optimization for large datasets

### Phase 8: Polish & Testing ⏱️ Week 5
- [ ] Responsive design testing (mobile, tablet, desktop)
- [ ] Cross-browser testing (Chrome, Firefox, Safari, Edge)
- [ ] Performance optimization (lazy loading, code splitting)
- [ ] Add export functionality (CSV, PNG)
- [ ] Implement auto-refresh option
- [ ] Add "No data available" states
- [ ] Error boundary implementation
- [ ] Accessibility audit (WCAG compliance)
- [ ] User acceptance testing with stakeholders
- [ ] Documentation for users
- [ ] Boss demo and approval

---

## 🎨 Design System Reference

### Colors
```
Primary Blue:    #3b82f6  (Passerby metrics)
Success Green:   #10b981  (Playback duration)
Warning Orange:  #f59e0b  (Playback count)
Pink:            #ec4899  (Views)
Purple:          #8b5cf6  (View duration)
Teal:            #14b8a6  (Engagement score)

Status Colors:
Active Green:    #22c55e
Inactive Gray:   #94a3b8
High Performance: #059669
Medium Performance: #f59e0b
Low Performance: #dc2626
```

### Typography
```
Headers: System font stack
Body: System font stack
Monospace: For time/duration values
```

### Spacing
```
Card Padding: 24px
Grid Gap: 16px
Section Margin: 32px
```

---

## 📊 Key Metrics Formulas

### Engagement Score Calculation
```javascript
const calculateEngagementScore = (data) => {
  const viewRate = (data.views / data.passersby) * 100;
  const normalizedDuration = Math.min(data.avgViewDuration / 10, 1) * 100;
  const interactionRate = (data.interactions / data.views) * 100;
  
  const score = (
    (viewRate * 0.3) +           // 30% weight
    (normalizedDuration * 0.3) + // 30% weight
    (interactionRate * 0.4)      // 40% weight
  );
  
  return Math.round(Math.min(score, 100));
};
```

### View Rate
```javascript
const viewRate = (views / passersby) * 100;
```

### Average View Duration
```javascript
const avgViewDuration = totalViewTime / totalViews;
```

---

## 🔌 API Endpoints (To Be Defined)

### Campaign Performance Summary
```
GET /api/retail-insights/campaign-performance/summary
Query Params: dateRange, brandId, storeId, campaignId
Response: { totalPassersby, totalPlaybackDuration, ... }
```

### Time Series Data
```
GET /api/retail-insights/campaign-performance/time-series
Query Params: dateRange, granularity, gender, ageRange, ...
Response: [{ timestamp, passersby, playback, views, ... }]
```

### Display Type Performance
```
GET /api/retail-insights/campaign-performance/by-display-type
Query Params: dateRange, ...
Response: [{ displayType, passersby, playback, engagement, ... }]
```

### Location Performance
```
GET /api/retail-insights/campaign-performance/by-location
Query Params: dateRange, aggregateByState, ...
Response: [{ storeId, lat, long, passersby, engagement, ... }]
```

### Visitor Insights with Passerby
```
GET /api/retail-insights/visitor-insights
Query Params: dateRange, includePasserby, segmentBy
Response: [{ date, visitors, passersby, demographics, ... }]
```

---

## 🧪 Testing Strategy

### Unit Tests
- [ ] Filter logic (all combinations)
- [ ] Metric calculations
- [ ] Data transformers
- [ ] Utility functions

### Integration Tests
- [ ] Filter → API → Display pipeline
- [ ] Chart interactions
- [ ] Table sorting/pagination
- [ ] Map-table synchronization

### E2E Tests
- [ ] Complete user flow (select filters → view all sections)
- [ ] Export functionality
- [ ] Responsive behavior
- [ ] Error scenarios

---

## 🚀 Deployment Checklist

### Pre-Deployment
- [ ] All features implemented and tested
- [ ] Boss approval received
- [ ] API endpoints confirmed available
- [ ] Performance benchmarks met
- [ ] Documentation complete

### Deployment
- [ ] Build production bundle
- [ ] Environment variables configured
- [ ] Deploy to staging
- [ ] Smoke testing on staging
- [ ] Deploy to production
- [ ] Monitor for errors

### Post-Deployment
- [ ] User training/demo
- [ ] Collect feedback
- [ ] Monitor performance metrics
- [ ] Plan for iteration/improvements

---

## 📈 Success Metrics

### Technical KPIs
- Dashboard load time: < 3 seconds ✅
- Filter update time: < 1 second ✅
- API response time: < 2 seconds ✅
- Zero critical bugs ✅

### Business KPIs
- 100% feature requirements met ✅
- Boss approval obtained ✅
- User satisfaction > 80% ✅
- Daily active users > 50 ✅

---

## 🆘 Risk Mitigation

### Risk: CV System Not Ready
**Mitigation:** Use mock data initially, design for easy API swap

### Risk: Map Library Performance Issues
**Mitigation:** Implement marker clustering, lazy loading

### Risk: Large Dataset Performance
**Mitigation:** Server-side pagination, data aggregation, caching

### Risk: Complex Filter Logic
**Mitigation:** Thorough testing, clear state management, user feedback

---

## 📞 Stakeholder Communication

### Weekly Status Updates
- Progress on checklist items
- Blockers and risks
- Demos of completed features
- Adjusted timelines if needed

### Boss Review Points
- End of Phase 2: Metric cards review
- End of Phase 3: Chart and filtering review
- End of Phase 5: Complete dashboard walkthrough
- End of Phase 8: Final approval and go-live

---

## 📚 Reference Documents

1. **BOSS_FEEDBACK_ANALYSIS.md** - Detailed requirements analysis
2. **METRICS_DOCUMENTATION.md** - Metric definitions (if exists)
3. **API_DOCUMENTATION.md** - API specs (to be created)
4. **DESIGN_SYSTEM.md** - UI/UX guidelines (to be created)

---

**Last Updated:** January 14, 2026  
**Status:** Ready for Implementation  
**Estimated Completion:** 5 weeks from start date

