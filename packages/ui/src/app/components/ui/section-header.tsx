import { cn } from "./utils";

export interface SectionHeaderProps {
  /** Section title */
  title: string;
  /** Optional description */
  description?: string;
  /** Right-side content (buttons, badges, etc.) */
  right?: React.ReactNode;
  /** Size variant */
  size?: "sm" | "md" | "lg";
  /** Additional CSS classes */
  className?: string;
  /** Description CSS classes */
  descriptionClassName?: string;
}

/**
 * SectionHeader - A header for content sections
 *
 * @example
 * ```tsx
 * <SectionHeader
 *   title="Settings"
 *   description="Manage your preferences"
 *   right={<Button size="sm">Save</Button>}
 * />
 * ```
 */
export function SectionHeader({
  title,
  description,
  right,
  size = "md",
  className,
  descriptionClassName,
}: SectionHeaderProps) {
  const sizes = {
    sm: {
      title: "text-[13px] leading-[18px]",
      description: "text-[11px] leading-[16px]",
    },
    md: {
      title: "text-[14px] leading-[20px]",
      description: "text-[13px] leading-[18px]",
    },
    lg: {
      title: "text-[16px] leading-[24px]",
      description: "text-[14px] leading-[20px]",
    },
  };

  return (
    <div className={cn("flex items-start justify-between", className)}>
      <div>
        <h3 className={cn("font-medium text-white tracking-[-0.3px]", sizes[size].title)}>
          {title}
        </h3>
        {description && (
          <p
            className={cn(
              "font-normal text-[var(--foundation-text-dark-tertiary)] tracking-[-0.3px] mt-1",
              sizes[size].description,
              descriptionClassName,
            )}
          >
            {description}
          </p>
        )}
      </div>
      {right && <div className="flex-shrink-0">{right}</div>}
    </div>
  );
}

SectionHeader.displayName = "SectionHeader";
