# Phase 5: CV Toggle UI & Integration

## Context Links
- CV state: `src/RetailInsights.jsx` line 16 (`cvEnabled`)
- Visitor Insights tab: lines 225-265
- CV toggle CSS: `src/App.css` lines 694-721

## Overview
- **Priority**: P2 (Feature enhancement)
- **Status**: pending
- **Effort**: 2h

Add Computer Vision toggle to Visitor Insights tab that shows/hides passerby demographic data.

## Key Insights
- `cvEnabled` state exists but UI toggle not rendered
- CV toggles visibility of demographic breakdown data
- When CV off: show basic counts only
- When CV on: show gender/age breakdown with visual charts

## Requirements

### Functional
1. Toggle switch in Visitor Insights tab header
2. CV enabled: show full demographic charts and breakdown
3. CV disabled: show aggregate counts only, hide demographics
4. Toggle state persists across tab switches
5. Clear indicator of CV status

### Non-Functional
- Smooth transition when toggling
- Accessible toggle (keyboard, screen reader)
- Mobile-friendly switch

## Architecture

```
CV Integration:
  cvEnabled = true:
    - Show gender/age breakdown charts
    - Show demographic filters
    - Enhanced metric cards with breakdowns

  cvEnabled = false:
    - Hide demographic data
    - Show simple totals
    - Display "Enable CV for demographics" prompt
```

## Related Code Files

### Modify
- `src/RetailInsights.jsx` - Add toggle UI and conditional rendering
- `src/App.css` - Add toggle switch styles
- `src/retailInsightsData.js` - Add visitor insights mock data with demographics

## Implementation Steps

### Step 1: Create toggle switch component
```jsx
// Add inside RetailInsights.jsx or create separate component

const CVToggle = ({ enabled, onChange }) => (
  <div className="cv-toggle-wrapper">
    <label className="cv-toggle">
      <input
        type="checkbox"
        checked={enabled}
        onChange={(e) => onChange(e.target.checked)}
        aria-label="Enable Computer Vision analytics"
      />
      <span className="toggle-slider"></span>
    </label>
    <span className="cv-toggle-label">
      Computer Vision {enabled ? 'Enabled' : 'Disabled'}
    </span>
    {!enabled && (
      <span className="cv-hint">Enable for demographic insights</span>
    )}
  </div>
);
```

### Step 2: Add toggle switch CSS
```css
/* Add to App.css */

.cv-toggle-wrapper {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 16px;
  background: linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%);
  border-radius: 8px;
  margin-bottom: 24px;
  border: 1px solid #bae6fd;
}

.cv-toggle {
  position: relative;
  display: inline-block;
  width: 48px;
  height: 26px;
}

.cv-toggle input {
  opacity: 0;
  width: 0;
  height: 0;
}

.toggle-slider {
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #cbd5e1;
  transition: 0.3s;
  border-radius: 26px;
}

.toggle-slider:before {
  position: absolute;
  content: "";
  height: 20px;
  width: 20px;
  left: 3px;
  bottom: 3px;
  background-color: white;
  transition: 0.3s;
  border-radius: 50%;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
}

.cv-toggle input:checked + .toggle-slider {
  background-color: #0ea5e9;
}

.cv-toggle input:checked + .toggle-slider:before {
  transform: translateX(22px);
}

.cv-toggle input:focus + .toggle-slider {
  box-shadow: 0 0 0 3px rgba(14, 165, 233, 0.3);
}

.cv-toggle-label {
  font-weight: 500;
  font-size: 14px;
  color: #0369a1;
}

.cv-hint {
  font-size: 12px;
  color: #64748b;
  font-style: italic;
}

/* Demographics section with CV */
.demographics-section {
  opacity: 1;
  max-height: 500px;
  transition: opacity 0.3s, max-height 0.3s;
  overflow: hidden;
}

.demographics-section.hidden {
  opacity: 0;
  max-height: 0;
}

.cv-disabled-message {
  text-align: center;
  padding: 40px 24px;
  background-color: #f8fafc;
  border-radius: 8px;
  border: 2px dashed #cbd5e1;
  color: #64748b;
}

.cv-disabled-message svg {
  margin-bottom: 12px;
  opacity: 0.5;
}

.cv-disabled-message h4 {
  margin: 0 0 8px 0;
  color: #475569;
}

.cv-disabled-message p {
  margin: 0;
  font-size: 13px;
}
```

### Step 3: Add visitor insights mock data
```js
// Add to retailInsightsData.js

const generateVisitorInsightsData = () => {
  const totalVisitors = Math.floor(Math.random() * 5000) + 2000;
  const walkIns = Math.floor(totalVisitors * 0.6);
  const appointments = totalVisitors - walkIns;

  return {
    summary: {
      totalStoreVisitors: totalVisitors,
      totalWalkIns: walkIns,
      totalAppointments: appointments,
    },
    demographics: {
      byGender: {
        male: Math.floor(totalVisitors * 0.48),
        female: Math.floor(totalVisitors * 0.52),
      },
      byAge: {
        '18-24': Math.floor(totalVisitors * 0.15),
        '25-34': Math.floor(totalVisitors * 0.28),
        '35-44': Math.floor(totalVisitors * 0.25),
        '45-54': Math.floor(totalVisitors * 0.18),
        '55+': Math.floor(totalVisitors * 0.14),
      },
    },
    hourlyData: Array.from({ length: 12 }, (_, i) => ({
      hour: `${8 + i}:00`,
      appointments: Math.floor(Math.random() * 30) + 10,
      walkIns: Math.floor(Math.random() * 50) + 20,
    })),
  };
};

// Export and include in main return
```

