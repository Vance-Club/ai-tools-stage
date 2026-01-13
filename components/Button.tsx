/**
 * Aspora Design System - Button Component
 * Primary and Secondary button variants with multiple states
 */

import React, { useState } from 'react';

export type ButtonVariant = 'primary' | 'secondary';
export type ButtonState = 'default' | 'pressed' | 'disabled';

export interface ButtonProps {
  /** Button text content */
  children: React.ReactNode;
  /** Button variant */
  variant?: ButtonVariant;
  /** Whether the button is disabled */
  disabled?: boolean;
  /** Button type */
  type?: 'button' | 'submit' | 'reset';
  /** Click handler */
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  /** Additional CSS classes */
  className?: string;
  /** Accessible label */
  'aria-label'?: string;
  /** Full width button */
  fullWidth?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  disabled = false,
  type = 'button',
  onClick,
  className = '',
  'aria-label': ariaLabel,
  fullWidth = false,
}) => {
  const [isPressed, setIsPressed] = useState(false);

  const handleMouseDown = () => {
    if (!disabled) setIsPressed(true);
  };

  const handleMouseUp = () => {
    setIsPressed(false);
  };

  const handleMouseLeave = () => {
    setIsPressed(false);
  };

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!disabled && onClick) {
      onClick(e);
    }
  };

  // Primary button styles
  const getPrimaryStyles = (): React.CSSProperties => {
    if (disabled) {
      return {
        background: 'linear-gradient(180deg, #A38CE5 0%, #8B6FD9 100%)',
        boxShadow: 'inset 0px 1px 0px 0px rgba(255, 255, 255, 0.4)',
        border: '1px solid #8B6FD9',
        color: 'rgba(255, 255, 255, 0.7)',
        cursor: 'not-allowed',
      };
    }
    if (isPressed) {
      return {
        background: 'linear-gradient(180deg, #5523B2 0%, #43149B 100%)',
        boxShadow: `
          inset 0px 1px 0px 0px rgba(255, 255, 255, 0.3),
          inset 0px 0px 0px 1px rgba(255, 255, 255, 0.2)
        `,
        border: '1px solid #3A1187',
        color: 'var(--text-contrast-700, #FFFFFF)',
        cursor: 'pointer',
      };
    }
    // Default state
    return {
      background: 'linear-gradient(180deg, #6E2FE4 0%, #5523B2 100%)',
      boxShadow: `
        inset 0px 1px 0px 0px rgba(255, 255, 255, 0.4),
        inset 0px 0px 0px 1px rgba(255, 255, 255, 0.3),
        0px 8px 15px 0px rgba(67, 20, 155, 0.25)
      `,
      border: '1px solid #43149B',
      color: 'var(--text-contrast-700, #FFFFFF)',
      cursor: 'pointer',
    };
  };

  // Secondary button styles
  const getSecondaryStyles = (): React.CSSProperties => {
    if (disabled) {
      return {
        background: 'var(--fills-gray-200, #E5E5EA)',
        boxShadow: 'none',
        border: '1px solid var(--fills-gray-300, #D1D1D6)',
        color: 'var(--text-base-400, rgba(14, 15, 17, 0.45))',
        cursor: 'not-allowed',
      };
    }
    if (isPressed) {
      return {
        background: 'var(--fills-gray-300, #D1D1D6)',
        boxShadow: 'inset 0px 1px 2px 0px rgba(0, 0, 0, 0.1)',
        border: '1px solid var(--fills-gray-400, #C7C7CC)',
        color: 'var(--text-base-600, #0E0F11)',
        cursor: 'pointer',
      };
    }
    // Default state
    return {
      background: 'var(--fills-gray-200, #E5E5EA)',
      boxShadow: '0px 2px 4px 0px rgba(0, 0, 0, 0.05)',
      border: '1px solid var(--fills-gray-400, #C7C7CC)',
      color: 'var(--text-base-600, #0E0F11)',
      cursor: 'pointer',
    };
  };

  const variantStyles = variant === 'primary' ? getPrimaryStyles() : getSecondaryStyles();

  return (
    <button
      type={type}
      disabled={disabled}
      onClick={handleClick}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseLeave}
      className={className}
      aria-label={ariaLabel}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: 52,
        paddingLeft: 16,
        paddingRight: 16,
        paddingTop: 20,
        paddingBottom: 20,
        borderRadius: 99,
        fontFamily: "'Inter', sans-serif",
        fontSize: 15,
        fontWeight: 600,
        lineHeight: 1.1,
        letterSpacing: '-0.01em',
        transition: 'all 0.15s ease',
        outline: 'none',
        width: fullWidth ? '100%' : 'auto',
        minWidth: 120,
        ...variantStyles,
      }}
    >
      {children}
    </button>
  );
};

export default Button;
