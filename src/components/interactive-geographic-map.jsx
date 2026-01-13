import React, { useState, memo } from 'react';
import {
  ComposableMap,
  Geographies,
  Geography,
  Marker,
  ZoomableGroup,
} from 'react-simple-maps';

// US TopoJSON from CDN
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
  if (score >= 75) return '#10b981';
  if (score >= 50) return '#f59e0b';
  return '#ef4444';
};

const getMarkerSize = (passersby, maxPassersby) => {
  const minSize = 8;
  const maxSize = 24;
  const ratio = passersby / maxPassersby;
  return minSize + (maxSize - minSize) * ratio;
};

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

export default memo(InteractiveGeographicMap);
