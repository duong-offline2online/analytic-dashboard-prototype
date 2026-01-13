import React from 'react';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Users, Clock, Play, Eye, Award, TrendingUp, Calendar, Target, RefreshCw, Download, MapPin, Filter as FilterIcon } from 'lucide-react';
import { generateRetailInsightsData, BRANDS, STORES, CAMPAIGNS, calculateEngagementScore } from './retailInsightsData';
import { TimePeriodSelector } from './components/time-period-selector';
import InteractiveGeographicMap from './components/interactive-geographic-map';
import './App.css';

function RetailInsights() {
  const mockData = React.useMemo(() => generateRetailInsightsData(), []);
  const [activeTab, setActiveTab] = React.useState('visitor'); // 'visitor', 'store', 'appointments', 'campaign'
  const [selectedDateRange, setSelectedDateRange] = React.useState('7days');
  const [dateBounds, setDateBounds] = React.useState(() => {
    const today = new Date();
    const start = new Date(today);
    start.setDate(start.getDate() - 6);
    return { start, end: today };
  });
  const [selectedBrand, setSelectedBrand] = React.useState('all');
  const [selectedStore, setSelectedStore] = React.useState('all');
  const [selectedCampaign, setSelectedCampaign] = React.useState('all');
  const [genderFilter, setGenderFilter] = React.useState('all');
  const [ageFilter, setAgeFilter] = React.useState('all');
  const [cvEnabled, setCvEnabled] = React.useState(true);
  const [sortConfig, setSortConfig] = React.useState({ key: 'passersby', direction: 'desc' });
  const [selectedMapLocation, setSelectedMapLocation] = React.useState(null);
  const [currentPage, setCurrentPage] = React.useState(1);
  const PAGE_SIZE = 10;

  const COLORS = {
    passersby: '#3b82f6',
    playbackDuration: '#10b981',
    playbackCount: '#f59e0b',
    views: '#ec4899',
    engagement: '#8b5cf6',
  };

  // Helper function to calculate filtered passerby value based on gender and age filters
  const getFilteredPasserbyValue = (dayData) => {
    if (genderFilter === 'all' && ageFilter === 'all') {
      return dayData.passerby; // Return total passerby if no filters
    }

    let genderValue = 0;
    let ageValue = 0;

    // Calculate gender-filtered value
    if (genderFilter === 'all') {
      genderValue = dayData.passerby; // All genders
    } else if (genderFilter === 'male') {
      genderValue = dayData.passerbyMale;
    } else if (genderFilter === 'female') {
      genderValue = dayData.passerbyFemale;
    }

    // Calculate age-filtered value
    if (ageFilter === 'all') {
      ageValue = dayData.passerby; // All ages
    } else if (ageFilter === '18-24') {
      ageValue = dayData.passerby18_24;
    } else if (ageFilter === '25-34') {
      ageValue = dayData.passerby25_34;
    } else if (ageFilter === '35-44') {
      ageValue = dayData.passerby35_44;
    } else if (ageFilter === '45-54') {
      ageValue = dayData.passerby45_54;
    } else if (ageFilter === '55+') {
      ageValue = dayData.passerby55;
    }

    // If both filters are applied, return the intersection
    // (assuming both filters apply independently)
    if (genderFilter !== 'all' && ageFilter !== 'all') {
      // Combine both filters - estimate intersection
      const genderRatio = genderValue / dayData.passerby;
      const ageRatio = ageValue / dayData.passerby;
      return Math.floor(dayData.passerby * genderRatio * ageRatio);
    }

    // Return whichever filter is active (the one that's not 'all')
    return genderFilter !== 'all' ? genderValue : ageValue;
  };

  // Transform visitor data to include filtered passerby values
  const getVisitorChartData = () => {
    if (!mockData.visitorInsights?.timeSeriesData) return [];
    return mockData.visitorInsights.timeSeriesData.map(day => ({
      ...day,
      filteredPasserby: getFilteredPasserbyValue(day),
    }));
  };

  // Calculate summary from filtered display data
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

  // Filter data based on selected filters
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
      timeSeriesData: raw.timeSeriesData,
      displayTypePerformance: filteredDisplays,
      locationPerformance: filteredLocations,
    };
  }, [mockData, selectedBrand, selectedStore, selectedCampaign]);

  // Filter time series data based on demographic filters
  const getFilteredTimeSeriesData = () => {
    if (genderFilter === 'all' && ageFilter === 'all') {
      return mockData.campaignPerformance.timeSeriesData;
    }

    return mockData.campaignPerformance.timeSeriesData.map(item => {
      let filteredPassersby = item.passersby;
      let filteredViews = item.views;

      if (genderFilter !== 'all') {
        filteredPassersby = item.passerbyByGender[genderFilter] || 0;
        filteredViews = item.viewsByGender[genderFilter] || 0;
      }

      if (ageFilter !== 'all') {
        filteredPassersby = item.passerbyByAge[ageFilter] || 0;
        filteredViews = item.viewsByAge[ageFilter] || 0;
      }

      return {
        ...item,
        passersby: filteredPassersby,
        views: filteredViews,
      };
    });
  };

  // Sort display type data
  const getSortedDisplayData = (data = filteredData.displayTypePerformance) => {
    const sorted = [...data];
    sorted.sort((a, b) => {
      const aVal = a[sortConfig.key];
      const bVal = b[sortConfig.key];
      return sortConfig.direction === 'asc' ? aVal - bVal : bVal - aVal;
    });
    return sorted;
  };

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

  // Find top performer
  const getTopPerformer = (data) => {
    if (data.length === 0) return null;
    return data.reduce((max, item) =>
      item.engagementScore > max.engagementScore ? item : max
    , data[0]);
  };

  const handleSort = (key) => {
    setSortConfig(prev => ({
      key,
      direction: prev.key === key && prev.direction === 'desc' ? 'asc' : 'desc'
    }));
  };

  return (
    <>
      {/* Breadcrumb */}
      <div className="breadcrumb">
        <span>Home</span> &gt; <span>Retail Insights</span> &gt;
        <span className="active">
          {activeTab === 'visitor' && ' Visitor Insights'}
          {activeTab === 'store' && ' Store Insights'}
          {activeTab === 'appointments' && ' Upcoming Appointments'}
          {activeTab === 'campaign' && ' Campaign Performance'}
        </span>
      </div>

      {/* Date Range and Filters */}
      <div className="filters">
        {activeTab === 'appointments' ? (
          <div className="filter-group date-range-picker">
            <span style={{ fontSize: '13px', color: '#374151' }}>14 Jan, 2026</span>
            <span style={{ margin: '0 4px', color: '#9ca3af' }}>→</span>
            <span style={{ fontSize: '13px', color: '#374151' }}>20 Jan, 2026</span>
            <Calendar size={16} style={{ marginLeft: '4px', color: '#9ca3af' }} />
          </div>
        ) : (
          <TimePeriodSelector
            value={selectedDateRange}
            onChange={(range, dates) => {
              setSelectedDateRange(range);
              setDateBounds(dates);
            }}
          />
        )}

        {activeTab === 'visitor' && (
          <>
            <div className="filter-group">
              <select defaultValue="all">
                <option value="all">All Stores</option>
                <option value="store1">Store 1</option>
                <option value="store2">Store 2</option>
              </select>
            </div>
            <div className="filter-group">
              <select defaultValue="all">
                <option value="all">All Categories</option>
                <option value="cat1">Category 1</option>
                <option value="cat2">Category 2</option>
              </select>
            </div>
          </>
        )}

        {activeTab === 'store' && (
          <>
            <div className="filter-group">
              <select defaultValue="all">
                <option value="all">All Stores</option>
                <option value="store1">Store 1</option>
                <option value="store2">Store 2</option>
              </select>
            </div>
            <div className="filter-group">
              <select defaultValue="all">
                <option value="all">All Categories</option>
                <option value="cat1">Category 1</option>
                <option value="cat2">Category 2</option>
              </select>
            </div>
          </>
        )}

        {activeTab === 'campaign' && (
          <>
            <div className="filter-group">
              <TrendingUp size={18} />
              <select value={selectedBrand} onChange={(e) => setSelectedBrand(e.target.value)}>
                <option value="all">All Brands/Advertisers</option>
                {BRANDS.map(b => (
                  <option key={b.id} value={b.id}>{b.name}</option>
                ))}
              </select>
            </div>
            <div className="filter-group">
              <MapPin size={18} />
              <select value={selectedStore} onChange={(e) => setSelectedStore(e.target.value)}>
                <option value="all">All Stores</option>
                {STORES.map(s => (
                  <option key={s.id} value={s.id}>{s.name}</option>
                ))}
              </select>
            </div>
            <div className="filter-group">
              <Target size={18} />
              <select value={selectedCampaign} onChange={(e) => setSelectedCampaign(e.target.value)}>
                <option value="all">All Campaigns</option>
                {CAMPAIGNS.map(c => (
                  <option key={c.id} value={c.id}>{c.name}</option>
                ))}
              </select>
            </div>
          </>
        )}

        {activeTab === 'visitor' && (
          <div className="filter-group">
            <Target size={18} />
            <select>
              <option value="all">All Stores</option>
              <option value="store1">Flagship Store</option>
              <option value="store2">Central Mall</option>
            </select>
          </div>
        )}

        <button className="btn-secondary">
          <RefreshCw size={18} />
          Refresh
        </button>
        <button className="btn-secondary">
          <Download size={18} />
          Export
        </button>
      </div>

      {/* Tabs */}
      <div className="tabs">
        <button
          className={`tab ${activeTab === 'visitor' ? 'active' : ''}`}
          onClick={() => setActiveTab('visitor')}
        >
          Visitor Insights
        </button>
        <button
          className={`tab ${activeTab === 'store' ? 'active' : ''}`}
          onClick={() => setActiveTab('store')}
        >
          Store Insights
        </button>
        <button
          className={`tab ${activeTab === 'appointments' ? 'active' : ''}`}
          onClick={() => setActiveTab('appointments')}
        >
          Upcoming Appointments
        </button>
        <button
          className={`tab ${activeTab === 'campaign' ? 'active' : ''}`}
          onClick={() => setActiveTab('campaign')}
        >
          Campaign Performance
        </button>
      </div>

      {/* VISITOR INSIGHTS TAB */}
      {activeTab === 'visitor' && (
        <div className="tab-content">
          {/* CV Toggle Switch */}
          <div className="cv-toggle-wrapper" style={{ marginBottom: '20px' }}>
            <label className="cv-toggle">
              <input
                type="checkbox"
                checked={cvEnabled}
                onChange={(e) => setCvEnabled(e.target.checked)}
                aria-label="Enable Computer Vision analytics"
              />
              <span className="toggle-slider"></span>
            </label>
            <span className="cv-toggle-label">
              Computer Vision {cvEnabled ? 'Enabled' : 'Disabled'}
            </span>
          </div>

          {/* Stats - Calculate totals from visitor insights data */}
          {mockData.visitorInsights && (() => {
            const data = mockData.visitorInsights.timeSeriesData || [];
            const totalVisitors = data.reduce((sum, day) => sum + (day.visitors || 0), 0);
            const totalWalkIns = data.reduce((sum, day) => sum + (day.walkIns || 0), 0);
            const totalAppointments = data.reduce((sum, day) => sum + (day.appointments || 0), 0);

            return (
              <div className="metrics-grid" style={{ gridTemplateColumns: 'repeat(3, 1fr)' }}>
                <div className="metric-card">
                  <div className="metric-value">{totalVisitors}</div>
                  <div className="metric-label">Total Store Visitors</div>
                </div>
                <div className="metric-card">
                  <div className="metric-value">{totalWalkIns}</div>
                  <div className="metric-label">Total Walk-Ins (Queued)</div>
                </div>
                <div className="metric-card">
                  <div className="metric-value">{totalAppointments}</div>
                  <div className="metric-label">Total Appointments (Served)</div>
                </div>
              </div>
            );
          })()}


          {/* Chart - Visitors + Passerby Breakdown with CV Toggle */}
          <div className="chart-card full-width">
            <div className="chart-header">
              <h3>Visitor Stats (07 Jan - 13 Jan){cvEnabled ? ' - Enhanced with CV Passerby Data' : ''}</h3>
              {cvEnabled && (
                <div className="demographic-filters">
                  <button
                    className={`demo-filter-btn ${genderFilter === 'all' ? 'active' : ''}`}
                    onClick={() => setGenderFilter('all')}
                  >
                    All
                  </button>
                  <button
                    className={`demo-filter-btn ${genderFilter === 'male' ? 'active' : ''}`}
                    onClick={() => setGenderFilter('male')}
                  >
                    Male
                  </button>
                  <button
                    className={`demo-filter-btn ${genderFilter === 'female' ? 'active' : ''}`}
                    onClick={() => setGenderFilter('female')}
                  >
                    Female
                  </button>
                  <span style={{ margin: '0 8px', color: '#cbd5e0' }}>|</span>
                  <button
                    className={`demo-filter-btn ${ageFilter === 'all' ? 'active' : ''}`}
                    onClick={() => setAgeFilter('all')}
                  >
                    All Ages
                  </button>
                  <button
                    className={`demo-filter-btn ${ageFilter === '18-24' ? 'active' : ''}`}
                    onClick={() => setAgeFilter('18-24')}
                  >
                    18-24
                  </button>
                  <button
                    className={`demo-filter-btn ${ageFilter === '25-34' ? 'active' : ''}`}
                    onClick={() => setAgeFilter('25-34')}
                  >
                    25-34
                  </button>
                  <button
                    className={`demo-filter-btn ${ageFilter === '35-44' ? 'active' : ''}`}
                    onClick={() => setAgeFilter('35-44')}
                  >
                    35-44
                  </button>
                  <button
                    className={`demo-filter-btn ${ageFilter === '45-54' ? 'active' : ''}`}
                    onClick={() => setAgeFilter('45-54')}
                  >
                    45-54
                  </button>
                  <button
                    className={`demo-filter-btn ${ageFilter === '55+' ? 'active' : ''}`}
                    onClick={() => setAgeFilter('55+')}
                  >
                    55+
                  </button>
                </div>
              )}
            </div>
            <ResponsiveContainer width="100%" height={300}>
              {mockData.visitorInsights ? (
                <LineChart data={getVisitorChartData()}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                  <XAxis dataKey="day" stroke="#6b7280" tick={{ fontSize: 12 }} />
                  <YAxis stroke="#6b7280" tick={{ fontSize: 12 }} />
                  <Tooltip contentStyle={{ backgroundColor: '#fff', border: '1px solid #e5e7eb', borderRadius: '8px' }} />
                  <Legend />

                  {/* Always show Store Visitors, Walk-Ins, and Appointments */}
                  <Line
                    type="monotone"
                    dataKey="visitors"
                    stroke="#6366f1"
                    strokeWidth={2}
                    name="Store Visitors"
                    dot={{ r: 4 }}
                  />
                  <Line
                    type="monotone"
                    dataKey="walkIns"
                    stroke="#10b981"
                    strokeWidth={2}
                    name="Total Walk-Ins (Queued)"
                    dot={{ r: 4 }}
                  />
                  <Line
                    type="monotone"
                    dataKey="appointments"
                    stroke="#3b82f6"
                    strokeWidth={2}
                    name="Total Appointments (Served)"
                    dot={{ r: 4 }}
                  />

                  {/* Show Single Aggregated Passerby Line Based on Filters */}
                  {cvEnabled && (
                    <Line
                      type="monotone"
                      dataKey="filteredPasserby"
                      stroke="#f59e0b"
                      strokeWidth={2}
                      name="Passerby Audience (CV)"
                      dot={{ r: 4 }}
                    />
                  )}
                </LineChart>
              ) : (
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%', color: '#9ca3af', fontSize: '14px' }}>
                  Loading data...
                </div>
              )}
            </ResponsiveContainer>
          </div>
        </div>
      )}

      {/* STORE INSIGHTS TAB */}
      {activeTab === 'store' && (
        <div className="tab-content">
          <div className="metrics-grid" style={{ gridTemplateColumns: 'repeat(3, 1fr)' }}>
            <div className="metric-card">
              <div className="metric-value">0</div>
              <div className="metric-label">Active Stores</div>
            </div>
            <div className="metric-card">
              <div className="metric-value">- min - sec</div>
              <div className="metric-label">Average Wait Time</div>
            </div>
            <div className="metric-card">
              <div className="metric-value">- min - sec</div>
              <div className="metric-label">Average Serve Time</div>
            </div>
          </div>

          <div className="chart-card full-width">
            <div className="chart-header">
              <h3>Ave Wait/Serve Time (By Store)</h3>
              <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                <div className="chart-legend">
                  <div className="legend-item">
                    <div className="legend-dot" style={{ backgroundColor: '#f97316' }}></div>
                    <span>Ave Waiting Time</span>
                  </div>
                  <div className="legend-item">
                    <div className="legend-dot" style={{ backgroundColor: '#10b981' }}></div>
                    <span>Ave Serve Time</span>
                  </div>
                  <div className="legend-item">
                    <div className="legend-dot" style={{ backgroundColor: '#d1d5db' }}></div>
                    <span>Ave Looking For Time</span>
                  </div>
                  <div className="legend-item">
                    <div className="legend-dot" style={{ backgroundColor: '#9ca3af' }}></div>
                    <span>Ave On Hold Time</span>
                  </div>
                </div>
                <div className="filter-group" style={{ marginLeft: '8px' }}>
                  <select defaultValue="wait">
                    <option value="wait">Sort by Ave Wait Time</option>
                    <option value="serve">Sort by Ave Serve Time</option>
                  </select>
                </div>
              </div>
            </div>
            <ResponsiveContainer width="100%" height={300}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%', color: '#9ca3af', fontSize: '14px' }}>
                No data available
              </div>
            </ResponsiveContainer>
          </div>
        </div>
      )}

      {/* UPCOMING APPOINTMENTS TAB */}
      {activeTab === 'appointments' && (
        <div className="tab-content">
          <div className="metrics-grid" style={{ gridTemplateColumns: 'repeat(3, 1fr)' }}>
            <div className="metric-card">
              <div className="metric-value">0%</div>
              <div className="metric-label">of Appointment Slots Booked</div>
            </div>
            <div className="metric-card">
              <div className="metric-value">305</div>
              <div className="metric-label">Appointment Slots Available</div>
            </div>
            <div className="metric-card">
              <div className="metric-value">305</div>
              <div className="metric-label">Total Bookable Appointment Slots</div>
            </div>
          </div>

          <div className="chart-card full-width">
            <div className="chart-header">
              <h3>Upcoming Appointments Bookings (14 Jan - 20 Jan)</h3>
            </div>
            <ResponsiveContainer width="100%" height={300}>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100%' }}>
                <div style={{ width: '180px', height: '180px', borderRadius: '50%', backgroundColor: '#e5e7eb', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '16px' }}>
                </div>
                <div style={{ fontSize: '16px', fontWeight: '600', color: '#1a202c', marginBottom: '8px' }}>Overview</div>
                <div style={{ fontSize: '13px', color: '#6b7280', marginBottom: '16px' }}>(14 Jan, 2026 - 20 Jan, 2026)</div>
                <div style={{ color: '#9ca3af', fontSize: '14px' }}>No data available</div>
              </div>
            </ResponsiveContainer>
          </div>
        </div>
      )}

      {/* CAMPAIGN PERFORMANCE TAB */}
      {activeTab === 'campaign' && (
        <div className="tab-content">
          {/* Summary Metrics */}
          <div className="metrics-grid">
            <div className="metric-card">
              <div className="metric-header">
                <span className="metric-label">Total Passerby Audience</span>
                <Users size={20} className="metric-icon" style={{ color: COLORS.passersby }} />
              </div>
              <div className="metric-value">{filteredData.summary.totalPassersby.toLocaleString()}</div>
              <div className="metric-footer">
                <span className="metric-change positive">+12.5%</span>
                <span className="metric-subtitle">vs. last period</span>
              </div>
            </div>

            <div className="metric-card">
              <div className="metric-header">
                <span className="metric-label">Total Campaign Playback Duration</span>
                <Clock size={20} className="metric-icon" style={{ color: COLORS.playbackDuration }} />
              </div>
              <div className="metric-value">{(filteredData.summary.totalPlaybackDuration / 3600).toFixed(0)}h</div>
              <div className="metric-footer">
                <span className="metric-change positive">+8.3%</span>
                <span className="metric-subtitle">Cumulative across displays</span>
              </div>
            </div>

            <div className="metric-card">
              <div className="metric-header">
                <span className="metric-label">Total Campaign Playback Count</span>
                <Play size={20} className="metric-icon" style={{ color: COLORS.playbackCount }} />
              </div>
              <div className="metric-value">{filteredData.summary.totalPlaybackCount.toLocaleString()}</div>
              <div className="metric-footer">
                <span className="metric-change positive">+15.2%</span>
                <span className="metric-subtitle">Times campaign played</span>
              </div>
            </div>

            <div className="metric-card">
              <div className="metric-header">
                <span className="metric-label">Total Campaign Views</span>
                <Eye size={20} className="metric-icon" style={{ color: COLORS.views }} />
              </div>
              <div className="metric-value">{filteredData.summary.totalViews.toLocaleString()}</div>
              <div className="metric-footer">
                <span className="metric-change positive">+18.7%</span>
                <span className="metric-subtitle">Confirmed views</span>
              </div>
            </div>

            <div className="metric-card">
              <div className="metric-header">
                <span className="metric-label">Average View Duration</span>
                <Clock size={20} className="metric-icon" style={{ color: COLORS.engagement }} />
              </div>
              <div className="metric-value">{filteredData.summary.avgViewDuration}s</div>
              <div className="metric-footer">
                <span className="metric-change positive">+0.4s</span>
                <span className="metric-subtitle">Per campaign view</span>
              </div>
            </div>

            <div className="metric-card">
              <div className="metric-header">
                <span className="metric-label">Engagement Score</span>
                <Award size={20} className="metric-icon" style={{ color: '#14b8a6' }} />
              </div>
              <div className="metric-value">{filteredData.summary.engagementScore}</div>
              <div className="metric-footer">
                <span className="metric-change positive">+3 pts</span>
                <span className="metric-subtitle">Excellent performance</span>
              </div>
            </div>
          </div>

          {/* Time Series Chart */}
          <div className="chart-card full-width">
            <div className="chart-header">
              <h3>Passerby Audience & Campaign Engagement Over Time</h3>
              {cvEnabled && (
                <div className="demographic-filters">
                  <button
                    className={`demo-filter-btn ${genderFilter === 'all' ? 'active' : ''}`}
                    onClick={() => setGenderFilter('all')}
                  >
                    All
                  </button>
                  <button
                    className={`demo-filter-btn ${genderFilter === 'male' ? 'active' : ''}`}
                    onClick={() => setGenderFilter('male')}
                  >
                    Male
                  </button>
                  <button
                    className={`demo-filter-btn ${genderFilter === 'female' ? 'active' : ''}`}
                    onClick={() => setGenderFilter('female')}
                  >
                    Female
                  </button>
                  <span style={{ margin: '0 8px', color: '#cbd5e0' }}>|</span>
                  <button
                    className={`demo-filter-btn ${ageFilter === 'all' ? 'active' : ''}`}
                    onClick={() => setAgeFilter('all')}
                  >
                    All Ages
                  </button>
                  <button
                    className={`demo-filter-btn ${ageFilter === '18-24' ? 'active' : ''}`}
                    onClick={() => setAgeFilter('18-24')}
                  >
                    18-24
                  </button>
                  <button
                    className={`demo-filter-btn ${ageFilter === '25-34' ? 'active' : ''}`}
                    onClick={() => setAgeFilter('25-34')}
                  >
                    25-34
                  </button>
                  <button
                    className={`demo-filter-btn ${ageFilter === '35-44' ? 'active' : ''}`}
                    onClick={() => setAgeFilter('35-44')}
                  >
                    35-44
                  </button>
                  <button
                    className={`demo-filter-btn ${ageFilter === '45-54' ? 'active' : ''}`}
                    onClick={() => setAgeFilter('45-54')}
                  >
                    45-54
                  </button>
                  <button
                    className={`demo-filter-btn ${ageFilter === '55+' ? 'active' : ''}`}
                    onClick={() => setAgeFilter('55+')}
                  >
                    55+
                  </button>
                </div>
              )}
            </div>
            <ResponsiveContainer width="100%" height={350}>
              <LineChart data={getFilteredTimeSeriesData()}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis
                  dataKey="day"
                  stroke="#6b7280"
                  tick={{ fontSize: 12 }}
                />
                <YAxis stroke="#6b7280" tick={{ fontSize: 12 }} />
                <Tooltip
                  contentStyle={{ backgroundColor: '#fff', border: '1px solid #e5e7eb', borderRadius: '8px' }}
                />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="passersby"
                  stroke={COLORS.passersby}
                  strokeWidth={2}
                  name="Passerby Audience"
                  dot={{ r: 4 }}
                />
                <Line
                  type="monotone"
                  dataKey="playbackDuration"
                  stroke={COLORS.playbackDuration}
                  strokeWidth={2}
                  name="Playback Duration (hrs)"
                  dot={{ r: 4 }}
                />
                <Line
                  type="monotone"
                  dataKey="playbackCount"
                  stroke={COLORS.playbackCount}
                  strokeWidth={2}
                  name="Playback Count"
                  dot={{ r: 4 }}
                />
                <Line
                  type="monotone"
                  dataKey="views"
                  stroke={COLORS.views}
                  strokeWidth={2}
                  name="Campaign Views"
                  dot={{ r: 4 }}
                />
                <Line
                  type="monotone"
                  dataKey="engagementScore"
                  stroke={COLORS.engagement}
                  strokeWidth={2}
                  name="Engagement Score"
                  dot={{ r: 4 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Display Type Performance Table */}
          <div className="chart-card full-width">
            <div className="chart-header">
              <h3>Performance By Display Type</h3>
            </div>
            <div className="performance-table">
              <table>
                <thead>
                  <tr>
                    <th style={{ cursor: 'pointer' }} onClick={() => handleSort('displayType')}>
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '8px' }}>
                        Display Type
                        <span style={{ fontSize: '11px', opacity: 0.6 }}>
                          {sortConfig.key === 'displayType' && (sortConfig.direction === 'asc' ? '↑' : '↓')}
                        </span>
                      </div>
                    </th>
                    <th>Status</th>
                    <th style={{ cursor: 'pointer' }} onClick={() => handleSort('passersby')}>
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '8px' }}>
                        Passerby
                        <span style={{ fontSize: '11px', opacity: 0.6 }}>
                          {sortConfig.key === 'passersby' && (sortConfig.direction === 'asc' ? '↑' : '↓')}
                        </span>
                      </div>
                    </th>
                    <th style={{ cursor: 'pointer' }} onClick={() => handleSort('playbackDuration')}>
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '8px' }}>
                        Playback Duration
                        <span style={{ fontSize: '11px', opacity: 0.6 }}>
                          {sortConfig.key === 'playbackDuration' && (sortConfig.direction === 'asc' ? '↑' : '↓')}
                        </span>
                      </div>
                    </th>
                    <th style={{ cursor: 'pointer' }} onClick={() => handleSort('playbackCount')}>
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '8px' }}>
                        Playback Count
                        <span style={{ fontSize: '11px', opacity: 0.6 }}>
                          {sortConfig.key === 'playbackCount' && (sortConfig.direction === 'asc' ? '↑' : '↓')}
                        </span>
                      </div>
                    </th>
                    <th style={{ cursor: 'pointer' }} onClick={() => handleSort('views')}>
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '8px' }}>
                        Views
                        <span style={{ fontSize: '11px', opacity: 0.6 }}>
                          {sortConfig.key === 'views' && (sortConfig.direction === 'asc' ? '↑' : '↓')}
                        </span>
                      </div>
                    </th>
                    <th style={{ cursor: 'pointer' }} onClick={() => handleSort('engagementScore')}>
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '8px' }}>
                        Engagement
                        <span style={{ fontSize: '11px', opacity: 0.6 }}>
                          {sortConfig.key === 'engagementScore' && (sortConfig.direction === 'asc' ? '↑' : '↓')}
                        </span>
                      </div>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {getPaginatedData(getSortedDisplayData()).map((item, index) => {
                    const topPerformer = getTopPerformer(filteredData.displayTypePerformance);
                    const isTopPerformer = topPerformer && item.displayType === topPerformer.displayType;
                    return (
                    <tr key={index} className={isTopPerformer ? 'top-performer-row' : ''}>
                      <td>
                        <strong>{item.displayType}</strong>
                        <div className="table-subtitle">({item.count} displays)</div>
                      </td>
                      <td>
                        <span className={`status-badge ${item.status}`}>
                          {item.status === 'active' ? 'Active' : 'Inactive'}
                        </span>
                      </td>
                      <td>
                        {item.passersby.toLocaleString()}
                        <div className="table-subtitle">{item.passerbyPercent}%</div>
                      </td>
                      <td>
                        {Math.floor(item.playbackDuration / 3600)}h {Math.floor((item.playbackDuration % 3600) / 60)}m
                        <div className="table-subtitle">{item.durationPercent}%</div>
                      </td>
                      <td>
                        {item.playbackCount.toLocaleString()}
                        <div className="table-subtitle">{item.countPercent}%</div>
                      </td>
                      <td>
                        {item.views.toLocaleString()}
                        <div className="table-subtitle">{Math.round((item.views / item.passersby) * 100)}% view rate</div>
                      </td>
                      <td>
                        <div className="engagement-cell">
                          <span className="engagement-value">{item.engagementScore}</span>
                          <div className="engagement-bar">
                            <div
                              className="engagement-fill"
                              style={{
                                width: `${item.engagementScore}%`,
                                backgroundColor: item.engagementScore > 75 ? '#10b981' : item.engagementScore > 50 ? '#f59e0b' : '#ef4444'
                              }}
                            ></div>
                          </div>
                        </div>
                      </td>
                    </tr>
                  );
                  })}
                </tbody>
              </table>
              {filteredData.displayTypePerformance.length === 0 && (
                <div className="filter-empty-state">
                  <p>No data matches the selected filters.</p>
                  <button
                    onClick={() => {
                      setSelectedBrand('all');
                      setSelectedStore('all');
                      setSelectedCampaign('all');
                    }}
                    style={{
                      padding: '8px 16px',
                      background: '#3b82f6',
                      color: 'white',
                      border: 'none',
                      borderRadius: '6px',
                      cursor: 'pointer',
                      fontSize: '14px',
                      marginTop: '12px'
                    }}
                  >
                    Clear Filters
                  </button>
                </div>
              )}
              {getTotalPages(getSortedDisplayData()) > 1 && (
                <div className="pagination">
                  <button
                    className="pagination-btn"
                    disabled={currentPage === 1}
                    onClick={() => setCurrentPage(currentPage - 1)}
                    aria-label="Previous page"
                  >
                    &larr; Prev
                  </button>
                  <div className="pagination-info">
                    Page {currentPage} of {getTotalPages(getSortedDisplayData())}
                  </div>
                  <button
                    className="pagination-btn"
                    disabled={currentPage === getTotalPages(getSortedDisplayData())}
                    onClick={() => setCurrentPage(currentPage + 1)}
                    aria-label="Next page"
                  >
                    Next &rarr;
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Location Performance */}
          <div className="chart-card full-width">
            <div className="chart-header">
              <h3>Performance By State/Location</h3>
            </div>
            <div className="location-performance">
              <InteractiveGeographicMap
                data={filteredData.locationPerformance}
                onLocationSelect={(state) => setSelectedMapLocation(state)}
                selectedLocation={selectedMapLocation}
              />
              <div className="location-table">
                <table>
                  <thead>
                    <tr>
                      <th>State/Location</th>
                      <th>Passerby</th>
                      <th>Engagement</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredData.locationPerformance.map((item, index) => (
                      <tr
                        key={index}
                        className={selectedMapLocation === item.state ? 'selected-row' : ''}
                        onClick={() => setSelectedMapLocation(item.state)}
                      >
                        <td>
                          <strong>{item.state}</strong>
                          <div className="table-subtitle">{item.storeCount} stores</div>
                        </td>
                        <td>{item.passersby.toLocaleString()}</td>
                        <td>
                          <span className={`score-badge score-${item.engagementScore > 75 ? 'high' : item.engagementScore > 50 ? 'medium' : 'low'}`}>
                            {item.engagementScore}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default RetailInsights;

