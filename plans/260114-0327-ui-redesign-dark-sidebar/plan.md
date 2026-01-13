---
title: "UI Redesign - Dark Sidebar Theme"
description: "Update dashboard UI to match target design with dark sidebar, cyan accents, and refined styling"
status: pending
priority: P1
effort: 4h
branch: main
tags: [ui, css, styling, react]
created: 2026-01-14
---

# UI Redesign - Dark Sidebar Theme

## Overview

Update the React analytics dashboard to match the target USST/PersonalisationHub design featuring:
- Dark charcoal sidebar with cyan/teal accent highlights
- White header with logo and user avatar
- Light gray metric cards with centered layout
- Underline-style tabs with cyan active state
- Clean, professional typography and spacing

## Phase Summary

| Phase | Description | Effort | Status |
|-------|-------------|--------|--------|
| 1 | Color Palette & CSS Variables | 30m | pending |
| 2 | Sidebar Styling | 45m | pending |
| 3 | Header Redesign | 30m | pending |
| 4 | Metric Cards Styling | 45m | pending |
| 5 | Tab & Filter Styling | 30m | pending |
| 6 | Table & Chart Refinements | 45m | pending |
| 7 | Testing & Polish | 30m | pending |

## Files to Modify

- `src/App.css` - Primary CSS changes
- `src/index.css` - Base styles
- `src/App.jsx` - Component structure updates
- `src/RetailInsights.jsx` - Component updates

## Key Design Specifications

### Color Palette (Target)
```
Sidebar Background:    #2d3436 (dark charcoal)
Sidebar Text:          #a0aec0 (muted gray)
Sidebar Active BG:     #00BCD4 / #1abc9c (cyan/teal)
Sidebar Active Text:   #ffffff
Header Background:     #ffffff
Main Background:       #f5f7fa
Card Background:       #f3f4f6 (light gray)
Primary Accent:        #00BCD4 (cyan)
Text Primary:          #1a202c
Text Secondary:        #6b7280
```

## Success Criteria

- [ ] Sidebar matches dark charcoal theme with cyan active state
- [ ] Header displays logo correctly with white background
- [ ] Metric cards use light gray background with centered text
- [ ] Tabs use underline style with cyan active indicator
- [ ] Overall spacing and typography match target screenshots
- [ ] No visual regressions in charts/tables
- [ ] Responsive behavior preserved

## Dependencies

- None - Pure CSS/JSX changes

## Detailed Phases

See individual phase files for step-by-step implementation details.
