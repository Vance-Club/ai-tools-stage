# Aspora Design System - Color Tokens

## Overview

The Aspora design system uses a comprehensive color palette organized into semantic categories. The primary brand color is **Aspora Purple** (`#5523B2`), with utility colors for feedback states and a gray scale for surfaces and backgrounds.

**Source:** Figma Aspora Component Library
**Last Updated:** 18th November 2025

## Color Categories

### Utility Colors

Utility colors are used for semantic feedback like success, error, warning, and informational states.

#### Green (Success)

| Token | CSS Variable | Value | Usage |
|-------|--------------|-------|-------|
| Green 200 | `--utility-green-200` | `#188B33` | Dark success, hover states |
| Green 100 | `--utility-green-100` | `#21BD45` | Primary success color |
| Green 50 | `--utility-green-50` | `rgba(33, 189, 69, 0.5)` | 50% opacity variant |
| Green 20 | `--utility-green-20` | `rgba(33, 189, 69, 0.2)` | Light success backgrounds |
| Green 10 | `--utility-green-10` | `rgba(33, 189, 69, 0.1)` | Subtle success tints |

#### Red (Error/Danger)

| Token | CSS Variable | Value | Usage |
|-------|--------------|-------|-------|
| Red 100 | `--utility-red-100` | `#F71D11` | Primary error color |
| Red 50 | `--utility-red-50` | `rgba(255, 59, 48, 0.5)` | 50% opacity variant |
| Red 20 | `--utility-red-20` | `rgba(255, 59, 48, 0.2)` | Light error backgrounds |
| Red 10 | `--utility-red-10` | `rgba(255, 59, 48, 0.1)` | Subtle error tints |
| Red 5 | `--utility-red-5` | `rgba(255, 59, 48, 0.05)` | Very subtle error tints |

#### Orange (Warning)

| Token | CSS Variable | Value | Usage |
|-------|--------------|-------|-------|
| Orange 200 | `--utility-orange-200` | `#DF7727` | Dark warning, hover states |
| Orange 100 | `--utility-orange-100` | `#ECA53A` | Primary warning color |
| Orange 75 | `--utility-orange-75` | `#FFD871` | Light warning accent |
| Orange 50 | `--utility-orange-50` | `rgba(236, 165, 58, 0.5)` | 50% opacity variant |
| Orange 20 | `--utility-orange-20` | `rgba(236, 165, 58, 0.2)` | Light warning backgrounds |
| Orange 10 | `--utility-orange-10` | `rgba(236, 165, 58, 0.1)` | Subtle warning tints |

#### Blue (Info)

| Token | CSS Variable | Value | Usage |
|-------|--------------|-------|-------|
| Blue 100 | `--utility-blue-100` | `#4A5DF9` | Primary info/accent color |
| Blue 50 | `--utility-blue-50` | `rgba(74, 93, 249, 0.5)` | 50% opacity variant |
| Blue 20 | `--utility-blue-20` | `rgba(74, 93, 249, 0.2)` | Light info backgrounds |
| Blue 10 | `--utility-blue-10` | `rgba(74, 93, 249, 0.1)` | Subtle info tints |

### Fills / Surface Colors

#### Gray Scale

| Token | CSS Variable | Value | Usage |
|-------|--------------|-------|-------|
| Gray 50 | `--fills-gray-50` | `#F7F7FA` | Lightest background |
| Gray 100 | `--fills-gray-100` | `#F2F2F7` | Light backgrounds |
| Gray 200 | `--fills-gray-200` | `#E5E5EA` | Subtle borders, dividers |
| Gray 300 | `--fills-gray-300` | `#D1D1D6` | Borders, disabled states |
| Gray 400 | `--fills-gray-400` | `#C7C7CC` | Placeholder text |
| Gray 500 | `--fills-gray-500` | `#AEAEB2` | Secondary text |
| Gray 600 | `--fills-gray-600` | `#8E8E93` | Elevated dark surfaces |
| Gray 700 | `--fills-gray-700` | `#0E0F11` | Dark mode base |

#### Primary (Aspora Purple)

