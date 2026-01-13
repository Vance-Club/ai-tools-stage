/**
 * Aspora Design System - Color Tokens
 * Source: Figma Aspora Component Library
 * Last Updated: 18th November 2025
 */

// ===================================================
// UTILITY COLORS
// Base color palette for semantic usage
// ===================================================

export const utilityColors = {
  green: {
    200: '#188B33',
    100: '#21BD45',
    50: 'rgba(33, 189, 69, 0.5)',
    20: 'rgba(33, 189, 69, 0.2)',
    10: 'rgba(33, 189, 69, 0.1)',
  },
  red: {
    100: '#F71D11',
    50: 'rgba(255, 59, 48, 0.5)',
    20: 'rgba(255, 59, 48, 0.2)',
    10: 'rgba(255, 59, 48, 0.1)',
    5: 'rgba(255, 59, 48, 0.05)',
  },
  orange: {
    200: '#DF7727',
    100: '#ECA53A',
    75: '#FFD871',
    50: 'rgba(236, 165, 58, 0.5)',
    20: 'rgba(236, 165, 58, 0.2)',
    10: 'rgba(236, 165, 58, 0.1)',
  },
  blue: {
    100: '#4A5DF9',
    50: 'rgba(74, 93, 249, 0.5)',
    20: 'rgba(74, 93, 249, 0.2)',
    10: 'rgba(74, 93, 249, 0.1)',
  },
} as const;

// ===================================================
// FILLS / SURFACE COLORS
// Background and surface colors
// ===================================================

export const fillsColors = {
  gray: {
    50: '#F7F7FA',
    100: '#F2F2F7',
    200: '#E5E5EA',
    300: '#D1D1D6',
    400: '#C7C7CC',
    500: '#AEAEB2',
    600: '#8E8E93',
    700: '#0E0F11',
  },
  primary: {
    // Aspora Purple
    100: 'rgba(85, 35, 178, 0.1)',
    200: 'rgba(85, 35, 178, 0.2)',
    250: '#CAC0FF',
    300: '#A38CE5',
    400: '#7C57CC',
    500: '#5523B2',
    600: '#411B88',
    700: '#2B0C6E',
    800: '#16004C',
  },
} as const;

// ===================================================
// TEXT COLORS
// ===================================================

export const textColors = {
  base: {
    400: 'rgba(14, 15, 17, 0.45)',
    500: 'rgba(14, 15, 17, 0.65)',
    600: '#0E0F11',
    info: '#4A5DF9',
    accent: '#4A5DF9',
    danger: '#F71D11',
    warning: '#DF7727',
    success: '#188B33',
  },
  contrast: {
    400: 'rgba(255, 255, 255, 0.45)',
    500: 'rgba(255, 255, 255, 0.65)',
    600: 'rgba(255, 255, 255, 0.6)',
    700: '#FFFFFF',
  },
} as const;

// ===================================================
// SEMANTIC COLORS
// Use these for consistent semantic meaning
// ===================================================

export const semanticColors = {
  success: utilityColors.green[100],
  successDark: utilityColors.green[200],
  error: utilityColors.red[100],
  warning: utilityColors.orange[100],
  warningDark: utilityColors.orange[200],
  info: utilityColors.blue[100],
  primary: fillsColors.primary[500],
  primaryLight: fillsColors.primary[250],
} as const;

export const surfaceColors = {
  base: fillsColors.gray[700],
  elevated: fillsColors.gray[600],
  light: fillsColors.gray[100],
  white: '#FFFFFF',
  black: '#000000',
} as const;

export const borderColors = {
  light: fillsColors.gray[300],
  dark: fillsColors.gray[600],
} as const;

// ===================================================
// COMBINED COLORS OBJECT
// ===================================================

export const colors = {
  utility: utilityColors,
  fills: fillsColors,
  text: textColors,
  semantic: semanticColors,
  surface: surfaceColors,
  border: borderColors,
} as const;

export type Colors = typeof colors;

// ===================================================
// FLAT COLOR PRIMITIVES
// For easy direct access
// ===================================================

export const colorPrimitives = {
  // Utility/Green
  utilityGreen200: '#188B33',
  utilityGreen100: '#21BD45',

  // Utility/Red
  utilityRed100: '#F71D11',

  // Utility/Orange
  utilityOrange200: '#DF7727',
  utilityOrange100: '#ECA53A',
  utilityOrange75: '#FFD871',

  // Utility/Blue
  utilityBlue100: '#4A5DF9',

  // Fills/Gray
  fillsGray50: '#F7F7FA',
  fillsGray100: '#F2F2F7',
  fillsGray200: '#E5E5EA',
  fillsGray300: '#D1D1D6',
  fillsGray400: '#C7C7CC',
  fillsGray500: '#AEAEB2',
  fillsGray600: '#8E8E93',
  fillsGray700: '#0E0F11',

  // Fills/Primary (Aspora Purple)
  fillsPrimary250: '#CAC0FF',
  fillsPrimary300: '#A38CE5',
  fillsPrimary400: '#7C57CC',
  fillsPrimary500: '#5523B2',
  fillsPrimary600: '#411B88',
  fillsPrimary700: '#2B0C6E',
  fillsPrimary800: '#16004C',

  // Text/Base
  textBase600: '#0E0F11',
  textBaseInfo: '#4A5DF9',
  textBaseAccent: '#4A5DF9',
  textBaseDanger: '#F71D11',
  textBaseWarning: '#DF7727',
  textBaseSuccess: '#188B33',

  // Text/Contrast
  textContrastWhite: '#FFFFFF',

  // Common
  white: '#FFFFFF',
  black: '#000000',
} as const;

export type ColorPrimitive = keyof typeof colorPrimitives;
