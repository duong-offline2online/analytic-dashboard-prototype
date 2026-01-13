# Phase 2: Connect Filter Logic to Mock Data

## Context Links
- Filter dropdowns: `src/RetailInsights.jsx` (lines 143-172)
- Mock data: `src/retailInsightsData.js`
- State vars: `selectedBrand`, `selectedStore`, `selectedCampaign` (lines 11-13)

## Overview
- **Priority**: P1 (Core functionality)
- **Status**: pending
- **Effort**: 2h

Make Brand, Store, Campaign filters actually filter the displayed data.

## Key Insights
- Filter states exist but aren't connected to data
- Mock data needs restructuring to support filtering
- Each display/location should have brand, store, campaign associations

## Requirements

### Functional
1. Brand filter updates all metrics, charts, and tables
2. Store filter narrows data to selected store(s)
3. Campaign filter shows only selected campaign data
4. Filters work combinatorially (AND logic)
5. "All" option shows unfiltered data

### Non-Functional
- Filter updates < 100ms (immediate feel)
- No full page re-render on filter change
- Maintain chart animations during filter

## Architecture

```
Filter Flow:
  User selects filter
    → State updates (selectedBrand/Store/Campaign)
    → useMemo recalculates filtered data
    → Components re-render with filtered data

Data Structure Enhancement:
  Each data item gets: brandId, storeId, campaignId properties
  Filter function: filterData(data, { brand, store, campaign })
```

## Related Code Files

### Modify
- `src/retailInsightsData.js` - Add brand/store/campaign associations to mock data
- `src/RetailInsights.jsx` - Implement filter logic with useMemo

## Implementation Steps

### Step 1: Enhance mock data structure
```js
// src/retailInsightsData.js - Update data generators

// Add these constants at top
const BRANDS = [
  { id: 'brand1', name: 'Nike' },
  { id: 'brand2', name: 'Adidas' },
  { id: 'brand3', name: 'Coca-Cola' },
];

const STORES = [
  { id: 'store1', name: 'Flagship Store', state: 'CA' },
  { id: 'store2', name: 'Central Mall', state: 'NY' },
  { id: 'store3', name: 'Downtown Store', state: 'TX' },
];

const CAMPAIGNS = [
  { id: 'camp1', name: 'Summer Sale 2025', brandId: 'brand1' },
  { id: 'camp2', name: 'New Product Launch', brandId: 'brand2' },
  { id: 'camp3', name: 'Holiday Special', brandId: 'brand3' },
];

// Export constants for dropdown options
export { BRANDS, STORES, CAMPAIGNS };
```

### Step 2: Add associations to display/location data
```js
// In generateDisplayTypePerformance()
const displayTypes = [
  { displayType: 'Store Entrance Display', count: 3, base: 5420,
    storeId: 'store1', brandId: 'brand1', campaignId: 'camp1' },
  { displayType: 'Mall Corridor Display', count: 2, base: 3820,
    storeId: 'store2', brandId: 'brand2', campaignId: 'camp2' },
  // ... add to all items
];

// In generateLocationPerformance()
const locations = [
  { state: 'CA', storeCount: 8, basePasser: 12500,
    storeIds: ['store1'], brandIds: ['brand1', 'brand2'] },
  // ...
];
```

### Step 3: Create filter hook in RetailInsights.jsx
```jsx
// Add after state declarations

// Import filter data
import { generateRetailInsightsData, BRANDS, STORES, CAMPAIGNS } from './retailInsightsData';

// Create filtered data using useMemo
const filteredData = React.useMemo(() => {
  const raw = mockData.campaignPerformance;

  // Filter display performance
  const filteredDisplays = raw.displayTypePerformance.filter(item => {
    if (selectedBrand !== 'all' && item.brandId !== selectedBrand) return false;
    if (selectedStore !== 'all' && item.storeId !== selectedStore) return false;
    if (selectedCampaign !== 'all' && item.campaignId !== selectedCampaign) return false;
    return true;
  });

  // Filter location performance
  const filteredLocations = raw.locationPerformance.filter(item => {
    if (selectedStore !== 'all' && !item.storeIds?.includes(selectedStore)) return false;
    if (selectedBrand !== 'all' && !item.brandIds?.includes(selectedBrand)) return false;
    return true;
  });

  // Recalculate summary from filtered data
  const summary = calculateSummary(filteredDisplays);

  return {
    summary,
    timeSeriesData: raw.timeSeriesData, // Time series filters via date range (Phase 1)
    displayTypePerformance: filteredDisplays,
    locationPerformance: filteredLocations,
  };
}, [mockData, selectedBrand, selectedStore, selectedCampaign]);
```

