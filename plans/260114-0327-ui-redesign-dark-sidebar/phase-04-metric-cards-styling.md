---
phase: 4
title: "Metric Cards Styling"
status: pending
effort: 45m
---

# Phase 4: Metric Cards Styling

## Context Links
- Plan: [plan.md](./plan.md)
- Previous: [phase-03](./phase-03-header-redesign.md)

## Overview

Redesign metric cards to match target design with light gray background, centered content, and simplified layout.

## Key Insights

Target card characteristics:
- Light gray background (#f3f4f6) with subtle border
- Large centered metric value (bold, ~36-48px)
- Metric label below value (smaller, gray text)
- No icons visible in the simple cards
- Cards grouped in a section with title (e.g., "Visitor Stats (07 Jan - 13 Jan)")
- Rounded corners, no hover effects needed
- Section wrapper with white background

## Requirements

### Visual Changes
- Light gray card background instead of white
- Center-aligned content (value above label)
- Remove icon from header
- Add section wrapper with title
- Simplify card structure

## Related Code Files

### Files to Modify
- `src/App.css` - Metric card styles
- `src/App.jsx` - Card markup (optional restructure)
- `src/RetailInsights.jsx` - Card markup

## Implementation Steps

### Step 1: Add Stats Section Wrapper Styles

```css
/* Stats Section Wrapper */
.stats-section {
  background-color: var(--card-bg);
  border-radius: 8px;
  padding: 24px;
  margin-bottom: 24px;
  border: 1px solid var(--card-border);
}

.stats-section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.stats-section-title {
  font-size: 16px;
  font-weight: 500;
  color: var(--text-primary);
}

.stats-section-info {
  color: var(--text-muted);
  cursor: pointer;
}
```

### Step 2: Update Metric Card Styles

Replace existing `.metric-card` styles:

```css
/* Metrics Grid */
.metrics-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;
  margin-bottom: 0;
  max-width: 100%;
  overflow: hidden;
}

/* 2 columns on tablets */
@media (max-width: 1024px) {
  .metrics-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

/* 1 column on mobile */
@media (max-width: 767px) {
  .metrics-grid {
    grid-template-columns: 1fr;
  }
}

.metric-card {
  background: var(--metric-card-bg);
  padding: 24px 20px;
  border-radius: 8px;
  box-sizing: border-box;
  min-width: 0;
  overflow: hidden;
  text-align: center;
  border: 1px solid var(--card-border);
  transition: none;
}

.metric-card:hover {
  box-shadow: none;
  transform: none;
}

/* Simple card style (value on top, label below) */
.metric-card.simple .metric-value {
  font-size: 42px;
  font-weight: 600;
  color: var(--text-primary);
  margin-bottom: 8px;
  line-height: 1;
}

.metric-card.simple .metric-label {
  font-size: 14px;
  color: var(--text-secondary);
  font-weight: 400;
}

/* Hide elements for simple cards */
.metric-card.simple .metric-header,
.metric-card.simple .metric-footer,
.metric-card.simple .metric-icon {
  display: none;
}
```

### Step 3: Standard Card Style (with icon, for Campaign Performance)

```css
/* Standard metric card with header and footer */
.metric-card-standard {
  background: var(--card-bg);
  padding: 24px;
  border-radius: 8px;
  box-shadow: var(--shadow-sm);
  box-sizing: border-box;
  min-width: 0;
  overflow: hidden;
  text-align: center;
  border: 1px solid var(--card-border);
}

.metric-card-standard .metric-header {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 12px;
}

.metric-card-standard .metric-label {
  font-size: 13px;
  color: var(--text-secondary);
  font-weight: 400;
  text-align: center;
}

.metric-card-standard .metric-icon {
  display: none; /* Hidden by default, can enable if needed */
}

.metric-card-standard .metric-value {
  font-size: 36px;
  font-weight: 600;
  color: var(--text-primary);
  margin-bottom: 12px;
  line-height: 1;
}

.metric-card-standard .metric-footer {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
}

.metric-change {
  font-size: 13px;
  font-weight: 600;
  padding: 2px 8px;
  border-radius: 4px;
}

.metric-change.positive {
  color: #059669;
  background-color: #d1fae5;
}

.metric-change.negative {
  color: #dc2626;
  background-color: #fee2e2;
}

.metric-subtitle {
  font-size: 12px;
  color: var(--text-muted);
}
```

### Step 4: Update RetailInsights.jsx Metrics Structure

For Visitor Insights tab (simple cards):

```jsx
{/* Stats Section */}
<div className="stats-section">
  <div className="stats-section-header">
    <h3 className="stats-section-title">Visitor Stats (07 Jan - 13 Jan)</h3>
    <span className="stats-section-info">
      <Info size={18} />
    </span>
  </div>
  <div className="metrics-grid">
    <div className="metric-card simple">
      <div className="metric-value">0</div>
      <div className="metric-label">Total Store Visitors</div>
    </div>
    <div className="metric-card simple">
      <div className="metric-value">0</div>
      <div className="metric-label">Total Walk-Ins (Queued)</div>
    </div>
    <div className="metric-card simple">
      <div className="metric-value">0</div>
      <div className="metric-label">Total Appointments (Served)</div>
    </div>
  </div>
</div>
```

### Step 5: Add Info Icon Import

Add to RetailInsights.jsx imports:
```jsx
import { Info, Users, Clock, Play, Eye, Award, TrendingUp, Calendar, Target, RefreshCw, Download, MapPin, Filter as FilterIcon } from 'lucide-react';
```

## Todo List

- [ ] Add stats-section wrapper styles
- [ ] Update metric-card styles for simple variant
- [ ] Add metric-card-standard styles for detailed cards
- [ ] Update RetailInsights.jsx visitor insights cards
- [ ] Update RetailInsights.jsx store insights cards
- [ ] Update RetailInsights.jsx appointments cards
- [ ] Test card appearance across all tabs
- [ ] Verify responsive grid behavior

## Success Criteria

- Cards have light gray background (#f3f4f6)
- Large centered metric values
- Labels below values in smaller text
- Section wrapper with title visible
- Cards match target screenshot layout

## Risk Assessment

- **Medium**: Existing App.jsx cards may need restructuring
- **Mitigation**: Can keep detailed cards for Campaign Performance tab while simplifying Retail Insights cards

## Next Steps

Phase 5: Tab & Filter Styling
