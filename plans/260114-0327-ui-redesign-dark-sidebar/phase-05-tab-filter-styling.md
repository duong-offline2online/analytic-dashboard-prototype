---
phase: 5
title: "Tab & Filter Styling"
status: pending
effort: 30m
---

# Phase 5: Tab & Filter Styling

## Context Links
- Plan: [plan.md](./plan.md)
- Previous: [phase-04](./phase-04-metric-cards-styling.md)

## Overview

Update tabs to use underline style with cyan active indicator, and refine filter controls.

## Key Insights

Target tab characteristics:
- Simple text links (not buttons)
- No background on tabs
- Active tab has cyan underline and cyan text
- Inactive tabs are gray text
- Tabs positioned below breadcrumb, above stats section
- Filters appear as simple bordered inputs with icons

## Requirements

### Tab Changes
- Remove button styling
- Add cyan underline for active state
- Cyan text color for active tab
- Gray text for inactive tabs

### Filter Changes
- Maintain bordered input style
- Date picker shows range with arrow between dates
- Filters aligned horizontally with gap

## Related Code Files

### Files to Modify
- `src/App.css` - Tab and filter styles

## Implementation Steps

### Step 1: Update Tab Styles

Replace existing `.tabs` and `.tab` styles:

```css
/* Tabs */
.tabs {
  display: flex;
  gap: 0;
  margin-bottom: 24px;
  border-bottom: none;
}

.tab {
  padding: 12px 0;
  margin-right: 32px;
  background: transparent;
  border: none;
  border-bottom: 2px solid transparent;
  font-size: 14px;
  font-weight: 400;
  color: var(--tab-text);
  cursor: pointer;
  transition: all 0.2s;
  position: relative;
}

.tab:hover {
  color: var(--tab-text-hover);
  background-color: transparent;
}

.tab.active {
  color: var(--tab-active);
  border-bottom-color: var(--tab-active);
  font-weight: 500;
}

.tab:last-child {
  margin-right: 0;
}
```

### Step 2: Update Breadcrumb Styles

```css
/* Breadcrumb */
.breadcrumb {
  font-size: 13px;
  color: var(--text-muted);
  margin-bottom: 20px;
}

.breadcrumb span {
  color: var(--text-muted);
}

.breadcrumb .active {
  color: var(--text-primary);
  font-weight: 400;
}

.breadcrumb > span:not(:last-child)::after {
  content: ' > ';
  color: var(--text-muted);
}
```

### Step 3: Update Filter Styles

```css
/* Filters */
.filters {
  display: flex;
  gap: 12px;
  margin-bottom: 24px;
  flex-wrap: wrap;
  align-items: center;
}

.filter-group {
  display: flex;
  align-items: center;
  gap: 8px;
  background-color: var(--card-bg);
  padding: 8px 14px;
  border-radius: 6px;
  border: 1px solid var(--border-color);
  box-shadow: none;
}

.filter-group.date-range-picker {
  gap: 6px;
  padding: 8px 12px;
}

.filter-group select {
  border: none;
  outline: none;
  background: transparent;
  font-size: 13px;
  color: var(--text-secondary);
  cursor: pointer;
  padding: 0;
  font-weight: 400;
  min-width: 100px;
}

.filter-group select:focus {
  outline: none;
}

.filter-group svg {
  color: var(--text-muted);
  flex-shrink: 0;
}

/* Date Range Arrow */
.date-range-arrow {
  color: var(--text-muted);
  margin: 0 4px;
}

.btn-secondary {
  display: flex;
  align-items: center;
  gap: 8px;
  background-color: var(--card-bg);
  border: 1px solid var(--border-color);
  padding: 8px 14px;
  border-radius: 6px;
  font-size: 13px;
  color: var(--text-secondary);
  cursor: pointer;
  transition: all 0.2s;
  box-shadow: none;
}

.btn-secondary:hover {
  background-color: #f9fafb;
  border-color: var(--text-muted);
}

.btn-secondary svg {
  color: var(--text-muted);
}
```

### Step 4: Update Date Range Display in RetailInsights.jsx

```jsx
<div className="filter-group date-range-picker">
  <span style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>07 Jan, 2026</span>
  <span className="date-range-arrow">→</span>
  <span style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>13 Jan, 2026</span>
  <Calendar size={16} style={{ marginLeft: '4px', color: 'var(--text-muted)' }} />
</div>
```

### Step 5: Demographic Filter Buttons Update

```css
.demographic-filters {
  display: flex;
  gap: 6px;
  align-items: center;
  flex-wrap: wrap;
}

.demo-filter-btn {
  padding: 6px 12px;
  border-radius: 6px;
  border: 1px solid var(--border-color);
  background-color: var(--card-bg);
  color: var(--text-secondary);
  font-size: 13px;
  cursor: pointer;
  transition: all 0.2s;
}

.demo-filter-btn:hover {
  background-color: #f7fafc;
  border-color: var(--text-muted);
}

.demo-filter-btn.active {
  background-color: var(--accent-primary);
  color: white;
  border-color: var(--accent-primary);
}
```

## Todo List

- [ ] Update tab styles for underline variant
- [ ] Set cyan color for active tab
- [ ] Update breadcrumb styles
- [ ] Update filter group styles
- [ ] Update date range picker display
- [ ] Update demographic filter button styles
- [ ] Test tab switching behavior
- [ ] Verify filter appearance

## Success Criteria

- Active tab has cyan text and underline
- Inactive tabs are gray
- No button-like background on tabs
- Filters have clean bordered style
- Date range displays with arrow separator

## Next Steps

Phase 6: Table & Chart Refinements
