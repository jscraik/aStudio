import { useState } from "react";

import {
  IconArchive,
  IconBarChart,
  IconBook,
  IconCategory,
  IconCheckCircle,
  IconCheckmark,
  IconChevronDownMd,
  IconChevronLeftMd,
  IconChevronRightMd,
  IconComment,
  IconCreditCard,
  IconEdit,
  IconEmail,
  IconGlobe,
  IconGo,
  IconInfo,
  IconLightBulb,
  IconLink,
  IconMessaging,
  IconMic,
  IconPhone,
  IconPlayground,
  IconPro,
  IconQuestion,
  IconRegenerate,
  IconSettings,
  IconSoundOn,
  IconStack,
  IconStarFilled,
  IconStatus,
  IconSuitcase,
  IconSun,
  IconTerminal,
  IconUndo,
  IconUserLock,
  IconWarning,
  IconX,
} from "./icons/ChatGPTIcons";

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const accentColors = [
  { name: "Blue", color: "#3b82f6" },
  { name: "Green", color: "#10b981" },
  { name: "Orange", color: "#f97316" },
  { name: "Red", color: "#ef4444" },
  { name: "Purple", color: "#8b5cf6" },
];

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="mb-6">
      <h3 className="text-[14px] font-semibold leading-[20px] tracking-[-0.3px] text-white/90 mb-3">
        {title}
      </h3>
      {children}
    </div>
  );
}

function RowDisplay({
  icon,
  label,
  right,
}: {
  icon: React.ReactNode;
  label: string;
  right: React.ReactNode;
}) {
  return (
    <div className="flex items-center justify-between px-3 py-2.5 hover:bg-white/5 rounded-lg transition-colors">
      <div className="flex items-center gap-3">
        {icon}
        <span className="text-[14px] font-normal leading-[20px] tracking-[-0.3px] text-white/90">
          {label}
        </span>
      </div>
      {right}
    </div>
  );
}

function RowButton({
  icon,
  label,
  right,
  onClick,
}: {
  icon: React.ReactNode;
  label: string;
  right: React.ReactNode;
  onClick?: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className="w-full flex items-center justify-between px-3 py-2.5 hover:bg-white/5 rounded-lg transition-colors"
    >
      <div className="flex items-center gap-3">
        {icon}
        <span className="text-[14px] font-normal leading-[20px] tracking-[-0.3px] text-white/90">
          {label}
        </span>
      </div>
      {right}
    </button>
  );
}

function ToggleRow({
  icon,
  label,
  checked,
  onToggle,
}: {
  icon: React.ReactNode;
  label: string;
  checked: boolean;
  onToggle: () => void;
}) {
  return (
    <div className="flex items-center justify-between px-3 py-2.5 hover:bg-white/5 rounded-lg transition-colors">
      <div className="flex items-center gap-3">
        {icon}
        <span className="text-[14px] font-normal leading-[20px] tracking-[-0.3px] text-white/90">
          {label}
        </span>
      </div>
      <button
        onClick={onToggle}
        className={`relative inline-flex h-5 w-9 items-center rounded-full transition-colors ${
          checked ? "bg-[var(--foundation-accent-green)]" : "bg-white/20"
        }`}
      >
        <span
          className={`inline-block size-4 transform rounded-full bg-white transition-transform ${
            checked ? "translate-x-[18px]" : "translate-x-0.5"
          }`}
        />
      </button>
    </div>
  );
}

