# Phase 3: Engagement Score Formula Implementation

## Context Links
- Current mock score: `retailInsightsData.js` line 73, 95, 108
- Display in UI: `RetailInsights.jsx` lines 424-434
- README definition: "Automated scoring (0-100) based on view frequency, view duration, conversion through funnel"

## Overview
- **Priority**: P2 (Accuracy improvement)
- **Status**: pending
- **Effort**: 1h

Replace random mock engagement scores with calculated formula.

## Key Insights
- Current: `Math.floor(Math.random() * 25) + 70` (random 70-95)
- Need: Formula based on views, duration, conversion rate
- Score should range 0-100, with 70+ being "good"

## Requirements

### Functional
1. Engagement score = weighted formula using real metrics
2. Formula: 40% view rate + 30% duration + 30% playback efficiency
3. Consistent scores (same inputs = same output)
4. Score updates when filters change

### Non-Functional
- Pure calculation function (no side effects)
- Easy to adjust weights later

## Architecture

```
Engagement Score Formula:
  viewRateScore = (views / passersby) * 100 * 0.4     // Max 40 points
  durationScore = min(avgDuration / 5, 1) * 30        // Max 30 points (5s = max)
  efficiencyScore = (playbackCount / expected) * 30   // Max 30 points

  Total = viewRateScore + durationScore + efficiencyScore
  Clamped to 0-100
```

## Related Code Files

### Modify
- `src/retailInsightsData.js` - Add calculateEngagementScore function
- `src/RetailInsights.jsx` - Use calculated score in summary

## Implementation Steps

### Step 1: Create engagement score calculator
```js
// Add to retailInsightsData.js (or new utils file)

/**
 * Calculate engagement score (0-100)
 * @param {Object} metrics
 * @param {number} metrics.passersby - Total passersby count
 * @param {number} metrics.views - Confirmed views
 * @param {number} metrics.avgViewDuration - Average view duration in seconds
 * @param {number} metrics.playbackCount - Times campaign played
 * @param {number} metrics.expectedPlaybacks - Expected playback count (optional, defaults to passersby * 0.1)
 * @returns {number} Score 0-100
 */
export const calculateEngagementScore = ({
  passersby,
  views,
  avgViewDuration = 3.5,
  playbackCount,
  expectedPlaybacks = null,
}) => {
  // Avoid division by zero
  if (passersby === 0) return 0;

  // 1. View Rate Score (40% weight)
  // High view rate = more engagement
  const viewRate = views / passersby;
  const viewRateScore = Math.min(viewRate * 100, 100) * 0.4; // Max 40 points

  // 2. Duration Score (30% weight)
  // 5 seconds = max score, proportional below
  const maxDuration = 5; // seconds
  const durationRatio = Math.min(avgViewDuration / maxDuration, 1);
  const durationScore = durationRatio * 30; // Max 30 points

  // 3. Playback Efficiency Score (30% weight)
  // Compare actual playbacks to expected (10% of passersby as baseline)
  const expected = expectedPlaybacks || passersby * 0.1;
  const efficiencyRatio = expected > 0 ? Math.min(playbackCount / expected, 1.5) : 0;
  const efficiencyScore = (efficiencyRatio / 1.5) * 30; // Max 30 points

  // Total score clamped to 0-100
  const total = viewRateScore + durationScore + efficiencyScore;
  return Math.round(Math.min(Math.max(total, 0), 100));
};
```

### Step 2: Use in display type data generation
```js
// In generateDisplayTypePerformance()
return displayTypes.map(item => {
  const passersby = item.base;
  const playbackDuration = Math.floor(Math.random() * 18000) + 7200;
  const playbackCount = Math.floor(Math.random() * 800) + 400;
  const views = Math.floor(passersby * (0.4 + Math.random() * 0.3));
  const avgViewDuration = 2.5 + Math.random() * 3; // 2.5-5.5 seconds

  return {
    displayType: item.displayType,
    count: item.count,
    status: 'active',
    passersby,
    passerbyPercent: Math.round((passersby / totalPassersby) * 100),
    playbackDuration,
    durationPercent: Math.round(Math.random() * 30) + 15,
    playbackCount,
    countPercent: Math.round(Math.random() * 30) + 15,
    views,
    avgViewDuration, // New field
    engagementScore: calculateEngagementScore({
      passersby,
      views,
      avgViewDuration,
      playbackCount,
    }),
  };
});
```

