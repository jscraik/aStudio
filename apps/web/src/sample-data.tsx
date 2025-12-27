import type { ChatMessage, ChatSidebarUser, SidebarItem, ModelConfig } from "@chatui/ui";
import { IconFolder, IconGrid3x3, IconSearch } from "@chatui/ui";

export const sampleModels: ModelConfig[] = [
  { name: "Auto", shortName: "Auto", description: "Decides how long to think" },
  { name: "Instant", shortName: "Instant", description: "Answers right away" },
  { name: "Thinking", shortName: "Thinking", description: "Thinks longer for better answers" },
];

export const sampleMessages: ChatMessage[] = [
  {
    id: "1",
    role: "assistant",
    content: "Welcome! This is a reference ChatUI shell.",
    timestamp: new Date(Date.now() - 1000 * 60 * 10),
  },
  {
    id: "2",
    role: "user",
    content: "Show me the new sidebar and input layout.",
    timestamp: new Date(Date.now() - 1000 * 60 * 9),
  },
];

export const sampleProjects: SidebarItem[] = [
  {
    id: "library",
    label: "UI Library",
    icon: <IconFolder className="size-4" />,
    color: "text-[var(--foundation-accent-green)]",
  },
  {
    id: "apps",
    label: "Apps SDK Demo",
    icon: <IconGrid3x3 className="size-4" />,
    color: "text-[var(--foundation-accent-blue)]",
  },
  {
    id: "search",
    label: "Search Widgets",
    icon: <IconSearch className="size-4" />,
    color: "text-[var(--foundation-accent-orange)]",
  },
];

export const sampleChatHistory = [
  "Sidebar polish",
  "Token audit follow-up",
  "Widgets demo list",
  "Design system review",
];

export const sampleUser: ChatSidebarUser = {
  name: "Sample User",
  accountLabel: "Personal account",
  planLabel: "Pro",
};
