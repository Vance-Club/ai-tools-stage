import React from 'react';

const sizeStyles = {
    large: {
        track: { width: 46, height: 28, borderRadius: 24 },
        thumb: { size: 24, margin: 2 },
    },
    regular: {
        track: { width: 40, height: 24, borderRadius: 20 },
        thumb: { size: 20, margin: 2 },
    },
};

const Toggle = ({
    checked = false,
    size = 'large',
    disabled = false,
    onChange,
    className = '',
    'aria-label': ariaLabel,
}) => {
    const styles = sizeStyles[size];

    const handleClick = () => {
        if (!disabled && onChange) {
            onChange(!checked);
        }
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            handleClick();
        }
    };

    // Determine colors based on state
    const getTrackColor = () => {
        if (disabled && checked) return 'var(--fills-primary-300, #A38CE5)';
        if (disabled) return 'var(--fills-gray-300, #D1D1D6)';
        if (checked) return 'var(--fills-primary-500, #5523B2)';
        return 'var(--fills-gray-400, #C7C7CC)';
    };

    const getThumbColor = () => {
        return 'var(--surface-white, #FFFFFF)';
    };

    const thumbPosition = checked
        ? styles.track.width - styles.thumb.size - styles.thumb.margin
        : styles.thumb.margin;

    return (
        <button
            type="button"
            role="switch"
            aria-checked={checked}
            aria-label={ariaLabel}
            disabled={disabled}
            onClick={handleClick}
            onKeyDown={handleKeyDown}
            className={className}
            style={{
                position: 'relative',
                width: styles.track.width,
                height: styles.track.height,
                padding: 0,
                border: 'none',
                borderRadius: styles.track.borderRadius,
                backgroundColor: getTrackColor(),
                cursor: disabled ? 'not-allowed' : 'pointer',
                opacity: disabled ? 0.6 : 1,
                transition: 'background-color 0.2s ease',
                outline: 'none',
            }}
        >
            {/* Thumb */}
            <span
                style={{
                    position: 'absolute',
                    top: styles.thumb.margin,
                    left: thumbPosition,
                    width: styles.thumb.size,
                    height: styles.thumb.size,
                    borderRadius: '50%',
                    backgroundColor: getThumbColor(),
                    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
                    transition: 'left 0.2s ease',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                }}
            >
                {/* Checkmark icon when active */}
                {checked && (
                    <svg
                        width={styles.thumb.size * 0.5}
                        height={styles.thumb.size * 0.5}
                        viewBox="0 0 12 12"
                        fill="none"
                        style={{ opacity: disabled ? 0.5 : 1 }}
                    >
                        <path
                            d="M2 6L5 9L10 3"
                            stroke="var(--fills-primary-500, #5523B2)"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                    </svg>
                )}
            </span>
        </button>
    );
};

export default Toggle;
