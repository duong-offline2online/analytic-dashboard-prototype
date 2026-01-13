// Mock data generator for Retail Insights

/**
 * Calculate engagement score (0-100)
 * @param {Object} metrics
 * @param {number} metrics.passersby - Total passersby count
 * @param {number} metrics.views - Confirmed views
 * @param {number} metrics.avgViewDuration - Average view duration in seconds
 * @param {number} metrics.playbackCount - Times campaign played
 * @param {number} metrics.expectedPlaybacks - Expected playback count (optional)
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
  const viewRate = views / passersby;
  const viewRateScore = Math.min(viewRate * 100, 100) * 0.4;

  // 2. Duration Score (30% weight)
  // 5 seconds = max score
  const maxDuration = 5;
  const durationRatio = Math.min(avgViewDuration / maxDuration, 1);
  const durationScore = durationRatio * 30;

  // 3. Playback Efficiency Score (30% weight)
  const expected = expectedPlaybacks || passersby * 0.1;
  const efficiencyRatio = expected > 0 ? Math.min(playbackCount / expected, 1.5) : 0;
  const efficiencyScore = (efficiencyRatio / 1.5) * 30;

  // Total score clamped to 0-100
  const total = viewRateScore + durationScore + efficiencyScore;
  return Math.round(Math.min(Math.max(total, 0), 100));
};

// Filter constants
export const BRANDS = [
  { id: 'brand1', name: 'Nike' },
  { id: 'brand2', name: 'Adidas' },
  { id: 'brand3', name: 'Coca-Cola' },
];

export const STORES = [
  { id: 'store1', name: 'Flagship Store', state: 'CA' },
  { id: 'store2', name: 'Central Mall', state: 'NY' },
  { id: 'store3', name: 'Downtown Store', state: 'TX' },
  { id: 'store4', name: 'Westfield Store', state: 'FL' },
  { id: 'store5', name: 'City Center', state: 'IL' },
];

export const CAMPAIGNS = [
  { id: 'camp1', name: 'Summer Sale 2025', brandId: 'brand1' },
  { id: 'camp2', name: 'New Product Launch', brandId: 'brand2' },
  { id: 'camp3', name: 'Holiday Special', brandId: 'brand3' },
];

export const generateRetailInsightsData = () => {
  // Visitor Insights Time Series Data (with CV passerby data)
  const generateVisitorInsightsData = () => {
    const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
    return days.map(day => {
      const visitors = Math.floor(Math.random() * 800) + 400; // Store visitors
      const passerby = Math.floor(Math.random() * 5000) + 3000; // CV-detected passerby

      return {
        day,
        visitors,
        passerby,
        passerbyMale: Math.floor(passerby * 0.52),
        passerbyFemale: Math.floor(passerby * 0.48),
        passerby18_24: Math.floor(passerby * 0.18),
        passerby25_34: Math.floor(passerby * 0.28),
        passerby35_44: Math.floor(passerby * 0.22),
        passerby45_54: Math.floor(passerby * 0.18),
        passerby55: Math.floor(passerby * 0.14),
      };
    });
  };

  // Campaign Performance Time Series Data (by day)
  const generateCampaignTimeSeriesData = () => {
    const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
    return days.map(day => {
      const passersby = Math.floor(Math.random() * 5000) + 3000;
      const views = Math.floor(passersby * (0.3 + Math.random() * 0.3));
      const playbackCount = Math.floor(Math.random() * 500) + 200;
      const avgViewDuration = 3 + Math.random() * 2;

      return {
        day,
        passersby,
        playbackDuration: Math.floor(Math.random() * 200) + 100, // in hours
        playbackCount,
        views,
        engagementScore: calculateEngagementScore({
          passersby,
          views,
          avgViewDuration,
          playbackCount,
        }),
        // Demographics breakdown
        passerbyByGender: {
          male: Math.floor(passersby * 0.52),
          female: Math.floor(passersby * 0.48),
        },
        passerbyByAge: {
          '18-24': Math.floor(passersby * 0.18),
          '25-34': Math.floor(passersby * 0.28),
          '35-44': Math.floor(passersby * 0.22),
          '45-54': Math.floor(passersby * 0.18),
          '55+': Math.floor(passersby * 0.14),
        },
        viewsByGender: {
          male: Math.floor(views * 0.52),
          female: Math.floor(views * 0.48),
        },
        viewsByAge: {
          '18-24': Math.floor(views * 0.18),
          '25-34': Math.floor(views * 0.28),
          '35-44': Math.floor(views * 0.22),
          '45-54': Math.floor(views * 0.18),
          '55+': Math.floor(views * 0.14),
        },
      };
    });
  };

  // Display Type Performance Data
  const generateDisplayTypePerformance = () => {
    const displayTypes = [
      { displayType: 'Store Entrance Display', count: 3, base: 5420, storeId: 'store1', brandId: 'brand1', campaignId: 'camp1' },
      { displayType: 'Mall Corridor Display', count: 2, base: 3820, storeId: 'store2', brandId: 'brand2', campaignId: 'camp2' },
      { displayType: 'Checkout Area Display', count: 5, base: 2180, storeId: 'store3', brandId: 'brand3', campaignId: 'camp3' },
      { displayType: 'Window Display', count: 4, base: 1980, storeId: 'store1', brandId: 'brand1', campaignId: 'camp1' },
      { displayType: 'Food Court Display', count: 2, base: 1540, storeId: 'store4', brandId: 'brand2', campaignId: 'camp2' },
    ];

    const totalPassersby = displayTypes.reduce((sum, d) => sum + d.base, 0);

    return displayTypes.map(item => {
      const passersby = item.base;
      const playbackDuration = Math.floor(Math.random() * 18000) + 7200; // 2-5 hours in seconds
      const playbackCount = Math.floor(Math.random() * 800) + 400;
      const views = Math.floor(passersby * (0.4 + Math.random() * 0.3));
      const avgViewDuration = 2.5 + Math.random() * 3; // 2.5-5.5 seconds

      return {
        displayType: item.displayType,
        count: item.count,
        status: 'active',
        storeId: item.storeId,
        brandId: item.brandId,
        campaignId: item.campaignId,
        passersby,
        passerbyPercent: Math.round((passersby / totalPassersby) * 100),
        playbackDuration,
        durationPercent: Math.round(Math.random() * 30) + 15,
        playbackCount,
        countPercent: Math.round(Math.random() * 30) + 15,
        views,
        avgViewDuration,
        engagementScore: calculateEngagementScore({
          passersby,
          views,
          avgViewDuration,
          playbackCount,
        }),
      };
    });
  };

  // Location Performance Data
  const generateLocationPerformance = () => {
    const locations = [
      { state: 'CA', storeCount: 8, basePasser: 12500, storeIds: ['store1'], brandIds: ['brand1', 'brand2'] },
      { state: 'NY', storeCount: 6, basePasser: 9800, storeIds: ['store2'], brandIds: ['brand2'] },
      { state: 'TX', storeCount: 5, basePasser: 7200, storeIds: ['store3'], brandIds: ['brand3'] },
      { state: 'FL', storeCount: 4, basePasser: 5100, storeIds: ['store4'], brandIds: ['brand2'] },
      { state: 'IL', storeCount: 3, basePasser: 3800, storeIds: ['store5'], brandIds: ['brand1', 'brand3'] },
    ];

    return locations.map(item => {
      const passersby = item.basePasser;
      const playbackDuration = Math.floor(Math.random() * 50000) + 20000;
      const playbackCount = Math.floor(Math.random() * 2000) + 1000;
      const views = Math.floor(passersby * (0.3 + Math.random() * 0.3));
      const avgViewDuration = 3.5;

      return {
        state: item.state,
        storeCount: item.storeCount,
        storeIds: item.storeIds,
        brandIds: item.brandIds,
        passersby,
        playbackDuration,
        playbackCount,
        views,
        engagementScore: calculateEngagementScore({
          passersby,
          views,
          avgViewDuration,
          playbackCount,
        }),
        latitude: 37.7749 + Math.random() * 10,
        longitude: -122.4194 + Math.random() * 20,
      };
    });
  };

  // Campaign Performance Summary
  const campaignSummary = {
    totalPassersby: 25500,
    totalPlaybackDuration: 71964, // in seconds (≈20 hours)
    totalPlaybackCount: 11975,
    totalViews: 8450,
    avgViewDuration: 3.8,
    engagementScore: 85,
  };

  return {
    visitorInsights: {
      timeSeriesData: generateVisitorInsightsData(),
    },
    campaignPerformance: {
      summary: campaignSummary,
      timeSeriesData: generateCampaignTimeSeriesData(),
      displayTypePerformance: generateDisplayTypePerformance(),
      locationPerformance: generateLocationPerformance(),
    },
  };
};

