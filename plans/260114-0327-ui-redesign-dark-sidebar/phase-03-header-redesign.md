---
phase: 3
title: "Header Redesign"
status: pending
effort: 30m
---

# Phase 3: Header Redesign

## Context Links
- Plan: [plan.md](./plan.md)
- Previous: [phase-02](./phase-02-sidebar-styling.md)

## Overview

Update header to match target design with hamburger menu, centered logo, and user avatar.

## Key Insights

Target header characteristics:
- White background with subtle bottom border
- Hamburger menu icon on left (for mobile toggle)
- PersonalisationHub logo with colorful icon
- Development badge in dark purple
- USST user avatar on right (2x2 grid like sidebar logo)

## Requirements

### Visual Changes
- Add hamburger menu icon placeholder
- Maintain PersonalisationHub branding
- Update user avatar to USST grid style
- Keep Development environment badge

## Related Code Files

### Files to Modify
- `src/App.css` - Header styles
- `src/App.jsx` - Header markup

## Implementation Steps

### Step 1: Update Header Styles in App.css

```css
/* Header */
.header {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: var(--header-height);
  background-color: var(--header-bg);
  color: var(--header-text);
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 20px;
  z-index: 1000;
  box-shadow: var(--shadow-sm);
  border-bottom: 1px solid var(--header-border);
}

.header-left {
  display: flex;
  align-items: center;
  gap: 16px;
}

.hamburger-menu {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  cursor: pointer;
  color: var(--text-secondary);
  transition: color 0.2s;
}

.hamburger-menu:hover {
  color: var(--text-primary);
}

.logo {
  display: flex;
  align-items: center;
  gap: 10px;
}

.logo-icon {
  width: 24px;
  height: 24px;
  background: linear-gradient(135deg, #ff6b6b 0%, #4ecdc4 25%, #45b7d1 50%, #f7b731 75%, #a29bfe 100%);
  border-radius: 4px;
}

.logo-text {
  font-size: 15px;
  font-weight: 400;
  color: var(--text-primary);
}

.logo-text strong {
  font-weight: 600;
}

.header-right {
  display: flex;
  align-items: center;
  gap: 16px;
}

.environment-badge {
  background-color: #4a5568;
  padding: 6px 12px;
  border-radius: 4px;
  font-size: 11px;
  font-weight: 500;
  color: white;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  display: flex;
  align-items: center;
  gap: 6px;
}

.environment-badge::before {
  content: '';
  display: inline-block;
  width: 8px;
  height: 8px;
  background-color: #10b981;
  border-radius: 50%;
}
```

### Step 2: Add User Avatar Grid Styles

```css
/* User Avatar - USST Style */
.user-avatar {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1px;
  width: 36px;
  height: 36px;
  background-color: transparent;
  cursor: pointer;
}

.user-avatar-cell {
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 11px;
  font-weight: 700;
  color: var(--text-primary);
}

.user-avatar-cell .dot {
  width: 5px;
  height: 5px;
  border-radius: 50%;
}

.user-avatar-cell .dot.cyan { background-color: #00BCD4; }
.user-avatar-cell .dot.pink { background-color: #ec4899; }
```

### Step 3: Update App.jsx Header Markup

```jsx
{/* Header */}
<header className="header">
  <div className="header-left">
    <div className="hamburger-menu">
      <Menu size={24} />
    </div>
    <div className="logo">
      <div className="logo-icon"></div>
      <span className="logo-text">Personalisation<strong>Hub</strong></span>
    </div>
  </div>
  <div className="header-right">
    <span className="environment-badge">Development</span>
    <div className="user-avatar">
      <div className="user-avatar-cell">U</div>
      <div className="user-avatar-cell"><span className="dot cyan"></span></div>
      <div className="user-avatar-cell">S</div>
      <div className="user-avatar-cell">T</div>
    </div>
  </div>
</header>
```

### Step 4: Add Menu Icon Import

Add to imports in App.jsx:
```jsx
import { Menu, TrendingUp, Users, Eye, Clock, Target, Award, Filter, Calendar, Download, RefreshCw, Activity, Settings } from 'lucide-react';
```

## Todo List

- [ ] Update header base styles
- [ ] Add hamburger menu styles
- [ ] Update environment badge styling
- [ ] Add user avatar grid styles
- [ ] Update App.jsx header markup
- [ ] Import Menu icon from lucide-react
- [ ] Test header appearance

## Success Criteria

- Header has white background with subtle shadow
- Hamburger menu icon visible on left
- Logo displays correctly
- Environment badge shows with green dot indicator
- User avatar displays USST grid pattern

## Next Steps

Phase 4: Metric Cards Styling
