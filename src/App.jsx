import React from 'react';
import { BarChart, Bar, LineChart, Line, AreaChart, Area, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { TrendingUp, Users, Eye, Clock, Target, Award, Filter, Calendar, Download, RefreshCw, Activity, Settings } from 'lucide-react';
import { generateMockData } from './mockData';
import RetailInsights from './RetailInsights';
import './App.css';

function App() {
  const mockData = generateMockData();
  const [selectedDateRange, setSelectedDateRange] = React.useState('7days');
  const [selectedDisplay, setSelectedDisplay] = React.useState('all');
  const [selectedCampaign, setSelectedCampaign] = React.useState('all');
  const [activeTab, setActiveTab] = React.useState('campaign'); // 'campaign', 'display', 'demographics', 'campaignData'
  const [activeSection, setActiveSection] = React.useState('retailInsights'); // 'campaigns', 'displays', 'stores', 'retailInsights'

  const COLORS = ['#3b82f6', '#ec4899', '#10b981', '#f59e0b', '#8b5cf6', '#ef4444'];

  return (
    <div className="app">
      {/* Header */}
      <header className="header">
        <div className="header-left">
          <div className="logo">
            <div className="logo-icon"></div>
            <span className="logo-text">Personalisation<strong>Hub</strong></span>
          </div>
        </div>
        <div className="header-right">
          <span className="environment-badge">Development</span>
          <div className="user-avatar">U S T</div>
        </div>
      </header>

      {/* Sidebar */}
      <aside className="sidebar">
        <nav className="sidebar-nav">
          <a href="#" className="nav-item">
            <TrendingUp size={20} />
            <span>Campaigns</span>
          </a>
          <a href="#" className="nav-item">
            <Eye size={20} />
            <span>Displays & Devices</span>
          </a>
          <a href="#" className="nav-item">
            <Target size={20} />
            <span>Stores / Branches</span>
          </a>
          <a href="#" className="nav-item active">
            <Activity size={20} />
            <span>Retail Insights</span>
          </a>
        </nav>
        <div className="sidebar-bottom">
          <a href="#" className="nav-item">
            <Settings size={20} />
            <span>Company Settings</span>
          </a>
          <a href="#" className="nav-item">
            <Users size={20} />
            <span>Platform Admin</span>
          </a>
        </div>
      </aside>

      {/* Main Content */}
      <main className="main-content">
        {activeSection === 'retailInsights' ? (
          <RetailInsights />
        ) : (
          <>
        {/* Breadcrumb */}
        <div className="breadcrumb">
          <span>Home</span> &gt; <span>Retail Insights</span> &gt; <span className="active">Campaign Effectiveness</span>
        </div>

        {/* Filters */}
        <div className="filters">
          <div className="filter-group">
            <Calendar size={18} />
            <select value={selectedDateRange} onChange={(e) => setSelectedDateRange(e.target.value)}>
              <option value="today">Today</option>
              <option value="yesterday">Yesterday</option>
              <option value="7days">Last 7 Days</option>
              <option value="30days">Last 30 Days</option>
              <option value="custom">Custom Range</option>
            </select>
          </div>
          <div className="filter-group">
            <Target size={18} />
            <select value={selectedDisplay} onChange={(e) => setSelectedDisplay(e.target.value)}>
              <option value="all">All Displays</option>
              {mockData.displayData.map(d => (
                <option key={d.id} value={d.id}>{d.name}</option>
              ))}
            </select>
          </div>
          <div className="filter-group">
            <TrendingUp size={18} />
            <select value={selectedCampaign} onChange={(e) => setSelectedCampaign(e.target.value)}>
              <option value="all">All Campaigns</option>
              {mockData.campaignData.map(c => (
                <option key={c.id} value={c.id}>{c.name}</option>
              ))}
            </select>
          </div>
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
            className={`tab ${activeTab === 'campaign' ? 'active' : ''}`}
            onClick={() => setActiveTab('campaign')}
          >
            Campaign Performance
          </button>
          <button
            className={`tab ${activeTab === 'display' ? 'active' : ''}`}
            onClick={() => setActiveTab('display')}
          >
            Display Analytics
          </button>
          <button
            className={`tab ${activeTab === 'demographics' ? 'active' : ''}`}
            onClick={() => setActiveTab('demographics')}
          >
            Audience Demographics
          </button>
          <button
            className={`tab ${activeTab === 'campaignData' ? 'active' : ''}`}
            onClick={() => setActiveTab('campaignData')}
          >
            Campaign Data
          </button>
        </div>

        {/* Key Metrics Cards - Only show on campaign, display, and demographics tabs */}
        {activeTab !== 'campaignData' && (
        <div className="metrics-grid">
          <div className="metric-card">
            <div className="metric-header">
              <span className="metric-label">Total Passersby</span>
              <Users size={20} className="metric-icon" style={{ color: '#3b82f6' }} />
            </div>
            <div className="metric-value">{mockData.summary.totalPassersby.toLocaleString()}</div>
            <div className="metric-footer">
              <span className="metric-change positive">+12.5%</span>
              <span className="metric-subtitle">vs. last period</span>
            </div>
          </div>

          <div className="metric-card">
            <div className="metric-header">
              <span className="metric-label">ROTS (Opportunity to See)</span>
              <Eye size={20} className="metric-icon" style={{ color: '#10b981' }} />
            </div>
            <div className="metric-value">{mockData.summary.totalROTS.toLocaleString()}</div>
            <div className="metric-footer">
              <span className="metric-change positive">+8.3%</span>
              <span className="metric-subtitle">{mockData.summary.rotsConversionRate}% of passersby</span>
            </div>
          </div>

          <div className="metric-card">
            <div className="metric-header">
              <span className="metric-label">VAC (Visibility Adjusted)</span>
              <Target size={20} className="metric-icon" style={{ color: '#f59e0b' }} />
            </div>
            <div className="metric-value">{mockData.summary.totalVAC.toLocaleString()}</div>
            <div className="metric-footer">
              <span className="metric-change positive">+15.2%</span>
              <span className="metric-subtitle">{mockData.summary.vacConversionRate}% of ROTS</span>
            </div>
          </div>

          <div className="metric-card">
            <div className="metric-header">
              <span className="metric-label">Campaign Views</span>
              <Eye size={20} className="metric-icon" style={{ color: '#ec4899' }} />
            </div>
            <div className="metric-value">{mockData.summary.totalViews.toLocaleString()}</div>
            <div className="metric-footer">
              <span className="metric-change positive">+18.7%</span>
              <span className="metric-subtitle">{mockData.summary.viewConversionRate}% of VAC</span>
            </div>
          </div>

          <div className="metric-card">
            <div className="metric-header">
              <span className="metric-label">Avg. View Duration</span>
              <Clock size={20} className="metric-icon" style={{ color: '#8b5cf6' }} />
            </div>
            <div className="metric-value">{mockData.summary.avgViewTime}s</div>
            <div className="metric-footer">
              <span className="metric-change positive">+0.4s</span>
              <span className="metric-subtitle">vs. last period</span>
            </div>
          </div>

          <div className="metric-card">
            <div className="metric-header">
              <span className="metric-label">Engagement Score</span>
              <Award size={20} className="metric-icon" style={{ color: '#ef4444' }} />
            </div>
            <div className="metric-value">{mockData.summary.avgEngagementScore}</div>
            <div className="metric-footer">
              <span className="metric-change positive">+3 pts</span>
              <span className="metric-subtitle">Excellent performance</span>
            </div>
          </div>
        </div>
        )}

        {/* Charts Section */}
        {activeTab === 'campaign' && (
        <div className="charts-section">
          {/* Passersby and Views Over Time */}
          <div className="chart-card full-width">
            <div className="chart-header">
              <h3>Audience Traffic & Campaign Views (Hourly)</h3>
              <div className="chart-legend">
                <span className="legend-item">
                  <span className="legend-dot" style={{ backgroundColor: '#3b82f6' }}></span>
                  Passersby
                </span>
                <span className="legend-item">
                  <span className="legend-dot" style={{ backgroundColor: '#10b981' }}></span>
                  ROTS
                </span>
                <span className="legend-item">
                  <span className="legend-dot" style={{ backgroundColor: '#ec4899' }}></span>
                  Campaign Views
                </span>
              </div>
            </div>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={mockData.timeSeriesData.filter((_, i) => i % 4 === 0)}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis
                  dataKey="hour"
                  stroke="#6b7280"
                  tick={{ fontSize: 12 }}
                />
                <YAxis stroke="#6b7280" tick={{ fontSize: 12 }} />
                <Tooltip
                  contentStyle={{ backgroundColor: '#fff', border: '1px solid #e5e7eb', borderRadius: '8px' }}
                />
                <Area type="monotone" dataKey="passersby" stackId="1" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.6} />
                <Area type="monotone" dataKey="views" stackId="2" stroke="#ec4899" fill="#ec4899" fillOpacity={0.6} />
                <Area type="monotone" dataKey="engaged" stackId="3" stroke="#10b981" fill="#10b981" fillOpacity={0.6} />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          {/* Demographics Breakdown */}
          <div className="chart-card">
            <div className="chart-header">
              <h3>Audience Demographics (By Age & Gender)</h3>
            </div>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={mockData.demographicData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis
                  dataKey="segment"
                  stroke="#6b7280"
                  tick={{ fontSize: 10 }}
                  angle={-45}
                  textAnchor="end"
                  height={80}
                />
                <YAxis stroke="#6b7280" tick={{ fontSize: 12 }} />
                <Tooltip
                  contentStyle={{ backgroundColor: '#fff', border: '1px solid #e5e7eb', borderRadius: '8px' }}
                />
                <Legend />
                <Bar dataKey="passersby" fill="#3b82f6" name="Passersby" />
                <Bar dataKey="views" fill="#10b981" name="Views" />
                <Bar dataKey="engagement" fill="#ec4899" name="Engaged" />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* View Duration Distribution */}
          <div className="chart-card">
            <div className="chart-header">
              <h3>View Duration Distribution</h3>
            </div>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={mockData.viewDurationData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ duration, percentage }) => `${duration}: ${percentage}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="count"
                >
                  {mockData.viewDurationData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>

          {/* Real-time Minute Data */}
          <div className="chart-card full-width">
            <div className="chart-header">
              <h3>Real-Time Activity (Last 60 Minutes)</h3>
              <div className="chart-legend">
                <span className="legend-item">
                  <span className="legend-dot" style={{ backgroundColor: '#3b82f6' }}></span>
                  Passersby
                </span>
                <span className="legend-item">
                  <span className="legend-dot" style={{ backgroundColor: '#ec4899' }}></span>
                  Views
                </span>
              </div>
            </div>
            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={mockData.minuteData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis
                  dataKey="time"
                  stroke="#6b7280"
                  tick={{ fontSize: 10 }}
                  interval={9}
                />
                <YAxis stroke="#6b7280" tick={{ fontSize: 12 }} />
                <Tooltip
                  contentStyle={{ backgroundColor: '#fff', border: '1px solid #e5e7eb', borderRadius: '8px' }}
                />
                <Line type="monotone" dataKey="passersby" stroke="#3b82f6" strokeWidth={2} dot={false} />
                <Line type="monotone" dataKey="views" stroke="#ec4899" strokeWidth={2} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
        )}

        {/* Display Analytics Tab */}
        {activeTab === 'display' && (
        <div className="charts-section">
          <div className="chart-card full-width">
            <div className="chart-header">
              <h3>Display Performance Comparison</h3>
            </div>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={mockData.displayData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis
                  dataKey="name"
                  stroke="#6b7280"
                  tick={{ fontSize: 10 }}
                  angle={-20}
                  textAnchor="end"
                  height={100}
                />
                <YAxis stroke="#6b7280" tick={{ fontSize: 12 }} />
                <Tooltip
                  contentStyle={{ backgroundColor: '#fff', border: '1px solid #e5e7eb', borderRadius: '8px' }}
                />
                <Legend />
                <Bar dataKey="passersby" fill="#3b82f6" name="Passersby" />
                <Bar dataKey="rots" fill="#10b981" name="ROTS" />
                <Bar dataKey="vac" fill="#f59e0b" name="VAC" />
                <Bar dataKey="views" fill="#ec4899" name="Views" />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="chart-card">
            <div className="chart-header">
              <h3>Engagement Score by Display</h3>
            </div>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={mockData.displayData} layout="horizontal">
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis type="number" stroke="#6b7280" tick={{ fontSize: 12 }} domain={[0, 100]} />
                <YAxis
                  type="category"
                  dataKey="name"
                  stroke="#6b7280"
                  tick={{ fontSize: 10 }}
                  width={150}
                />
                <Tooltip
                  contentStyle={{ backgroundColor: '#fff', border: '1px solid #e5e7eb', borderRadius: '8px' }}
                />
                <Bar dataKey="engagementScore" fill="#8b5cf6" name="Engagement Score" />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="chart-card">
            <div className="chart-header">
              <h3>Average View Time by Display</h3>
            </div>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={mockData.displayData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis
                  dataKey="name"
                  stroke="#6b7280"
                  tick={{ fontSize: 10 }}
                  angle={-20}
                  textAnchor="end"
                  height={100}
                />
                <YAxis stroke="#6b7280" tick={{ fontSize: 12 }} label={{ value: 'Seconds', angle: -90, position: 'insideLeft' }} />
                <Tooltip
                  contentStyle={{ backgroundColor: '#fff', border: '1px solid #e5e7eb', borderRadius: '8px' }}
                />
                <Bar dataKey="avgViewTime" fill="#ef4444" name="Avg View Time (s)" />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="chart-card full-width">
            <div className="chart-header">
              <h3>Display Conversion Funnel</h3>
            </div>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={mockData.displayData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis
                  dataKey="name"
                  stroke="#6b7280"
                  tick={{ fontSize: 10 }}
                  angle={-20}
                  textAnchor="end"
                  height={100}
                />
                <YAxis stroke="#6b7280" tick={{ fontSize: 12 }} />
                <Tooltip
                  contentStyle={{ backgroundColor: '#fff', border: '1px solid #e5e7eb', borderRadius: '8px' }}
                />
                <Legend />
                <Line type="monotone" dataKey="passersby" stroke="#3b82f6" strokeWidth={2} name="Passersby" />
                <Line type="monotone" dataKey="rots" stroke="#10b981" strokeWidth={2} name="ROTS" />
                <Line type="monotone" dataKey="vac" stroke="#f59e0b" strokeWidth={2} name="VAC" />
                <Line type="monotone" dataKey="views" stroke="#ec4899" strokeWidth={2} name="Views" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
        )}

        {/* Audience Demographics Tab */}
        {activeTab === 'demographics' && (
        <div className="charts-section">
          <div className="chart-card full-width">
            <div className="chart-header">
              <h3>Demographics Overview - Passersby vs Engagement</h3>
            </div>
            <ResponsiveContainer width="100%" height={350}>
              <BarChart data={mockData.demographicData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis
                  dataKey="segment"
                  stroke="#6b7280"
                  tick={{ fontSize: 10 }}
                  angle={-45}
                  textAnchor="end"
                  height={100}
                />
                <YAxis stroke="#6b7280" tick={{ fontSize: 12 }} />
                <Tooltip
                  contentStyle={{ backgroundColor: '#fff', border: '1px solid #e5e7eb', borderRadius: '8px' }}
                />
                <Legend />
                <Bar dataKey="passersby" fill="#3b82f6" name="Passersby" />
                <Bar dataKey="views" fill="#10b981" name="Views" />
                <Bar dataKey="engagement" fill="#ec4899" name="Engaged" />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="chart-card">
            <div className="chart-header">
              <h3>Gender Distribution</h3>
            </div>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={[
                    { name: 'Male', value: mockData.demographicData.filter(d => d.segment.includes('Male')).reduce((sum, d) => sum + d.passersby, 0) },
                    { name: 'Female', value: mockData.demographicData.filter(d => d.segment.includes('Female')).reduce((sum, d) => sum + d.passersby, 0) }
                  ]}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                >
                  <Cell fill="#3b82f6" />
                  <Cell fill="#ec4899" />
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div className="chart-card">
            <div className="chart-header">
              <h3>Age Group Distribution</h3>
            </div>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={[
                    { name: '18-24', value: mockData.demographicData.filter(d => d.segment.includes('18-24')).reduce((sum, d) => sum + d.passersby, 0) },
                    { name: '25-34', value: mockData.demographicData.filter(d => d.segment.includes('25-34')).reduce((sum, d) => sum + d.passersby, 0) },
                    { name: '35-44', value: mockData.demographicData.filter(d => d.segment.includes('35-44')).reduce((sum, d) => sum + d.passersby, 0) },
                    { name: '45-54', value: mockData.demographicData.filter(d => d.segment.includes('45-54')).reduce((sum, d) => sum + d.passersby, 0) },
                    { name: '55+', value: mockData.demographicData.filter(d => d.segment.includes('55+')).reduce((sum, d) => sum + d.passersby, 0) }
                  ]}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {COLORS.map((color, index) => (
                    <Cell key={`cell-${index}`} fill={color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div className="chart-card full-width">
            <div className="chart-header">
              <h3>Engagement Rate by Demographic Segment</h3>
            </div>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart
                data={mockData.demographicData.map(d => ({
                  ...d,
                  engagementRate: ((d.engagement / d.passersby) * 100).toFixed(1)
                }))}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis
                  dataKey="segment"
                  stroke="#6b7280"
                  tick={{ fontSize: 10 }}
                  angle={-45}
                  textAnchor="end"
                  height={100}
                />
                <YAxis stroke="#6b7280" tick={{ fontSize: 12 }} label={{ value: 'Engagement Rate (%)', angle: -90, position: 'insideLeft' }} />
                <Tooltip
                  contentStyle={{ backgroundColor: '#fff', border: '1px solid #e5e7eb', borderRadius: '8px' }}
                />
                <Bar dataKey="engagementRate" fill="#8b5cf6" name="Engagement Rate (%)" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
        )}

        {/* Campaign Data Tab */}
        {activeTab === 'campaignData' && (
        <>
          {/* Campaign Summary Metrics */}
          <div className="metrics-grid">
            <div className="metric-card">
              <div className="metric-header">
                <span className="metric-label">Total Campaigns</span>
                <TrendingUp size={20} className="metric-icon" style={{ color: '#3b82f6' }} />
              </div>
              <div className="metric-value">{mockData.campaignSummary.length}</div>
              <div className="metric-footer">
                <span className="metric-change positive">{mockData.campaignSummary.filter(c => c.status === 'active').length} active</span>
                <span className="metric-subtitle">campaigns running</span>
              </div>
            </div>

            <div className="metric-card">
              <div className="metric-header">
                <span className="metric-label">Total Playbacks</span>
                <Eye size={20} className="metric-icon" style={{ color: '#10b981' }} />
              </div>
              <div className="metric-value">{mockData.campaignPlaybackData.length.toLocaleString()}</div>
              <div className="metric-footer">
                <span className="metric-change positive">+18.2%</span>
                <span className="metric-subtitle">vs. last period</span>
              </div>
            </div>

            <div className="metric-card">
              <div className="metric-header">
                <span className="metric-label">Avg Campaign Duration</span>
                <Clock size={20} className="metric-icon" style={{ color: '#f59e0b' }} />
              </div>
              <div className="metric-value">
                {Math.round(mockData.campaignSummary.reduce((sum, c) => sum + c.duration, 0) / mockData.campaignSummary.length)}s
              </div>
              <div className="metric-footer">
                <span className="metric-subtitle">average spot length</span>
              </div>
            </div>

            <div className="metric-card">
              <div className="metric-header">
                <span className="metric-label">Avg Share of Time</span>
                <Target size={20} className="metric-icon" style={{ color: '#ec4899' }} />
              </div>
              <div className="metric-value">
                {(mockData.campaignPlaybackData.reduce((sum, c) => sum + c.shareOfTime, 0) / mockData.campaignPlaybackData.length).toFixed(1)}%
              </div>
              <div className="metric-footer">
                <span className="metric-subtitle">of loop duration</span>
              </div>
            </div>

            <div className="metric-card">
              <div className="metric-header">
                <span className="metric-label">Avg Engagement Score</span>
                <Award size={20} className="metric-icon" style={{ color: '#8b5cf6' }} />
              </div>
              <div className="metric-value">
                {Math.round(mockData.campaignSummary.reduce((sum, c) => sum + c.avgEngagementScore, 0) / mockData.campaignSummary.length)}
              </div>
              <div className="metric-footer">
                <span className="metric-change positive">+5 pts</span>
                <span className="metric-subtitle">vs. last period</span>
              </div>
            </div>

            <div className="metric-card">
              <div className="metric-header">
                <span className="metric-label">Avg QR Interaction</span>
                <Users size={20} className="metric-icon" style={{ color: '#ef4444' }} />
              </div>
              <div className="metric-value">
                {Math.round(mockData.campaignSummary.reduce((sum, c) => sum + c.avgQRInteractionScore, 0) / mockData.campaignSummary.filter(c => c.avgQRInteractionScore > 0).length) || 0}
              </div>
              <div className="metric-footer">
                <span className="metric-subtitle">for QR campaigns</span>
              </div>
            </div>
          </div>

          {/* Charts Section */}
          <div className="charts-section">
          {/* Playback Count by Campaign */}
          <div className="chart-card full-width">
            <div className="chart-header">
              <h3>Campaign Playback Count (Last 7 Days)</h3>
            </div>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={mockData.campaignSummary}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis
                  dataKey="campaignName"
                  stroke="#6b7280"
                  tick={{ fontSize: 11 }}
                  angle={-20}
                  textAnchor="end"
                  height={80}
                />
                <YAxis stroke="#6b7280" tick={{ fontSize: 12 }} />
                <Tooltip
                  contentStyle={{ backgroundColor: '#fff', border: '1px solid #e5e7eb', borderRadius: '8px' }}
                />
                <Bar dataKey="playbackCount" fill="#3b82f6" name="Total Plays" />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Campaign Scores Comparison */}
          <div className="chart-card">
            <div className="chart-header">
              <h3>Campaign Engagement & Location Scores</h3>
            </div>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={mockData.campaignSummary}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis
                  dataKey="campaignName"
                  stroke="#6b7280"
                  tick={{ fontSize: 10 }}
                  angle={-20}
                  textAnchor="end"
                  height={80}
                />
                <YAxis stroke="#6b7280" tick={{ fontSize: 12 }} domain={[0, 100]} />
                <Tooltip
                  contentStyle={{ backgroundColor: '#fff', border: '1px solid #e5e7eb', borderRadius: '8px' }}
                />
                <Legend />
                <Bar dataKey="avgEngagementScore" fill="#8b5cf6" name="Engagement Score" />
                <Bar dataKey="avgDisplayLocationScore" fill="#10b981" name="Display Location" />
                <Bar dataKey="avgStoreLocationScore" fill="#f59e0b" name="Store Location" />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* QR Interaction Scores */}
          <div className="chart-card">
            <div className="chart-header">
              <h3>QR Control Interaction Scores</h3>
            </div>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={mockData.campaignSummary.filter(c => c.avgQRInteractionScore > 0)}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis
                  dataKey="campaignName"
                  stroke="#6b7280"
                  tick={{ fontSize: 11 }}
                  angle={-20}
                  textAnchor="end"
                  height={80}
                />
                <YAxis stroke="#6b7280" tick={{ fontSize: 12 }} />
                <Tooltip
                  contentStyle={{ backgroundColor: '#fff', border: '1px solid #e5e7eb', borderRadius: '8px' }}
                />
                <Bar dataKey="avgQRInteractionScore" fill="#ec4899" name="QR Interaction Score" />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Total Playback Duration */}
          <div className="chart-card full-width">
            <div className="chart-header">
              <h3>Total Campaign Playback Duration (Hours)</h3>
            </div>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={mockData.campaignSummary}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis
                  dataKey="campaignName"
                  stroke="#6b7280"
                  tick={{ fontSize: 11 }}
                  angle={-20}
                  textAnchor="end"
                  height={80}
                />
                <YAxis stroke="#6b7280" tick={{ fontSize: 12 }} />
                <Tooltip
                  contentStyle={{ backgroundColor: '#fff', border: '1px solid #e5e7eb', borderRadius: '8px' }}
                  formatter={(value) => `${value} hours`}
                />
                <Bar dataKey="totalPlaybackDuration" fill="#10b981" name="Total Hours" />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Playback Timeline */}
          <div className="chart-card full-width">
            <div className="chart-header">
              <h3>Campaign Playback Timeline (Hourly)</h3>
            </div>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart
                data={(() => {
                  const aggregated = mockData.campaignPlaybackData.reduce((acc, record) => {
                    const key = `${record.date} ${record.hour}:00`;
                    if (!acc[key]) {
                      acc[key] = { time: key, count: 0, date: record.date, hour: record.hour };
                    }
                    acc[key].count += 1;
                    return acc;
                  }, {});
                  return Object.values(aggregated)
                    .sort((a, b) => `${a.date} ${a.hour}`.localeCompare(`${b.date} ${b.hour}`))
                    .filter((_, i) => i % 3 === 0);
                })()}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis
                  dataKey="time"
                  stroke="#6b7280"
                  tick={{ fontSize: 10 }}
                  angle={-45}
                  textAnchor="end"
                  height={80}
                />
                <YAxis stroke="#6b7280" tick={{ fontSize: 12 }} />
                <Tooltip
                  contentStyle={{ backgroundColor: '#fff', border: '1px solid #e5e7eb', borderRadius: '8px' }}
                />
                <Line type="monotone" dataKey="count" stroke="#3b82f6" strokeWidth={2} name="Playback Count" />
              </LineChart>
            </ResponsiveContainer>
          </div>
          </div>

          {/* Campaign Summary Table - Full Width */}
          <div className="table-card">
            <div className="table-header">
              <h3>Campaign Summary</h3>
              <button className="btn-secondary">
                <Download size={18} />
                Export Summary
              </button>
            </div>
            <div className="table-wrapper">
              <table className="data-table">
                <thead>
                  <tr>
                    <th>Campaign ID</th>
                    <th>Campaign Name</th>
                    <th>Duration (s)</th>
                    <th>Start Time</th>
                    <th>End Time</th>
                    <th>Playback Count</th>
                    <th>Total Duration (hrs)</th>
                    <th>Engagement Score</th>
                    <th>Display Score</th>
                    <th>Store Score</th>
                    <th>QR Score</th>
                    <th>Creatives</th>
                    <th>Displays</th>
                  </tr>
                </thead>
                <tbody>
                  {mockData.campaignSummary.map((campaign) => (
                    <tr key={campaign.campaignId}>
                      <td><span className="display-id">{campaign.campaignId}</span></td>
                      <td><strong>{campaign.campaignName}</strong></td>
                      <td>{campaign.duration}</td>
                      <td style={{ fontSize: '11px' }}>{campaign.startTimestamp}</td>
                      <td style={{ fontSize: '11px' }}>{campaign.endTimestamp}</td>
                      <td>{campaign.playbackCount.toLocaleString()}</td>
                      <td>{campaign.totalPlaybackDuration} hrs</td>
                      <td>
                        <div className="score-cell">
                          <div className="score-bar" style={{ width: `${campaign.avgEngagementScore}%` }}></div>
                          <span className="score-value">{campaign.avgEngagementScore}</span>
                        </div>
                      </td>
                      <td>
                        <div className="score-cell">
                          <div className="score-bar" style={{ width: `${campaign.avgDisplayLocationScore}%` }}></div>
                          <span className="score-value">{campaign.avgDisplayLocationScore}</span>
                        </div>
                      </td>
                      <td>
                        <div className="score-cell">
                          <div className="score-bar" style={{ width: `${campaign.avgStoreLocationScore}%` }}></div>
                          <span className="score-value">{campaign.avgStoreLocationScore}</span>
                        </div>
                      </td>
                      <td>
                        <div className="score-cell">
                          {campaign.avgQRInteractionScore > 0 ? (
                            <>
                              <div className="score-bar" style={{ width: `${campaign.avgQRInteractionScore}%` }}></div>
                              <span className="score-value">{campaign.avgQRInteractionScore}</span>
                            </>
                          ) : (
                            <span style={{ color: '#9ca3af' }}>N/A</span>
                          )}
                        </div>
                      </td>
                      <td><span className="badge badge-count">{campaign.creativeCount}</span></td>
                      <td><span className="badge badge-count">{campaign.displayCount}</span></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Detailed Playback Records Table - Full Width */}
          <div className="table-card">
            <div className="table-header">
              <h3>Detailed Playback Records (Last 50)</h3>
              <button className="btn-secondary">
                <Download size={18} />
                Export All Records
              </button>
            </div>
            <div className="table-wrapper">
              <table className="data-table">
                <thead>
                  <tr>
                    <th>Campaign ID</th>
                    <th>Display ID</th>
                    <th>Store</th>
                    <th>Start Timestamp</th>
                    <th>End Timestamp</th>
                    <th>Duration (s)</th>
                    <th>Engagement</th>
                    <th>Display Score</th>
                    <th>Store Score</th>
                    <th>QR Score</th>
                    <th>Share of Time</th>
                    <th>Spot Position</th>
                  </tr>
                </thead>
                <tbody>
                  {mockData.campaignPlaybackData.slice(0, 50).map((record, index) => (
                    <tr key={index}>
                      <td><span className="display-id">{record.campaignId}</span></td>
                      <td><span className="display-id">{record.displayId}</span></td>
                      <td>{record.storeName}</td>
                      <td style={{ fontSize: '11px' }}>{record.startTimestamp}</td>
                      <td style={{ fontSize: '11px' }}>{record.endTimestamp}</td>
                      <td>{record.duration}s</td>
                      <td>
                        <div className="score-cell">
                          <div className="score-bar" style={{ width: `${record.engagementScore}%` }}></div>
                          <span className="score-value">{record.engagementScore}</span>
                        </div>
                      </td>
                      <td>{record.displayLocationScore}</td>
                      <td>{record.storeLocationScore}</td>
                      <td>
                        {record.qrInteractionScore > 0 ? (
                          <span className="badge badge-count">{record.qrInteractionScore}</span>
                        ) : (
                          <span style={{ color: '#9ca3af' }}>-</span>
                        )}
                      </td>
                      <td>{record.shareOfTime}%</td>
                      <td><span className="badge badge-type">{record.spotPosition}</span></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Campaign Data Info Panel */}
          <div className="info-panel">
            <h4>📊 Campaign Data Metrics</h4>
            <div className="info-grid">
              <div className="info-item">
                <strong>Campaign Duration:</strong>
                <p>Length of the campaign creative in seconds (mapped to Ad Duration).</p>
              </div>
              <div className="info-item">
                <strong>Start/End Timestamp:</strong>
                <p>Exact date and time of each individual playback in YYYY-MM-DD HH:MM:SS format.</p>
              </div>
              <div className="info-item">
                <strong>Playback Count:</strong>
                <p>Total number of times the campaign has been played in full, aggregated per display or display type.</p>
              </div>
              <div className="info-item">
                <strong>Total Playback Duration:</strong>
                <p>Cumulative time the campaign has played over a specified period (shown in hours and days).</p>
              </div>
              <div className="info-item">
                <strong>Campaign Engagement Score:</strong>
                <p>Average engagement score across all displays where the campaign is running (0-100 scale).</p>
              </div>
              <div className="info-item">
                <strong>Display/Store Location Score:</strong>
                <p>Average performance score based on display locations and store locations where the campaign runs.</p>
              </div>
              <div className="info-item">
                <strong>QR Control Interaction Score:</strong>
                <p>Measures QR scan/interaction rate for campaigns with QR codes. Shows which campaigns generate the most interactions.</p>
              </div>
              <div className="info-item">
                <strong>Share of Time (SOT):</strong>
                <p>Percentage of the loop or hour that the campaign occupies (e.g., 10% SOT means 10% of total available time).</p>
              </div>
              <div className="info-item">
                <strong>Spot Position:</strong>
                <p>Position of the campaign in the playback loop (e.g., Spot 1 of 6 indicates first position in a 6-spot rotation).</p>
              </div>
            </div>
          </div>
        </>
        )}

        {/* Display Performance Table - Not shown on Campaign Data tab */}
        {activeTab !== 'campaignData' && (
        <>
        <div className="table-card">
          <div className="table-header">
            <h3>Display Performance Analysis</h3>
            <button className="btn-secondary">View Details</button>
          </div>
          <div className="table-wrapper">
            <table className="data-table">
              <thead>
                <tr>
                  <th>Display ID</th>
                  <th>Display Name</th>
                  <th>Store / Location</th>
                  <th>Type</th>
                  <th>Passersby</th>
                  <th>ROTS</th>
                  <th>VAC</th>
                  <th>Views</th>
                  <th>Avg. View Time</th>
                  <th>Engagement Score</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {mockData.displayData.map((display) => (
                  <tr key={display.id}>
                    <td><span className="display-id">{display.id}</span></td>
                    <td><strong>{display.name}</strong></td>
                    <td>
                      <div className="location-cell">
                        <div>{display.store}</div>
                        <div className="location-subtitle">{display.location}</div>
                      </div>
                    </td>
                    <td><span className="badge badge-type">{display.type}</span></td>
                    <td>{display.passersby.toLocaleString()}</td>
                    <td>
                      <div className="metric-with-percent">
                        {display.rots.toLocaleString()}
                        <span className="percent-small">{Math.round((display.rots / display.passersby) * 100)}%</span>
                      </div>
                    </td>
                    <td>
                      <div className="metric-with-percent">
                        {display.vac.toLocaleString()}
                        <span className="percent-small">{Math.round((display.vac / display.rots) * 100)}%</span>
                      </div>
                    </td>
                    <td>
                      <div className="metric-with-percent">
                        {display.views.toLocaleString()}
                        <span className="percent-small">{Math.round((display.views / display.vac) * 100)}%</span>
                      </div>
                    </td>
                    <td>{display.avgViewTime}s</td>
                    <td>
                      <div className="score-cell">
                        <div className="score-bar" style={{ width: `${display.engagementScore}%` }}></div>
                        <span className="score-value">{display.engagementScore}</span>
                      </div>
                    </td>
                    <td><span className={`status-badge status-${display.status}`}>{display.status}</span></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Campaign Performance Table */}
        <div className="table-card">
          <div className="table-header">
            <h3>Active Campaigns</h3>
            <button className="btn-secondary">Manage Campaigns</button>
          </div>
          <div className="table-wrapper">
            <table className="data-table">
              <thead>
                <tr>
                  <th>Campaign ID</th>
                  <th>Campaign Name</th>
                  <th>Duration</th>
                  <th>Displays</th>
                  <th>Total Passersby</th>
                  <th>Total Views</th>
                  <th>View Rate</th>
                  <th>Avg. Engagement Score</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {mockData.campaignData.map((campaign) => (
                  <tr key={campaign.id}>
                    <td><span className="display-id">{campaign.id}</span></td>
                    <td><strong>{campaign.name}</strong></td>
                    <td>
                      <div className="date-range">
                        {new Date(campaign.startDate).toLocaleDateString()} - {new Date(campaign.endDate).toLocaleDateString()}
                      </div>
                    </td>
                    <td>
                      <span className="badge badge-count">{campaign.displays.length} displays</span>
                    </td>
                    <td>{campaign.totalPassersby.toLocaleString()}</td>
                    <td>{campaign.totalViews.toLocaleString()}</td>
                    <td>
                      <div className="metric-with-percent">
                        {Math.round((campaign.totalViews / campaign.totalPassersby) * 100)}%
                      </div>
                    </td>
                    <td>
                      <div className="score-cell">
                        <div className="score-bar" style={{ width: `${campaign.avgEngagementScore}%` }}></div>
                        <span className="score-value">{campaign.avgEngagementScore}</span>
                      </div>
                    </td>
                    <td><span className={`status-badge status-${campaign.status}`}>{campaign.status}</span></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        </>
        )}

        {/* Info Panel - Only show on non-Campaign Data tabs */}
        {activeTab !== 'campaignData' && (
        <div className="info-panel">
          <h4>📊 Metric Definitions</h4>
          <div className="info-grid">
            <div className="info-item">
              <strong>Passersby Audience:</strong>
              <p>Total number of people detected passing by the display, tracked per minute/hour with demographic breakdown.</p>
            </div>
            <div className="info-item">
              <strong>ROTS (Realistic Opportunity to See):</strong>
              <p>Estimated number of passersby who could potentially see the display based on viewing angles, distance, and display visibility.</p>
            </div>
            <div className="info-item">
              <strong>VAC (Visibility Adjusted Contacts):</strong>
              <p>Number of people who likely saw the ad, calculated from ROTS using eye-tracking data and attention filters.</p>
            </div>
            <div className="info-item">
              <strong>Campaign Views:</strong>
              <p>Confirmed views where passersby actively looked at the campaign content, with demographic and temporal breakdown.</p>
            </div>
            <div className="info-item">
              <strong>View Duration:</strong>
              <p>Length of time a passerby actively viewed the campaign content, measured in seconds.</p>
            </div>
            <div className="info-item">
              <strong>Engagement Score:</strong>
              <p>Calculated score (0-100) based on view frequency, duration, and conversion through the funnel (Passersby → ROTS → VAC → Views).</p>
            </div>
          </div>
        </div>
        )}
        </>
        )}
      </main>
    </div>
  );
}

export default App;