| Token | CSS Variable | Value | Usage |
|-------|--------------|-------|-------|
| Primary 100 | `--fills-primary-100` | `rgba(85, 35, 178, 0.1)` | Very subtle purple tint |
| Primary 200 | `--fills-primary-200` | `rgba(85, 35, 178, 0.2)` | Light purple backgrounds |
| Primary 250 | `--fills-primary-250` | `#CAC0FF` | Light purple accent |
| Primary 300 | `--fills-primary-300` | `#A38CE5` | Medium purple |
| Primary 400 | `--fills-primary-400` | `#7C57CC` | Purple accent |
| Primary 500 | `--fills-primary-500` | `#5523B2` | **Primary brand color** |
| Primary 600 | `--fills-primary-600` | `#411B88` | Dark purple, hover |
| Primary 700 | `--fills-primary-700` | `#2B0C6E` | Darker purple |
| Primary 800 | `--fills-primary-800` | `#16004C` | Darkest purple |

### Text Colors

#### Base (Dark backgrounds/Light mode)

| Token | CSS Variable | Value | Usage |
|-------|--------------|-------|-------|
| Base 400 | `--text-base-400` | `rgba(14, 15, 17, 0.45)` | Tertiary text |
| Base 500 | `--text-base-500` | `rgba(14, 15, 17, 0.65)` | Secondary text |
| Base 600 | `--text-base-600` | `#0E0F11` | Primary text |
| Info | `--text-base-info` | `#4A5DF9` | Info text |
| Accent | `--text-base-accent` | `#4A5DF9` | Accent/link text |
| Danger | `--text-base-danger` | `#F71D11` | Error text |
| Warning | `--text-base-warning` | `#DF7727` | Warning text |
| Success | `--text-base-success` | `#188B33` | Success text |

#### Contrast (Light backgrounds/Dark mode)

| Token | CSS Variable | Value | Usage |
|-------|--------------|-------|-------|
| Contrast 400 | `--text-contrast-400` | `rgba(255, 255, 255, 0.45)` | Tertiary text (dark bg) |
| Contrast 500 | `--text-contrast-500` | `rgba(255, 255, 255, 0.65)` | Secondary text (dark bg) |
| Contrast 600 | `--text-contrast-600` | `rgba(255, 255, 255, 0.6)` | Medium text (dark bg) |
| Contrast 700 | `--text-contrast-700` | `#FFFFFF` | Primary text (dark bg) |

### Semantic Aliases

Use these semantic variables for consistent meaning across your application:

| Purpose | CSS Variable | Maps To |
|---------|--------------|---------|
| Success | `--color-success` | `--utility-green-100` |
| Success Dark | `--color-success-dark` | `--utility-green-200` |
| Error | `--color-error` | `--utility-red-100` |
| Warning | `--color-warning` | `--utility-orange-100` |
| Warning Dark | `--color-warning-dark` | `--utility-orange-200` |
| Info | `--color-info` | `--utility-blue-100` |
| Primary | `--color-primary` | `--fills-primary-500` |
| Primary Light | `--color-primary-light` | `--fills-primary-250` |

### Surface Colors

| Purpose | CSS Variable | Maps To |
|---------|--------------|---------|
| Base | `--surface-base` | `--fills-gray-700` |
| Elevated | `--surface-elevated` | `--fills-gray-600` |
| Light | `--surface-light` | `--fills-gray-100` |
| White | `--surface-white` | `#FFFFFF` |
| Black | `--surface-black` | `#000000` |

### Border Colors

| Purpose | CSS Variable | Maps To |
|---------|--------------|---------|
| Light | `--border-light` | `--fills-gray-300` |
| Dark | `--border-dark` | `--fills-gray-600` |

## Theme Support

### Light Mode

```css
[data-theme="light"], .theme-light {
  --surface-base: var(--fills-gray-100);
  --surface-elevated: #FFFFFF;
  --text-primary: var(--text-base-600);
  --text-secondary: var(--text-base-500);
  --text-tertiary: var(--text-base-400);
}
```

### Dark Mode

