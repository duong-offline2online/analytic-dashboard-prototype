---
phase: 6
title: "Table & Chart Refinements"
status: pending
effort: 45m
---

# Phase 6: Table & Chart Refinements

## Context Links
- Plan: [plan.md](./plan.md)
- Previous: [phase-05](./phase-05-tab-filter-styling.md)

## Overview

Refine table and chart styling to match the target design's clean, professional look.

## Key Insights

Target characteristics:
- Charts have white background cards
- Chart title in section header style
- Legend with colored dots inline with title
- Tables have clean headers with sortable columns
- Stacked bar charts for time-based data
- "No data available" state shown cleanly centered

## Requirements

### Chart Changes
- Update chart card styling
- Align legend styling
- Update chart colors to match theme

### Table Changes
- Clean header styling
- Sortable column indicators
- Status badges consistent

## Related Code Files

### Files to Modify
- `src/App.css` - Chart and table styles

## Implementation Steps

### Step 1: Update Chart Card Styles

```css
/* Chart Card */
.chart-card {
  background: var(--card-bg);
  padding: 24px;
  border-radius: 8px;
  box-shadow: none;
  box-sizing: border-box;
  min-width: 0;
  overflow: hidden;
  width: 100%;
  border: 1px solid var(--card-border);
}

.chart-card.full-width {
  grid-column: 1 / -1;
}

.chart-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  flex-wrap: wrap;
  gap: 16px;
}

.chart-header h3 {
  font-size: 15px;
  font-weight: 500;
  color: var(--text-primary);
  margin: 0;
}

.chart-legend {
  display: flex;
  gap: 16px;
  align-items: center;
  flex-wrap: wrap;
}

.legend-item {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 12px;
  color: var(--text-secondary);
}

.legend-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  flex-shrink: 0;
}
```

### Step 2: Update Chart Colors Constant

In both App.jsx and RetailInsights.jsx, update COLORS:

```jsx
const COLORS = {
  passersby: '#3b82f6',      // Blue
  playbackDuration: '#10b981', // Green
  playbackCount: '#f59e0b',    // Amber
  views: '#ec4899',            // Pink
  engagement: '#8b5cf6',       // Purple
  primary: '#00BCD4',          // Cyan (accent)
  success: '#10b981',
  warning: '#f59e0b',
  danger: '#ef4444',
};
```

### Step 3: Empty State Styling

```css
/* Chart Empty State */
.chart-empty-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 250px;
  color: var(--text-muted);
  font-size: 14px;
  font-weight: 500;
}

.chart-empty-state p {
  margin: 0;
}
```

### Step 4: Update Table Styles

```css
/* Table Card */
.table-card {
  background: var(--card-bg);
  padding: 24px;
  border-radius: 8px;
  box-shadow: none;
  margin-bottom: 24px;
  box-sizing: border-box;
  max-width: 100%;
  overflow: hidden;
  border: 1px solid var(--card-border);
}

.table-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
}

.table-header h3 {
  font-size: 15px;
  font-weight: 500;
  color: var(--text-primary);
  margin: 0;
}

/* Data Table */
.data-table {
  width: 100%;
  min-width: 800px;
  border-collapse: collapse;
  font-size: 13px;
}

.data-table thead {
  background-color: #f7fafc;
}

.data-table th {
  padding: 12px 16px;
  text-align: left;
  font-weight: 600;
  color: var(--text-secondary);
  border-bottom: 1px solid var(--border-color);
  white-space: nowrap;
  font-size: 12px;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  cursor: pointer;
  user-select: none;
}

.data-table th:hover {
  background-color: #edf2f7;
}

.data-table th.sortable::after {
  content: ' ';
  display: inline-block;
  width: 8px;
}

.data-table td {
  padding: 14px 16px;
  border-bottom: 1px solid var(--border-color);
  color: var(--text-primary);
  font-size: 13px;
  white-space: nowrap;
}

.data-table tbody tr:hover {
  background-color: #f7fafc;
}

.data-table tbody tr:last-child td {
  border-bottom: none;
}
```

### Step 5: Performance Table (for Retail Insights)

```css
/* Performance Table */
.performance-table {
  overflow-x: auto;
}

.performance-table table {
  width: 100%;
  border-collapse: collapse;
}

.performance-table th {
  text-align: left;
  padding: 12px 16px;
  background-color: #f7fafc;
  font-weight: 600;
  font-size: 12px;
  color: var(--text-secondary);
  border-bottom: 1px solid var(--border-color);
  cursor: pointer;
  user-select: none;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.performance-table th:hover {
  background-color: #edf2f7;
}

.performance-table td {
  padding: 14px 16px;
  border-bottom: 1px solid var(--border-color);
  font-size: 13px;
  color: var(--text-primary);
}

.performance-table tr:hover {
  background-color: #f7fafc;
}

.performance-table tr:last-child td {
  border-bottom: none;
}

.table-subtitle {
  font-size: 11px;
  color: var(--text-muted);
  margin-top: 2px;
}
```

### Step 6: Badge and Status Styles

```css
/* Badges */
.badge {
  padding: 4px 10px;
  border-radius: 12px;
  font-size: 11px;
  font-weight: 500;
  white-space: nowrap;
}

.badge-type {
  background-color: #e0e7ff;
  color: #4338ca;
}

.badge-count {
  background-color: #fef3c7;
  color: #92400e;
}

/* Status Badges */
.status-badge {
  display: inline-block;
  padding: 4px 12px;
  border-radius: 12px;
  font-size: 11px;
  font-weight: 500;
  text-transform: capitalize;
}

.status-badge.active,
.status-active {
  background-color: #d1fae5;
  color: #065f46;
}

.status-badge.inactive,
.status-inactive {
  background-color: #e5e7eb;
  color: #4b5563;
}

/* Engagement Cell */
.engagement-cell {
  display: flex;
  align-items: center;
  gap: 8px;
}

.engagement-value {
  font-weight: 600;
  min-width: 28px;
  color: var(--text-primary);
}

.engagement-bar {
  flex: 1;
  height: 6px;
  background-color: #e5e7eb;
  border-radius: 3px;
  overflow: hidden;
  max-width: 80px;
}

.engagement-fill {
  height: 100%;
  transition: width 0.3s ease;
  border-radius: 3px;
}
```

### Step 7: Score Badge Styles

```css
/* Score Badges */
.score-badge {
  display: inline-block;
  padding: 4px 10px;
  border-radius: 12px;
  font-size: 12px;
  font-weight: 600;
}

.score-badge.score-high {
  background-color: #d1fae5;
  color: #065f46;
}

.score-badge.score-medium {
  background-color: #fef3c7;
  color: #92400e;
}

.score-badge.score-low {
  background-color: #fee2e2;
  color: #991b1b;
}
```

## Todo List

- [ ] Update chart-card styles
- [ ] Update chart-header and legend styles
- [ ] Add chart-empty-state styles
- [ ] Update data-table styles
- [ ] Update performance-table styles
- [ ] Update badge styles
- [ ] Update status-badge styles
- [ ] Update engagement-cell styles
- [ ] Test chart appearance
- [ ] Test table sorting indicators
- [ ] Verify empty state display

## Success Criteria

- Charts have clean white background with border
- Table headers are uppercase with hover effect
- Status badges use correct colors
- Engagement bars display properly
- Empty states are centered and styled
- Sort indicators visible on sortable columns

## Next Steps

Phase 7: Testing & Polish
