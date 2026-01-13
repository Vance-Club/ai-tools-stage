/**
 * Aspora Design System - Selector Component
 * A simple pill-shaped selection button (like Chip but text-only)
 */

import React from 'react';

export type SelectorSize = 'large' | 'medium' | 'small';

export interface SelectorProps {
  /** Selector label text */
  label: string;
  /** Whether the selector is selected */
  selected?: boolean;
  /** Size variant */
  size?: SelectorSize;
  /** Whether the selector is disabled */
  disabled?: boolean;
  /** Callback when selector is clicked */
  onClick?: () => void;
  /** Additional CSS classes */
  className?: string;
}

const sizeStyles: Record<SelectorSize, {
  height: number;
  paddingX: number;
  paddingY: number;
  fontSize: number;
  borderRadius: number;
}> = {
  large: {
    height: 37,
    paddingX: 20,
    paddingY: 8,
    fontSize: 16,
    borderRadius: 20,
  },
  medium: {
    height: 36,
    paddingX: 16,
    paddingY: 8,
    fontSize: 14,
    borderRadius: 18,
  },
  small: {
    height: 33,
    paddingX: 14,
    paddingY: 6,
    fontSize: 13,
    borderRadius: 16,
  },
};

export const Selector: React.FC<SelectorProps> = ({
  label,
  selected = false,
  size = 'medium',
  disabled = false,
  onClick,
  className = '',
}) => {
  const styles = sizeStyles[size];

  const handleClick = () => {
    if (!disabled && onClick) {
      onClick();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleClick();
    }
  };

  // Determine colors based on state
  const getBackgroundColor = () => {
    if (disabled && selected) return 'var(--fills-primary-300, #A38CE5)';
    if (disabled) return 'transparent';
    if (selected) return 'var(--fills-primary-500, #5523B2)';
    return 'transparent';
  };

  const getBorderColor = () => {
    if (disabled && selected) return 'var(--fills-primary-300, #A38CE5)';
    if (disabled) return 'var(--fills-gray-300, #D1D1D6)';
    if (selected) return 'var(--fills-primary-500, #5523B2)';
    return 'var(--fills-gray-400, #C7C7CC)';
  };

  const getTextColor = () => {
    if (disabled) return 'var(--text-base-400, rgba(14, 15, 17, 0.45))';
    if (selected) return 'var(--text-contrast-700, #FFFFFF)';
    return 'var(--text-base-600, #0E0F11)';
  };

  return (
    <button
      type="button"
      role="option"
      aria-selected={selected}
      disabled={disabled}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      className={className}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: styles.height,
        paddingLeft: styles.paddingX,
        paddingRight: styles.paddingX,
        paddingTop: styles.paddingY,
        paddingBottom: styles.paddingY,
        border: `1px solid ${getBorderColor()}`,
        borderRadius: styles.borderRadius,
        backgroundColor: getBackgroundColor(),
        cursor: disabled ? 'not-allowed' : 'pointer',
        opacity: disabled ? 0.6 : 1,
        transition: 'all 0.2s ease',
        outline: 'none',
        fontFamily: "'Inter', sans-serif",
        fontSize: styles.fontSize,
        fontWeight: 400,
        lineHeight: 1.3,
        letterSpacing: '-0.01em',
        color: getTextColor(),
        whiteSpace: 'nowrap',
      }}
    >
      {label}
    </button>
  );
};

export default Selector;
