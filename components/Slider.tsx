/**
 * Aspora Design System - Slider Component
 * A range slider with single or dual thumb variants
 */

import React, { useState, useRef, useCallback, useEffect } from 'react';

export type SliderType = 'single' | 'range';

export interface SliderProps {
  /** Minimum value */
  min?: number;
  /** Maximum value */
  max?: number;
  /** Step increment */
  step?: number;
  /** Current value (for single slider) */
  value?: number;
  /** Current range values (for range slider) */
  rangeValue?: [number, number];
  /** Slider type - single thumb or range (two thumbs) */
  type?: SliderType;
  /** Whether the slider is disabled */
  disabled?: boolean;
  /** Callback when value changes (single slider) */
  onChange?: (value: number) => void;
  /** Callback when range changes (range slider) */
  onRangeChange?: (value: [number, number]) => void;
  /** Additional CSS classes */
  className?: string;
  /** Accessible label */
  'aria-label'?: string;
}

export const Slider: React.FC<SliderProps> = ({
  min = 0,
  max = 100,
  step = 1,
  value = 50,
  rangeValue = [25, 75],
  type = 'single',
  disabled = false,
  onChange,
  onRangeChange,
  className = '',
  'aria-label': ariaLabel = 'Slider',
}) => {
  const trackRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState<'left' | 'right' | 'single' | null>(null);

  // Calculate percentage from value
  const valueToPercent = (val: number) => ((val - min) / (max - min)) * 100;

  // Calculate value from percentage
  const percentToValue = (percent: number) => {
    const rawValue = (percent / 100) * (max - min) + min;
    const steppedValue = Math.round(rawValue / step) * step;
    return Math.min(max, Math.max(min, steppedValue));
  };

  // Get position from mouse/touch event
  const getPositionFromEvent = useCallback((e: MouseEvent | TouchEvent) => {
    if (!trackRef.current) return 0;
    const rect = trackRef.current.getBoundingClientRect();
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    const percent = ((clientX - rect.left) / rect.width) * 100;
    return Math.min(100, Math.max(0, percent));
  }, []);

  // Handle mouse/touch move
  const handleMove = useCallback((e: MouseEvent | TouchEvent) => {
    if (!isDragging || disabled) return;

    const percent = getPositionFromEvent(e);
    const newValue = percentToValue(percent);

    if (type === 'single' && isDragging === 'single') {
      onChange?.(newValue);
    } else if (type === 'range') {
      if (isDragging === 'left') {
        const newLeft = Math.min(newValue, rangeValue[1] - step);
        onRangeChange?.([newLeft, rangeValue[1]]);
      } else if (isDragging === 'right') {
        const newRight = Math.max(newValue, rangeValue[0] + step);
        onRangeChange?.([rangeValue[0], newRight]);
      }
    }
  }, [isDragging, disabled, type, rangeValue, step, onChange, onRangeChange, getPositionFromEvent, percentToValue]);

  // Handle mouse/touch end
  const handleEnd = useCallback(() => {
    setIsDragging(null);
  }, []);

  // Add/remove event listeners
  useEffect(() => {
    if (isDragging) {
      document.addEventListener('mousemove', handleMove);
      document.addEventListener('mouseup', handleEnd);
      document.addEventListener('touchmove', handleMove);
      document.addEventListener('touchend', handleEnd);
    }

    return () => {
      document.removeEventListener('mousemove', handleMove);
      document.removeEventListener('mouseup', handleEnd);
      document.removeEventListener('touchmove', handleMove);
      document.removeEventListener('touchend', handleEnd);
    };
  }, [isDragging, handleMove, handleEnd]);

  // Track colors
  const trackBg = disabled
    ? 'var(--fills-gray-300, #D1D1D6)'
    : 'var(--fills-gray-200, #E5E5EA)';
  const fillBg = disabled
    ? 'var(--fills-primary-300, #A38CE5)'
    : 'var(--fills-primary-500, #5523B2)';

  // Thumb component
  const Thumb: React.FC<{
    position: number;
    onStart: () => void;
    label: string;
  }> = ({ position, onStart, label }) => (
    <div
      role="slider"
      aria-label={label}
      aria-valuenow={percentToValue(position)}
      aria-valuemin={min}
      aria-valuemax={max}
      tabIndex={disabled ? -1 : 0}
      onMouseDown={(e) => {
        e.preventDefault();
        if (!disabled) onStart();
      }}
      onTouchStart={(e) => {
        if (!disabled) onStart();
      }}
      onKeyDown={(e) => {
        if (disabled) return;
        const currentValue = percentToValue(position);
        if (e.key === 'ArrowRight' || e.key === 'ArrowUp') {
          e.preventDefault();
          const newValue = Math.min(max, currentValue + step);
          if (type === 'single') onChange?.(newValue);
        } else if (e.key === 'ArrowLeft' || e.key === 'ArrowDown') {
          e.preventDefault();
          const newValue = Math.max(min, currentValue - step);
          if (type === 'single') onChange?.(newValue);
        }
      }}
      style={{
        position: 'absolute',
        top: '50%',
        left: `${position}%`,
        transform: 'translate(-50%, -50%)',
        width: 28,
        height: 28,
        borderRadius: '50%',
        backgroundColor: 'white',
        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.15)',
        cursor: disabled ? 'not-allowed' : 'grab',
        zIndex: 2,
        transition: isDragging ? 'none' : 'left 0.1s ease',
        outline: 'none',
      }}
    />
  );

  const singlePercent = valueToPercent(value);
  const leftPercent = valueToPercent(rangeValue[0]);
  const rightPercent = valueToPercent(rangeValue[1]);

  return (
    <div
      className={className}
      style={{
        width: '100%',
        padding: '12px 0',
        opacity: disabled ? 0.6 : 1,
      }}
    >
      {/* Track */}
      <div
        ref={trackRef}
        style={{
          position: 'relative',
          width: '100%',
          height: 4,
          backgroundColor: trackBg,
          borderRadius: 2,
        }}
      >
        {/* Filled portion */}
        {type === 'single' ? (
          <div
            style={{
              position: 'absolute',
              left: 0,
              top: 0,
              width: `${singlePercent}%`,
              height: '100%',
              backgroundColor: fillBg,
              borderRadius: 2,
              transition: isDragging ? 'none' : 'width 0.1s ease',
            }}
          />
        ) : (
          <div
            style={{
              position: 'absolute',
              left: `${leftPercent}%`,
              top: 0,
              width: `${rightPercent - leftPercent}%`,
              height: '100%',
              backgroundColor: fillBg,
              borderRadius: 2,
              transition: isDragging ? 'none' : 'all 0.1s ease',
            }}
          />
        )}

        {/* Thumb(s) */}
        {type === 'single' ? (
          <Thumb
            position={singlePercent}
            onStart={() => setIsDragging('single')}
            label={ariaLabel}
          />
        ) : (
          <>
            <Thumb
              position={leftPercent}
              onStart={() => setIsDragging('left')}
              label={`${ariaLabel} minimum`}
            />
            <Thumb
              position={rightPercent}
              onStart={() => setIsDragging('right')}
              label={`${ariaLabel} maximum`}
            />
          </>
        )}
      </div>
    </div>
  );
};

export default Slider;
