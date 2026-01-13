# Phase 6: Display Table Polish

## Context Links
- Display table: `src/RetailInsights.jsx` lines 556-633
- Table styles: `src/App.css` lines 761-801

## Overview
- **Priority**: P3 (Polish)
- **Status**: pending
- **Effort**: 2.5h

Add pagination, drill-down, and top performer highlighting to Display Performance table.

## Key Insights
- Current table shows all rows without pagination
- No visual indicator for top performers
- No drill-down/expand capability
- Sorting already implemented

## Requirements

### Functional
1. Pagination: 10 rows per page with prev/next controls
2. Top performer: highlight row with highest engagement score
3. Drill-down: expand row to show campaign-level details
4. Show/hide columns toggle for responsive views

### Non-Functional
- Pagination controls accessible (keyboard)
- Animations for expand/collapse
- Mobile: horizontal scroll with sticky first column

## Architecture

```
TableState:
  currentPage: number
  pageSize: 10
  expandedRows: Set<string>

TopPerformer:
  Find max engagementScore in current data
  Add 'top-performer' class to that row

DrillDown:
  Click row → show nested campaign rows
  Each display has multiple campaigns
```

## Related Code Files

### Modify
- `src/RetailInsights.jsx` - Add pagination state and drill-down logic
- `src/App.css` - Add pagination, highlight, expand styles
- `src/retailInsightsData.js` - Add campaign-level data per display

## Implementation Steps

### Step 1: Add pagination state and logic
```jsx
// Add state after existing sortConfig
const [currentPage, setCurrentPage] = useState(1);
const [expandedRows, setExpandedRows] = useState(new Set());
const PAGE_SIZE = 10;

// Pagination helpers
const getPaginatedData = (data) => {
  const start = (currentPage - 1) * PAGE_SIZE;
  const end = start + PAGE_SIZE;
  return data.slice(start, end);
};

const getTotalPages = (data) => Math.ceil(data.length / PAGE_SIZE);

// Reset page when filters change
React.useEffect(() => {
  setCurrentPage(1);
}, [selectedBrand, selectedStore, selectedCampaign]);
```

### Step 2: Add Pagination component
```jsx
const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  if (totalPages <= 1) return null;

  return (
    <div className="pagination">
      <button
        className="pagination-btn"
        disabled={currentPage === 1}
        onClick={() => onPageChange(currentPage - 1)}
        aria-label="Previous page"
      >
        &larr; Prev
      </button>

      <div className="pagination-info">
        Page {currentPage} of {totalPages}
      </div>

      <button
        className="pagination-btn"
        disabled={currentPage === totalPages}
        onClick={() => onPageChange(currentPage + 1)}
        aria-label="Next page"
      >
        Next &rarr;
      </button>
    </div>
  );
};
```

### Step 3: Add pagination CSS
```css
/* Add to App.css */

.pagination {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 16px;
  padding: 16px;
  border-top: 1px solid #e5e7eb;
}

.pagination-btn {
  padding: 8px 16px;
  border: 1px solid #d1d5db;
  border-radius: 6px;
  background: white;
  color: #374151;
  font-size: 13px;
  cursor: pointer;
  transition: all 0.2s;
}

.pagination-btn:hover:not(:disabled) {
  background-color: #f3f4f6;
  border-color: #9ca3af;
}

.pagination-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.pagination-info {
  font-size: 13px;
  color: #6b7280;
}
```

### Step 4: Add top performer highlighting
```jsx
// Find top performer
const topPerformerDisplay = React.useMemo(() => {
  const sorted = [...filteredData.displayTypePerformance].sort(
    (a, b) => b.engagementScore - a.engagementScore
  );
  return sorted[0]?.displayType;
}, [filteredData.displayTypePerformance]);

// In table row rendering
<tr
  key={index}
  className={item.displayType === topPerformerDisplay ? 'top-performer-row' : ''}
>
```

```css
/* Add to App.css */

.top-performer-row {
  background: linear-gradient(90deg, #f0fdf4 0%, #dcfce7 50%, #f0fdf4 100%);
  position: relative;
}

.top-performer-row::before {
  content: '';
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  width: 4px;
  background-color: #22c55e;
}

.top-performer-row td:first-child::after {
  content: ' ★';
  color: #22c55e;
  font-size: 12px;
}
```

