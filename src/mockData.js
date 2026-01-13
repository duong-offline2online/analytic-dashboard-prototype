// Mock data generator for the dashboard prototype
export const generateMockData = () => {
  // Generate time series data for the last 7 days by hour
  const generateTimeSeriesData = (days = 7) => {
    const data = [];
    const now = new Date();

    for (let day = days - 1; day >= 0; day--) {
      for (let hour = 0; hour < 24; hour++) {
        const date = new Date(now);
        date.setDate(date.getDate() - day);
        date.setHours(hour, 0, 0, 0);

        // Simulate traffic patterns (higher during business hours)
        const baseTraffic = hour >= 9 && hour <= 21 ?
          Math.floor(Math.random() * 150) + 100 :
          Math.floor(Math.random() * 50) + 10;

        data.push({
          timestamp: date.toISOString(),
          hour: `${hour.toString().padStart(2, '0')}:00`,
          date: date.toLocaleDateString(),
          passersby: baseTraffic,
          views: Math.floor(baseTraffic * (0.3 + Math.random() * 0.3)), // 30-60% view rate
          engaged: Math.floor(baseTraffic * (0.1 + Math.random() * 0.2)), // 10-30% engagement
        });
      }
    }
    return data;
  };

  // Generate demographic data
  const generateDemographicData = () => {
    return [
      { segment: 'Male 18-24', passersby: 1250, views: 625, engagement: 312, color: '#3b82f6' },
      { segment: 'Male 25-34', passersby: 1580, views: 790, engagement: 395, color: '#2563eb' },
      { segment: 'Male 35-44', passersby: 980, views: 490, engagement: 245, color: '#1d4ed8' },
      { segment: 'Male 45-54', passersby: 720, views: 360, engagement: 180, color: '#1e40af' },
      { segment: 'Male 55+', passersby: 420, views: 210, engagement: 105, color: '#1e3a8a' },
      { segment: 'Female 18-24', passersby: 1380, views: 690, engagement: 345, color: '#ec4899' },
      { segment: 'Female 25-34', passersby: 1720, views: 860, engagement: 430, color: '#db2777' },
      { segment: 'Female 35-44', passersby: 1050, views: 525, engagement: 262, color: '#be185d' },
      { segment: 'Female 45-54', passersby: 810, views: 405, engagement: 202, color: '#9f1239' },
      { segment: 'Female 55+', passersby: 490, views: 245, engagement: 122, color: '#881337' },
    ];
  };

  // Generate view duration data
  const generateViewDurationData = () => {
    return [
      { duration: '< 1s', count: 1250, percentage: 28 },
      { duration: '1-2s', count: 1580, percentage: 35 },
      { duration: '2-3s', count: 890, percentage: 20 },
      { duration: '3-5s', count: 520, percentage: 12 },
      { duration: '5-10s', count: 180, percentage: 4 },
      { duration: '> 10s', count: 80, percentage: 1 },
    ];
  };

  // Generate display performance data
  const generateDisplayData = () => {
    return [
      {
        id: 'D-001',
        name: 'Store Entrance Display',
        store: 'Flagship Store',
        location: 'Entrance',
        type: 'Portrait',
        passersby: 5420,
        rots: 4890, // 90% viewability
        vac: 3180, // 65% attention
        views: 2850,
        avgViewTime: 3.2,
        engagementScore: 87,
        status: 'active'
      },
      {
        id: 'D-002',
        name: 'Mall Corridor Display',
        store: 'Central Mall',
        location: 'Corridor B',
        type: 'Interactive Screen',
        passersby: 3820,
        rots: 3240, // 85% viewability
        vac: 2110, // 65% attention
        views: 1980,
        avgViewTime: 4.5,
        engagementScore: 92,
        status: 'active'
      },
      {
        id: 'D-003',
        name: 'Checkout Area Display',
        store: 'Flagship Store',
        location: 'Checkout',
        type: 'Portrait',
        passersby: 2180,
        rots: 1960, // 90% viewability
        vac: 1370, // 70% attention
        views: 1250,
        avgViewTime: 5.8,
        engagementScore: 95,
        status: 'active'
      },
      {
        id: 'D-004',
        name: 'Window Display',
        store: 'Downtown Store',
        location: 'Street Window',
        type: 'Projection',
        passersby: 8920,
        rots: 6250, // 70% viewability
        vac: 3125, // 50% attention
        views: 2680,
        avgViewTime: 2.1,
        engagementScore: 68,
        status: 'active'
      },
      {
        id: 'D-005',
        name: 'Food Court Display',
        store: 'Central Mall',
        location: 'Food Court',
        type: 'Portrait',
        passersby: 4560,
        rots: 3650, // 80% viewability
        vac: 2190, // 60% attention
        views: 1920,
        avgViewTime: 3.8,
        engagementScore: 83,
        status: 'active'
      },
    ];
  };

  // Generate campaign data
  const generateCampaignData = () => {
    return [
      {
        id: 'C-001',
        name: 'Summer Sale 2025',
        startDate: '2025-12-01',
        endDate: '2025-12-31',
        displays: ['D-001', 'D-002', 'D-003'],
        totalPassersby: 11420,
        totalViews: 6080,
        avgEngagementScore: 91,
        status: 'active'
      },
      {
        id: 'C-002',
        name: 'New Product Launch',
        startDate: '2025-12-15',
        endDate: '2026-01-15',
        displays: ['D-004', 'D-005'],
        totalPassersby: 13480,
        totalViews: 4600,
        avgEngagementScore: 75,
        status: 'active'
      },
    ];
  };

  // Generate detailed campaign playback data
  const generateCampaignPlaybackData = () => {
    const campaigns = [
      { id: 'C-001', name: 'Summer Sale 2025', duration: 30 },
      { id: 'C-002', name: 'New Product Launch', duration: 45 },
      { id: 'C-003', name: 'Holiday Special', duration: 60 },
      { id: 'C-004', name: 'Brand Awareness', duration: 15 },
    ];

    const creatives = ['CR-A', 'CR-B', 'CR-C'];
    const displays = ['D-001', 'D-002', 'D-003', 'D-004', 'D-005'];
    const stores = ['Flagship Store', 'Central Mall', 'Downtown Store'];

    const data = [];
    const now = new Date();

    // Generate playback records for last 7 days
    for (let day = 6; day >= 0; day--) {
      for (let hour = 0; hour < 24; hour++) {
        const playsPerHour = hour >= 9 && hour <= 21 ? Math.floor(Math.random() * 8) + 4 : Math.floor(Math.random() * 3) + 1;

        for (let play = 0; play < playsPerHour; play++) {
          const campaign = campaigns[Math.floor(Math.random() * campaigns.length)];
          const creative = creatives[Math.floor(Math.random() * creatives.length)];
          const display = displays[Math.floor(Math.random() * displays.length)];
          const store = stores[Math.floor(Math.random() * stores.length)];

          const startDate = new Date(now);
          startDate.setDate(startDate.getDate() - day);
          startDate.setHours(hour, Math.floor(Math.random() * 60), Math.floor(Math.random() * 60));

          const endDate = new Date(startDate.getTime() + campaign.duration * 1000);

          // Calculate total playback in loop
          const loopDuration = 300; // 5 minutes loop
          const spotsInLoop = 6;
          const spotPosition = Math.floor(Math.random() * spotsInLoop) + 1;
          const shareOfTime = ((campaign.duration / loopDuration) * 100).toFixed(1);

          data.push({
            campaignId: campaign.id,
            campaignName: campaign.name,
            creativeId: creative,
            displayId: display,
            storeName: store,
            duration: campaign.duration,
            startTimestamp: startDate.toISOString().replace('T', ' ').substring(0, 19),
            endTimestamp: endDate.toISOString().replace('T', ' ').substring(0, 19),
            playbackCount: 1,
            engagementScore: Math.floor(Math.random() * 30) + 70,
            displayLocationScore: Math.floor(Math.random() * 25) + 70,
            storeLocationScore: Math.floor(Math.random() * 20) + 75,
            qrInteractionScore: Math.random() > 0.5 ? Math.floor(Math.random() * 50) + 20 : 0,
            shareOfTime: parseFloat(shareOfTime),
            spotPosition: `${spotPosition} of ${spotsInLoop}`,
            date: startDate.toISOString().split('T')[0],
            hour: startDate.getHours()
          });
        }
      }
    }

    return data;
  };

  // Generate campaign summary metrics
  const generateCampaignSummary = (playbackData) => {
    const campaigns = {};

    playbackData.forEach(record => {
      if (!campaigns[record.campaignId]) {
        campaigns[record.campaignId] = {
          campaignId: record.campaignId,
          campaignName: record.campaignName,
          duration: record.duration,
          playbackCount: 0,
          totalPlaybackDuration: 0,
          engagementScores: [],
          displayLocationScores: [],
          storeLocationScores: [],
          qrInteractionScores: [],
          creatives: new Set(),
          displays: new Set(),
          stores: new Set(),
          startTimestamp: record.startTimestamp,
          endTimestamp: record.endTimestamp
        };
      }

      const camp = campaigns[record.campaignId];
      camp.playbackCount += 1;
      camp.totalPlaybackDuration += record.duration;
      camp.engagementScores.push(record.engagementScore);
      camp.displayLocationScores.push(record.displayLocationScore);
      camp.storeLocationScores.push(record.storeLocationScore);
      if (record.qrInteractionScore > 0) {
        camp.qrInteractionScores.push(record.qrInteractionScore);
      }
      camp.creatives.add(record.creativeId);
      camp.displays.add(record.displayId);
      camp.stores.add(record.storeName);

      // Keep earliest start and latest end
      if (record.startTimestamp < camp.startTimestamp) {
        camp.startTimestamp = record.startTimestamp;
      }
      if (record.endTimestamp > camp.endTimestamp) {
        camp.endTimestamp = record.endTimestamp;
      }
    });

    return Object.values(campaigns).map(camp => ({
      campaignId: camp.campaignId,
      campaignName: camp.campaignName,
      duration: camp.duration,
      startTimestamp: camp.startTimestamp,
      endTimestamp: camp.endTimestamp,
      playbackCount: camp.playbackCount,
      totalPlaybackDuration: (camp.totalPlaybackDuration / 3600).toFixed(2), // Convert to hours
      totalPlaybackDurationDays: (camp.totalPlaybackDuration / 86400).toFixed(2), // Convert to days
      avgEngagementScore: Math.round(camp.engagementScores.reduce((a, b) => a + b, 0) / camp.engagementScores.length),
      avgDisplayLocationScore: Math.round(camp.displayLocationScores.reduce((a, b) => a + b, 0) / camp.displayLocationScores.length),
      avgStoreLocationScore: Math.round(camp.storeLocationScores.reduce((a, b) => a + b, 0) / camp.storeLocationScores.length),
      avgQRInteractionScore: camp.qrInteractionScores.length > 0
        ? Math.round(camp.qrInteractionScores.reduce((a, b) => a + b, 0) / camp.qrInteractionScores.length)
        : 0,
      creativeCount: camp.creatives.size,
      displayCount: camp.displays.size,
      storeCount: camp.stores.size,
      status: 'active'
    }));
  };

  // Generate minute-by-minute data for detailed view
  const generateMinuteData = () => {
    const data = [];
    const now = new Date();

    for (let minute = 59; minute >= 0; minute--) {
      const time = new Date(now);
      time.setMinutes(time.getMinutes() - minute);

      const passersby = Math.floor(Math.random() * 8) + 2;
      const views = Math.floor(passersby * (0.3 + Math.random() * 0.4));

      data.push({
        time: time.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
        passersby,
        views,
        male: Math.floor(passersby * 0.5),
        female: Math.floor(passersby * 0.5),
      });
    }
    return data;
  };

  const campaignPlaybackData = generateCampaignPlaybackData();
  const campaignSummary = generateCampaignSummary(campaignPlaybackData);

  return {
    timeSeriesData: generateTimeSeriesData(),
    demographicData: generateDemographicData(),
    viewDurationData: generateViewDurationData(),
    displayData: generateDisplayData(),
    campaignData: generateCampaignData(),
    campaignPlaybackData: campaignPlaybackData,
    campaignSummary: campaignSummary,
    minuteData: generateMinuteData(),
    // Summary metrics
    summary: {
      totalPassersby: 25500,
      totalROTS: 19990,
      totalVAC: 11975,
      totalViews: 10680,
      avgViewTime: 3.8,
      avgEngagementScore: 85,
      rotsConversionRate: 78.4, // ROTS/Passersby
      vacConversionRate: 59.9, // VAC/ROTS
      viewConversionRate: 89.2, // Views/VAC
    }
  };
};

