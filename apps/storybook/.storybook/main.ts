// This file has been automatically migrated to valid ESM format by Storybook.
import type { StorybookConfig } from "@storybook/react-vite";
import path, { dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const config: StorybookConfig = {
  stories: ["../../../packages/ui/src/**/*.stories.@(js|jsx|ts|tsx|mdx)"],
  addons: [
    "@storybook/addon-a11y",
    "@storybook/addon-docs",
    "@storybook/addon-vitest",
    "@storybook/addon-webpack-stats-v2",
    "@storybook/addon-storysource"
  ],

  framework: {
    name: "@storybook/react-vite",
    options: {},
  },

  viteFinal: async (viteConfig) => {
    // Tailwind CSS v4 via PostCSS - handled by the CSS import in preview.tsx
    const { default: tailwindcss } = await import("@tailwindcss/vite");
    viteConfig.plugins = [...(viteConfig.plugins ?? []), tailwindcss()];
    viteConfig.base = "./";
    const repoRoot = path.resolve(__dirname, "../../..");
    viteConfig.server = {
      ...(viteConfig.server ?? {}),
      fs: {
        ...(viteConfig.server?.fs ?? {}),
        strict: false,
        allow: [repoRoot, path.resolve(repoRoot, "packages")],
      },
    };
    return viteConfig;
  }
};

export default config;
