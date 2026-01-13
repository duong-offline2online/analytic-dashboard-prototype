# Phase 4: Interactive Geographic Map

## Context Links
- Current placeholder: `src/RetailInsights.jsx` lines 636-645
- Location data: `retailInsightsData.js` lines 79-98
- Map CSS: `src/App.css` lines 844-868

## Overview
- **Priority**: P2 (Visual enhancement)
- **Status**: pending
- **Effort**: 3h

Replace map placeholder with interactive US map showing store locations.

## Key Insights
- Location data has state codes (CA, NY, TX, FL, IL) and lat/lng
- Need lightweight map library (no Google Maps API key complexity)
- Markers: size = passersby volume, color = engagement score

## Requirements

### Functional
1. US map with clickable state regions or markers
2. Markers sized proportionally to passersby count
3. Markers colored by engagement score (red/yellow/green)
4. Hover tooltip shows location details
5. Click marker to highlight row in adjacent table

### Non-Functional
- Bundle size < 50KB (use lightweight lib)
- Render < 500ms
- Touch-friendly interactions
- No external API calls (offline capable)

## Architecture

**Library Choice: react-simple-maps**
- Lightweight (~10KB gzipped)
- SVG-based (no canvas complexity)
- No API key needed
- Good React integration

```
InteractiveMap Component
  |-- ComposableMap (US projection)
  |-- Geographies (state outlines)
  |-- Marker[] (store locations)
       |-- Circle (sized/colored)
       |-- Tooltip on hover
```

## Related Code Files

### Create
- `src/components/interactive-geographic-map.jsx` - Map component

### Modify
- `src/RetailInsights.jsx` - Replace placeholder with component
- `src/App.css` - Add map styles
- `package.json` - Add react-simple-maps dependency

## Implementation Steps

### Step 1: Install dependency
```bash
yarn add react-simple-maps
```

