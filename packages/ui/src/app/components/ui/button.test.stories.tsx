import type { Meta, StoryObj } from "@storybook/react";
import { expect, userEvent, within } from "@storybook/test";
import { Button } from "./button";

const meta: Meta<typeof Button> = {
  title: "Tests/Button",
  component: Button,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const ClickInteraction: Story = {
  args: {
    children: "Click me",
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const button = canvas.getByRole("button");
    
    // Test initial state
    await expect(button).toBeInTheDocument();
    await expect(button).toBeEnabled();
    
    // Test click interaction
    await userEvent.click(button);
    
    // Test accessibility
    await expect(button).toHaveAccessibleName("Click me");
  },
};

export const DisabledState: Story = {
  args: {
    children: "Disabled button",
    disabled: true,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const button = canvas.getByRole("button");
    
    await expect(button).toBeDisabled();
    await expect(button).toHaveAttribute("disabled");
  },
};

export const KeyboardNavigation: Story = {
  args: {
    children: "Keyboard accessible",
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const button = canvas.getByRole("button");
    
    // Test keyboard focus
    await userEvent.tab();
    await expect(button).toHaveFocus();
    
    // Test Enter key activation
    await userEvent.keyboard("{Enter}");
  },
};