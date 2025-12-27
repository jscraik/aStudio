// Core App Components
export { default as ChatUIApp } from "./app/App";
export { ChatUIRoot } from "./app/ChatUIRoot";

// Hooks
export * from "./app/hooks/useControllableState";

// Slots
export * from "./app/slots";

// Main Chat Components
export * from "./app/components/ChatHeader";
export * from "./app/components/ChatInput";
export * from "./app/components/ChatMessages";
export * from "./app/components/ChatSidebar";
export * from "./app/components/ComposeView";

// UI Components (prioritized over vendor)
export * from "./app/components/ui";

// Organized component exports for better tree-shaking
export * from "./app/components/ui/chat";
export * from "./app/components/ui/forms";
export * from "./app/components/ui/layout";

// Vendor Components (explicit exports to avoid conflicts)
export {
    Popover,
    PopoverContent,
    PopoverTrigger
} from "./vendor/appsSdkUi";

// Design System
export * from "./app/design-system/DesignTokens";
export * from "./app/pages/DashboardPage";
export * from "./app/pages/DesignSystemPage";
export * from "./app/pages/SpacingPage";
export * from "./app/pages/TypographyPage";

// Icons (ChatGPT icons take precedence)
export * from "./app/components/icons/ChatGPTIcons";
export * from "./icons";

// Utils
export * from "./app/components/ui/utils";
export * from "./app/utils/dev";
export * from "./app/utils/test";
export * from "./app/utils/theme";

// Templates
export * from "./templates";