### Step 2: Create map component
```jsx
// src/components/interactive-geographic-map.jsx
import React, { useState, memo } from 'react';
import {
  ComposableMap,
  Geographies,
  Geography,
  Marker,
  ZoomableGroup,
} from 'react-simple-maps';

// US TopoJSON - use CDN or bundle
const US_GEO_URL = 'https://cdn.jsdelivr.net/npm/us-atlas@3/states-10m.json';

// State centers for positioning markers
const STATE_CENTERS = {
  CA: [-119.4179, 36.7783],
  NY: [-75.4, 43.0],
  TX: [-99.9018, 31.9686],
  FL: [-81.5158, 27.6648],
  IL: [-89.3985, 40.6331],
};

const getMarkerColor = (score) => {
  if (score >= 75) return '#10b981'; // green
  if (score >= 50) return '#f59e0b'; // yellow/orange
  return '#ef4444'; // red
};

const getMarkerSize = (passersby, maxPassersby) => {
  const minSize = 8;
  const maxSize = 24;
  const ratio = passersby / maxPassersby;
  return minSize + (maxSize - minSize) * ratio;
};

function InteractiveGeographicMap({ data, onLocationSelect, selectedLocation }) {
  const [hoveredLocation, setHoveredLocation] = useState(null);

  const maxPassersby = Math.max(...data.map(d => d.passersby));

  return (
    <div className="map-container">
      <ComposableMap
        projection="geoAlbersUsa"
        projectionConfig={{ scale: 1000 }}
        style={{ width: '100%', height: '100%' }}
      >
        <ZoomableGroup center={[-96, 38]} zoom={1}>
          {/* State outlines */}
          <Geographies geography={US_GEO_URL}>
            {({ geographies }) =>
              geographies.map((geo) => (
                <Geography
                  key={geo.rsmKey}
                  geography={geo}
                  fill="#e5e7eb"
                  stroke="#fff"
                  strokeWidth={0.5}
                  style={{
                    default: { outline: 'none' },
                    hover: { fill: '#d1d5db', outline: 'none' },
                    pressed: { outline: 'none' },
                  }}
                />
              ))
            }
          </Geographies>

          {/* Location markers */}
          {data.map((location) => {
            const coords = STATE_CENTERS[location.state];
            if (!coords) return null;

            const size = getMarkerSize(location.passersby, maxPassersby);
            const color = getMarkerColor(location.engagementScore);
            const isSelected = selectedLocation === location.state;
            const isHovered = hoveredLocation === location.state;

            return (
              <Marker
                key={location.state}
                coordinates={coords}
                onMouseEnter={() => setHoveredLocation(location.state)}
                onMouseLeave={() => setHoveredLocation(null)}
                onClick={() => onLocationSelect?.(location.state)}
                style={{ cursor: 'pointer' }}
              >
                {/* Outer ring for selected state */}
                {isSelected && (
                  <circle r={size + 4} fill="none" stroke={color} strokeWidth={2} />
                )}

                {/* Main marker */}
                <circle
                  r={size}
                  fill={color}
                  opacity={isHovered ? 1 : 0.8}
                  stroke="#fff"
                  strokeWidth={2}
                />

                {/* Passersby count label */}
                <text
                  textAnchor="middle"
                  y={size + 16}
                  style={{
                    fontSize: 10,
                    fontWeight: 600,
                    fill: '#374151',
                  }}
                >
                  {(location.passersby / 1000).toFixed(1)}K
                </text>
              </Marker>
            );
          })}
        </ZoomableGroup>
      </ComposableMap>

      {/* Tooltip */}
      {hoveredLocation && (
        <MapTooltip
          location={data.find(d => d.state === hoveredLocation)}
        />
      )}

      {/* Legend */}
      <MapLegend />
    </div>
  );
}

// Tooltip subcomponent
const MapTooltip = ({ location }) => {
  if (!location) return null;

  return (
    <div className="map-tooltip">
      <div className="tooltip-header">{location.state}</div>
      <div className="tooltip-row">
        <span>Stores:</span>
        <span>{location.storeCount}</span>
      </div>
      <div className="tooltip-row">
        <span>Passersby:</span>
        <span>{location.passersby.toLocaleString()}</span>
      </div>
      <div className="tooltip-row">
        <span>Engagement:</span>
        <span className={`score-${location.engagementScore >= 75 ? 'high' : location.engagementScore >= 50 ? 'medium' : 'low'}`}>
          {location.engagementScore}
        </span>
      </div>
    </div>
  );
};

// Legend subcomponent
const MapLegend = () => (
  <div className="map-legend">
    <div className="legend-title">Engagement Score</div>
    <div className="legend-items">
      <div className="legend-item">
        <span className="legend-dot" style={{ background: '#10b981' }}></span>
        <span>75+ (High)</span>
      </div>
      <div className="legend-item">
        <span className="legend-dot" style={{ background: '#f59e0b' }}></span>
        <span>50-74 (Medium)</span>
      </div>
      <div className="legend-item">
        <span className="legend-dot" style={{ background: '#ef4444' }}></span>
        <span>&lt;50 (Low)</span>
      </div>
    </div>
    <div className="legend-note">Marker size = passersby volume</div>
  </div>
);

export default memo(InteractiveGeographicMap);
```

