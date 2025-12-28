import { cn } from "../utils";

export interface RangeSliderProps {
  /** Current value */
  value: number;
  /** Callback when value changes */
  onChange?: (value: number) => void;
  /** Minimum value */
  min?: number;
  /** Maximum value */
  max?: number;
  /** Step increment */
  step?: number;
  /** Label text */
  label?: string;
  /** Value suffix (e.g., "k", "%") */
  suffix?: string;
  /** Show value display */
  showValue?: boolean;
  /** Gradient background for track */
  gradient?: string;
  /** Disabled state */
  disabled?: boolean;
  /** Additional CSS classes */
  className?: string;
}

/**
 * RangeSlider - A customizable range input
 *
 * @example
 * ```tsx
 * <RangeSlider
 *   label="Target Size"
 *   value={60}
 *   onChange={setTargetSize}
 *   min={20}
 *   max={100}
 *   suffix="k"
 * />
 * ```
 */
export function RangeSlider({
  value,
  onChange,
  min = 0,
  max = 100,
  step = 1,
  label,
  suffix = "",
  showValue = true,
  gradient,
  disabled = false,
  className,
}: RangeSliderProps) {
  const percentage = ((value - min) / (max - min)) * 100;

  const defaultGradient = `linear-gradient(to right, var(--foundation-range-fill) 0%, var(--foundation-range-fill) ${percentage}%, var(--foundation-range-track) ${percentage}%, var(--foundation-range-track) 100%)`;

  return (
    <div className={cn("space-y-2", className)}>
      {(label || showValue) && (
        <div className="flex items-center justify-between">
          {label && (
            <label className="text-[13px] font-normal leading-[18px] text-foundation-text-light-secondary dark:text-foundation-text-dark-secondary">{label}</label>
          )}
          {showValue && (
            <span className="text-[13px] font-medium leading-[18px] text-foundation-text-light-primary dark:text-foundation-text-dark-primary">
              {value}
              {suffix}
            </span>
          )}
        </div>
      )}
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange?.(Number(e.target.value))}
        disabled={disabled}
        className={cn(
          "w-full h-1.5 rounded-lg appearance-none cursor-pointer [--foundation-range-track:var(--foundation-bg-light-3)] [--foundation-range-thumb:var(--foundation-bg-light-1)] [--foundation-range-fill:var(--foundation-accent-green)] dark:[--foundation-range-track:var(--foundation-bg-dark-3)] dark:[--foundation-range-thumb:var(--foundation-bg-dark-1)]",
          "[&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-[var(--foundation-range-thumb)] [&::-webkit-slider-thumb]:cursor-pointer [&::-webkit-slider-thumb]:shadow-sm",
          "[&::-moz-range-thumb]:w-4 [&::-moz-range-thumb]:h-4 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:bg-[var(--foundation-range-thumb)] [&::-moz-range-thumb]:border-0 [&::-moz-range-thumb]:cursor-pointer",
          disabled && "opacity-50 cursor-not-allowed",
        )}
        style={{ background: gradient || defaultGradient }}
      />
    </div>
  );
}

RangeSlider.displayName = "RangeSlider";
