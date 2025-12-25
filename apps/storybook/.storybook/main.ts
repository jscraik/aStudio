import type { StorybookConfig } from "@storybook/react-vite";
import path from "node:path";

const config: StorybookConfig = {
  stories: ["../../../packages/ui/src/**/*.stories.tsx"],
  addons: [
    "@storybook/addon-essentials",
    "@storybook/addon-interactions",
    "@storybook/addon-a11y",
  ],
  framework: {
    name: "@storybook/react-vite",
    options: {},
  },
  docs: {
    autodocs: true,
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
  },
};

export default config;
