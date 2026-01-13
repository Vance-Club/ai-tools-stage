# Aspora Design System

Design tokens and documentation for the Aspora design system, extracted from Figma.

## Overview

This repository contains design tokens (colors, typography, spacing) that can be used when building web-based tools with Astro.js or any other framework.

## Structure

```
aspora-design-system/
├── tokens/
│   ├── colors.css          # CSS custom properties for colors
│   ├── colors.ts           # TypeScript constants for colors
│   ├── typography.css      # CSS custom properties for typography
│   └── typography.ts       # TypeScript constants for typography
├── docs/
│   ├── colors.md           # Color documentation
│   └── typography.md       # Typography documentation
└── README.md
```

## Usage

### CSS Variables

Import the CSS files directly:

```css
@import 'path/to/aspora-design-system/tokens/colors.css';
@import 'path/to/aspora-design-system/tokens/typography.css';
```

Then use the variables:

```css
.my-element {
  background-color: var(--surface-base-level-0);
  color: var(--text-normal-white);
  font: var(--font-body-l-regular);
}
```

### TypeScript

Import the constants:

```typescript
import { colors } from 'path/to/aspora-design-system/tokens/colors';
import { typography } from 'path/to/aspora-design-system/tokens/typography';
```

## Source

Design tokens extracted from: [Aspora Component Library](https://www.figma.com/design/Vc84mP3YDNUXAGVQOugrfa/Aspora-Component-Library)

## Font

The design system uses **Inter** as the primary typeface. Make sure to include it in your project:

```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">
```