export function SettingsModal({ isOpen, onClose }: SettingsModalProps) {
  // Navigation state
  const [currentView, setCurrentView] = useState<"main" | "personalization">("main");

  // Personalization state
  const [baseStyle, setBaseStyle] = useState("Efficient");
  const [showBaseStyleDropdown, setShowBaseStyleDropdown] = useState(false);
  const [warmStyle, setWarmStyle] = useState("Default");
  const [showWarmDropdown, setShowWarmDropdown] = useState(false);
  const [enthusiasticStyle, setEnthusiasticStyle] = useState("Default");
  const [showEnthusiasticDropdown, setShowEnthusiasticDropdown] = useState(false);
  const [headersListsStyle, setHeadersListsStyle] = useState("Default");
  const [showHeadersListsDropdown, setShowHeadersListsDropdown] = useState(false);
  const [emojiStyle, setEmojiStyle] = useState("Default");
  const [showEmojiDropdown, setShowEmojiDropdown] = useState(false);
  const [showAdvanced, setShowAdvanced] = useState(true);
  const [webSearch, setWebSearch] = useState(true);
  const [codeEnabled, setCodeEnabled] = useState(true);
  const [canvasEnabled, setCanvasEnabled] = useState(true);
  const [advancedVoice, setAdvancedVoice] = useState(true);

  const [showAdditionalModels, setShowAdditionalModels] = useState(true);
  const [correctSpelling, setCorrectSpelling] = useState(true);
  const [openLinksInApp, setOpenLinksInApp] = useState(true);
  const [appLanguage] = useState("English");
  const [showInMenuBar] = useState("When app is running");
  const [accentColor, setAccentColor] = useState("Purple");
  const [positionOnScreen] = useState("Remember last position");
  const [resetToNewChat] = useState("After 10 minutes");
  const [keyboardShortcut, setKeyboardShortcut] = useState("⌘Space");

  const [showLanguageDropdown, setShowLanguageDropdown] = useState(false);
  const [showMenuBarDropdown, setShowMenuBarDropdown] = useState(false);
  const [showColorDropdown, setShowColorDropdown] = useState(false);
  const [showPositionDropdown, setShowPositionDropdown] = useState(false);
  const [showResetDropdown, setShowResetDropdown] = useState(false);

  const [enableWorkWithApps, setEnableWorkWithApps] = useState(true);
  const [togglePairing] = useState("⌘⌥1");
  const [linearApps] = useState("Never");
  const [autoFairWithApps, setAutoFairWithApps] = useState(true);
  const [generateSuggestedEdits, setGenerateSuggestedEdits] = useState(false);
  const [autoApplySuggestedEdits, setAutoApplySuggestedEdits] = useState(false);

  const [voice] = useState("Cove");
  const [mainLanguage] = useState("English");

  const [autocomplete, setAutocomplete] = useState(true);
  const [trendingSearches, setTrendingSearches] = useState(true);
  const [followUpSuggestions, setFollowUpSuggestions] = useState(true);

  if (!isOpen) return null;

  const selectedColorHex = accentColors.find((c) => c.name === accentColor)?.color || "#3b82f6";

  // Personalization panel component
  const PersonalizationPanel = () => {
    const baseStyleOptions = [
      { value: "Default", description: "Preset style and tone" },
      { value: "Professional", description: "Polished and precise" },
      { value: "Friendly", description: "Warm and chatty" },
      { value: "Candid", description: "Direct and encouraging" },
      { value: "Quirky", description: "Playful and imaginative" },
      { value: "Efficient", description: "Concise and plain" },
      { value: "Nerdy", description: "Exploratory and enthusiastic" },
      { value: "Cynical", description: "Critical and sarcastic" },
    ];

    return (
      <>
        <div className="px-6 py-4 border-b border-[var(--foundation-text-dark-primary)]/10 flex items-center gap-3">
          <div className="flex gap-2">
            <button
              onClick={onClose}
              className="size-3 rounded-full bg-[var(--foundation-accent-red)] hover:bg-[var(--foundation-accent-red)]/80 transition-colors"
              aria-label="Close"
            />
            <div className="size-3 rounded-full bg-[var(--foundation-accent-orange)]" />
            <div className="size-3 rounded-full bg-[var(--foundation-accent-green)]" />
          </div>
          <button
            onClick={() => setCurrentView("main")}
            className="p-1 hover:bg-white/10 rounded transition-colors"
          >
            <IconChevronLeftMd className="size-4 text-white/90" />
          </button>
          <h2 className="text-[18px] font-semibold leading-[26px] tracking-[-0.45px] text-[var(--foundation-text-dark-primary)]">
            Personalization
          </h2>
        </div>

        <div className="overflow-y-auto max-h-[calc(85vh-80px)] px-6 py-4">
          {/* Base style and tone - ROW LAYOUT */}
          <div className="mb-3">
            <div className="flex items-center justify-between px-3 py-2.5 hover:bg-white/5 rounded-lg transition-colors">
              <span className="text-[14px] font-normal leading-[20px] tracking-[-0.3px] text-white/90">
                Base style and tone
              </span>
              <div className="relative">
                <button
                  onClick={() => setShowBaseStyleDropdown(!showBaseStyleDropdown)}
                  className="flex items-center gap-2 px-2 py-1 hover:bg-white/10 rounded transition-colors"
                >
                  <span className="text-[14px] font-normal leading-[20px] tracking-[-0.3px] text-white/60">
                    {baseStyle}
                  </span>
                  <IconChevronRightMd className="size-3 text-white/40" />
                </button>
                {showBaseStyleDropdown && (
                  <div className="absolute top-full right-0 mt-1 w-[240px] bg-[#2f2f2f] border border-white/10 rounded-lg shadow-2xl py-1 z-10">
                    {baseStyleOptions.map((option) => (
                      <button
                        key={option.value}
                        onClick={() => {
                          setBaseStyle(option.value);
                          setShowBaseStyleDropdown(false);
                        }}
                        className="w-full px-3 py-2 hover:bg-white/5 text-left transition-colors flex items-center justify-between"
                      >
                        <div>
                          <div className="text-[14px] font-normal leading-[20px] tracking-[-0.3px] text-white/90">
                            {option.value}
                          </div>
                          <div className="text-[12px] leading-[16px] tracking-[-0.24px] text-white/50">
                            {option.description}
                          </div>
                        </div>
                        {baseStyle === option.value && (
                          <IconCheckmark className="size-4 text-white/90" />
                        )}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
            <p className="text-[13px] leading-[18px] tracking-[-0.32px] text-white/50 px-3 mt-2">
              This is the main voice and tone ChatGPT uses in your conversations. This doesn't
              impact ChatGPT's capabilities.
            </p>
          </div>

          {/* Characteristics */}
          <div className="mb-6">
            <h3 className="text-[14px] font-semibold leading-[20px] tracking-[-0.3px] text-white/90 mb-2 px-3">
              Characteristics
            </h3>

            {/* Warm */}
            <div className="relative mb-2">
              <div className="flex items-center justify-between px-3 py-2.5">
                <span className="text-[14px] font-normal leading-[20px] tracking-[-0.3px] text-white/90">
                  Warm
                </span>
                <button
                  onClick={() => setShowWarmDropdown(!showWarmDropdown)}
                  className="flex items-center gap-1.5 px-3 py-1.5 hover:bg-[#3e3e3e] rounded-md transition-colors"
                >
                  <span className="text-[14px] font-normal leading-[20px] tracking-[-0.3px] text-white/90">
                    {warmStyle}
                  </span>
                  <IconChevronDownMd className="size-3.5 text-white/60" />
                </button>
              </div>
              {showWarmDropdown && (
                <div className="absolute top-full right-3 mt-1 w-[270px] bg-[#2f2f2f] border border-white/10 rounded-xl shadow-2xl py-1.5 z-10">
                  <button
                    onClick={() => {
                      setWarmStyle("More");
                      setShowWarmDropdown(false);
                    }}
                    className={`w-full px-3 py-2 text-left transition-colors ${warmStyle === "More" ? "bg-[var(--foundation-accent-green)]" : "hover:bg-[var(--foundation-accent-green)]"}`}
                  >
                    <div className="text-[14px] font-normal leading-[20px] tracking-[-0.3px] text-white/90">
                      More
                    </div>
                    <div className="text-[12px] leading-[16px] tracking-[-0.24px] text-white/70">
                      Friendlier and more personable
                    </div>
                  </button>
                  <button
                    onClick={() => {
                      setWarmStyle("Default");
                      setShowWarmDropdown(false);
                    }}
                    className={`w-full px-3 py-2.5 text-left transition-colors flex items-center gap-2 ${warmStyle === "Default" ? "bg-white/5" : "hover:bg-[var(--foundation-accent-green)]"}`}
                  >
                    {warmStyle === "Default" && <IconCheckmark className="size-4 text-white/90" />}
                    <div className="text-[14px] font-normal leading-[20px] tracking-[-0.3px] text-white/90">
                      Default
                    </div>
                  </button>
                  <button
                    onClick={() => {
                      setWarmStyle("Less");
                      setShowWarmDropdown(false);
                    }}
                    className={`w-full px-3 py-2 text-left transition-colors ${warmStyle === "Less" ? "bg-[var(--foundation-accent-green)]" : "hover:bg-[var(--foundation-accent-green)]"}`}
                  >
                    <div className="text-[14px] font-normal leading-[20px] tracking-[-0.3px] text-white/90">
                      Less
                    </div>
                    <div className="text-[12px] leading-[16px] tracking-[-0.24px] text-white/70">
                      More professional and factual
                    </div>
                  </button>
                </div>
              )}
            </div>

            {/* Enthusiastic */}
            <div className="relative mb-2">
              <div className="flex items-center justify-between px-3 py-2.5">
                <span className="text-[14px] font-normal leading-[20px] tracking-[-0.3px] text-white/90">
                  Enthusiastic
                </span>
                <button
                  onClick={() => setShowEnthusiasticDropdown(!showEnthusiasticDropdown)}
                  className="flex items-center gap-1.5 px-3 py-1.5 hover:bg-[#3e3e3e] rounded-md transition-colors"
                >
                  <span className="text-[14px] font-normal leading-[20px] tracking-[-0.3px] text-white/90">
                    {enthusiasticStyle}
                  </span>
                  <IconChevronDownMd className="size-3.5 text-white/60" />
                </button>
              </div>
              {showEnthusiasticDropdown && (
                <div className="absolute top-full right-3 mt-1 w-[270px] bg-[#2f2f2f] border border-white/10 rounded-xl shadow-2xl py-1.5 z-10">
                  <button
                    onClick={() => {
                      setEnthusiasticStyle("More");
                      setShowEnthusiasticDropdown(false);
                    }}
                    className={`w-full px-3 py-2 text-left transition-colors ${enthusiasticStyle === "More" ? "bg-[var(--foundation-accent-green)]" : "hover:bg-[var(--foundation-accent-green)]"}`}
                  >
                    <div className="text-[14px] font-normal leading-[20px] tracking-[-0.3px] text-white/90">
                      More
                    </div>
                    <div className="text-[12px] leading-[16px] tracking-[-0.24px] text-white/70">
                      More energetic and excitable
                    </div>
                  </button>
                  <button
                    onClick={() => {
                      setEnthusiasticStyle("Default");
                      setShowEnthusiasticDropdown(false);
                    }}
                    className={`w-full px-3 py-2.5 text-left transition-colors flex items-center gap-2 ${enthusiasticStyle === "Default" ? "bg-white/5" : "hover:bg-[var(--foundation-accent-green)]"}`}
                  >
                    {enthusiasticStyle === "Default" && (
                      <IconCheckmark className="size-4 text-white/90" />
                    )}
                    <div className="text-[14px] font-normal leading-[20px] tracking-[-0.3px] text-white/90">
                      Default
                    </div>
                  </button>
                  <button
                    onClick={() => {
                      setEnthusiasticStyle("Less");
                      setShowEnthusiasticDropdown(false);
                    }}
                    className={`w-full px-3 py-2 text-left transition-colors ${enthusiasticStyle === "Less" ? "bg-[var(--foundation-accent-green)]" : "hover:bg-[var(--foundation-accent-green)]"}`}
                  >
                    <div className="text-[14px] font-normal leading-[20px] tracking-[-0.3px] text-white/90">
                      Less
                    </div>
                    <div className="text-[12px] leading-[16px] tracking-[-0.24px] text-white/70">
                      More measured and composed
                    </div>
                  </button>
                </div>
              )}
            </div>

            {/* Headers & Lists */}
            <div className="relative mb-2">
              <div className="flex items-center justify-between px-3 py-2.5">
                <span className="text-[14px] font-normal leading-[20px] tracking-[-0.3px] text-white/90">
                  Headers & Lists
                </span>
                <button
                  onClick={() => setShowHeadersListsDropdown(!showHeadersListsDropdown)}
                  className="flex items-center gap-1.5 px-3 py-1.5 hover:bg-[#3e3e3e] rounded-md transition-colors"
                >
                  <span className="text-[14px] font-normal leading-[20px] tracking-[-0.3px] text-white/90">
                    {headersListsStyle}
                  </span>
                  <IconChevronDownMd className="size-3.5 text-white/60" />
                </button>
              </div>
              {showHeadersListsDropdown && (
                <div className="absolute top-full right-3 mt-1 w-[270px] bg-[#2f2f2f] border border-white/10 rounded-xl shadow-2xl py-1.5 z-10">
                  <button
                    onClick={() => {
                      setHeadersListsStyle("More");
                      setShowHeadersListsDropdown(false);
                    }}
                    className={`w-full px-3 py-2 text-left transition-colors ${headersListsStyle === "More" ? "bg-[var(--foundation-accent-green)]" : "hover:bg-[var(--foundation-accent-green)]"}`}
                  >
                    <div className="text-[14px] font-normal leading-[20px] tracking-[-0.3px] text-white/90">
                      More
                    </div>
                    <div className="text-[12px] leading-[16px] tracking-[-0.24px] text-white/70">
                      More structured responses
                    </div>
                  </button>
                  <button
                    onClick={() => {
                      setHeadersListsStyle("Default");
                      setShowHeadersListsDropdown(false);
                    }}
                    className={`w-full px-3 py-2.5 text-left transition-colors flex items-center gap-2 ${headersListsStyle === "Default" ? "bg-white/5" : "hover:bg-[var(--foundation-accent-green)]"}`}
                  >
                    {headersListsStyle === "Default" && (
                      <IconCheckmark className="size-4 text-white/90" />
                    )}
                    <div className="text-[14px] font-normal leading-[20px] tracking-[-0.3px] text-white/90">
                      Default
                    </div>
                  </button>
                  <button
                    onClick={() => {
                      setHeadersListsStyle("Less");
                      setShowHeadersListsDropdown(false);
                    }}
                    className={`w-full px-3 py-2 text-left transition-colors ${headersListsStyle === "Less" ? "bg-[var(--foundation-accent-green)]" : "hover:bg-[var(--foundation-accent-green)]"}`}
                  >
                    <div className="text-[14px] font-normal leading-[20px] tracking-[-0.3px] text-white/90">
                      Less
                    </div>
                    <div className="text-[12px] leading-[16px] tracking-[-0.24px] text-white/70">
                      More flowing paragraphs
                    </div>
                  </button>
                </div>
              )}
            </div>

            {/* Emoji */}
            <div className="relative mb-2">
              <div className="flex items-center justify-between px-3 py-2.5">
                <span className="text-[14px] font-normal leading-[20px] tracking-[-0.3px] text-white/90">
                  Emoji
                </span>
                <button
                  onClick={() => setShowEmojiDropdown(!showEmojiDropdown)}
                  className="flex items-center gap-1.5 px-3 py-1.5 hover:bg-[#3e3e3e] rounded-md transition-colors"
                >
                  <span className="text-[14px] font-normal leading-[20px] tracking-[-0.3px] text-white/90">
                    {emojiStyle}
                  </span>
                  <IconChevronDownMd className="size-3.5 text-white/60" />
                </button>
              </div>
              {showEmojiDropdown && (
                <div className="absolute top-full right-3 mt-1 w-[270px] bg-[#2f2f2f] border border-white/10 rounded-xl shadow-2xl py-1.5 z-10">
                  <button
                    onClick={() => {
                      setEmojiStyle("More");
                      setShowEmojiDropdown(false);
                    }}
                    className={`w-full px-3 py-2 text-left transition-colors ${emojiStyle === "More" ? "bg-[var(--foundation-accent-green)]" : "hover:bg-[var(--foundation-accent-green)]"}`}
                  >
                    <div className="text-[14px] font-normal leading-[20px] tracking-[-0.3px] text-white/90">
                      More
                    </div>
                    <div className="text-[12px] leading-[16px] tracking-[-0.24px] text-white/70">
                      More frequent emoji use
                    </div>
                  </button>
                  <button
                    onClick={() => {
                      setEmojiStyle("Default");
                      setShowEmojiDropdown(false);
                    }}
                    className={`w-full px-3 py-2.5 text-left transition-colors flex items-center gap-2 ${emojiStyle === "Default" ? "bg-white/5" : "hover:bg-[var(--foundation-accent-green)]"}`}
                  >
                    {emojiStyle === "Default" && <IconCheckmark className="size-4 text-white/90" />}
                    <div className="text-[14px] font-normal leading-[20px] tracking-[-0.3px] text-white/90">
                      Default
                    </div>
                  </button>
                  <button
                    onClick={() => {
                      setEmojiStyle("Less");
                      setShowEmojiDropdown(false);
                    }}
                    className={`w-full px-3 py-2 text-left transition-colors ${emojiStyle === "Less" ? "bg-[var(--foundation-accent-green)]" : "hover:bg-[var(--foundation-accent-green)]"}`}
                  >
                    <div className="text-[14px] font-normal leading-[20px] tracking-[-0.3px] text-white/90">
                      Less
                    </div>
                    <div className="text-[12px] leading-[16px] tracking-[-0.24px] text-white/70">
                      Minimal emoji usage
                    </div>
                  </button>
                </div>
              )}
            </div>

            <p className="text-[13px] leading-[18px] tracking-[-0.32px] text-white/50 px-3 mt-3">
              Choose some additional customizations on top of your base style and tone.
            </p>
          </div>

          {/* Custom instructions */}
          <div className="mb-6">
            <h3 className="text-[14px] font-semibold leading-[20px] tracking-[-0.3px] text-white/90 mb-2 px-3">
              Custom instructions
            </h3>
            <div className="px-3 text-[14px] font-normal leading-[20px] tracking-[-0.3px] text-white/90">
              Be habitual and conversational
            </div>
          </div>

          {/* Your nickname */}
          <div className="mb-6">
            <h3 className="text-[14px] font-semibold leading-[20px] tracking-[-0.3px] text-white/90 mb-2 px-3">
              Your nickname
            </h3>
            <div className="px-3 text-[14px] font-normal leading-[20px] tracking-[-0.3px] text-white/90">
              Jamie
            </div>
          </div>

          {/* Your occupation */}
          <div className="mb-6">
            <h3 className="text-[14px] font-semibold leading-[20px] tracking-[-0.3px] text-white/90 mb-2 px-3">
              Your occupation
            </h3>
            <div className="px-3 text-[14px] font-normal leading-[20px] tracking-[-0.3px] text-white/90">
              AI System Architect & Dev
            </div>
          </div>

          {/* More about you */}
          <div className="mb-6">
            <h3 className="text-[14px] font-semibold leading-[20px] tracking-[-0.3px] text-white/90 mb-2 px-3">
              More about you
            </h3>
            <div className="px-3 text-[14px] font-normal leading-[20px] tracking-[-0.3px] text-white/90">
              Ai, Dev
            </div>
          </div>

          {/* Memory */}
          <button className="w-full flex items-center justify-between px-3 py-2.5 hover:bg-white/5 rounded-lg transition-colors mb-6">
            <div className="flex items-center gap-3">
              <IconBook className="size-4 text-white/60" />
              <span className="text-[14px] font-normal leading-[20px] tracking-[-0.3px] text-white/90">
                Memory
              </span>
            </div>
            <IconChevronRightMd className="size-4 text-white/40" />
          </button>

          {/* Advanced - EXPANDED BY DEFAULT */}
          <div>
            <button
              onClick={() => setShowAdvanced(!showAdvanced)}
              className="w-full flex items-center justify-between px-3 py-2.5 hover:bg-white/5 rounded-lg transition-colors mb-2"
            >
              <span className="text-[14px] font-normal leading-[20px] tracking-[-0.3px] text-white/90">
                Advanced
              </span>
              <IconChevronDownMd
                className={`size-4 text-white/40 transition-transform ${showAdvanced ? "" : "-rotate-90"}`}
              />
            </button>

            {showAdvanced && (
              <div className="space-y-0.5">
                {/* Web Search */}
                <div className="flex items-center justify-between px-3 py-2.5 hover:bg-white/5 rounded-lg transition-colors">
                  <div className="flex items-center gap-3">
                    <IconGlobe className="size-4 text-white/60" />
                    <div>
                      <div className="text-[14px] font-normal leading-[20px] tracking-[-0.3px] text-white/90">
                        Web Search
                      </div>
                      <div className="text-[12px] leading-[16px] tracking-[-0.24px] text-white/50">
                        Automatically search the web to get answers
                      </div>
                    </div>
                  </div>
                  <button
                    onClick={() => setWebSearch(!webSearch)}
                    className={`relative inline-flex h-5 w-9 items-center rounded-full transition-colors ${webSearch ? "bg-[var(--foundation-accent-green)]" : "bg-white/20"}`}
                  >
                    <span
                      className={`inline-block size-4 transform rounded-full bg-white transition-transform ${webSearch ? "translate-x-[18px]" : "translate-x-0.5"}`}
                    />
                  </button>
                </div>

                {/* Code */}
                <div className="flex items-center justify-between px-3 py-2.5 hover:bg-white/5 rounded-lg transition-colors">
                  <div className="flex items-center gap-3">
                    <IconTerminal className="size-4 text-white/60" />
                    <div>
                      <div className="text-[14px] font-normal leading-[20px] tracking-[-0.3px] text-white/90">
                        Code
                      </div>
                      <div className="text-[12px] leading-[16px] tracking-[-0.24px] text-white/50">
                        Execute code using Code Interpreter
                      </div>
                    </div>
                  </div>
                  <button
                    onClick={() => setCodeEnabled(!codeEnabled)}
                    className={`relative inline-flex h-5 w-9 items-center rounded-full transition-colors ${codeEnabled ? "bg-[var(--foundation-accent-green)]" : "bg-white/20"}`}
                  >
                    <span
                      className={`inline-block size-4 transform rounded-full bg-white transition-transform ${codeEnabled ? "translate-x-[18px]" : "translate-x-0.5"}`}
                    />
                  </button>
                </div>

                {/* Canvas */}
                <div className="flex items-center justify-between px-3 py-2.5 hover:bg-white/5 rounded-lg transition-colors">
                  <div className="flex items-center gap-3">
                    <IconEdit className="size-4 text-white/60" />
                    <div>
                      <div className="text-[14px] font-normal leading-[20px] tracking-[-0.3px] text-white/90">
                        Canvas
                      </div>
                      <div className="text-[12px] leading-[16px] tracking-[-0.24px] text-white/50">
                        Work with ChatGPT on text and code
                      </div>
                    </div>
                  </div>
                  <button
                    onClick={() => setCanvasEnabled(!canvasEnabled)}
                    className={`relative inline-flex h-5 w-9 items-center rounded-full transition-colors ${canvasEnabled ? "bg-[var(--foundation-accent-green)]" : "bg-white/20"}`}
                  >
                    <span
                      className={`inline-block size-4 transform rounded-full bg-white transition-transform ${canvasEnabled ? "translate-x-[18px]" : "translate-x-0.5"}`}
                    />
                  </button>
                </div>

                {/* Advanced voice */}
                <div className="flex items-center justify-between px-3 py-2.5 hover:bg-white/5 rounded-lg transition-colors">
                  <div className="flex items-center gap-3">
                    <IconMic className="size-4 text-white/60" />
                    <div>
                      <div className="text-[14px] font-normal leading-[20px] tracking-[-0.3px] text-white/90">
                        Advanced voice
                      </div>
                      <div className="text-[12px] leading-[16px] tracking-[-0.24px] text-white/50">
                        More natural conversations in voice mode
                      </div>
                    </div>
                  </div>
                  <button
                    onClick={() => setAdvancedVoice(!advancedVoice)}
                    className={`relative inline-flex h-5 w-9 items-center rounded-full transition-colors ${advancedVoice ? "bg-[var(--foundation-accent-green)]" : "bg-white/20"}`}
                  >
                    <span
                      className={`inline-block size-4 transform rounded-full bg-white transition-transform ${advancedVoice ? "translate-x-[18px]" : "translate-x-0.5"}`}
                    />
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </>
    );
  };

  return (
    <div
      className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-[200]"
      onClick={onClose}
    >
      <div
        className="bg-[var(--foundation-bg-dark-1)] rounded-[16px] w-[560px] max-h-[85vh] overflow-hidden shadow-2xl border border-[var(--foundation-text-dark-primary)]/10"
        onClick={(e) => e.stopPropagation()}
      >
        {currentView === "personalization" ? (
          <PersonalizationPanel />
        ) : (
          <>
            <div className="px-6 py-4 border-b border-[var(--foundation-text-dark-primary)]/10 flex items-center gap-3">
              <div className="flex gap-2">
                <button
                  onClick={onClose}
                  className="size-3 rounded-full bg-[var(--foundation-accent-red)] hover:bg-[var(--foundation-accent-red)]/80 transition-colors"
                  aria-label="Close"
                />
                <div className="size-3 rounded-full bg-[var(--foundation-accent-orange)]" />
                <div className="size-3 rounded-full bg-[var(--foundation-accent-green)]" />
              </div>
              <h2 className="text-[18px] font-semibold leading-[26px] tracking-[-0.45px] text-[var(--foundation-text-dark-primary)]">
                Settings
              </h2>
            </div>

            <div className="overflow-y-auto max-h-[calc(85vh-80px)] px-6 py-4">
              <Section title="Account">
                <div className="space-y-0.5">
                  <RowDisplay
                    icon={<IconEmail className="size-4 text-white/60" />}
                    label="Email"
                    right={
                      <span className="text-[14px] font-normal leading-[20px] tracking-[-0.3px] text-white/60">
                        fndveteran@gmail.com
                      </span>
                    }
                  />
                  <RowDisplay
                    icon={<IconPhone className="size-4 text-white/60" />}
                    label="Phone number"
                    right={
                      <span className="text-[14px] font-normal leading-[20px] tracking-[-0.3px] text-white/60">
                        +447472683324
                      </span>
                    }
                  />
                  <RowDisplay
                    icon={<IconCreditCard className="size-4 text-white/60" />}
                    label="Subscription"
                    right={
                      <span className="text-[14px] font-normal leading-[20px] tracking-[-0.3px] text-white/60">
                        ChatGPT Pro
                      </span>
                    }
                  />
                  <RowButton
                    icon={<IconSuitcase className="size-4 text-white/60" />}
                    label="Orders"
                    right={<IconChevronRightMd className="size-4 text-white/40" />}
                  />
                  <RowButton
                    icon={<IconStarFilled className="size-4 text-white/60" />}
                    label="Personalization"
                    onClick={() => setCurrentView("personalization")}
                    right={<IconChevronRightMd className="size-4 text-white/40" />}
                  />
                  <RowButton
                    icon={<IconStatus className="size-4 text-white/60" />}
                    label="Notifications"
                    right={<IconChevronRightMd className="size-4 text-white/40" />}
                  />
                  <RowButton
                    icon={<IconCategory className="size-4 text-white/60" />}
                    label="Apps"
                    right={<IconChevronRightMd className="size-4 text-white/40" />}
                  />
                  <RowButton
                    icon={<IconUserLock className="size-4 text-white/60" />}
                    label="Data controls"
                    right={<IconChevronRightMd className="size-4 text-white/40" />}
                  />
                  <RowButton
                    icon={<IconArchive className="size-4 text-white/60" />}
                    label="Archived chats"
                    right={<IconChevronRightMd className="size-4 text-white/40" />}
                  />
                  <RowButton
                    icon={<IconUserLock className="size-4 text-white/60" />}
                    label="Security"
                    right={<IconChevronRightMd className="size-4 text-white/40" />}
                  />
                </div>
              </Section>

              <Section title="App">
                <div className="space-y-0.5">
                  <div className="relative">
                    <RowButton
                      onClick={() => setShowLanguageDropdown(!showLanguageDropdown)}
                      icon={<IconGlobe className="size-4 text-white/60" />}
                      label="App language"
                      right={
                        <div className="flex items-center gap-2">
                          <span className="text-[14px] font-normal leading-[20px] tracking-[-0.3px] text-white/60">
                            {appLanguage}
                          </span>
                          <IconChevronRightMd className="size-4 text-white/40" />
                        </div>
                      }
                    />
                  </div>

                  <div className="relative">
                    <RowButton
                      onClick={() => setShowMenuBarDropdown(!showMenuBarDropdown)}
                      icon={<IconPlayground className="size-4 text-white/60" />}
                      label="Show in Menu Bar"
                      right={
                        <div className="flex items-center gap-2">
                          <span className="text-[14px] font-normal leading-[20px] tracking-[-0.3px] text-white/60">
                            {showInMenuBar}
                          </span>
                          <IconChevronDownMd className="size-4 text-white/40" />
                        </div>
                      }
                    />
                  </div>

                  <div className="relative">
                    <RowButton
                      onClick={() => setShowColorDropdown(!showColorDropdown)}
                      icon={<IconSun className="size-4 text-white/60" />}
                      label="Accent color"
                      right={
                        <div className="flex items-center gap-2">
                          <div
                            className="size-3 rounded-full"
                            style={{ backgroundColor: selectedColorHex }}
                          />
                          <span className="text-[14px] font-normal leading-[20px] tracking-[-0.3px] text-white/60">
                            {accentColor}
                          </span>
                          <IconChevronDownMd className="size-4 text-white/40" />
                        </div>
                      }
                    />
                    {showColorDropdown && (
                      <div className="absolute right-0 top-full mt-1 bg-[#212121] border border-white/10 rounded-lg shadow-xl p-1 min-w-[140px] z-10">
                        {accentColors.map((color) => (
                          <button
                            key={color.name}
                            onClick={() => {
                              setAccentColor(color.name);
                              setShowColorDropdown(false);
                            }}
                            className="w-full flex items-center gap-2 px-3 py-2 hover:bg-white/5 rounded text-left transition-colors"
                          >
                            <div
                              className="size-3 rounded-full"
                              style={{ backgroundColor: color.color }}
                            />
                            <span className="text-[14px] font-normal leading-[20px] tracking-[-0.3px] text-white/90">
                              {color.name}
                            </span>
                          </button>
                        ))}
                      </div>
                    )}
                  </div>

                  <ToggleRow
                    icon={<IconComment className="size-4 text-white/60" />}
                    label="Show additional models"
                    checked={showAdditionalModels}
                    onToggle={() => setShowAdditionalModels(!showAdditionalModels)}
                  />

                  <ToggleRow
                    icon={<IconCheckmark className="size-4 text-white/60" />}
                    label="Correct spelling automatically"
                    checked={correctSpelling}
                    onToggle={() => setCorrectSpelling(!correctSpelling)}
                  />

                  <ToggleRow
                    icon={<IconLink className="size-4 text-white/60" />}
                    label="Open ChatGPT links in desktop app"
                    checked={openLinksInApp}
                    onToggle={() => setOpenLinksInApp(!openLinksInApp)}
                  />

                  <RowButton
                    icon={<IconRegenerate className="size-4 text-white/60" />}
                    label="Check for updates..."
                    right={<IconChevronRightMd className="size-4 text-white/40" />}
                  />
                </div>
              </Section>

              <Section title="Chat bar">
                <div className="space-y-0.5">
                  <div className="relative">
                    <RowButton
                      onClick={() => setShowPositionDropdown(!showPositionDropdown)}
                      icon={<IconMessaging className="size-4 text-white/60" />}
                      label="Position on screen"
                      right={
                        <div className="flex items-center gap-2">
                          <span className="text-[14px] font-normal leading-[20px] tracking-[-0.3px] text-white/60">
                            {positionOnScreen}
                          </span>
                          <IconChevronDownMd className="size-4 text-white/40" />
                        </div>
                      }
                    />
                  </div>

                  <div className="relative">
                    <RowButton
                      onClick={() => setShowResetDropdown(!showResetDropdown)}
                      icon={<IconUndo className="size-4 text-white/60" />}
                      label="Reset to new chat"
                      right={
                        <div className="flex items-center gap-2">
                          <span className="text-[14px] font-normal leading-[20px] tracking-[-0.3px] text-white/60">
                            {resetToNewChat}
                          </span>
                          <IconChevronDownMd className="size-4 text-white/40" />
                        </div>
                      }
                    />
                  </div>

                  <RowDisplay
                    icon={<IconTerminal className="size-4 text-white/60" />}
                    label="Keyboard shortcut"
                    right={
                      <div className="flex items-center gap-2">
                        <span className="text-[14px] font-normal leading-[20px] tracking-[-0.3px] text-white/60">
                          {keyboardShortcut}
                        </span>
                        <button
                          onClick={() => setKeyboardShortcut("")}
                          className="p-1 hover:bg-white/10 rounded-full transition-colors"
                        >
                          <IconX className="size-3 text-white/60" />
                        </button>
                      </div>
                    }
                  />

                  <RowDisplay
                    icon={<IconMessaging className="size-4 text-white/60" />}
                    label="Open new chats"
                    right={
                      <div className="flex items-center gap-2">
                        <span className="text-[14px] font-normal leading-[20px] tracking-[-0.3px] text-white/60">
                          In Companion Chat
                        </span>
                        <IconChevronDownMd className="size-4 text-white/40" />
                      </div>
                    }
                  />
                </div>
              </Section>

              <Section title="Work with Apps">
                <div className="space-y-0.5">
                  <ToggleRow
                    icon={<IconPro className="size-4 text-white/60" />}
                    label="Enable Work with Apps"
                    checked={enableWorkWithApps}
                    onToggle={() => setEnableWorkWithApps(!enableWorkWithApps)}
                  />

                  <RowDisplay
                    icon={<IconCheckCircle className="size-4 text-white/60" />}
                    label="Toggle pairing"
                    right={
                      <div className="flex items-center gap-2">
                        <span className="text-[14px] font-normal leading-[20px] tracking-[-0.3px] text-white/60">
                          {togglePairing}
                        </span>
                        <button className="p-1 hover:bg-white/10 rounded-full transition-colors">
                          <IconX className="size-3 text-white/60" />
                        </button>
                      </div>
                    }
                  />

                  <RowDisplay
                    icon={<IconStack className="size-4 text-white/60" />}
                    label="Unpair apps"
                    right={
                      <div className="flex items-center gap-2">
                        <span className="text-[14px] font-normal leading-[20px] tracking-[-0.3px] text-white/60">
                          {linearApps}
                        </span>
                        <IconChevronDownMd className="size-4 text-white/40" />
                      </div>
                    }
                  />

                  <RowButton
                    icon={<IconSettings className="size-4 text-white/60" />}
                    label="Manage Apps"
                    right={<IconChevronRightMd className="size-4 text-white/40" />}
                  />

                  <ToggleRow
                    icon={<IconLightBulb className="size-4 text-white/60" />}
                    label="Automatically Pair with Apps from Chat Bar"
                    checked={autoFairWithApps}
                    onToggle={() => setAutoFairWithApps(!autoFairWithApps)}
                  />

                  <ToggleRow
                    icon={<IconEdit className="size-4 text-white/60" />}
                    label="Generate suggested edits"
                    checked={generateSuggestedEdits}
                    onToggle={() => setGenerateSuggestedEdits(!generateSuggestedEdits)}
                  />

                  <ToggleRow
                    icon={<IconEdit className="size-4 text-white/60" />}
                    label="Automatically Apply Suggested Edits"
                    checked={autoApplySuggestedEdits}
                    onToggle={() => setAutoApplySuggestedEdits(!autoApplySuggestedEdits)}
                  />

                  <div className="px-3 py-2">
                    <p className="text-[13px] text-white/50 leading-[18px] tracking-[-0.32px] font-normal">
                      Allow ChatGPT to work with code and text editors.
                    </p>
                  </div>
                </div>
              </Section>

              <Section title="Speech">
                <div className="space-y-0.5">
                  <RowDisplay
                    icon={<IconMic className="size-4 text-white/60" />}
                    label="Voice"
                    right={
                      <div className="flex items-center gap-2">
                        <span className="text-[14px] font-normal leading-[20px] tracking-[-0.3px] text-white/60">
                          {voice}
                        </span>
                        <IconChevronRightMd className="size-4 text-white/40" />
                      </div>
                    }
                  />

                  <RowDisplay
                    icon={<IconGlobe className="size-4 text-white/60" />}
                    label="Main language"
                    right={
                      <div className="flex items-center gap-2">
                        <span className="text-[14px] font-normal leading-[20px] tracking-[-0.3px] text-white/60">
                          {mainLanguage}
                        </span>
                        <IconChevronDownMd className="size-4 text-white/40" />
                      </div>
                    }
                  />

                  <RowButton
                    icon={<IconSoundOn className="size-4 text-white/60" />}
                    label="Audio settings"
                    right={<IconChevronRightMd className="size-4 text-white/40" />}
                  />

                  <div className="px-3 py-2">
                    <p className="text-[13px] text-white/50 leading-[18px] tracking-[-0.32px] font-normal">
                      For best results, select the language you mainly speak. If it's not listed, it
                      may still be supported via auto-detection.
                    </p>
                  </div>
                </div>
              </Section>

              <Section title="Suggestions">
                <div className="space-y-0.5">
                  <ToggleRow
                    icon={<IconCheckCircle className="size-4 text-white/60" />}
                    label="Autocomplete"
                    checked={autocomplete}
                    onToggle={() => setAutocomplete(!autocomplete)}
                  />

                  <ToggleRow
                    icon={<IconBarChart className="size-4 text-white/60" />}
                    label="Trending searches"
                    checked={trendingSearches}
                    onToggle={() => setTrendingSearches(!trendingSearches)}
                  />

                  <ToggleRow
                    icon={<IconLightBulb className="size-4 text-white/60" />}
                    label="Follow-up suggestions"
                    checked={followUpSuggestions}
                    onToggle={() => setFollowUpSuggestions(!followUpSuggestions)}
                  />
                </div>
              </Section>

              <Section title="About">
                <div className="space-y-0.5">
                  <RowButton
                    icon={<IconWarning className="size-4 text-white/60" />}
                    label="Report bug"
                    right={<IconChevronRightMd className="size-4 text-white/40" />}
                  />
                  <RowButton
                    icon={<IconQuestion className="size-4 text-white/60" />}
                    label="Help Center"
                    right={<IconChevronRightMd className="size-4 text-white/40" />}
                  />
                  <RowButton
                    icon={<IconBook className="size-4 text-white/60" />}
                    label="Terms of Use"
                    right={<IconChevronRightMd className="size-4 text-white/40" />}
                  />
                  <RowButton
                    icon={<IconUserLock className="size-4 text-white/60" />}
                    label="Privacy Policy"
                    right={<IconChevronRightMd className="size-4 text-white/40" />}
                  />
                  <RowDisplay
                    icon={<IconInfo className="size-4 text-white/60" />}
                    label="ChatGPT for macOS"
                    right={
                      <span className="text-[14px] font-normal leading-[20px] tracking-[-0.3px] text-white/60">
                        1.2025.350 (1766813062)
                      </span>
                    }
                  />
                  <RowButton
                    icon={<IconGo className="size-4 text-white/60" />}
                    label="Log out"
                    right={<IconChevronRightMd className="size-4 text-white/40" />}
                  />
                </div>
              </Section>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
