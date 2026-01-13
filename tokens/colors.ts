/**
 * Aspora Design System - Color Tokens
 * Source: Figma Aspora Component Library
 */

export const colors = {
  // Surface/Background Colors
  surface: {
    base: {
      level0: '#111111',
      level2: '#222222',
    },
    fills: {
      gray5: '#e5e5ea',
    },
  },

  // Text Colors
  text: {
    normal: {
      white: '#f9f9f9',
    },
    base: {
      white: '#f9f9f9',
      light1: '#d5d6de',
      light2: '#abacb6',
    },
    primary: {
      original: '#81ebab',
    },
    negative: {
      dark1: '#ec6172',
    },
    black: '#000000',
  },

  // Label Colors
  label: {
    dark: {
      primary: '#ffffff',
    },
  },

  // Border Colors
  border: {
    basic: {
      gray2: '#333333',
      gray3: '#222222',
    },
    separator: '#d1d1d6',
  },

  // Semantic Colors
  semantic: {
    success: '#81ebab',
    error: '#ec6172',
    primary: '#81ebab',
  },
} as const;

// Type-safe color accessor
export type ColorToken = typeof colors;

// Flat color map for easy access
export const colorPrimitives = {
  // Surfaces
  surfaceLevel0: '#111111',
  surfaceLevel2: '#222222',
  fillsGray5: '#e5e5ea',

  // Text
  textWhite: '#f9f9f9',
  textLight1: '#d5d6de',
  textLight2: '#abacb6',
  textPrimary: '#81ebab',
  textNegative: '#ec6172',
  textBlack: '#000000',
  labelWhite: '#ffffff',

  // Borders
  borderGray2: '#333333',
  borderGray3: '#222222',
  borderSeparator: '#d1d1d6',

  // Semantic
  success: '#81ebab',
  error: '#ec6172',
  primary: '#81ebab',
} as const;

export type ColorPrimitive = keyof typeof colorPrimitives;
