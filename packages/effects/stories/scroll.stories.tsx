import type { Meta, StoryObj } from "@storybook/react";

import { StickyReveal } from "../src/components/scroll";

const meta: Meta<typeof StickyReveal> = {
  title: "Effects/Scroll/StickyReveal",
  component: StickyReveal,
  parameters: {
    layout: "fullscreen",
  },
  tags: ["autodocs", "a11y"],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <div className="space-y-8 p-8">
      <div className="h-screen flex items-center justify-center text-2xl">
        Scroll down to reveal content ↓
      </div>

      <StickyReveal triggerAt={0.5}>
        <div className="bg-foundation-bg-light-3 dark:bg-foundation-bg-dark-3 p-8 rounded-xl">
          <h2 className="text-3xl font-bold mb-4">Revealed Content</h2>
          <p>This content reveals when you scroll to it.</p>
        </div>
      </StickyReveal>

      <div className="h-screen flex items-center justify-center text-2xl">Keep scrolling ↓</div>
    </div>
  ),
};

export const MultipleReveals: Story = {
  render: () => (
    <div className="space-y-8 p-8">
      <div className="h-screen flex items-center justify-center text-2xl">
        Scroll to see multiple reveals ↓
      </div>

      <StickyReveal triggerAt={0.3} direction="up">
        <div className="bg-blue-100 dark:bg-blue-900 p-6 rounded-xl mb-4">
          <h3 className="text-xl font-semibold">First Reveal (Up)</h3>
        </div>
      </StickyReveal>

      <StickyReveal triggerAt={0.3} direction="down">
        <div className="bg-green-100 dark:bg-green-900 p-6 rounded-xl mb-4">
          <h3 className="text-xl font-semibold">Second Reveal (Down)</h3>
        </div>
      </StickyReveal>

      <StickyReveal triggerAt={0.3} direction="left">
        <div className="bg-purple-100 dark:bg-purple-900 p-6 rounded-xl mb-4">
          <h3 className="text-xl font-semibold">Third Reveal (Left)</h3>
        </div>
      </StickyReveal>

      <StickyReveal triggerAt={0.3} direction="right">
        <div className="bg-orange-100 dark:bg-orange-900 p-6 rounded-xl">
          <h3 className="text-xl font-semibold">Fourth Reveal (Right)</h3>
        </div>
      </StickyReveal>
    </div>
  ),
};

export const FadeVariants: Story = {
  render: () => (
    <div className="space-y-8 p-8">
      <div className="h-screen flex items-center justify-center text-2xl">
        Scroll for fade variants ↓
      </div>

      <StickyReveal triggerAt={0.3} fade="none">
        <div className="bg-red-100 dark:bg-red-900 p-6 rounded-xl mb-4">
          <h3 className="text-xl font-semibold">No Fade</h3>
        </div>
      </StickyReveal>

      <StickyReveal triggerAt={0.3} fade="subtle">
        <div className="bg-yellow-100 dark:bg-yellow-900 p-6 rounded-xl mb-4">
          <h3 className="text-xl font-semibold">Subtle Fade</h3>
        </div>
      </StickyReveal>

      <StickyReveal triggerAt={0.3} fade="full">
        <div className="bg-cyan-100 dark:bg-cyan-900 p-6 rounded-xl">
          <h3 className="text-xl font-semibold">Full Fade</h3>
        </div>
      </StickyReveal>
    </div>
  ),
};

export const Sticky: Story = {
  render: () => (
    <div className="space-y-8 p-8">
      <div className="h-screen flex items-center justify-center text-2xl">
        Scroll for sticky reveal ↓
      </div>

      <StickyReveal triggerAt={0.5} sticky>
        <div className="bg-foundation-accent-green text-white p-8 rounded-xl">
          <h2 className="text-3xl font-bold mb-4">Sticky Reveal</h2>
          <p>This card sticks while scrolling after revealing.</p>
        </div>
      </StickyReveal>

      <div className="h-[200vh]">
        <p className="text-center text-2xl">Keep scrolling to see sticky effect...</p>
      </div>
    </div>
  ),
};
