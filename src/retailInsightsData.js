// Mock data generator for Retail Insights
export const generateRetailInsightsData = () => {
  // Campaign Performance Time Series Data (by day)
  const generateCampaignTimeSeriesData = () => {
    const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
    return days.map(day => {
      const passersby = Math.floor(Math.random() * 5000) + 3000;
      const views = Math.floor(passersby * (0.3 + Math.random() * 0.3));

      return {
        day,
        passersby,
        playbackDuration: Math.floor(Math.random() * 200) + 100, // in hours
        playbackCount: Math.floor(Math.random() * 500) + 200,
        views,
        engagementScore: Math.floor(Math.random() * 30) + 70,
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
      { displayType: 'Store Entrance Display', count: 3, base: 5420 },
      { displayType: 'Mall Corridor Display', count: 2, base: 3820 },
      { displayType: 'Checkout Area Display', count: 5, base: 2180 },
      { displayType: 'Window Display', count: 4, base: 1980 },
      { displayType: 'Food Court Display', count: 2, base: 1540 },
    ];

    const totalPassersby = displayTypes.reduce((sum, d) => sum + d.base, 0);

    return displayTypes.map(item => {
      const passersby = item.base;
      const playbackDuration = Math.floor(Math.random() * 18000) + 7200; // 2-5 hours in seconds
      const playbackCount = Math.floor(Math.random() * 800) + 400;
      const views = Math.floor(passersby * (0.4 + Math.random() * 0.3));

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
        engagementScore: Math.floor(Math.random() * 25) + 70,
      };
    });
  };

  // Location Performance Data
  const generateLocationPerformance = () => {
    const locations = [
      { state: 'CA', storeCount: 8, basePasser: 12500 },
      { state: 'NY', storeCount: 6, basePasser: 9800 },
      { state: 'TX', storeCount: 5, basePasser: 7200 },
      { state: 'FL', storeCount: 4, basePasser: 5100 },
      { state: 'IL', storeCount: 3, basePasser: 3800 },
    ];

    return locations.map(item => ({
      state: item.state,
      storeCount: item.storeCount,
      passersby: item.basePasser,
      playbackDuration: Math.floor(Math.random() * 50000) + 20000,
      playbackCount: Math.floor(Math.random() * 2000) + 1000,
      views: Math.floor(item.basePasser * (0.3 + Math.random() * 0.3)),
      engagementScore: Math.floor(Math.random() * 25) + 70,
      latitude: 37.7749 + Math.random() * 10,
      longitude: -122.4194 + Math.random() * 20,
    }));
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
    campaignPerformance: {
      summary: campaignSummary,
      timeSeriesData: generateCampaignTimeSeriesData(),
      displayTypePerformance: generateDisplayTypePerformance(),
      locationPerformance: generateLocationPerformance(),
    },
  };
};

