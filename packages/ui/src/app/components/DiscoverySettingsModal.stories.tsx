import type { Meta, StoryObj } from "@storybook/react-vite";

import { DiscoverySettingsModal } from "./DiscoverySettingsModal";

const meta: Meta<typeof DiscoverySettingsModal> = {
  title: "ChatUI/DiscoverySettingsModal",
  component: DiscoverySettingsModal,
  parameters: {
    layout: "fullscreen",
  },
};

export default meta;

type Story = StoryObj<typeof DiscoverySettingsModal>;

export const Default: Story = {
  render: () => (
    <div className="h-screen bg-[#0D0D0D]">
      <DiscoverySettingsModal
        isOpen={true}
        onClose={() => {}}
        promptEnhancement="rewrite"
        onPromptEnhancementChange={() => {}}
        targetSize={60}
        onTargetSizeChange={() => {}}
      />
    </div>
  ),
};
