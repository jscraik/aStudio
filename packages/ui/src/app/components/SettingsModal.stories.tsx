import type { Meta, StoryObj } from "@storybook/react-vite";

import { SettingsModal } from "./SettingsModal";

const meta: Meta<typeof SettingsModal> = {
  title: "ChatUI/SettingsModal",
  component: SettingsModal,
  parameters: {
    layout: "fullscreen",
  },
};

export default meta;

type Story = StoryObj<typeof SettingsModal>;

export const Default: Story = {
  render: () => (
    <div className="h-screen bg-[#0D0D0D]">
      <SettingsModal isOpen={true} onClose={() => {}} />
    </div>
  ),
};
