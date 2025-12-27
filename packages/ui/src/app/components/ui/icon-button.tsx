import { cn } from "./utils";

export interface IconButtonProps {
  /** Icon to display */
  icon: React.ReactNode;
  /** Click handler */
  onClick?: () => void;
  /** Tooltip/title text */
  title?: string;
  /** Size variant */
  size?: "sm" | "md" | "lg";
  /** Visual variant */
  variant?: "ghost" | "outline" | "solid";
  /** Whether the button is active/pressed */
  active?: boolean;
  /** Active color when pressed */
  activeColor?: string;
  /** Whether the button is disabled */
  disabled?: boolean;
  /** Additional CSS classes */
  className?: string;
  /** Button type */
  type?: "button" | "submit" | "reset";
}

/**
 * IconButton - A button that displays only an icon
 * 
 * @example
 * ```tsx
 * <IconButton
 *   icon={<IconCopy />}
 *   onClick={handleCopy}
 *   title="Copy to clipboard"
 * />
 * ```
 */
export function IconButton({
  icon,
  onClick,
  title,
  size = "md",
  variant = "ghost",
  active = false,
  activeColor = "var(--foundation-accent-blue)",
  disabled = false,
  className,
  type = "button",
}: IconButtonProps) {
  const sizes = {
    sm: "p-1",
    md: "p-1.5",
    lg: "p-2",
  };

  const iconSizes = {
    sm: "size-3.5",
    md: "size-4",
    lg: "size-5",
  };

  const variants = {
    ghost: "hover:bg-white/10",
    outline: "border border-white/10 hover:bg-white/5",
    solid: "bg-white/10 hover:bg-white/20",
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      title={title}
      className={cn(
        "rounded-md transition-colors flex items-center justify-center",
        sizes[size],
        variants[variant],
        active && `bg-[${activeColor}]/10`,
        disabled && "opacity-50 cursor-not-allowed",
        className
      )}
      style={active ? { backgroundColor: `color-mix(in srgb, ${activeColor} 10%, transparent)` } : undefined}
    >
      <span
        className={cn(
          iconSizes[size],
          "text-[var(--foundation-text-dark-tertiary)] hover:text-[var(--foundation-text-dark-primary)] transition-colors",
          "[&>svg]:w-full [&>svg]:h-full"
        )}
        style={active ? { color: activeColor } : undefined}
      >
        {icon}
      </span>
    </button>
  );
}

IconButton.displayName = "IconButton";
