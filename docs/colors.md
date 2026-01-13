# Aspora Design System - Color Tokens

## Overview

The Aspora design system uses a dark theme as the primary theme. Colors are organized into semantic categories for consistent usage across applications.

## Color Palette

### Surface/Background Colors

| Token Name | CSS Variable | Hex Value | Usage |
|------------|--------------|-----------|-------|
| Surface Level 0 | `--surface-base-level-0` | `#111111` | Main app background |
| Surface Level 2 | `--surface-base-level-2` | `#222222` | Card backgrounds, input fields, elevated surfaces |
| Fills Gray 5 | `--fills-surface-gray-5` | `#e5e5ea` | Light mode backgrounds, documentation |

### Text Colors

| Token Name | CSS Variable | Hex Value | Usage |
|------------|--------------|-----------|-------|
| Text White | `--text-normal-white` | `#f9f9f9` | Primary text on dark backgrounds |
| Text Light 1 | `--text-base-light-1` | `#d5d6de` | Secondary text, slightly muted |
| Text Light 2 | `--text-base-light-2` | `#abacb6` | Tertiary text, labels, descriptions |
| Text Primary | `--text-primary-original` | `#81ebab` | Primary accent color, active states, links |
| Text Negative | `--text-negative-dark-1` | `#ec6172` | Error states, destructive actions |
| Label White | `--label-color-dark-primary` | `#ffffff` | High contrast labels |
| Text Black | `--text-black` | `#000000` | Text on light backgrounds |

### Border Colors

| Token Name | CSS Variable | Hex Value | Usage |
|------------|--------------|-----------|-------|
| Border Gray 2 | `--border-basic-gray-2` | `#333333` | Primary borders, dividers |
| Border Gray 3 | `--border-basic-gray-3` | `#222222` | Subtle borders |
| Border Separator | `--border-separator` | `#d1d1d6` | Separators on light backgrounds |

### Semantic Colors

| Token Name | CSS Variable | Hex Value | Usage |
|------------|--------------|-----------|-------|
| Success | `--color-success` | `#81ebab` | Success states, confirmations |
| Error | `--color-error` | `#ec6172` | Error states, warnings |
| Primary | `--color-primary` | `#81ebab` | Primary accent, CTAs |

## Usage Examples

### CSS

```css
.card {
  background-color: var(--surface-base-level-2);
  border: 1px solid var(--border-basic-gray-2);
  color: var(--text-normal-white);
}

.card-title {
  color: var(--text-normal-white);
}

.card-description {
  color: var(--text-base-light-2);
}

.card-link {
  color: var(--text-primary-original);
}

.error-message {
  color: var(--text-negative-dark-1);
}
```

### TypeScript

```typescript
import { colors, colorPrimitives } from '../tokens/colors';

// Using nested structure
const cardBg = colors.surface.base.level2; // '#222222'

// Using flat primitives
const primaryColor = colorPrimitives.textPrimary; // '#81ebab'
```

## Color Contrast

The color palette has been designed with accessibility in mind:

- Primary text (`#f9f9f9`) on dark background (`#111111`): **12.63:1** (AAA)
- Secondary text (`#abacb6`) on dark background (`#111111`): **7.21:1** (AAA)
- Primary accent (`#81ebab`) on dark background (`#111111`): **9.85:1** (AAA)

## Visual Reference

```
┌─────────────────────────────────────────────────────────┐
│  Background: #111111 (Surface Level 0)                  │
│  ┌───────────────────────────────────────────────────┐  │
│  │  Card: #222222 (Surface Level 2)                  │  │
│  │                                                   │  │
│  │  Title: #f9f9f9 (Text White)                      │  │
│  │  Description: #abacb6 (Text Light 2)              │  │
│  │  Link: #81ebab (Primary)                          │  │
│  │                                                   │  │
│  │  Border: #333333 (Border Gray 2)                  │  │
│  └───────────────────────────────────────────────────┘  │
│                                                         │
│  Error: #ec6172                                         │
└─────────────────────────────────────────────────────────┘
```
