import React from 'react';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Users, Clock, Play, Eye, Award, TrendingUp, Calendar, Target, RefreshCw, Download, MapPin, Filter as FilterIcon } from 'lucide-react';
import { generateRetailInsightsData } from './retailInsightsData';
import './App.css';

function RetailInsights() {
  const mockData = generateRetailInsightsData();
  const [activeTab, setActiveTab] = React.useState('visitor'); // 'visitor', 'store', 'appointments', 'campaign'
  const [selectedDateRange, setSelectedDateRange] = React.useState('7days');
  const [selectedBrand, setSelectedBrand] = React.useState('all');
  const [selectedStore, setSelectedStore] = React.useState('all');
  const [selectedCampaign, setSelectedCampaign] = React.useState('all');
  const [genderFilter, setGenderFilter] = React.useState('all');
  const [ageFilter, setAgeFilter] = React.useState('all');
  const [cvEnabled, setCvEnabled] = React.useState(true);
  const [sortConfig, setSortConfig] = React.useState({ key: 'passersby', direction: 'desc' });

  const COLORS = {
    passersby: '#3b82f6',
    playbackDuration: '#10b981',
    playbackCount: '#f59e0b',
    views: '#ec4899',
    engagement: '#8b5cf6',
  };

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
  const getSortedDisplayData = () => {
    const data = [...mockData.campaignPerformance.displayTypePerformance];
    data.sort((a, b) => {
      const aVal = a[sortConfig.key];
      const bVal = b[sortConfig.key];
      return sortConfig.direction === 'asc' ? aVal - bVal : bVal - aVal;
    });
    return data;
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
        <div className="filter-group date-range-picker">
          {activeTab === 'appointments' ? (
            <>
              <span style={{ fontSize: '13px', color: '#374151' }}>14 Jan, 2026</span>
              <span style={{ margin: '0 4px', color: '#9ca3af' }}>→</span>
              <span style={{ fontSize: '13px', color: '#374151' }}>20 Jan, 2026</span>
            </>
          ) : (
            <>
              <span style={{ fontSize: '13px', color: '#374151' }}>07 Jan, 2026</span>
              <span style={{ margin: '0 4px', color: '#9ca3af' }}>→</span>
              <span style={{ fontSize: '13px', color: '#374151' }}>13 Jan, 2026</span>
            </>
          )}
          <Calendar size={16} style={{ marginLeft: '4px', color: '#9ca3af' }} />
        </div>

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
                <option value="brand1">Nike</option>
                <option value="brand2">Adidas</option>
                <option value="brand3">Coca-Cola</option>
              </select>
            </div>
            <div className="filter-group">
              <MapPin size={18} />
              <select value={selectedStore} onChange={(e) => setSelectedStore(e.target.value)}>
                <option value="all">All Stores</option>
                <option value="store1">Flagship Store</option>
                <option value="store2">Central Mall</option>
                <option value="store3">Downtown Store</option>
              </select>
            </div>
            <div className="filter-group">
              <Target size={18} />
              <select value={selectedCampaign} onChange={(e) => setSelectedCampaign(e.target.value)}>
                <option value="all">All Campaigns</option>
                <option value="camp1">Summer Sale 2025</option>
                <option value="camp2">New Product Launch</option>
                <option value="camp3">Holiday Special</option>
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
          {/* Stats */}
          <div className="metrics-grid" style={{ gridTemplateColumns: 'repeat(3, 1fr)' }}>
            <div className="metric-card">
              <div className="metric-value">0</div>
              <div className="metric-label">Total Store Visitors</div>
            </div>
            <div className="metric-card">
              <div className="metric-value">0</div>
              <div className="metric-label">Total Walk-Ins (Queued)</div>
            </div>
            <div className="metric-card">
              <div className="metric-value">0</div>
              <div className="metric-label">Total Appointments (Served)</div>
            </div>
          </div>

          {/* Chart */}
          <div className="chart-card full-width">
            <div className="chart-header">
              <h3>Visitor Stats (07 Jan - 13 Jan)</h3>
              <div className="chart-legend">
                <div className="legend-item">
                  <div className="legend-dot" style={{ backgroundColor: '#3b82f6' }}></div>
                  <span>Total Appointments</span>
                </div>
                <div className="legend-item">
                  <div className="legend-dot" style={{ backgroundColor: '#10b981' }}></div>
                  <span>Total Walk-Ins (Queued)</span>
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
              <div className="metric-value">{mockData.campaignPerformance.summary.totalPassersby.toLocaleString()}</div>
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
              <div className="metric-value">{(mockData.campaignPerformance.summary.totalPlaybackDuration / 3600).toFixed(0)}h</div>
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
              <div className="metric-value">{mockData.campaignPerformance.summary.totalPlaybackCount.toLocaleString()}</div>
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
              <div className="metric-value">{mockData.campaignPerformance.summary.totalViews.toLocaleString()}</div>
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
              <div className="metric-value">{mockData.campaignPerformance.summary.avgViewDuration}s</div>
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
              <div className="metric-value">{mockData.campaignPerformance.summary.engagementScore}</div>
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
                    <th onClick={() => handleSort('displayType')}>
                      Display Type {sortConfig.key === 'displayType' && (sortConfig.direction === 'asc' ? '↑' : '↓')}
                    </th>
                    <th>Status</th>
                    <th onClick={() => handleSort('passersby')} style={{ cursor: 'pointer' }}>
                      Passerby {sortConfig.key === 'passersby' && (sortConfig.direction === 'asc' ? '↑' : '↓')}
                    </th>
                    <th onClick={() => handleSort('playbackDuration')} style={{ cursor: 'pointer' }}>
                      Playback Duration {sortConfig.key === 'playbackDuration' && (sortConfig.direction === 'asc' ? '↑' : '↓')}
                    </th>
                    <th onClick={() => handleSort('playbackCount')} style={{ cursor: 'pointer' }}>
                      Playback Count {sortConfig.key === 'playbackCount' && (sortConfig.direction === 'asc' ? '↑' : '↓')}
                    </th>
                    <th onClick={() => handleSort('views')} style={{ cursor: 'pointer' }}>
                      Views {sortConfig.key === 'views' && (sortConfig.direction === 'asc' ? '↑' : '↓')}
                    </th>
                    <th onClick={() => handleSort('engagementScore')} style={{ cursor: 'pointer' }}>
                      Engagement {sortConfig.key === 'engagementScore' && (sortConfig.direction === 'asc' ? '↑' : '↓')}
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {getSortedDisplayData().map((item, index) => (
                    <tr key={index}>
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
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Location Performance */}
          <div className="chart-card full-width">
            <div className="chart-header">
              <h3>Performance By State/Location</h3>
            </div>
            <div className="location-performance">
              <div className="map-placeholder">
                <MapPin size={48} style={{ color: '#cbd5e0' }} />
                <p>Interactive Map</p>
                <p className="map-subtitle">Markers sized by passerby volume, colored by engagement score</p>
              </div>
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
                    {mockData.campaignPerformance.locationPerformance.map((item, index) => (
                      <tr key={index}>
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

