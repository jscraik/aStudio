import { Download, IconShare, IconSidebar } from "../../icons";

import { IconButton } from "./ui/icon-button";
import { ModelSelector, type ModelConfig } from "./ui/model-selector";
import { ViewModeToggle } from "./ui/view-mode-toggle";

interface ChatHeaderProps {
  onSidebarToggle: () => void;
  isSidebarOpen?: boolean;
  selectedModel?: string | ModelConfig;
  onModelChange?: (model: string | ModelConfig) => void;
  models?: ModelConfig[];
  legacyModels?: ModelConfig[];
  viewMode?: "chat" | "compose";
  onViewModeChange?: (mode: "chat" | "compose") => void;
  headerRight?: React.ReactNode;
}

export function ChatHeader({
  onSidebarToggle,
  isSidebarOpen,
  selectedModel = "Default",
  onModelChange,
  models,
  legacyModels,
  viewMode = "chat",
  onViewModeChange,
  headerRight,
}: ChatHeaderProps) {
  const resolvedModels = models ?? [];
  const resolvedLegacyModels = legacyModels ?? [];
  const modelName = typeof selectedModel === "string" ? selectedModel : selectedModel.shortName;

  return (
    <div className="h-14 border-b border-white/10 bg-[var(--foundation-bg-dark-1)] flex items-center justify-between px-4 flex-shrink-0">
      <div className="flex items-center gap-2">
        <IconButton
          onClick={onSidebarToggle}
          icon={<IconSidebar />}
          variant="outline"
          size="md"
          active={isSidebarOpen}
          title={isSidebarOpen ? "Collapse sidebar" : "Expand sidebar"}
        />

        <ViewModeToggle value={viewMode} onChange={onViewModeChange} />

        {viewMode !== "compose" && resolvedModels.length > 0 && (
          <ModelSelector
            value={modelName}
            onChange={onModelChange}
            models={resolvedModels}
            legacyModels={resolvedLegacyModels}
          />
        )}
      </div>

      <div className="flex items-center gap-2">
        {headerRight}

        <IconButton icon={<Download />} variant="ghost" size="sm" />
        <IconButton icon={<IconShare />} variant="ghost" size="sm" />
      </div>
    </div>
  );
}