```css
[data-theme="dark"], .theme-dark {
  --surface-base: var(--fills-gray-700);
  --surface-elevated: var(--fills-gray-600);
  --text-primary: var(--text-contrast-700);
  --text-secondary: var(--text-contrast-500);
  --text-tertiary: var(--text-contrast-400);
}
```

## Usage Examples

### CSS

```css
.card {
  background-color: var(--surface-elevated);
  border: 1px solid var(--border-light);
  color: var(--text-base-600);
}

.card-title {
  color: var(--text-base-600);
}

.card-description {
  color: var(--text-base-500);
}

.button-primary {
  background-color: var(--color-primary);
  color: var(--text-contrast-700);
}

.button-primary:hover {
  background-color: var(--fills-primary-600);
}

.alert-success {
  background-color: var(--utility-green-10);
  border: 1px solid var(--color-success);
  color: var(--text-base-success);
}

.alert-error {
  background-color: var(--utility-red-10);
  border: 1px solid var(--color-error);
  color: var(--text-base-danger);
}
```

### TypeScript

```typescript
import {
  colors,
  colorPrimitives,
  utilityColors,
  fillsColors,
  semanticColors
} from '../tokens/colors';

// Using nested structure
const primaryColor = colors.fills.primary[500]; // '#5523B2'
const successColor = colors.utility.green[100]; // '#21BD45'

// Using semantic colors
const errorColor = semanticColors.error; // '#F71D11'
const warningColor = semanticColors.warning; // '#ECA53A'

// Using flat primitives for easy access
const buttonBg = colorPrimitives.fillsPrimary500; // '#5523B2'
const textColor = colorPrimitives.textBase600; // '#0E0F11'
```

## Visual Reference

```
┌─────────────────────────────────────────────────────────────────┐
│  ASPORA COLOR PALETTE                                           │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  PRIMARY (Aspora Purple)                                        │
│  ┌──────┬──────┬──────┬──────┬──────┬──────┬──────┬──────┐     │
│  │ 100  │ 200  │ 250  │ 300  │ 400  │ 500  │ 600  │ 700  │     │
│  │ 10%  │ 20%  │      │      │      │      │      │      │     │
│  └──────┴──────┴──────┴──────┴──────┴──────┴──────┴──────┘     │
│    Tint  Tint  #CAC0FF #A38CE5 #7C57CC #5523B2 #411B88 #2B0C6E │
│                                         ▲                       │
│                                    Brand Color                  │
│                                                                 │
│  UTILITY COLORS                                                 │
│  ┌──────────────┬──────────────┬──────────────┬──────────────┐ │
│  │    GREEN     │     RED      │    ORANGE    │     BLUE     │ │
│  │   #21BD45    │   #F71D11    │   #ECA53A    │   #4A5DF9    │ │
│  │   Success    │    Error     │   Warning    │     Info     │ │
│  └──────────────┴──────────────┴──────────────┴──────────────┘ │
│                                                                 │
│  GRAY SCALE                                                     │
│  ┌──────┬──────┬──────┬──────┬──────┬──────┬──────┬──────┐     │
│  │  50  │ 100  │ 200  │ 300  │ 400  │ 500  │ 600  │ 700  │     │
│  └──────┴──────┴──────┴──────┴──────┴──────┴──────┴──────┘     │
│  #F7F7FA #F2F2F7 #E5E5EA #D1D1D6 #C7C7CC #AEAEB2 #8E8E93 #0E0F11│
│    Light ────────────────────────────────────────────▶ Dark    │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

## Accessibility

The color palette is designed with WCAG accessibility guidelines in mind:

- **Primary text** (`#0E0F11`) on light backgrounds meets AAA contrast ratio
- **White text** (`#FFFFFF`) on primary purple (`#5523B2`) meets AA contrast ratio
- **Error red** (`#F71D11`) provides clear visual distinction for error states
- **Success green** (`#21BD45`) provides clear visual distinction for success states

Always ensure sufficient contrast when combining colors. Use the semantic text colors (`--text-base-*` or `--text-contrast-*`) appropriate for your background.
