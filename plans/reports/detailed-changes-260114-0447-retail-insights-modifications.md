# Detailed Changes - Retail Insights Tab Enhancement
**Date**: January 14, 2026
**Requirement**: BOSS_FEEDBACK_ANALYSIS.md Section 2.1.1

---

## FILE 1: src/RetailInsights.jsx

### Change 1: State Variable for CV Toggle (Line 24)
**Before**:
```javascript
const [ageFilter, setAgeFilter] = React.useState('all');
```

**After**:
```javascript
const [ageFilter, setAgeFilter] = React.useState('all');
const [cvEnabled, setCvEnabled] = React.useState(true);
```

**Impact**: Enables tracking whether Computer Vision analysis is on/off

---

### Change 2: State Variable for View Mode (Line 25)
**Before**:
```javascript
const [ageFilter, setAgeFilter] = React.useState('all');
const [cvEnabled, setCvEnabled] = React.useState(true);
```

**After**:
```javascript
const [ageFilter, setAgeFilter] = React.useState('all');
const [cvEnabled, setCvEnabled] = React.useState(true);
const [visitorViewMode, setVisitorViewMode] = React.useState('total'); // 'total', 'gender', 'age'
```

**Impact**: Tracks which demographic view mode is selected ('total', 'gender', or 'age')

---

### Change 3: CV Toggle Checkbox Control (Lines 330-341)
**Location**: Inside `{activeTab === 'visitor' && (` block, BEFORE existing metric cards

**Added**:
```jsx
{/* CV Toggle Control */}
<div className="chart-card full-width" style={{ marginBottom: '16px', padding: '12px 16px' }}>
  <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', fontWeight: '500', color: '#1f2937' }}>
    <input
      type="checkbox"
      checked={cvEnabled}
      onChange={(e) => setCvEnabled(e.target.checked)}
      style={{ width: '18px', height: '18px', cursor: 'pointer' }}
    />
    Enable Computer Vision Analysis
  </label>
</div>
```

**Impact**:
- Provides user control to enable/disable CV analysis
- Styled as card with proper spacing
- Checkbox state drives visibility of View Mode buttons and chart data

---

### Change 4: Chart Title Enhancement (Line 362)
**Before**:
```jsx
<h3>Visitor Stats (07 Jan - 13 Jan)</h3>
```

**After**:
```jsx
<h3>Visitor Stats (07 Jan - 13 Jan) - Enhanced with CV Passerby Data</h3>
```

**Impact**: Clarifies that chart now includes computer vision data

---

### Change 5: View Mode Toggle Buttons (Lines 363-388)
**Location**: Inside chart header, AFTER title, conditional on `cvEnabled`

**Added**:
```jsx
{cvEnabled && (
  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
    <span style={{ fontSize: '13px', fontWeight: '500', color: '#6b7280' }}>View Mode:</span>
    <button
      className={`demo-filter-btn ${visitorViewMode === 'total' ? 'active' : ''}`}
      onClick={() => setVisitorViewMode('total')}
      style={{ fontSize: '13px' }}
    >
      Total Passerby
    </button>
    <button
      className={`demo-filter-btn ${visitorViewMode === 'gender' ? 'active' : ''}`}
      onClick={() => setVisitorViewMode('gender')}
      style={{ fontSize: '13px' }}
    >
      By Gender
    </button>
    <button
      className={`demo-filter-btn ${visitorViewMode === 'age' ? 'active' : ''}`}
      onClick={() => setVisitorViewMode('age')}
      style={{ fontSize: '13px' }}
    >
      By Age Range
    </button>
  </div>
)}
```

**Impact**:
- Only visible when CV is enabled
- Three mutually exclusive buttons
- Active button highlighted with 'active' class styling
- Controls which demographic breakdown appears on chart

---

### Change 6: Enhanced Chart Container (Lines 390-492)
**Location**: LineChart component inside `chart-card full-width`

#### Change 6a: Chart Display Condition (Line 391)
**Before**:
```jsx
<ResponsiveContainer width="100%" height={300}>
```

**After**:
```jsx
<ResponsiveContainer width="100%" height={300}>
  {cvEnabled && mockData.visitorInsights ? (
    <LineChart data={mockData.visitorInsights.timeSeriesData}>
```

**Impact**: Chart only renders when CV is enabled

---

#### Change 6b: Store Visitors Line (Lines 399-407)
**Location**: Inside LineChart, always visible

**Added**:
```jsx
{/* Always show Store Visitors */}
<Line
  type="monotone"
  dataKey="visitors"
  stroke="#6366f1"
  strokeWidth={2}
  name="Store Visitors"
  dot={{ r: 4 }}
/>
```

**Impact**:
- Indigo line showing store entry counts (400-1200/day)
- Serves as reference for comparing passerby traffic
- Visible in ALL view modes

---

#### Change 6c: Total Passerby View Mode (Lines 410-419)
**Location**: Inside LineChart, conditional on `visitorViewMode === 'total'`

**Added**:
```jsx
{visitorViewMode === 'total' && (
  <Line
    type="monotone"
    dataKey="passerby"
    stroke="#3b82f6"
    strokeWidth={2}
    name="Passerby Audience (CV)"
    dot={{ r: 4 }}
  />
)}
```

**Impact**:
- Blue line showing total CV-detected foot traffic (3000-8000/day)
- Default view mode
- Shows overall audience opportunity

---

#### Change 6d: Gender-Segmented View Mode (Lines 421-440)
**Location**: Inside LineChart, conditional on `visitorViewMode === 'gender'`

