---
title: "Close Campaign Performance Feature Gaps (25-30%)"
description: "Complete remaining features: time period selector, filter logic, engagement formula, interactive map, CV toggle, table polish"
status: pending
priority: P1
effort: 12h
branch: main
tags: [campaign-performance, filters, map, cv-integration]
created: 2026-01-14
---

# Campaign Performance Feature Gaps Implementation Plan

## Current Status: 70-75% Complete

| Component | Status | Gap |
|-----------|--------|-----|
| Campaign Performance Tab | 100% | - |
| Filter Controls | 75% | Time period hardcoded, filters non-functional |
| Geographic Features | 0% | Map placeholder only |
| Computer Vision | 0% | Toggle state exists, no UI/integration |
| Display Table | 80% | No pagination, drill-down, highlighting |

## Implementation Phases

| Phase | Description | Effort | Status |
|-------|-------------|--------|--------|
| [Phase 1](./phase-01-time-period-selector.md) | Time Period Selector Dropdown | 1.5h | pending |
| [Phase 2](./phase-02-filter-logic.md) | Connect Filter Logic to Mock Data | 2h | pending |
| [Phase 3](./phase-03-engagement-score.md) | Engagement Score Calculation | 1h | pending |
| [Phase 4](./phase-04-interactive-map.md) | Interactive Geographic Map | 3h | pending |
| [Phase 5](./phase-05-cv-toggle.md) | CV Toggle UI & Integration | 2h | pending |
| [Phase 6](./phase-06-table-polish.md) | Display Table Polish | 2.5h | pending |

## Key Dependencies

- **Recharts** (v2.10.3) - Already in package.json
- **Leaflet/react-simple-maps** - Need to add for map (Phase 4)
- No backend - all mock data in `retailInsightsData.js`

## Files Modified

| File | Phases | Description |
|------|--------|-------------|
| `src/RetailInsights.jsx` | 1-6 | Main component (681 lines) |
| `src/retailInsightsData.js` | 2-3 | Mock data generator (120 lines) |
| `src/App.css` | 4-6 | Map + new component styles |
| `src/components/time-period-selector.jsx` | 1 | New - date range dropdown |
| `src/components/interactive-geographic-map.jsx` | 4 | New - map visualization |

## Success Criteria

1. Time period dropdown works (Today, Yesterday, 7d, 30d, 90d, Custom)
2. Brand/Store/Campaign filters update all charts and tables
3. Engagement score uses formula: `(views/passersby * 40) + (avgDuration/10 * 30) + (playbackCount/expected * 30)`
4. Map shows markers sized by passersby, colored by engagement
5. CV toggle in Visitor Insights shows/hides passerby demographics
6. Table has pagination (10/page), top performer highlight, row drill-down

## Risk Assessment

| Risk | Impact | Mitigation |
|------|--------|------------|
| Map library bundle size | Medium | Use react-simple-maps (lighter) or lazy load |
| RetailInsights.jsx complexity (681 lines) | High | Extract components per phase |
| State management complexity | Medium | Keep filter state co-located |

## Architecture Notes

- **KISS**: No Redux/Zustand - use React useState for filters
- **DRY**: Extract shared filter logic to custom hook `useFilteredData()`
- **YAGNI**: No backend integration - keep mock data approach
