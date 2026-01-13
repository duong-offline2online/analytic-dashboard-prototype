# Phase 1: Time Period Selector Dropdown

## Context Links
- Main component: `src/RetailInsights.jsx` (lines 86-103)
- Current hardcoded dates: "07 Jan, 2026" - "13 Jan, 2026"

## Overview
- **Priority**: P1 (Critical - first user interaction point)
- **Status**: pending
- **Effort**: 1.5h

Replace hardcoded date display with functional dropdown.

## Key Insights
- Current `selectedDateRange` state exists (line 10) but unused
- Date picker div at lines 88-103 shows static text
- Calendar icon already imported from lucide-react

## Requirements

### Functional
1. Dropdown with presets: Today, Yesterday, Last 7 Days, Last 30 Days, Last 90 Days
2. Custom option opens simple date inputs (no fancy picker library)
3. Date display updates immediately on selection
4. Selected range persists across tab switches

### Non-Functional
- No external date picker library (YAGNI)
- Touch-friendly dropdown
- Keyboard accessible

## Architecture

```
TimePeriodSelector (new component)
  |-- dropdown trigger (shows current selection)
  |-- dropdown menu
       |-- preset options (Today, Yesterday, 7d, 30d, 90d)
       |-- Custom option → shows from/to inputs
```

## Related Code Files

### Modify
- `src/RetailInsights.jsx` - Replace hardcoded date div with component

### Create
- `src/components/time-period-selector.jsx` - New dropdown component

## Implementation Steps

### Step 1: Create TimePeriodSelector component
```jsx
// src/components/time-period-selector.jsx
import React, { useState, useRef, useEffect } from 'react';
import { Calendar, ChevronDown } from 'lucide-react';

const TIME_PERIODS = [
  { key: 'today', label: 'Today', getDates: () => { ... } },
  { key: 'yesterday', label: 'Yesterday', getDates: () => { ... } },
  { key: '7days', label: 'Last 7 Days', getDates: () => { ... } },
  { key: '30days', label: 'Last 30 Days', getDates: () => { ... } },
  { key: '90days', label: 'Last 90 Days', getDates: () => { ... } },
  { key: 'custom', label: 'Custom Range', getDates: null }
];

export function TimePeriodSelector({ value, onChange }) {
  const [isOpen, setIsOpen] = useState(false);
  const [customStart, setCustomStart] = useState('');
  const [customEnd, setCustomEnd] = useState('');
  // ... dropdown logic
}
```

### Step 2: Add date calculation utilities
```jsx
// Helper functions inside component or separate utils
const getDateRange = (period) => {
  const today = new Date();
  let start, end = today;

  switch(period) {
    case 'today':
      start = today;
      break;
    case 'yesterday':
      start = end = new Date(today.setDate(today.getDate() - 1));
      break;
    case '7days':
      start = new Date(today.setDate(today.getDate() - 6));
      break;
    case '30days':
      start = new Date(today.setDate(today.getDate() - 29));
      break;
    case '90days':
      start = new Date(today.setDate(today.getDate() - 89));
      break;
  }
  return { start, end };
};

const formatDate = (date) => {
  return date.toLocaleDateString('en-GB', {
    day: '2-digit',
    month: 'short',
    year: 'numeric'
  });
};
```

### Step 3: Replace hardcoded date in RetailInsights.jsx
```jsx
// Replace lines 88-103 with:
<TimePeriodSelector
  value={selectedDateRange}
  onChange={(range, dates) => {
    setSelectedDateRange(range);
    setDateBounds(dates); // new state for actual dates
  }}
/>
```

### Step 4: Add CSS styles
```css
/* Add to App.css */
.time-period-dropdown {
  position: relative;
}

.time-period-trigger {
  display: flex;
  align-items: center;
  gap: 8px;
  background: white;
  border: 1px solid #d1d5db;
  padding: 9px 14px;
  border-radius: 6px;
  cursor: pointer;
  font-size: 13px;
  color: #374151;
}

.time-period-menu {
  position: absolute;
  top: 100%;
  left: 0;
  margin-top: 4px;
  background: white;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0,0,0,0.1);
  z-index: 100;
  min-width: 200px;
}

.time-period-option {
  padding: 10px 14px;
  cursor: pointer;
  font-size: 13px;
}

.time-period-option:hover {
  background-color: #f3f4f6;
}

.time-period-option.active {
  background-color: #e0f2fe;
  color: #0284c7;
}

.custom-date-inputs {
  padding: 12px;
  border-top: 1px solid #e5e7eb;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.custom-date-inputs input {
  padding: 8px 10px;
  border: 1px solid #d1d5db;
  border-radius: 4px;
  font-size: 13px;
}
```

### Step 5: Wire up click-outside-close behavior
```jsx
// Use useEffect with ref to close dropdown when clicking outside
const dropdownRef = useRef(null);

useEffect(() => {
  const handleClickOutside = (e) => {
    if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
      setIsOpen(false);
    }
  };
  document.addEventListener('mousedown', handleClickOutside);
  return () => document.removeEventListener('mousedown', handleClickOutside);
}, []);
```

## Todo List
- [ ] Create `src/components/time-period-selector.jsx`
- [ ] Add date calculation helper functions
- [ ] Implement dropdown open/close logic
- [ ] Add custom date range inputs
- [ ] Add CSS styles to `App.css`
- [ ] Import and use in `RetailInsights.jsx`
- [ ] Add `dateBounds` state to track actual date range
- [ ] Test all presets
- [ ] Test custom range
- [ ] Verify keyboard accessibility (Tab, Enter, Escape)

## Success Criteria
- [ ] Dropdown shows current selection
- [ ] All 5 presets work correctly
- [ ] Custom range with date inputs functions
- [ ] Display updates immediately
- [ ] Dropdown closes on outside click
- [ ] Works on mobile (touch)

## Security Considerations
- Validate custom date inputs (prevent future dates if needed)
- Sanitize date display output

## Next Steps
After completion, move to **Phase 2** to connect filter logic - the date range from this phase will filter the mock data.
