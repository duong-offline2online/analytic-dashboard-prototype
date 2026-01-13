# 📸 Dashboard Visual Guide

## Layout Overview

```
┌─────────────────────────────────────────────────────────────────────┐
│  🏢 PersonalisationHub              Campaign Effectiveness  ⚙️ AWS  │
├─────────────────────────────────────────────────────────────────────┤
│ 📊 Sidebar      │  Main Content Area                                │
│                 │                                                    │
│ • Campaigns     │  🔍 Filters: [Date] [Display] [Campaign]         │
│ • Displays      │  ─────────────────────────────────────────        │
│ • Stores        │                                                    │
│ ➤ Insights      │  📈 KEY METRICS (6 Cards)                        │
│                 │  ┌────────┐ ┌────────┐ ┌────────┐               │
│                 │  │25,500  │ │19,990  │ │11,975  │               │
│                 │  │Passersby│ │ ROTS  │ │  VAC   │               │
│ ⚙️ Settings     │  └────────┘ └────────┘ └────────┘               │
│ 👤 Admin        │  ┌────────┐ ┌────────┐ ┌────────┐               │
│                 │  │10,680  │ │ 3.8s   │ │   85   │               │
│                 │  │ Views  │ │Duration│ │ Score  │               │
│                 │  └────────┘ └────────┘ └────────┘               │
│                 │                                                    │
│                 │  📊 CHARTS                                        │
│                 │  ┌─────────────────────────────────────────┐    │
│                 │  │ Hourly Traffic & Views (Area Chart)     │    │
│                 │  │ [Shows 7 days of data]                  │    │
│                 │  └─────────────────────────────────────────┘    │
│                 │                                                    │
│                 │  ┌──────────────────┐  ┌──────────────────┐    │
│                 │  │ Demographics     │  │ View Duration    │    │
│                 │  │ (Bar Chart)      │  │ (Pie Chart)      │    │
│                 │  │ Age/Gender       │  │ <1s, 1-2s, etc.  │    │
│                 │  └──────────────────┘  └──────────────────┘    │
│                 │                                                    │
│                 │  ┌─────────────────────────────────────────┐    │
│                 │  │ Real-time Activity (Last 60 min)       │    │
│                 │  │ [Line chart with live data]             │    │
│                 │  └─────────────────────────────────────────┘    │
│                 │                                                    │
│                 │  📋 TABLES                                        │
│                 │  Display Performance Analysis                     │
│                 │  ┌───┬─────────────┬──────┬──────┬───────┐      │
│                 │  │ID │ Name        │Views │Score │Status │      │
│                 │  ├───┼─────────────┼──────┼──────┼───────┤      │
│                 │  │001│ Entrance    │2,850 │ 87   │Active │      │
│                 │  │002│ Corridor    │1,980 │ 92   │Active │      │
│                 │  │003│ Checkout    │1,250 │ 95   │Active │      │
│                 │  └───┴─────────────┴──────┴──────┴───────┘      │
│                 │                                                    │
└─────────────────────────────────────────────────────────────────────┘
```

## Color Scheme

