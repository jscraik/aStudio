// Radix fallback component.
// why_missing_upstream: Apps SDK UI lacks this component or required API parity.
// migration_trigger: Replace with Apps SDK UI component when available with matching props and behavior.
// a11y_contract_ref: docs/KEYBOARD_NAVIGATION_TESTS.md

import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "../../../utils";
import type { StatefulComponentProps, ComponentState } from "@design-studio/tokens";

/**
 * Defines base class names and variant mappings for badges.
 */
const badgeVariants = cva(
  "inline-flex items-center justify-center rounded-md border px-2 py-0.5 font-foundation text-caption font-medium w-fit whitespace-nowrap shrink-0 [&>svg]:size-3 gap-1 [&>svg]:pointer-events-none focus-visible:border-foundation-accent-blue focus-visible:ring-2 focus-visible:ring-foundation-text-light-primary dark:focus-visible:ring-foundation-text-dark-primary aria-invalid:ring-2 aria-invalid:ring-foundation-accent-red aria-invalid:border-foundation-accent-red transition-colors overflow-hidden",
  {
    variants: {
      variant: {
        default:
          "border-transparent bg-foundation-accent-blue text-foundation-text-light-primary [a&]:hover:bg-foundation-accent-blue/90",
        secondary:
          "border-transparent bg-foundation-bg-light-2 text-foundation-text-light-primary [a&]:hover:bg-foundation-bg-light-3 dark:bg-foundation-bg-dark-2 dark:text-foundation-text-dark-primary dark:[a&]:hover:bg-foundation-bg-dark-3",
        destructive:
          "border-transparent bg-foundation-accent-red text-foundation-text-light-primary [a&]:hover:bg-foundation-accent-red/90 focus-visible:ring-foundation-text-light-primary dark:focus-visible:ring-foundation-text-dark-primary",
        outline:
          "border-foundation-bg-light-3 bg-transparent text-foundation-text-light-primary [a&]:hover:bg-foundation-bg-light-3 dark:border-foundation-bg-dark-3 dark:text-foundation-text-dark-primary dark:[a&]:hover:bg-foundation-bg-dark-3",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

/**
 * Renders a badge element with visual variants.
 *
 * Supports stateful props for loading, error, disabled, and required states.
 *
 * @param props - Badge props including variant, asChild, and stateful options.
 * @returns A badge element.
 *
 * @example
 * ```tsx
 * <Badge variant="secondary">Beta</Badge>
 * <Badge loading>Loading...</Badge>
 * <Badge error="Failed">Error</Badge>
 * ```
 */
function Badge({
  className,
  variant,
  asChild = false,
  loading = false,
  error,
  disabled = false,
  required,
  onStateChange,
  ...props
}: React.ComponentProps<"span"> &
  VariantProps<typeof badgeVariants> &
  StatefulComponentProps & {
    asChild?: boolean;
  }) {
  const Comp = asChild ? Slot : "span";

  // Determine effective state
  const effectiveState: ComponentState = loading
    ? "loading"
    : error
      ? "error"
      : disabled
        ? "disabled"
        : "default";

  // Notify parent of state changes
  React.useEffect(() => {
    onStateChange?.(effectiveState);
  }, [effectiveState, onStateChange]);

  return (
    <Comp
      data-slot="badge"
      data-state={effectiveState}
      data-error={error ? "true" : undefined}
      data-required={required ? "true" : undefined}
      className={cn(
        badgeVariants({ variant }),
        // Disabled state styling
        disabled && "opacity-50 pointer-events-none",
        // Error state styling
        error && "border-foundation-accent-red text-foundation-accent-red",
        className,
      )}
      aria-disabled={disabled || undefined}
      aria-invalid={error ? "true" : required ? "false" : undefined}
      aria-required={required || undefined}
      {...props}
    />
  );
}

export { Badge, badgeVariants };
