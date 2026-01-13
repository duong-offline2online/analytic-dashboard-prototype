---
phase: 1
title: "Color Palette & CSS Variables"
status: pending
effort: 30m
---

# Phase 1: Color Palette & CSS Variables

## Context Links
- Plan: [plan.md](./plan.md)
- Target Screenshots: `plans/screenshots/`

## Overview

Establish CSS custom properties (variables) for consistent theming across the dashboard.

## Key Insights

From target design analysis:
- Dark sidebar uses charcoal (#2d3436) not pure black
- Cyan accent (#00BCD4) for active states and highlights
- Cards use subtle gray (#f3f4f6) not white
- Clean separation between sidebar and content areas

## Requirements

### Functional
- Define all color variables in `:root`
- Replace hardcoded colors with variables
- Maintain backward compatibility

### Non-Functional
- Variables should be semantic (e.g., `--sidebar-bg` not `--dark-gray`)
- Group variables by component/purpose

## Related Code Files

### Files to Modify
- `src/index.css` - Add CSS variables to `:root`
- `src/App.css` - Update to use variables

## Implementation Steps

### Step 1: Add CSS Variables to index.css

Add to `src/index.css` after the reset styles:

```css
:root {
  /* Sidebar Colors */
  --sidebar-bg: #2d3436;
  --sidebar-text: #a0aec0;
  --sidebar-text-hover: #ffffff;
  --sidebar-hover-bg: #3d4749;
  --sidebar-active-bg: #00BCD4;
  --sidebar-active-text: #ffffff;
  --sidebar-border: #3d4749;

  /* Header Colors */
  --header-bg: #ffffff;
  --header-text: #2d3748;
  --header-border: #e2e8f0;

  /* Main Content Colors */
  --main-bg: #f5f7fa;
  --card-bg: #ffffff;
  --card-border: #e5e7eb;
  --metric-card-bg: #f3f4f6;

  /* Text Colors */
  --text-primary: #1a202c;
  --text-secondary: #6b7280;
  --text-muted: #9ca3af;

  /* Accent Colors */
  --accent-primary: #00BCD4;
  --accent-primary-light: #e0f7fa;
  --accent-success: #10b981;
  --accent-warning: #f59e0b;
  --accent-danger: #ef4444;
  --accent-info: #3b82f6;
  --accent-purple: #8b5cf6;
  --accent-pink: #ec4899;

  /* Tab Colors */
  --tab-text: #6b7280;
  --tab-text-hover: #2d3748;
  --tab-active: #00BCD4;
  --tab-border: #e2e8f0;

  /* Border & Shadow */
  --border-color: #e2e8f0;
  --shadow-sm: 0 1px 2px rgba(0, 0, 0, 0.05);
  --shadow-md: 0 1px 3px rgba(0, 0, 0, 0.1);

  /* Spacing */
  --sidebar-width: 200px;
  --header-height: 60px;
}
```

### Step 2: Update body background in index.css

```css
body {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
    'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
    sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  background-color: var(--main-bg);
}
```

## Todo List

- [ ] Add CSS variables to `:root` in index.css
- [ ] Update body background to use variable
- [ ] Verify variables load correctly in browser

## Success Criteria

- All colors defined as CSS variables
- Variables named semantically
- No visual changes yet (preparation phase)

## Next Steps

Phase 2: Sidebar Styling - Apply variables to sidebar components