### Step 3: Use in location performance data
```js
// In generateLocationPerformance()
return locations.map(item => {
  const passersby = item.basePasser;
  const playbackDuration = Math.floor(Math.random() * 50000) + 20000;
  const playbackCount = Math.floor(Math.random() * 2000) + 1000;
  const views = Math.floor(passersby * (0.3 + Math.random() * 0.3));

  return {
    state: item.state,
    storeCount: item.storeCount,
    passersby,
    playbackDuration,
    playbackCount,
    views,
    engagementScore: calculateEngagementScore({
      passersby,
      views,
      avgViewDuration: 3.5,
      playbackCount,
    }),
    latitude: 37.7749 + Math.random() * 10,
    longitude: -122.4194 + Math.random() * 20,
  };
});
```

### Step 4: Calculate summary engagement score
```js
// In RetailInsights.jsx calculateSummary()
const calculateSummary = (displayData) => {
  if (displayData.length === 0) {
    return { /* ... zeros ... */ };
  }

  const totals = displayData.reduce((acc, item) => ({
    passersby: acc.passersby + item.passersby,
    playbackDuration: acc.playbackDuration + item.playbackDuration,
    playbackCount: acc.playbackCount + item.playbackCount,
    views: acc.views + item.views,
  }), { passersby: 0, playbackDuration: 0, playbackCount: 0, views: 0 });

  // Calculate overall engagement score from totals
  const avgViewDuration = 3.8; // Average across displays
  const engagementScore = calculateEngagementScore({
    passersby: totals.passersby,
    views: totals.views,
    avgViewDuration,
    playbackCount: totals.playbackCount,
  });

  return {
    totalPassersby: totals.passersby,
    totalPlaybackDuration: totals.playbackDuration,
    totalPlaybackCount: totals.playbackCount,
    totalViews: totals.views,
    avgViewDuration,
    engagementScore,
  };
};
```

### Step 5: Add time series engagement calculation
```js
// In generateCampaignTimeSeriesData()
return days.map(day => {
  const passersby = Math.floor(Math.random() * 5000) + 3000;
  const views = Math.floor(passersby * (0.3 + Math.random() * 0.3));
  const playbackCount = Math.floor(Math.random() * 500) + 200;

  return {
    day,
    passersby,
    playbackDuration: Math.floor(Math.random() * 200) + 100,
    playbackCount,
    views,
    engagementScore: calculateEngagementScore({
      passersby,
      views,
      avgViewDuration: 3 + Math.random() * 2,
      playbackCount,
    }),
    // ... demographics
  };
});
```

## Todo List
- [ ] Create calculateEngagementScore function
- [ ] Export function from retailInsightsData.js
- [ ] Update generateDisplayTypePerformance to use formula
- [ ] Add avgViewDuration field to display data
- [ ] Update generateLocationPerformance to use formula
- [ ] Update generateCampaignTimeSeriesData to use formula
- [ ] Update calculateSummary in RetailInsights.jsx
- [ ] Import calculateEngagementScore in RetailInsights.jsx
- [ ] Test score ranges (should be 0-100)
- [ ] Verify scores update with filters

## Success Criteria
- [ ] Engagement scores are deterministic (same input = same output)
- [ ] High view rate displays score higher
- [ ] Longer view durations increase score
- [ ] Score range is 0-100
- [ ] Summary score updates when filters change
- [ ] Time series chart shows calculated scores

## Security Considerations
- Pure calculation function - no external input
- No risk of injection or overflow in reasonable data ranges

## Next Steps
After completion, move to **Phase 4** to implement the interactive geographic map which will display engagement scores by location.
