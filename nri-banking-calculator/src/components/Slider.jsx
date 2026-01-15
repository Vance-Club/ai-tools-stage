import React from 'react';
import * as SliderPrimitive from '@radix-ui/react-slider';

const Slider = ({
    min = 0,
    max = 100,
    step = 1,
    value,
    defaultValue,
    onValueChange,
    disabled = false,
    className = '',
    'aria-label': ariaLabel = 'Slider',
}) => {
    // Use either controlled value or internal defaultValue
    const currentValue = value !== undefined ? [value] : undefined;
    const defaultVal = defaultValue !== undefined ? [defaultValue] : [min];

    return (
        <SliderPrimitive.Root
            className={`relative flex items-center select-none touch-none w-full h-7 ${disabled ? 'opacity-60 pointer-events-none' : ''} ${className}`}
            value={currentValue}
            defaultValue={defaultVal}
            min={min}
            max={max}
            step={step}
            disabled={disabled}
            onValueChange={(val) => onValueChange?.(val[0])}
            aria-label={ariaLabel}
        >
            <SliderPrimitive.Track className="bg-surface-elevated relative grow h-1 rounded-full overflow-hidden border border-gray-200">
                <SliderPrimitive.Range className="absolute h-full bg-primary-dark rounded-full" />
            </SliderPrimitive.Track>
            <SliderPrimitive.Thumb
                className="block w-7 h-7 bg-white rounded-full shadow-[0_2px_8px_rgba(0,0,0,0.15)] hover:shadow-[0_2px_12px_rgba(0,0,0,0.2)] focus:outline-none focus:shadow-[0_0_0_3px_rgba(85,35,178,0.2),0_2px_8px_rgba(0,0,0,0.15)] active:scale-105 active:cursor-grabbing transition-transform cursor-grab"
                aria-label={ariaLabel}
            />
        </SliderPrimitive.Root>
    );
};

export default Slider;
