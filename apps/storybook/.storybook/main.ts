// Storybook 10 configuration for ChatUI Design System
import type { StorybookConfig } from "@storybook/react-vite";
import path, { dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const config: StorybookConfig = {
  stories: [
    "../../../packages/ui/src/**/*.stories.@(js|jsx|ts|tsx)",
  ],

  addons: [
    // Essential addons (Storybook 10)
    "@storybook/addon-docs",
    "@storybook/addon-a11y",
    "@storybook/addon-themes",
    "@storybook/addon-vitest",
  ],

  framework: {
    name: "@storybook/react-vite",
    options: {},
  },

  // TypeScript configuration
  typescript: {
    reactDocgen: "react-docgen-typescript",
    reactDocgenTypescriptOptions: {
      shouldExtractLiteralValuesFromEnum: true,
      shouldRemoveUndefinedFromOptional: true,
      propFilter: (prop) =>
        prop.parent ? !/node_modules/.test(prop.parent.fileName) : true,
    },
  },

  // Static directories for assets
  staticDirs: ["../public"],

  viteFinal: async (viteConfig) => {
    // Tailwind CSS v4 via Vite plugin
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

    // Optimize dependencies for faster dev startup
    viteConfig.optimizeDeps = {
      ...(viteConfig.optimizeDeps ?? {}),
      include: [
        "@storybook/addon-docs",
        "@storybook/addon-a11y",
        "@storybook/addon-themes",
      ],
    };

    return viteConfig;
  },
};

export default config;
