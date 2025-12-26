import type { Meta, StoryObj } from "@storybook/react-vite";

import { IconPickerModal } from "./IconPickerModal";

const meta: Meta<typeof IconPickerModal> = {
  title: "ChatUI/IconPickerModal",
  component: IconPickerModal,
  parameters: {
    layout: "fullscreen",
  },
};

export default meta;

type Story = StoryObj<typeof IconPickerModal>;

export const Default: Story = {
  render: () => (
    <div className="h-screen bg-[#0D0D0D]">
      <IconPickerModal
        isOpen={true}
        onClose={() => {}}
        onSave={() => {}}
        currentColor="text-[#BA8FF7]"
        projectName="Apps SDK Designer"
      />
    </div>
  ),
};