### Step 4: Update Visitor Insights tab rendering
```jsx
{/* VISITOR INSIGHTS TAB */}
{activeTab === 'visitor' && (
  <div className="tab-content">
    {/* CV Toggle */}
    <CVToggle enabled={cvEnabled} onChange={setCvEnabled} />

    {/* Stats - always visible */}
    <div className="metrics-grid" style={{ gridTemplateColumns: 'repeat(3, 1fr)' }}>
      <div className="metric-card">
        <div className="metric-value">{visitorData.summary.totalStoreVisitors.toLocaleString()}</div>
        <div className="metric-label">Total Store Visitors</div>
        {cvEnabled && (
          <div className="metric-breakdown">
            <span>{visitorData.demographics.byGender.male.toLocaleString()} male</span>
            <span>{visitorData.demographics.byGender.female.toLocaleString()} female</span>
          </div>
        )}
      </div>
      {/* ... other metrics */}
    </div>

    {/* Demographics - CV only */}
    {cvEnabled ? (
      <div className="demographics-section">
        <div className="charts-section">
          {/* Age distribution chart */}
          <div className="chart-card">
            <div className="chart-header">
              <h3>Visitors by Age Group</h3>
            </div>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={Object.entries(visitorData.demographics.byAge).map(([age, count]) => ({ age, count }))}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="age" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="count" fill="#3b82f6" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Gender distribution */}
          <div className="chart-card">
            <div className="chart-header">
              <h3>Visitors by Gender</h3>
            </div>
            <div className="gender-breakdown">
              <div className="gender-bar">
                <div
                  className="gender-male"
                  style={{ width: `${(visitorData.demographics.byGender.male / visitorData.summary.totalStoreVisitors) * 100}%` }}
                >
                  Male {Math.round((visitorData.demographics.byGender.male / visitorData.summary.totalStoreVisitors) * 100)}%
                </div>
                <div className="gender-female">
                  Female {Math.round((visitorData.demographics.byGender.female / visitorData.summary.totalStoreVisitors) * 100)}%
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    ) : (
      <div className="cv-disabled-message">
        <Eye size={32} />
        <h4>Computer Vision Analytics Disabled</h4>
        <p>Enable CV above to see demographic breakdowns including age and gender distribution.</p>
      </div>
    )}

    {/* Hourly Chart - always visible */}
    <div className="chart-card full-width">
      <div className="chart-header">
        <h3>Visitor Stats (07 Jan - 13 Jan)</h3>
      </div>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={visitorData.hourlyData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="hour" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="appointments" stroke="#3b82f6" name="Appointments" />
          <Line type="monotone" dataKey="walkIns" stroke="#10b981" name="Walk-Ins" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  </div>
)}
```

### Step 5: Add gender breakdown CSS
```css
/* Add to App.css */

.metric-breakdown {
  display: flex;
  justify-content: center;
  gap: 16px;
  margin-top: 8px;
  font-size: 12px;
  color: #64748b;
}

.gender-breakdown {
  padding: 24px;
}

.gender-bar {
  display: flex;
  height: 36px;
  border-radius: 8px;
  overflow: hidden;
  font-size: 13px;
  font-weight: 500;
}

.gender-male {
  background-color: #3b82f6;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 16px;
}

.gender-female {
  background-color: #ec4899;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  flex: 1;
  padding: 0 16px;
}
```

### Step 6: Initialize visitor data
```jsx
// In RetailInsights.jsx, add after mockData
const visitorData = React.useMemo(() => {
  return mockData.visitorInsights || generateVisitorInsightsData();
}, []);
```

## Todo List
- [ ] Create CVToggle component in RetailInsights.jsx
- [ ] Add toggle switch CSS to App.css
- [ ] Add generateVisitorInsightsData to retailInsightsData.js
- [ ] Include visitorInsights in main data return
- [ ] Update Visitor Insights tab with conditional rendering
- [ ] Add demographic charts (age bar chart, gender bar)
- [ ] Add cv-disabled-message placeholder
- [ ] Add metric-breakdown styling
- [ ] Add gender bar chart styling
- [ ] Test toggle transitions
- [ ] Verify accessibility (keyboard, aria)
- [ ] Test state persistence across tabs

## Success Criteria
- [ ] Toggle switch renders in Visitor Insights tab
- [ ] CV enabled shows demographic charts
- [ ] CV disabled shows placeholder message
- [ ] Metric cards show breakdown when CV on
- [ ] Smooth transition between states
- [ ] Toggle accessible via keyboard
- [ ] State persists across tab switches

## Security Considerations
- CV toggle is local state only (no backend implications)
- No PII in demographic mock data
- Toggle doesn't affect actual CV system integration

## Next Steps
After completion, move to **Phase 6** to polish the Display Table with pagination, drill-down, and top performer highlighting.