### Step 4: Add summary calculation function
```jsx
const calculateSummary = (displayData) => {
  if (displayData.length === 0) {
    return {
      totalPassersby: 0,
      totalPlaybackDuration: 0,
      totalPlaybackCount: 0,
      totalViews: 0,
      avgViewDuration: 0,
      engagementScore: 0,
    };
  }

  const totals = displayData.reduce((acc, item) => ({
    passersby: acc.passersby + item.passersby,
    playbackDuration: acc.playbackDuration + item.playbackDuration,
    playbackCount: acc.playbackCount + item.playbackCount,
    views: acc.views + item.views,
    engagementSum: acc.engagementSum + item.engagementScore,
  }), { passersby: 0, playbackDuration: 0, playbackCount: 0, views: 0, engagementSum: 0 });

  return {
    totalPassersby: totals.passersby,
    totalPlaybackDuration: totals.playbackDuration,
    totalPlaybackCount: totals.playbackCount,
    totalViews: totals.views,
    avgViewDuration: 3.8, // Keep static or calculate from detailed data
    engagementScore: Math.round(totals.engagementSum / displayData.length),
  };
};
```

### Step 5: Update components to use filteredData
```jsx
// Replace mockData.campaignPerformance with filteredData throughout

// Summary metrics (line 369+)
<div className="metric-value">{filteredData.summary.totalPassersby.toLocaleString()}</div>

// Time series chart (line 500)
<LineChart data={getFilteredTimeSeriesData()}>

// Display table (line 587)
{getSortedDisplayData(filteredData.displayTypePerformance).map(...)}

// Location table (line 656)
{filteredData.locationPerformance.map(...)}
```

### Step 6: Populate dropdowns from constants
```jsx
// Replace hardcoded options with mapped constants
<select value={selectedBrand} onChange={(e) => setSelectedBrand(e.target.value)}>
  <option value="all">All Brands/Advertisers</option>
  {BRANDS.map(b => (
    <option key={b.id} value={b.id}>{b.name}</option>
  ))}
</select>

// Similarly for Store and Campaign dropdowns
```

### Step 7: Add empty state handling
```jsx
// After display table, add empty state
{filteredData.displayTypePerformance.length === 0 && (
  <div className="filter-empty-state">
    <p>No data matches the selected filters.</p>
    <button onClick={() => {
      setSelectedBrand('all');
      setSelectedStore('all');
      setSelectedCampaign('all');
    }}>Clear Filters</button>
  </div>
)}
```

## Todo List
- [ ] Add BRANDS, STORES, CAMPAIGNS constants to retailInsightsData.js
- [ ] Add brandId, storeId, campaignId to displayTypePerformance items
- [ ] Add storeIds, brandIds to locationPerformance items
- [ ] Export constants from retailInsightsData.js
- [ ] Import constants in RetailInsights.jsx
- [ ] Implement filteredData useMemo hook
- [ ] Add calculateSummary helper function
- [ ] Replace mockData.campaignPerformance with filteredData
- [ ] Update dropdown options to use constants
- [ ] Add getSortedDisplayData to accept data param
- [ ] Add empty state for no results
- [ ] Add CSS for empty state

## Success Criteria
- [ ] Selecting Nike shows only Nike campaign data
- [ ] Selecting Flagship Store shows only that store's displays
- [ ] Combining filters works (AND logic)
- [ ] Summary metrics update on filter change
- [ ] Tables update on filter change
- [ ] "All" option shows complete data
- [ ] Empty state shown when no matches

## Security Considerations
- Filter values come from controlled dropdowns (safe)
- No user-generated filter text that needs sanitization

## Next Steps
After completion, move to **Phase 3** to implement engagement score calculation which will use the filtered data.
