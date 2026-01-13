/**
 * Aspora Design System - Typography Tokens
 * Source: Figma Aspora Component Library
 * Font Family: Inter
 */

export const fontFamily = {
  primary: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
  system: "'SF Pro Text', -apple-system, BlinkMacSystemFont, sans-serif",
} as const;

export const fontWeight = {
  regular: 400,
  medium: 500,
  semibold: 600,
  bold: 700,
} as const;

export const fontSize = {
  displayL: 40,
  h1: 28,
  h2: 24,
  h3: 22,
  h4: 20,
  bodyXl: 17,
  bodyL: 16,
  buttonL: 15,
  bodyM: 14,
  footnote: 13,
  caption1: 12,
  buttonS: 12,
  caption2: 11,
} as const;

export const lineHeight = {
  tight: 1,
  button: 1.1,
  normal: 1.3,
  relaxed: 1.4,
} as const;

export const letterSpacing = {
  tight: '-2%',
  normal: '-1.5%',
  loose: '-1%',
  display: '-1.25%',
} as const;

// Complete typography style definitions
export const typography = {
  // Display
  display: {
    l: {
      emphasized: {
        fontFamily: fontFamily.primary,
        fontSize: 40,
        fontWeight: fontWeight.bold,
        lineHeight: 1,
        letterSpacing: '-1.5%',
      },
      semibold: {
        fontFamily: fontFamily.primary,
        fontSize: 40,
        fontWeight: fontWeight.semibold,
        lineHeight: 1,
        letterSpacing: '-1.25%',
      },
    },
  },

  // Headings
  heading: {
    h1: {
      fontFamily: fontFamily.primary,
      fontSize: 28,
      fontWeight: fontWeight.bold,
      lineHeight: 1.3,
      letterSpacing: '-1.5%',
    },
    h2: {
      fontFamily: fontFamily.primary,
      fontSize: 24,
      fontWeight: fontWeight.bold,
      lineHeight: 1.3,
      letterSpacing: '-1.5%',
    },
    h3: {
      fontFamily: fontFamily.primary,
      fontSize: 22,
      fontWeight: fontWeight.bold,
      lineHeight: 1.3,
      letterSpacing: '-2%',
    },
    h4: {
      fontFamily: fontFamily.primary,
      fontSize: 20,
      fontWeight: fontWeight.bold,
      lineHeight: 1.3,
      letterSpacing: '-1.5%',
    },
  },

  // Body XL (17px)
  bodyXl: {
    regular: {
      fontFamily: fontFamily.primary,
      fontSize: 17,
      fontWeight: fontWeight.regular,
      lineHeight: 1.3,
      letterSpacing: '-1%',
    },
    medium: {
      fontFamily: fontFamily.primary,
      fontSize: 17,
      fontWeight: fontWeight.medium,
      lineHeight: 1.3,
      letterSpacing: '-1%',
    },
    semibold: {
      fontFamily: fontFamily.primary,
      fontSize: 17,
      fontWeight: fontWeight.semibold,
      lineHeight: 1.3,
      letterSpacing: '-1%',
    },
    bold: {
      fontFamily: fontFamily.primary,
      fontSize: 17,
      fontWeight: fontWeight.bold,
      lineHeight: 1.3,
      letterSpacing: '-1%',
    },
  },

  // Body L (16px)
  bodyL: {
    regular: {
      fontFamily: fontFamily.primary,
      fontSize: 16,
      fontWeight: fontWeight.regular,
      lineHeight: 1.3,
      letterSpacing: '-1%',
    },
    medium: {
      fontFamily: fontFamily.primary,
      fontSize: 16,
      fontWeight: fontWeight.medium,
      lineHeight: 1.3,
      letterSpacing: '-1%',
    },
    bold: {
      fontFamily: fontFamily.primary,
      fontSize: 16,
      fontWeight: fontWeight.bold,
      lineHeight: 1.3,
      letterSpacing: '-1%',
    },
  },

  // Body M (14px)
  bodyM: {
    regular: {
      fontFamily: fontFamily.primary,
      fontSize: 14,
      fontWeight: fontWeight.regular,
      lineHeight: 1.4,
      letterSpacing: '-1%',
    },
    medium: {
      fontFamily: fontFamily.primary,
      fontSize: 14,
      fontWeight: fontWeight.medium,
      lineHeight: 1.4,
      letterSpacing: '-1%',
    },
    bold: {
      fontFamily: fontFamily.primary,
      fontSize: 14,
      fontWeight: fontWeight.bold,
      lineHeight: 1.4,
      letterSpacing: '-1%',
    },
  },

  // Footnote (13px)
  footnote: {
    regular: {
      fontFamily: fontFamily.primary,
      fontSize: 13,
      fontWeight: fontWeight.regular,
      lineHeight: 1.3,
      letterSpacing: '-1%',
    },
    emphasized: {
      fontFamily: fontFamily.primary,
      fontSize: 13,
      fontWeight: fontWeight.bold,
      lineHeight: 1.3,
      letterSpacing: '-1%',
    },
  },

  // Caption 1 (12px)
  caption1: {
    regular: {
      fontFamily: fontFamily.primary,
      fontSize: 12,
      fontWeight: fontWeight.regular,
      lineHeight: 1.4,
      letterSpacing: '-1%',
    },
    emphasized: {
      fontFamily: fontFamily.primary,
      fontSize: 12,
      fontWeight: fontWeight.bold,
      lineHeight: 1.4,
      letterSpacing: '-1%',
    },
  },

  // Caption 2 (11px)
  caption2: {
    regular: {
      fontFamily: fontFamily.primary,
      fontSize: 11,
      fontWeight: fontWeight.regular,
      lineHeight: 1.3,
      letterSpacing: '-1%',
    },
    emphasized: {
      fontFamily: fontFamily.primary,
      fontSize: 11,
      fontWeight: fontWeight.bold,
      lineHeight: 1.3,
      letterSpacing: '-1%',
    },
  },

  // Button
  button: {
    l: {
      fontFamily: fontFamily.primary,
      fontSize: 15,
      fontWeight: fontWeight.semibold,
      lineHeight: 1.1,
      letterSpacing: '-1%',
    },
    m: {
      fontFamily: fontFamily.primary,
      fontSize: 14,
      fontWeight: fontWeight.semibold,
      lineHeight: 1.1,
      letterSpacing: '-1%',
    },
    s: {
      fontFamily: fontFamily.primary,
      fontSize: 12,
      fontWeight: fontWeight.semibold,
      lineHeight: 1.1,
      letterSpacing: '-1%',
    },
  },
} as const;

export type Typography = typeof typography;

// Helper function to generate CSS font shorthand
export function toCssFont(style: {
  fontWeight: number;
  fontSize: number;
  lineHeight: number;
  fontFamily: string;
}): string {
  return `${style.fontWeight} ${style.fontSize}px/${style.lineHeight} ${style.fontFamily}`;
}
