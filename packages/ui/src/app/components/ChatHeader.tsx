
import {
    Download,
    IconShare,
    IconSidebar,
} from "../../icons";
import { IconButton } from "./ui/icon-button";
import { ModelSelector } from "./ui/model-selector";
import { ViewModeToggle } from "./ui/view-mode-toggle";

interface ModelConfig {
  name: string;
  shortName: string;
  description: string;
  isLegacy?: boolean;
}

interface ChatHeaderProps {
  onSidebarToggle: () => void;
  isSidebarOpen?: boolean;
  selectedModel?: string | ModelConfig;
  onModelChange?: (model: string | ModelConfig) => void;
  viewMode?: "chat" | "compose";
  onViewModeChange?: (mode: "chat" | "compose") => void;
  headerRight?: React.ReactNode;
}

const availableModels: ModelConfig[] = [
  { name: "Auto", shortName: "Auto", description: "Decides how long to think" },
  { name: "Instant", shortName: "Instant", description: "Answers right away" },
  { name: "Thinking", shortName: "Thinking", description: "Thinks longer for better answers" },
  { name: "Pro", shortName: "Pro", description: "Research-grade intelligence" },
];

const legacyModels: ModelConfig[] = [
  { name: "GPT-5.1 Instant", shortName: "GPT-5.1 Instant", description: "Legacy model", isLegacy: true },
  { name: "GPT-5.1 Thinking", shortName: "GPT-5.1 Thinking", description: "Legacy model", isLegacy: true },
  { name: "GPT-5.1 Pro", shortName: "GPT-5.1 Pro", description: "Legacy model", isLegacy: true },
  { name: "GPT-5 Instant", shortName: "GPT-5 Instant", description: "Legacy model", isLegacy: true },
  { name: "GPT-5 Thinking mini", shortName: "GPT-5 Thinking mini", description: "Thinks quickly", isLegacy: true },
  { name: "GPT-5 Thinking", shortName: "GPT-5 Thinking", description: "Legacy model", isLegacy: true },
  { name: "GPT-5 Pro", shortName: "GPT-5 Pro", description: "Legacy model", isLegacy: true },
  { name: "GPT-4o", shortName: "GPT-4o", description: "Legacy model", isLegacy: true },
  { name: "GPT-4.1", shortName: "GPT-4.1", description: "Legacy model", isLegacy: true },
  { name: "GPT-4.5", shortName: "GPT-4.5", description: "Legacy model", isLegacy: true },
  { name: "o3", shortName: "o3", description: "Legacy model", isLegacy: true },
  { name: "o4-mini", shortName: "o4-mini", description: "Legacy model", isLegacy: true },
];

export function ChatHeader({
  onSidebarToggle,
  isSidebarOpen,
  selectedModel = "GPT-4o",
  onModelChange,
  viewMode = "chat",
  onViewModeChange,
  headerRight,
}: ChatHeaderProps) {
  const modelName = typeof selectedModel === "string" ? selectedModel : selectedModel.shortName;

  return (
    <div className="h-14 border-b border-white/10 bg-[var(--foundation-bg-dark-1)] flex items-center justify-between px-4 flex-shrink-0">
      <div className="flex items-center gap-2">
        <IconButton
          onClick={onSidebarToggle}
          icon={IconSidebar}
          variant="outline"
          size="md"
          pressed={isSidebarOpen}
          title={isSidebarOpen ? "Collapse sidebar" : "Expand sidebar"}
        />

        <ViewModeToggle
          value={viewMode}
          onChange={onViewModeChange}
        />

        {viewMode !== "compose" && (
          <ModelSelector
            value={modelName}
            onChange={onModelChange}
            models={availableModels}
            legacyModels={legacyModels}
          />
        )}
      </div>

      <div className="flex items-center gap-2">
        {headerRight}

        <IconButton
          icon={Download}
          variant="ghost"
          size="sm"
        />
        <IconButton
          icon={IconShare}
          variant="ghost"
          size="sm"
        />
      </div>
    </div>
  );
}
