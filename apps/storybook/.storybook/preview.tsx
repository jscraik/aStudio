import "../preview.css";

import type { Preview } from "@storybook/react-vite";
import React from "react";

import { HostProvider, createMockHost } from "@chatui/runtime";
import { AppsSDKUIProvider } from "@chatui/ui";

// Make React available globally for MDX files
(globalThis as any).React = React;

const host = createMockHost();

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: "^on[A-Z].*" },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    // Accessibility testing configuration
    a11y: {
      config: {
        rules: [
          {
            id: 'color-contrast',
            enabled: true,
          },
          {
            id: 'focus-order-semantics',
            enabled: true,
          },
        ],
      },
    },
    // Documentation configuration
    docs: {
      toc: {
        contentsSelector: '.sbdocs-content',
        headingSelector: 'h1, h2, h3',
        title: 'Table of Contents',
      },
    },
  },

  decorators: [
    (Story) => (
      <HostProvider host={host}>
        <AppsSDKUIProvider>
          <Story />
        </AppsSDKUIProvider>
      </HostProvider>
    ),
  ],

  tags: ["autodocs"]
};

export default preview;