### Step 5: Add drill-down capability
```jsx
// Toggle row expansion
const toggleRowExpand = (displayType) => {
  setExpandedRows(prev => {
    const newSet = new Set(prev);
    if (newSet.has(displayType)) {
      newSet.delete(displayType);
    } else {
      newSet.add(displayType);
    }
    return newSet;
  });
};

// In table body
{getPaginatedData(getSortedDisplayData(filteredData.displayTypePerformance)).map((item, index) => (
  <React.Fragment key={item.displayType}>
    <tr
      className={`
        ${item.displayType === topPerformerDisplay ? 'top-performer-row' : ''}
        ${expandedRows.has(item.displayType) ? 'expanded-row' : ''}
      `}
      onClick={() => toggleRowExpand(item.displayType)}
      style={{ cursor: 'pointer' }}
    >
      <td>
        <div className="expand-cell">
          <span className={`expand-icon ${expandedRows.has(item.displayType) ? 'rotated' : ''}`}>
            &#9656;
          </span>
          <div>
            <strong>{item.displayType}</strong>
            <div className="table-subtitle">({item.count} displays)</div>
          </div>
        </div>
      </td>
      {/* ... other cells */}
    </tr>

    {/* Expanded row with campaign details */}
    {expandedRows.has(item.displayType) && (
      <tr className="drill-down-row">
        <td colSpan="7">
          <div className="drill-down-content">
            <h4>Campaigns on {item.displayType}</h4>
            <table className="nested-table">
              <thead>
                <tr>
                  <th>Campaign</th>
                  <th>Brand</th>
                  <th>Views</th>
                  <th>Duration</th>
                  <th>Engagement</th>
                </tr>
              </thead>
              <tbody>
                {item.campaigns?.map((campaign, i) => (
                  <tr key={i}>
                    <td>{campaign.name}</td>
                    <td>{campaign.brand}</td>
                    <td>{campaign.views.toLocaleString()}</td>
                    <td>{campaign.avgDuration}s</td>
                    <td>
                      <span className={`score-badge score-${campaign.engagement >= 75 ? 'high' : campaign.engagement >= 50 ? 'medium' : 'low'}`}>
                        {campaign.engagement}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </td>
      </tr>
    )}
  </React.Fragment>
))}
```

### Step 6: Add campaign data to displays
```js
// In retailInsightsData.js generateDisplayTypePerformance()
// Add campaigns array to each display

const SAMPLE_CAMPAIGNS = [
  { name: 'Summer Sale 2025', brand: 'Nike' },
  { name: 'New Product Launch', brand: 'Adidas' },
  { name: 'Holiday Special', brand: 'Coca-Cola' },
];

// In map return:
campaigns: SAMPLE_CAMPAIGNS.slice(0, 1 + Math.floor(Math.random() * 2)).map(c => ({
  ...c,
  views: Math.floor(views * (0.3 + Math.random() * 0.4)),
  avgDuration: (2 + Math.random() * 3).toFixed(1),
  engagement: calculateEngagementScore({ /* ... */ }),
})),
```

### Step 7: Add drill-down CSS
```css
/* Add to App.css */

.expand-cell {
  display: flex;
  align-items: center;
  gap: 8px;
}

.expand-icon {
  display: inline-block;
  transition: transform 0.2s;
  color: #9ca3af;
  font-size: 10px;
}

.expand-icon.rotated {
  transform: rotate(90deg);
}

.expanded-row {
  background-color: #f8fafc;
}

.drill-down-row {
  background-color: #f1f5f9;
}

.drill-down-content {
  padding: 16px 24px;
}

.drill-down-content h4 {
  font-size: 14px;
  font-weight: 600;
  margin: 0 0 12px 0;
  color: #475569;
}

.nested-table {
  width: 100%;
  border-collapse: collapse;
  font-size: 13px;
}

.nested-table th {
  text-align: left;
  padding: 8px 12px;
  background-color: #e2e8f0;
  font-weight: 500;
  color: #475569;
}

.nested-table td {
  padding: 8px 12px;
  border-bottom: 1px solid #e2e8f0;
}

.nested-table tr:last-child td {
  border-bottom: none;
}
```

### Step 8: Add show/hide columns for mobile
```jsx
// Add column visibility state
const [visibleColumns, setVisibleColumns] = useState({
  status: true,
  passersby: true,
  playbackDuration: true,
  playbackCount: true,
  views: true,
  engagement: true,
});

// Add column toggle dropdown (optional for mobile)
const ColumnToggle = () => (
  <div className="column-toggle">
    <button className="btn-secondary column-toggle-btn">
      Columns <ChevronDown size={14} />
    </button>
    {/* Dropdown with checkboxes */}
  </div>
);
```

## Todo List
- [ ] Add pagination state (currentPage, PAGE_SIZE)
- [ ] Create getPaginatedData helper
- [ ] Create Pagination component
- [ ] Add pagination CSS
- [ ] Reset page on filter change
- [ ] Add top performer detection (useMemo)
- [ ] Add top-performer-row CSS with star indicator
- [ ] Add expandedRows state (Set)
- [ ] Add toggleRowExpand function
- [ ] Add campaigns array to display data
- [ ] Create drill-down row rendering
- [ ] Add drill-down CSS
- [ ] Add expand icon with rotation animation
- [ ] Add nested table for campaigns
- [ ] Test pagination with 5+ displays
- [ ] Test drill-down open/close
- [ ] Verify top performer updates with filters
- [ ] Test mobile horizontal scroll

## Success Criteria
- [ ] Shows 10 rows per page max
- [ ] Pagination prev/next works
- [ ] Page resets when filter changes
- [ ] Top performer row has green highlight + star
- [ ] Click row expands to show campaigns
- [ ] Nested table shows campaign details
- [ ] Expand icon rotates on open
- [ ] Works on mobile with scroll

## Security Considerations
- Pagination uses local state (no injection risk)
- Click handlers on controlled elements only
- No dynamic HTML injection in drill-down

## Next Steps
After Phase 6, all feature gaps are closed. Consider:
1. Integration testing across all tabs
2. Performance profiling (React DevTools)
3. Accessibility audit (axe-core)
4. User acceptance testing
