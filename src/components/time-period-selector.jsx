import React, { useState, useRef, useEffect } from 'react';
import { Calendar, ChevronDown } from 'lucide-react';

const TIME_PERIODS = [
  { key: 'today', label: 'Today' },
  { key: 'yesterday', label: 'Yesterday' },
  { key: '7days', label: 'Last 7 Days' },
  { key: '30days', label: 'Last 30 Days' },
  { key: '90days', label: 'Last 90 Days' },
  { key: 'custom', label: 'Custom Range' }
];

// Date calculation helper
const getDateRange = (period) => {
  const today = new Date();
  const end = new Date(today);
  let start = new Date(today);

  switch(period) {
    case 'today':
      start = new Date(today);
      break;
    case 'yesterday':
      start = new Date(today.setDate(today.getDate() - 1));
      end.setDate(end.getDate() - 1);
      break;
    case '7days':
      start.setDate(start.getDate() - 6);
      break;
    case '30days':
      start.setDate(start.getDate() - 29);
      break;
    case '90days':
      start.setDate(start.getDate() - 89);
      break;
    default:
      break;
  }
  return { start, end };
};

// Format date as "DD MMM, YYYY"
const formatDate = (date) => {
  return date.toLocaleDateString('en-GB', {
    day: '2-digit',
    month: 'short',
    year: 'numeric'
  });
};

export function TimePeriodSelector({ value, onChange }) {
  const [isOpen, setIsOpen] = useState(false);
  const [customStart, setCustomStart] = useState('');
  const [customEnd, setCustomEnd] = useState('');
  const [showCustomInputs, setShowCustomInputs] = useState(false);
  const dropdownRef = useRef(null);

  // Get current dates based on selected value
  const getCurrentDates = () => {
    if (value === 'custom' && customStart && customEnd) {
      return {
        start: new Date(customStart),
        end: new Date(customEnd)
      };
    }
    return getDateRange(value);
  };

  const currentDates = getCurrentDates();

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsOpen(false);
        setShowCustomInputs(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handlePeriodSelect = (periodKey) => {
    if (periodKey === 'custom') {
      setShowCustomInputs(true);
      return;
    }

    const dates = getDateRange(periodKey);
    onChange(periodKey, dates);
    setIsOpen(false);
    setShowCustomInputs(false);
  };

  const handleCustomApply = () => {
    if (customStart && customEnd) {
      const dates = {
        start: new Date(customStart),
        end: new Date(customEnd)
      };
      onChange('custom', dates);
      setIsOpen(false);
      setShowCustomInputs(false);
    }
  };

  return (
    <div className="time-period-dropdown" ref={dropdownRef}>
      <div
        className="time-period-trigger"
        onClick={() => setIsOpen(!isOpen)}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => e.key === 'Enter' && setIsOpen(!isOpen)}
      >
        <Calendar size={16} />
        <span>{formatDate(currentDates.start)}</span>
        <span style={{ margin: '0 4px', color: '#9ca3af' }}>→</span>
        <span>{formatDate(currentDates.end)}</span>
        <ChevronDown size={16} style={{ marginLeft: 'auto' }} />
      </div>

      {isOpen && (
        <div className="time-period-menu">
          {TIME_PERIODS.map(period => (
            <div
              key={period.key}
              className={`time-period-option ${value === period.key ? 'active' : ''}`}
              onClick={() => handlePeriodSelect(period.key)}
              role="menuitem"
              tabIndex={0}
              onKeyDown={(e) => e.key === 'Enter' && handlePeriodSelect(period.key)}
            >
              {period.label}
            </div>
          ))}

          {showCustomInputs && (
            <div className="custom-date-inputs">
              <input
                type="date"
                value={customStart}
                onChange={(e) => setCustomStart(e.target.value)}
                placeholder="Start date"
              />
              <input
                type="date"
                value={customEnd}
                onChange={(e) => setCustomEnd(e.target.value)}
                placeholder="End date"
              />
              <button
                onClick={handleCustomApply}
                style={{
                  padding: '8px 12px',
                  background: '#3b82f6',
                  color: 'white',
                  border: 'none',
                  borderRadius: '4px',
                  cursor: 'pointer',
                  fontSize: '13px',
                  fontWeight: '500'
                }}
              >
                Apply
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
