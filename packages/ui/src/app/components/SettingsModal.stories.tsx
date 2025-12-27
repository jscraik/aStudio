import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";

import { SettingsModal } from "./SettingsModal";

const meta: Meta<typeof SettingsModal> = {
  title: "ChatUI/SettingsModal",
  component: SettingsModal,
  parameters: {
    layout: "fullscreen",
  },
  render: (args) => (
    <div className="h-screen bg-[var(--foundation-bg-dark-1)]">
      <SettingsModal {...args} />
    </div>
  ),
};

export default meta;

type Story = StoryObj<typeof SettingsModal>;

export const Default: Story = {
  args: {
    isOpen: true,
    onClose: () => {},
  },
};

export const Interactive: Story = {
  render: () => {
    const [isOpen, setIsOpen] = useState(true);
    return (
      <div className="h-screen bg-[var(--foundation-bg-dark-1)] flex items-center justify-center">
        <button
          onClick={() => setIsOpen(true)}
          className="px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg transition-colors"
        >
          Open Settings
        </button>
        <SettingsModal isOpen={isOpen} onClose={() => setIsOpen(false)} />
      </div>
    );
  },
};

export const Closed: Story = {
  args: {
    isOpen: false,
    onClose: () => {},
  },
};
