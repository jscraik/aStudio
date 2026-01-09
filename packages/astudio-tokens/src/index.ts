/**
 * @astudio/tokens
 * Design tokens for Figma Make integration.
 * Re-exports from @chatui/tokens with Make-friendly entry points.
 */

export {
  colorTokens,
  radiusTokens,
  shadowTokens,
  sizeTokens,
  spacingScale,
  typographyTokens,
} from "@chatui/tokens";

export type {
  ColorTokens,
  RadiusTokens,
  ShadowTokens,
  SizeTokens,
  SpacingScale,
  TypographyTokens,
} from "./types";

export { default as tailwindPreset } from "@chatui/tokens/tailwind.preset";