### Primary Colors
- **Blue (#3b82f6)**: Passersby metrics
- **Green (#10b981)**: ROTS metrics
- **Pink (#ec4899)**: Campaign views
- **Orange (#f59e0b)**: VAC metrics
- **Purple (#8b5cf6)**: Duration metrics
- **Red (#ef4444)**: Engagement scores

### UI Colors
- **Dark Gray (#2d3748)**: Header and sidebar
- **Light Gray (#f5f5f5)**: Background
- **White (#ffffff)**: Cards and content areas

## Metric Cards Detail

Each metric card shows:
```
┌─────────────────────────┐
│ Label          🎯 Icon  │
│                          │
│    25,500               │  <- Big number
│                          │
│ ▲ +12.5%  vs. last week │  <- Trend indicator
└─────────────────────────┘
```

**Features:**
- Hover effect (slight lift and shadow)
- Color-coded icons
- Percentage change with arrow
- Comparison text

## Charts

### 1. Hourly Traffic (Area Chart)
- **Size**: Full width
- **Data**: 7 days × 24 hours = 168 data points (sampled)
- **Lines**: 3 (Passersby, ROTS, Views)
- **Colors**: Gradient fills with transparency
- **Interactive**: Tooltip on hover

### 2. Demographics (Bar Chart)
- **Size**: Half width
- **Data**: 10 segments (5 age groups × 2 genders)
- **Bars**: Grouped (Passersby, Views, Engaged)
- **Colors**: Blue for male, Pink for female
- **X-axis**: Angled labels for readability

### 3. View Duration (Pie Chart)
- **Size**: Half width
- **Data**: 6 duration brackets
- **Labels**: Duration + percentage
- **Colors**: Rainbow gradient
- **Interactive**: Hover highlights

### 4. Real-time Activity (Line Chart)
- **Size**: Full width
- **Data**: Last 60 minutes (minute by minute)
- **Lines**: 2 (Passersby, Views)
- **Update**: Auto-refreshes (in production)
- **Style**: Smooth curves, no dots

## Tables

### Display Performance Table
```
┌──────┬───────────────────┬────────┬──────┬──────┬──────┬────────┬───────┐
│  ID  │ Display Name      │ Store  │ ROTS │ VAC  │ Views│ Duration│ Score │
├──────┼───────────────────┼────────┼──────┼──────┼──────┼────────┼───────┤
│ D-001│ Store Entrance    │ Flag.. │ 4890 │ 3180 │ 2850 │  3.2s  │ ▓▓▓ 87│
│ D-002│ Mall Corridor     │ Cent.. │ 3240 │ 2110 │ 1980 │  4.5s  │ ▓▓▓ 92│
│ D-003│ Checkout Area     │ Flag.. │ 1960 │ 1370 │ 1250 │  5.8s  │ ▓▓▓ 95│
│ D-004│ Window Display    │ Down.. │ 6250 │ 3125 │ 2680 │  2.1s  │ ▓▓░ 68│
│ D-005│ Food Court        │ Cent.. │ 3650 │ 2190 │ 1920 │  3.8s  │ ▓▓▓ 83│
└──────┴───────────────────┴────────┴──────┴──────┴──────┴────────┴───────┘
```

**Features:**
- Sortable columns (in production version)
- Visual score bars (gradient: red → yellow → green)
- Hover highlights entire row
- Status badges with colors
- Conversion percentages shown

### Active Campaigns Table
```
┌──────┬─────────────────────┬──────────────┬──────────┬────────┬───────┐
│  ID  │ Campaign Name       │ Date Range   │ Displays │ Views  │ Score │
├──────┼─────────────────────┼──────────────┼──────────┼────────┼───────┤
│ C-001│ Summer Sale 2025    │ Dec 1-31     │ 3        │ 6,080  │ 91    │
│ C-002│ New Product Launch  │ Dec 15-Jan15 │ 2        │ 4,600  │ 75    │
└──────┴─────────────────────┴──────────────┴──────────┴────────┴───────┘
```

## Filters Section

```
┌──────────────────────────────────────────────────────────────┐
│ 📅 [Last 7 Days ▼] 🎯 [All Displays ▼] 📊 [All Campaigns ▼] │
│ 🔄 Refresh  📥 Export                                         │
└──────────────────────────────────────────────────────────────┘
```

**Dropdowns include:**
- Date: Today, Yesterday, 7 days, 30 days, Custom
- Display: All, or individual displays
- Campaign: All, or individual campaigns

## Tabs

```
┌─────────────────────────────────────────────────────────┐
│ [Campaign Performance] │ Display Analytics │ Demographics │
│        (Active)        │                   │              │
└─────────────────────────────────────────────────────────┘
```

Currently showing: Campaign Performance tab

## Info Panel (Bottom)

```
┌────────────────────────────────────────────────────────────┐
│ 📊 Metric Definitions                                      │
├────────────────────────────────────────────────────────────┤
│ Passersby: Total detected passing by display              │
│ ROTS: Realistic opportunity to see based on viewability   │
│ VAC: Visibility adjusted contacts from eye-tracking       │
│ Views: Confirmed looks at campaign content                │
│ Duration: Length of time viewing campaign                 │
│ Score: 0-100 engagement based on multiple factors         │
└────────────────────────────────────────────────────────────┘
```

## Responsive Behavior

### Desktop (> 1024px)
- Full sidebar visible
- 3-column metric grid
- 2-column chart layout
- Full-width tables

### Tablet (768px - 1024px)
- Collapsible sidebar
- 2-column metric grid
- Stacked charts
- Scrollable tables

### Mobile (< 768px)
- Hidden sidebar (menu icon)
- Single column layout
- Vertically stacked charts
- Horizontal scroll tables

## Interactions

### Hover Effects
- **Metric Cards**: Slight lift + shadow increase
- **Table Rows**: Background color change
- **Buttons**: Border color change
- **Charts**: Tooltip with detailed data

### Click Actions
- **Filters**: Open dropdown menus
- **Tabs**: Switch content view
- **Table Headers**: Sort columns (future)
- **Export Button**: Download data (future)
- **Refresh Button**: Reload data (future)

## Performance Features

- **Fast Load**: < 2 seconds initial load
- **Smooth Animations**: CSS transitions
- **Efficient Rendering**: React optimization
- **Responsive Charts**: Auto-resize with window

## Accessibility

- ✅ Semantic HTML structure
- ✅ ARIA labels on interactive elements
- ✅ Keyboard navigation support
- ✅ High contrast ratios for text
- ✅ Focus indicators on interactive elements

---

## What It Looks Like in Action

When you run the dashboard:

1. **Header bar** loads first (dark background, logo, title)
2. **Sidebar** appears on left (navigation items)
3. **Filters** slide in at top
4. **Metric cards** animate in one by one
5. **Charts** render with smooth transitions
6. **Tables** populate with data
7. **Hover effects** respond to mouse movement

The entire dashboard has a **professional, polished appearance** matching enterprise analytics platforms.

---

## Customization Quick Reference

Want to change something? Here's where:

- **Colors**: `src/App.css` (search for hex codes)
- **Layout**: `src/App.jsx` (component structure)
- **Data**: `src/mockData.js` (all numbers and values)
- **Metrics**: `src/App.jsx` (metric cards section)
- **Charts**: `src/App.jsx` (ResponsiveContainer components)

The design is **clean, modern, and data-focused** - perfect for executive presentations! 🎨