### Step 3: Add CSS styles
```css
/* Add to App.css */

/* Interactive Map */
.map-container {
  position: relative;
  width: 100%;
  height: 400px;
  background-color: #f8fafc;
  border-radius: 8px;
  overflow: hidden;
}

.map-container svg {
  width: 100%;
  height: 100%;
}

.map-tooltip {
  position: absolute;
  top: 16px;
  right: 16px;
  background: white;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  padding: 12px 16px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  min-width: 160px;
  z-index: 10;
}

.tooltip-header {
  font-weight: 600;
  font-size: 16px;
  color: #1a202c;
  margin-bottom: 8px;
  padding-bottom: 8px;
  border-bottom: 1px solid #e5e7eb;
}

.tooltip-row {
  display: flex;
  justify-content: space-between;
  font-size: 13px;
  padding: 4px 0;
}

.tooltip-row span:first-child {
  color: #6b7280;
}

.tooltip-row span:last-child {
  font-weight: 500;
  color: #1a202c;
}

.map-legend {
  position: absolute;
  bottom: 16px;
  left: 16px;
  background: white;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  padding: 12px 16px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
}

.legend-title {
  font-weight: 600;
  font-size: 12px;
  color: #4a5568;
  margin-bottom: 8px;
}

.legend-items {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.legend-item {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 11px;
  color: #6b7280;
}

.legend-dot {
  width: 10px;
  height: 10px;
  border-radius: 50%;
}

.legend-note {
  margin-top: 8px;
  font-size: 10px;
  color: #9ca3af;
  font-style: italic;
}
```

### Step 4: Replace placeholder in RetailInsights.jsx
```jsx
// Import at top
import InteractiveGeographicMap from './components/interactive-geographic-map';

// Add state for selected location
const [selectedMapLocation, setSelectedMapLocation] = useState(null);

// Replace map-placeholder div (lines 641-645) with:
<InteractiveGeographicMap
  data={filteredData.locationPerformance}
  onLocationSelect={(state) => {
    setSelectedMapLocation(state);
    // Optional: scroll to row in table
  }}
  selectedLocation={selectedMapLocation}
/>
```

### Step 5: Highlight selected row in location table
```jsx
// Update location table row
<tr
  key={index}
  className={selectedMapLocation === item.state ? 'selected-row' : ''}
  onClick={() => setSelectedMapLocation(item.state)}
>
```

```css
/* Add to App.css */
.location-table tr.selected-row {
  background-color: #e0f2fe;
}
```

### Step 6: Handle loading and errors
```jsx
// In InteractiveGeographicMap, add:
const [isLoading, setIsLoading] = useState(true);
const [error, setError] = useState(null);

// Wrap Geographies with error boundary pattern
<Geographies geography={US_GEO_URL}>
  {({ geographies, error }) => {
    if (error) return <text>Map failed to load</text>;
    // ...
  }}
</Geographies>
```

## Todo List
- [ ] Install react-simple-maps (`yarn add react-simple-maps`)
- [ ] Create `src/components/interactive-geographic-map.jsx`
- [ ] Add STATE_CENTERS mapping
- [ ] Implement marker sizing/coloring functions
- [ ] Create MapTooltip subcomponent
- [ ] Create MapLegend subcomponent
- [ ] Add CSS styles to App.css
- [ ] Import component in RetailInsights.jsx
- [ ] Add selectedMapLocation state
- [ ] Replace map-placeholder with component
- [ ] Add row highlighting in location table
- [ ] Test marker interactions
- [ ] Test mobile touch
- [ ] Verify bundle size impact

## Success Criteria
- [ ] US map renders with state outlines
- [ ] 5 markers show at correct state positions
- [ ] Marker size reflects passersby volume
- [ ] Marker color reflects engagement score
- [ ] Hover shows tooltip with details
- [ ] Click marker highlights table row
- [ ] Legend explains colors and sizes
- [ ] Works on mobile devices

## Risk Assessment

| Risk | Impact | Mitigation |
|------|--------|------------|
| Large bundle size | Medium | Use dynamic import, lazy load |
| TopoJSON fetch fails | Low | Fallback to static SVG or placeholder |
| Slow render on mobile | Low | memo() component, throttle interactions |

## Security Considerations
- TopoJSON from CDN - trusted source (jsdelivr)
- No user input in map rendering
- SVG-based - no XSS risk from map data

## Next Steps
After completion, move to **Phase 5** to add CV toggle which will enhance Visitor Insights with passerby demographics.
