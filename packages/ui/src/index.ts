// Core App Components
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

// Vendor Components (explicit exports with AppsSDK prefix to avoid conflicts)
export {
  AppsSDKUIProvider,
  Button as AppsSDKButton,
  Checkbox as AppsSDKCheckbox,
  Image as AppsSDKImage,
  Input as AppsSDKInput,
  Badge as AppsSDKBadge,
  CodeBlock as AppsSDKCodeBlock,
  Popover as AppsSDKPopover,
  Textarea as AppsSDKTextarea,
  Download as AppsSDKDownloadIcon,
  Sparkles as AppsSDKSparklesIcon,
} from "./vendor/appsSdkUi";

// Icons (ChatGPT icons take precedence, avoid conflicts)
export * from "./app/components/icons/ChatGPTIcons";

// Utils
export * from "./app/components/ui/utils";
export * from "./app/utils/theme";

// Templates
export * from "./templates";
