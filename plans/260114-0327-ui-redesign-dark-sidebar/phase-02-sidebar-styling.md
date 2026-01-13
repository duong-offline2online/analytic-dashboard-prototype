---
phase: 2
title: "Sidebar Styling"
status: pending
effort: 45m
---

# Phase 2: Sidebar Styling

## Context Links
- Plan: [plan.md](./plan.md)
- Previous: [phase-01](./phase-01-color-palette-css-variables.md)

## Overview

Transform sidebar to match target dark theme with cyan accent highlights.

## Key Insights

Target sidebar characteristics:
- Dark charcoal background (#2d3436)
- USST logo at top-left (letters arranged in 2x2 grid with colored dots)
- Menu items with icons, muted gray text
- Active item has full cyan (#00BCD4) background, white text
- Bottom section separated with border for Settings/Admin
- Narrower width (~200px) vs current 240px

## Requirements

### Visual Changes
- Darker sidebar background
- Cyan highlight for active menu item (full width, no left border)
- Logo redesign to match USST branding
- Reduced sidebar width

## Related Code Files

### Files to Modify
- `src/App.css` - Sidebar CSS classes
- `src/App.jsx` - Logo markup update

## Implementation Steps

### Step 1: Update Sidebar Base Styles in App.css

Replace existing `.sidebar` styles:

```css
/* Sidebar */
.sidebar {
  position: fixed;
  left: 0;
  top: var(--header-height);
  width: var(--sidebar-width);
  height: calc(100vh - var(--header-height));
  background-color: var(--sidebar-bg);
  color: var(--sidebar-text);
  padding: 20px 0;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  z-index: 900;
}

.sidebar-nav {
  display: flex;
  flex-direction: column;
}

.sidebar-bottom {
  border-top: 1px solid var(--sidebar-border);
  padding-top: 16px;
  margin-top: auto;
}
```

### Step 2: Update Nav Item Styles

Replace `.nav-item` styles:

```css
.nav-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 20px;
  color: var(--sidebar-text);
  text-decoration: none;
  transition: all 0.2s;
  cursor: pointer;
  font-size: 14px;
  font-weight: 400;
}

.nav-item:hover {
  background-color: var(--sidebar-hover-bg);
  color: var(--sidebar-text-hover);
}

.nav-item.active {
  background-color: var(--sidebar-active-bg);
  color: var(--sidebar-active-text);
  border-left: none;
  font-weight: 500;
}

.nav-item svg {
  flex-shrink: 0;
  width: 18px;
  height: 18px;
}
```

### Step 3: Add USST Logo Styles

Add new logo styles:

```css
/* USST Logo in Sidebar */
.sidebar-logo {
  padding: 0 20px 20px 20px;
  margin-bottom: 10px;
}

.usst-logo {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 2px;
  width: 40px;
}

.usst-logo-cell {
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  font-weight: 700;
  color: #ffffff;
}

.usst-logo-cell .dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
}

.usst-logo-cell .dot.cyan { background-color: #00BCD4; }
.usst-logo-cell .dot.pink { background-color: #ec4899; }
```

### Step 4: Update App.jsx Sidebar Structure

Update the sidebar section in App.jsx:

```jsx
{/* Sidebar */}
<aside className="sidebar">
  <div className="sidebar-logo">
    <div className="usst-logo">
      <div className="usst-logo-cell">U <span className="dot cyan"></span></div>
      <div className="usst-logo-cell"><span className="dot pink"></span></div>
      <div className="usst-logo-cell">S</div>
      <div className="usst-logo-cell">T</div>
    </div>
  </div>
  <nav className="sidebar-nav">
    <a href="#" className="nav-item">
      <TrendingUp size={18} />
      <span>CAMPAIGNS</span>
    </a>
    <a href="#" className="nav-item">
      <Eye size={18} />
      <span>DISPLAYS & DEVICES</span>
    </a>
    <a href="#" className="nav-item">
      <Target size={18} />
      <span>STORES / BRANCHES</span>
    </a>
    <a href="#" className="nav-item active">
      <Activity size={18} />
      <span>RETAIL INSIGHTS</span>
    </a>
  </nav>
  <div className="sidebar-bottom">
    <a href="#" className="nav-item">
      <Settings size={18} />
      <span>COMPANY SETTINGS</span>
    </a>
    <a href="#" className="nav-item">
      <Users size={18} />
      <span>PLATFORM ADMIN</span>
    </a>
  </div>
</aside>
```

### Step 5: Update Main Content Margin

```css
.main-content {
  margin-left: var(--sidebar-width);
  margin-top: var(--header-height);
  padding: 24px;
  width: calc(100% - var(--sidebar-width));
  max-width: calc(100vw - var(--sidebar-width));
  min-height: calc(100vh - var(--header-height));
  overflow-x: hidden;
  box-sizing: border-box;
  background-color: var(--main-bg);
}
```

## Todo List

- [ ] Update .sidebar base styles with CSS variables
- [ ] Update .nav-item styles for cyan active state
- [ ] Add USST logo grid styles
- [ ] Update App.jsx sidebar markup
- [ ] Update main-content margin for new sidebar width
- [ ] Test active state highlighting
- [ ] Verify responsive behavior at 768px breakpoint

## Success Criteria

- Sidebar background is dark charcoal (#2d3436)
- Active menu item has cyan background, white text
- Logo displays USST grid pattern
- Menu text is uppercase and properly spaced
- Hover states work correctly

## Risk Assessment

- **Low**: Menu item uppercase text may need adjustment if too aggressive
- **Mitigation**: Can adjust to sentence case if needed

## Next Steps

Phase 3: Header Redesign