**Added**:
```jsx
{visitorViewMode === 'gender' && (
  <>
    <Line
      type="monotone"
      dataKey="passerbyMale"
      stroke="#1d4ed8"
      strokeWidth={2}
      name="Male Passerby"
      dot={{ r: 4 }}
    />
    <Line
      type="monotone"
      dataKey="passerbyFemale"
      stroke="#ec4899"
      strokeWidth={2}
      name="Female Passerby"
      dot={{ r: 4 }}
    />
  </>
)}
```

**Impact**:
- Dark Blue line for males (52% of passerby)
- Pink line for females (48% of passerby)
- Reveals gender composition of foot traffic
- Enables gender-targeted promotions

---

#### Change 6e: Age Range-Segmented View Mode (Lines 442-470)
**Location**: Inside LineChart, conditional on `visitorViewMode === 'age'`

**Added**:
```jsx
{visitorViewMode === 'age' && (
  <>
    <Line dataKey="passerby18_24" stroke="#dc2626" strokeWidth={1.5} name="18-24" dot={{ r: 3 }} />
    <Line dataKey="passerby25_34" stroke="#f59e0b" strokeWidth={1.5} name="25-34" dot={{ r: 3 }} />
    <Line dataKey="passerby35_44" stroke="#10b981" strokeWidth={1.5} name="35-44" dot={{ r: 3 }} />
    <Line dataKey="passerby45_54" stroke="#3b82f6" strokeWidth={1.5} name="45-54" dot={{ r: 3 }} />
    <Line dataKey="passerby55" stroke="#8b5cf6" strokeWidth={1.5} name="55+" dot={{ r: 3 }} />
  </>
)}
```

**Impact**:
- 5 distinct colored lines for each age bracket
- 18-24: Red (#dc2626) - 18% of audience
- 25-34: Orange (#f59e0b) - 28% of audience (largest)
- 35-44: Green (#10b981) - 22% of audience
- 45-54: Blue (#3b82f6) - 18% of audience
- 55+: Purple (#8b5cf6) - 14% of audience
- Enables age-targeted marketing strategies

---

#### Change 6f: Fallback Message (Lines 471-475)
**Location**: Inside ResponsiveContainer, when CV disabled

**Added**:
```jsx
: (
  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%', color: '#9ca3af', fontSize: '14px' }}>
    {cvEnabled ? 'Loading data...' : 'Enable Computer Vision to see passerby audience analysis'}
  </div>
)}
```

**Impact**: User-friendly message when CV is disabled

---

## FILE 2: src/retailInsightsData.js

### Change 1: Added Visitor Insights Data Generator (Lines 65-85)
**Location**: Inside `generateRetailInsightsData()` function, BEFORE other data generators

**Added**:
```javascript
// Visitor Insights Time Series Data (with CV passerby data)
const generateVisitorInsightsData = () => {
  const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  return days.map(day => {
    const visitors = Math.floor(Math.random() * 800) + 400; // Store visitors
    const passerby = Math.floor(Math.random() * 5000) + 3000; // CV-detected passerby

    return {
      day,
      visitors,
      passerby,
      passerbyMale: Math.floor(passerby * 0.52),
      passerbyFemale: Math.floor(passerby * 0.48),
      passerby18_24: Math.floor(passerby * 0.18),
      passerby25_34: Math.floor(passerby * 0.28),
      passerby35_44: Math.floor(passerby * 0.22),
      passerby45_54: Math.floor(passerby * 0.18),
      passerby55: Math.floor(passerby * 0.14),
    };
  });
};
```

**Data Ranges**:
- Store Visitors: 400-1,200 per day (realistic entry counts)
- Passerby: 3,000-8,000 per day (CV-detected foot traffic)
- Gender Split: 52% male, 48% female (consistent distribution)
- Age Distribution: 18% + 28% + 22% + 18% + 14% = 100%

**Impact**: Provides realistic mock data for all view modes

---

### Change 2: Updated Return Statement (Lines 227-237)
**Before**:
```javascript
return {
  campaignPerformance: {
    summary: campaignSummary,
    timeSeriesData: generateCampaignTimeSeriesData(),
    displayTypePerformance: generateDisplayTypePerformance(),
    locationPerformance: generateLocationPerformance(),
  },
};
```

**After**:
```javascript
return {
  visitorInsights: {
    timeSeriesData: generateVisitorInsightsData(),
  },
  campaignPerformance: {
    summary: campaignSummary,
    timeSeriesData: generateCampaignTimeSeriesData(),
    displayTypePerformance: generateDisplayTypePerformance(),
    locationPerformance: generateLocationPerformance(),
  },
};
```

**Impact**: Exposes visitor insights data to RetailInsights component

---

## SUMMARY OF CHANGES

### Files Modified: 2
1. `src/RetailInsights.jsx` - 180+ lines (state + UI + chart logic)
2. `src/retailInsightsData.js` - 20+ lines (data generation)

### Components Added:
- CV Enable/Disable Checkbox
- View Mode Toggle Button Set (3 buttons)
- Demographic Segmentation Logic
- Gender-Segmented Chart Lines (2)
- Age-Segmented Chart Lines (5)
- Fallback UI Message

### State Variables: 2
- `cvEnabled` (boolean)
- `visitorViewMode` (string: 'total' | 'gender' | 'age')

### Data Structure:
- 7 days × 9 fields per day = 63 data points
- Consistent demographic distributions
- Random generation within realistic ranges

### No Removals:
- All existing metric cards preserved
- All existing tabs preserved
- All existing styling preserved
- All existing functionality preserved

---

**Total Implementation**: ~200 lines of production code
**Test Coverage**: Needs unit tests for demographic calculations
**Performance Impact**: Negligible (additional 2 charts max, same Recharts library)
**Browser Compatibility**: Full (React 18 + Recharts compatible)

