import { useState } from "react";
import {
  IconX,
  IconChevronRightMd,
  IconChevronDownMd,
} from "./icons/ChatGPTIcons";
import {
  Mail,
  Phone,
  CreditCard,
  ShoppingBag,
  Sparkles,
  Bell,
  Grid3x3,
  Shield,
  Archive,
  Globe,
  Monitor,
  Palette,
  Eye,
  SpellCheck,
  ExternalLink,
  RefreshCw,
  MessageSquare,
  RotateCcw,
  Keyboard,
  Zap,
  ToggleLeft,
  Layers,
  Settings,
  WandSparkles,
  MessageCircle,
  FileEdit,
  Mic,
  Languages,
  Volume2,
  TrendingUp,
  Lightbulb,
  ListChecks,
  Bug,
  HelpCircle,
  FileText,
  Lock,
  Info,
  LogOut,
} from "lucide-react";

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function SettingsModal({ isOpen, onClose }: SettingsModalProps) {
  const [showAdditionalModels, setShowAdditionalModels] = useState(true);
  const [correctSpelling, setCorrectSpelling] = useState(true);
  const [openLinksInApp, setOpenLinksInApp] = useState(true);
  const [appLanguage, setAppLanguage] = useState("English");
  const [showInMenuBar, setShowInMenuBar] = useState("When app is running");
  const [accentColor, setAccentColor] = useState("Purple");
  const [positionOnScreen, setPositionOnScreen] = useState("Remember last position");
  const [resetToNewChat, setResetToNewChat] = useState("After 10 minutes");
  const [keyboardShortcut, setKeyboardShortcut] = useState("⌘Space");

  const [showLanguageDropdown, setShowLanguageDropdown] = useState(false);
  const [showMenuBarDropdown, setShowMenuBarDropdown] = useState(false);
  const [showColorDropdown, setShowColorDropdown] = useState(false);
  const [showPositionDropdown, setShowPositionDropdown] = useState(false);
  const [showResetDropdown, setShowResetDropdown] = useState(false);

  // Work with Apps
  const [enableWorkWithApps, setEnableWorkWithApps] = useState(true);
  const [togglePairing, setTogglePairing] = useState("CV1");
  const [linearApps, setLinearApps] = useState("Never");
  const [autoFairWithApps, setAutoFairWithApps] = useState(true);
  const [generateSuggestedEdits, setGenerateSuggestedEdits] = useState(true);
  const [autoApplySuggestedEdits, setAutoApplySuggestedEdits] = useState(true);

  // Speech
  const [voice, setVoice] = useState("Cove");
  const [mainLanguage, setMainLanguage] = useState("English");

  // Suggestions
  const [autocomplete, setAutocomplete] = useState(true);
  const [trendingSearches, setTrendingSearches] = useState(true);
  const [followUpSuggestions, setFollowUpSuggestions] = useState(true);

  if (!isOpen) return null;

  const accentColors = [
    { name: "Purple", color: "#BA8FF7" },
    { name: "Blue", color: "#48AAFF" },
    { name: "Green", color: "#40C977" },
    { name: "Orange", color: "#FF9E6C" },
    { name: "Pink", color: "#FF8FB3" },
    { name: "Red", color: "#FF8583" },
  ];

  const selectedColorHex =
    accentColors.find((c) => c.name === accentColor)?.color || "#BA8FF7";

  return (
    <div
      className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-[200]"
      onClick={onClose}
    >
      <div
        className="bg-[#171717] rounded-[16px] w-[560px] max-h-[85vh] overflow-hidden shadow-2xl border border-white/10"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header with macOS controls */}
        <div className="px-6 py-4 border-b border-white/10 flex items-center gap-3">
          <div className="flex gap-2">
            <button
              onClick={onClose}
              className="size-3 rounded-full bg-[#FF5F56] hover:bg-[#FF5F56]/80 transition-colors"
            />
            <div className="size-3 rounded-full bg-[#FFBD2E]" />
            <div className="size-3 rounded-full bg-[#27C93F]" />
          </div>
          <h2 className="text-[18px] font-semibold leading-[26px] tracking-[-0.45px] text-white">
            Settings
          </h2>
        </div>

        {/* Scrollable Content */}
        <div className="overflow-y-auto max-h-[calc(85vh-80px)] px-6 py-4">
          {/* Account Section */}
          <div className="mb-6">
            <h3 className="text-[14px] font-semibold leading-[20px] tracking-[-0.3px] text-white/90 mb-3">
              Account
            </h3>
            <div className="space-y-0.5">
              {/* Email */}
              <div className="flex items-center justify-between px-3 py-2.5 hover:bg-white/5 rounded-lg transition-colors">
                <div className="flex items-center gap-3">
                  <Mail className="size-4 text-white/60" />
                  <span className="text-[14px] font-normal leading-[20px] tracking-[-0.3px] text-white/90">
                    Email
                  </span>
                </div>
                <span className="text-[14px] font-normal leading-[20px] tracking-[-0.3px] text-white/60">
                  fndveteran@gmail.com
                </span>
              </div>

              {/* Phone number */}
              <div className="flex items-center justify-between px-3 py-2.5 hover:bg-white/5 rounded-lg transition-colors">
                <div className="flex items-center gap-3">
                  <Phone className="size-4 text-white/60" />
                  <span className="text-[14px] font-normal leading-[20px] tracking-[-0.3px] text-white/90">
                    Phone number
                  </span>
                </div>
                <span className="text-[14px] font-normal leading-[20px] tracking-[-0.3px] text-white/60">
                  +447472683324
                </span>
              </div>

              {/* Subscription */}
              <div className="flex items-center justify-between px-3 py-2.5 hover:bg-white/5 rounded-lg transition-colors">
                <div className="flex items-center gap-3">
                  <CreditCard className="size-4 text-white/60" />
                  <span className="text-[14px] font-normal leading-[20px] tracking-[-0.3px] text-white/90">
                    Subscription
                  </span>
                </div>
                <span className="text-[14px] font-normal leading-[20px] tracking-[-0.3px] text-white/60">
                  ChatGPT Pro
                </span>
              </div>

              {/* Navigation Items */}
              <button className="w-full flex items-center justify-between px-3 py-2.5 hover:bg-white/5 rounded-lg transition-colors">
                <div className="flex items-center gap-3">
                  <ShoppingBag className="size-4 text-white/60" />
                  <span className="text-[14px] font-normal leading-[20px] tracking-[-0.3px] text-white/90">
                    Orders
                  </span>
                </div>
                <IconChevronRightMd className="size-4 text-white/40" />
              </button>

              <button className="w-full flex items-center justify-between px-3 py-2.5 hover:bg-white/5 rounded-lg transition-colors">
                <div className="flex items-center gap-3">
                  <Sparkles className="size-4 text-white/60" />
                  <span className="text-[14px] font-normal leading-[20px] tracking-[-0.3px] text-white/90">
                    Personalization
                  </span>
                </div>
                <IconChevronRightMd className="size-4 text-white/40" />
              </button>

              <button className="w-full flex items-center justify-between px-3 py-2.5 hover:bg-white/5 rounded-lg transition-colors">
                <div className="flex items-center gap-3">
                  <Bell className="size-4 text-white/60" />
                  <span className="text-[14px] font-normal leading-[20px] tracking-[-0.3px] text-white/90">
                    Notifications
                  </span>
                </div>
                <IconChevronRightMd className="size-4 text-white/40" />
              </button>

              <button className="w-full flex items-center justify-between px-3 py-2.5 hover:bg-white/5 rounded-lg transition-colors">
                <div className="flex items-center gap-3">
                  <Grid3x3 className="size-4 text-white/60" />
                  <span className="text-[14px] font-normal leading-[20px] tracking-[-0.3px] text-white/90">
                    Apps
                  </span>
                </div>
                <IconChevronRightMd className="size-4 text-white/40" />
              </button>

              <button className="w-full flex items-center justify-between px-3 py-2.5 hover:bg-white/5 rounded-lg transition-colors">
                <div className="flex items-center gap-3">
                  <Shield className="size-4 text-white/60" />
                  <span className="text-[14px] font-normal leading-[20px] tracking-[-0.3px] text-white/90">
                    Data controls
                  </span>
                </div>
                <IconChevronRightMd className="size-4 text-white/40" />
              </button>

              <button className="w-full flex items-center justify-between px-3 py-2.5 hover:bg-white/5 rounded-lg transition-colors">
                <div className="flex items-center gap-3">
                  <Archive className="size-4 text-white/60" />
                  <span className="text-[14px] font-normal leading-[20px] tracking-[-0.3px] text-white/90">
                    Archived chats
                  </span>
                </div>
                <IconChevronRightMd className="size-4 text-white/40" />
              </button>

              <button className="w-full flex items-center justify-between px-3 py-2.5 hover:bg-white/5 rounded-lg transition-colors">
                <div className="flex items-center gap-3">
                  <Shield className="size-4 text-white/60" />
                  <span className="text-[14px] font-normal leading-[20px] tracking-[-0.3px] text-white/90">
                    Security
                  </span>
                </div>
                <IconChevronRightMd className="size-4 text-white/40" />
              </button>
            </div>
          </div>

          {/* App Section */}
          <div className="mb-6">
            <h3 className="text-[14px] font-semibold leading-[20px] tracking-[-0.3px] text-white/90 mb-3">
              App
            </h3>
            <div className="space-y-0.5">
              {/* App language */}
              <div className="relative">
                <button
                  onClick={() => setShowLanguageDropdown(!showLanguageDropdown)}
                  className="w-full flex items-center justify-between px-3 py-2.5 hover:bg-white/5 rounded-lg transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <Globe className="size-4 text-white/60" />
                    <span className="text-[14px] font-normal leading-[20px] tracking-[-0.3px] text-white/90">
                      App language
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-[14px] font-normal leading-[20px] tracking-[-0.3px] text-white/60">
                      {appLanguage}
                    </span>
                    <IconChevronRightMd className="size-4 text-white/40" />
                  </div>
                </button>
              </div>

              {/* Show in Menu Bar */}
              <div className="relative">
                <button
                  onClick={() => setShowMenuBarDropdown(!showMenuBarDropdown)}
                  className="w-full flex items-center justify-between px-3 py-2.5 hover:bg-white/5 rounded-lg transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <Monitor className="size-4 text-white/60" />
                    <span className="text-[14px] font-normal leading-[20px] tracking-[-0.3px] text-white/90">
                      Show in Menu Bar
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-[14px] font-normal leading-[20px] tracking-[-0.3px] text-white/60">
                      {showInMenuBar}
                    </span>
                    <IconChevronDownMd className="size-4 text-white/40" />
                  </div>
                </button>
              </div>

              {/* Accent color */}
              <div className="relative">
                <button
                  onClick={() => setShowColorDropdown(!showColorDropdown)}
                  className="w-full flex items-center justify-between px-3 py-2.5 hover:bg-white/5 rounded-lg transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <Palette className="size-4 text-white/60" />
                    <span className="text-[14px] font-normal leading-[20px] tracking-[-0.3px] text-white/90">
                      Accent color
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="size-3 rounded-full" style={{ backgroundColor: selectedColorHex }} />
                    <span className="text-[14px] font-normal leading-[20px] tracking-[-0.3px] text-white/60">
                      {accentColor}
                    </span>
                    <IconChevronDownMd className="size-4 text-white/40" />
                  </div>
                </button>
                {showColorDropdown && (
                  <div className="absolute right-0 top-full mt-1 bg-[#2C2C2C] border border-white/10 rounded-lg shadow-xl p-1 min-w-[140px] z-10">
                    {accentColors.map((color) => (
                      <button
                        key={color.name}
                        onClick={() => {
                          setAccentColor(color.name);
                          setShowColorDropdown(false);
                        }}
                        className="w-full flex items-center gap-2 px-3 py-2 hover:bg-white/5 rounded text-left transition-colors"
                      >
                        <div className="size-3 rounded-full" style={{ backgroundColor: color.color }} />
                        <span className="text-[14px] font-normal leading-[20px] tracking-[-0.3px] text-white/90">
                          {color.name}
                        </span>
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Toggle switches */}
              <div className="flex items-center justify-between px-3 py-2.5 hover:bg-white/5 rounded-lg transition-colors">
                <div className="flex items-center gap-3">
                  <Eye className="size-4 text-white/60" />
                  <span className="text-[14px] font-normal leading-[20px] tracking-[-0.3px] text-white/90">
                    Show additional models
                  </span>
                </div>
                <button
                  onClick={() => setShowAdditionalModels(!showAdditionalModels)}
                  className={`relative inline-flex h-5 w-9 items-center rounded-full transition-colors ${
                    showAdditionalModels ? "bg-[#40C977]" : "bg-white/20"
                  }`}
                >
                  <span
                    className={`inline-block size-4 transform rounded-full bg-white transition-transform ${
                      showAdditionalModels ? "translate-x-[18px]" : "translate-x-0.5"
                    }`}
                  />
                </button>
              </div>

              <div className="flex items-center justify-between px-3 py-2.5 hover:bg-white/5 rounded-lg transition-colors">
                <div className="flex items-center gap-3">
                  <SpellCheck className="size-4 text-white/60" />
                  <span className="text-[14px] font-normal leading-[20px] tracking-[-0.3px] text-white/90">
                    Correct spelling automatically
                  </span>
                </div>
                <button
                  onClick={() => setCorrectSpelling(!correctSpelling)}
                  className={`relative inline-flex h-5 w-9 items-center rounded-full transition-colors ${
                    correctSpelling ? "bg-[#40C977]" : "bg-white/20"
                  }`}
                >
                  <span
                    className={`inline-block size-4 transform rounded-full bg-white transition-transform ${
                      correctSpelling ? "translate-x-[18px]" : "translate-x-0.5"
                    }`}
                  />
                </button>
              </div>

              <div className="flex items-center justify-between px-3 py-2.5 hover:bg-white/5 rounded-lg transition-colors">
                <div className="flex items-center gap-3">
                  <ExternalLink className="size-4 text-white/60" />
                  <span className="text-[14px] font-normal leading-[20px] tracking-[-0.3px] text-white/90">
                    Open ChatGPT links in desktop app
                  </span>
                </div>
                <button
                  onClick={() => setOpenLinksInApp(!openLinksInApp)}
                  className={`relative inline-flex h-5 w-9 items-center rounded-full transition-colors ${
                    openLinksInApp ? "bg-[#40C977]" : "bg-white/20"
                  }`}
                >
                  <span
                    className={`inline-block size-4 transform rounded-full bg-white transition-transform ${
                      openLinksInApp ? "translate-x-[18px]" : "translate-x-0.5"
                    }`}
                  />
                </button>
              </div>

              <button className="w-full flex items-center justify-between px-3 py-2.5 hover:bg-white/5 rounded-lg transition-colors">
                <div className="flex items-center gap-3">
                  <RefreshCw className="size-4 text-white/60" />
                  <span className="text-[14px] font-normal leading-[20px] tracking-[-0.3px] text-white/90">
                    Check for updates...
                  </span>
                </div>
                <IconChevronRightMd className="size-4 text-white/40" />
              </button>
            </div>
          </div>

          {/* Chat bar Section */}
          <div className="mb-6">
            <h3 className="text-[14px] font-semibold leading-[20px] tracking-[-0.3px] text-white/90 mb-3">
              Chat bar
            </h3>
            <div className="space-y-0.5">
              {/* Position on screen */}
              <div className="relative">
                <button
                  onClick={() => setShowPositionDropdown(!showPositionDropdown)}
                  className="w-full flex items-center justify-between px-3 py-2.5 hover:bg-white/5 rounded-lg transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <MessageSquare className="size-4 text-white/60" />
                    <span className="text-[14px] font-normal leading-[20px] tracking-[-0.3px] text-white/90">
                      Position on screen
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-[14px] font-normal leading-[20px] tracking-[-0.3px] text-white/60">
                      {positionOnScreen}
                    </span>
                    <IconChevronDownMd className="size-4 text-white/40" />
                  </div>
                </button>
              </div>

              {/* Reset to new chat */}
              <div className="relative">
                <button
                  onClick={() => setShowResetDropdown(!showResetDropdown)}
                  className="w-full flex items-center justify-between px-3 py-2.5 hover:bg-white/5 rounded-lg transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <RotateCcw className="size-4 text-white/60" />
                    <span className="text-[14px] font-normal leading-[20px] tracking-[-0.3px] text-white/90">
                      Reset to new chat
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-[14px] font-normal leading-[20px] tracking-[-0.3px] text-white/60">
                      {resetToNewChat}
                    </span>
                    <IconChevronDownMd className="size-4 text-white/40" />
                  </div>
                </button>
              </div>

              {/* Keyboard shortcut */}
              <div className="flex items-center justify-between px-3 py-2.5 hover:bg-white/5 rounded-lg transition-colors">
                <div className="flex items-center gap-3">
                  <Keyboard className="size-4 text-white/60" />
                  <span className="text-[14px] font-normal leading-[20px] tracking-[-0.3px] text-white/90">
                    Keyboard shortcut
                  </span>
                </div>
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
              </div>

              {/* Open new chats */}
              <div className="flex items-center justify-between px-3 py-2.5 hover:bg-white/5 rounded-lg transition-colors">
                <div className="flex items-center gap-3">
                  <MessageCircle className="size-4 text-white/60" />
                  <span className="text-[14px] font-normal leading-[20px] tracking-[-0.3px] text-white/90">
                    Open new chats
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-[14px] font-normal leading-[20px] tracking-[-0.3px] text-white/60">
                    In Companion Chat
                  </span>
                  <IconChevronDownMd className="size-4 text-white/40" />
                </div>
              </div>
            </div>
          </div>

          {/* Work with Apps Section */}
          <div className="mb-6">
            <h3 className="text-[14px] font-semibold leading-[20px] tracking-[-0.3px] text-white/90 mb-3">
              Work with Apps
            </h3>
            <div className="space-y-0.5">
              {/* Enable Work with Apps */}
              <div className="flex items-center justify-between px-3 py-2.5 hover:bg-white/5 rounded-lg transition-colors">
                <div className="flex items-center gap-3">
                  <Zap className="size-4 text-white/60" />
                  <span className="text-[14px] font-normal leading-[20px] tracking-[-0.3px] text-white/90">
                    Enable Work with Apps
                  </span>
                </div>
                <button
                  onClick={() => setEnableWorkWithApps(!enableWorkWithApps)}
                  className={`relative inline-flex h-5 w-9 items-center rounded-full transition-colors ${
                    enableWorkWithApps ? "bg-[#40C977]" : "bg-white/20"
                  }`}
                >
                  <span
                    className={`inline-block size-4 transform rounded-full bg-white transition-transform ${
                      enableWorkWithApps ? "translate-x-[18px]" : "translate-x-0.5"
                    }`}
                  />
                </button>
              </div>

              {/* Toggle pairing */}
              <div className="flex items-center justify-between px-3 py-2.5 hover:bg-white/5 rounded-lg transition-colors">
                <div className="flex items-center gap-3">
                  <ToggleLeft className="size-4 text-white/60" />
                  <span className="text-[14px] font-normal leading-[20px] tracking-[-0.3px] text-white/90">
                    Toggle pairing
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-[14px] font-normal leading-[20px] tracking-[-0.3px] text-white/60">
                    {togglePairing}
                  </span>
                  <button className="p-1 hover:bg-white/10 rounded-full transition-colors">
                    <IconX className="size-3 text-white/60" />
                  </button>
                </div>
              </div>

              {/* Linear apps */}
              <div className="flex items-center justify-between px-3 py-2.5 hover:bg-white/5 rounded-lg transition-colors">
                <div className="flex items-center gap-3">
                  <Layers className="size-4 text-white/60" />
                  <span className="text-[14px] font-normal leading-[20px] tracking-[-0.3px] text-white/90">
                    Linear apps
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-[14px] font-normal leading-[20px] tracking-[-0.3px] text-white/60">
                    {linearApps}
                  </span>
                  <IconChevronDownMd className="size-4 text-white/40" />
                </div>
              </div>

              {/* Manage Apps */}
              <button className="w-full flex items-center justify-between px-3 py-2.5 hover:bg-white/5 rounded-lg transition-colors">
                <div className="flex items-center gap-3">
                  <Settings className="size-4 text-white/60" />
                  <span className="text-[14px] font-normal leading-[20px] tracking-[-0.3px] text-white/90">
                    Manage Apps
                  </span>
                </div>
                <IconChevronRightMd className="size-4 text-white/40" />
              </button>

              {/* Automatically Pair with Apps from Chat Bar */}
              <div className="flex items-center justify-between px-3 py-2.5 hover:bg-white/5 rounded-lg transition-colors">
                <div className="flex items-center gap-3">
                  <WandSparkles className="size-4 text-white/60" />
                  <span className="text-[14px] font-normal leading-[20px] tracking-[-0.3px] text-white/90">
                    Automatically Pair with Apps from Chat Bar
                  </span>
                </div>
                <button
                  onClick={() => setAutoFairWithApps(!autoFairWithApps)}
                  className={`relative inline-flex h-5 w-9 items-center rounded-full transition-colors ${
                    autoFairWithApps ? "bg-[#40C977]" : "bg-white/20"
                  }`}
                >
                  <span
                    className={`inline-block size-4 transform rounded-full bg-white transition-transform ${
                      autoFairWithApps ? "translate-x-[18px]" : "translate-x-0.5"
                    }`}
                  />
                </button>
              </div>

              {/* Generate suggested edits */}
              <div className="flex items-center justify-between px-3 py-2.5 hover:bg-white/5 rounded-lg transition-colors">
                <div className="flex items-center gap-3">
                  <FileEdit className="size-4 text-white/60" />
                  <span className="text-[14px] font-normal leading-[20px] tracking-[-0.3px] text-white/90">
                    Generate suggested edits
                  </span>
                </div>
                <button
                  onClick={() => setGenerateSuggestedEdits(!generateSuggestedEdits)}
                  className={`relative inline-flex h-5 w-9 items-center rounded-full transition-colors ${
                    generateSuggestedEdits ? "bg-[#40C977]" : "bg-white/20"
                  }`}
                >
                  <span
                    className={`inline-block size-4 transform rounded-full bg-white transition-transform ${
                      generateSuggestedEdits ? "translate-x-[18px]" : "translate-x-0.5"
                    }`}
                  />
                </button>
              </div>

              {/* Automatically Apply Suggested Edits */}
              <div className="flex items-center justify-between px-3 py-2.5 hover:bg-white/5 rounded-lg transition-colors">
                <div className="flex items-center gap-3">
                  <FileEdit className="size-4 text-white/60" />
                  <span className="text-[14px] font-normal leading-[20px] tracking-[-0.3px] text-white/90">
                    Automatically Apply Suggested Edits
                  </span>
                </div>
                <button
                  onClick={() => setAutoApplySuggestedEdits(!autoApplySuggestedEdits)}
                  className={`relative inline-flex h-5 w-9 items-center rounded-full transition-colors ${
                    autoApplySuggestedEdits ? "bg-[#40C977]" : "bg-white/20"
                  }`}
                >
                  <span
                    className={`inline-block size-4 transform rounded-full bg-white transition-transform ${
                      autoApplySuggestedEdits ? "translate-x-[18px]" : "translate-x-0.5"
                    }`}
                  />
                </button>
              </div>

              {/* Note */}
              <div className="px-3 py-2">
                <p className="text-[13px] text-white/50 leading-[18px] tracking-[-0.32px] font-normal">
                  Allow ChatGPT to work with code and text editors.
                </p>
              </div>
            </div>
          </div>

          {/* Speech Section */}
          <div className="mb-6">
            <h3 className="text-[14px] font-semibold leading-[20px] tracking-[-0.3px] text-white/90 mb-3">
              Speech
            </h3>
            <div className="space-y-0.5">
              {/* Voice */}
              <div className="flex items-center justify-between px-3 py-2.5 hover:bg-white/5 rounded-lg transition-colors">
                <div className="flex items-center gap-3">
                  <Mic className="size-4 text-white/60" />
                  <span className="text-[14px] font-normal leading-[20px] tracking-[-0.3px] text-white/90">
                    Voice
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-[14px] font-normal leading-[20px] tracking-[-0.3px] text-white/60">
                    {voice}
                  </span>
                  <IconChevronRightMd className="size-4 text-white/40" />
                </div>
              </div>

              {/* Main language */}
              <div className="flex items-center justify-between px-3 py-2.5 hover:bg-white/5 rounded-lg transition-colors">
                <div className="flex items-center gap-3">
                  <Languages className="size-4 text-white/60" />
                  <span className="text-[14px] font-normal leading-[20px] tracking-[-0.3px] text-white/90">
                    Main language
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-[14px] font-normal leading-[20px] tracking-[-0.3px] text-white/60">
                    {mainLanguage}
                  </span>
                  <IconChevronRightMd className="size-4 text-white/40" />
                </div>
              </div>

              {/* Audio settings */}
              <button className="w-full flex items-center justify-between px-3 py-2.5 hover:bg-white/5 rounded-lg transition-colors">
                <div className="flex items-center gap-3">
                  <Volume2 className="size-4 text-white/60" />
                  <span className="text-[14px] font-normal leading-[20px] tracking-[-0.3px] text-white/90">
                    Audio settings
                  </span>
                </div>
                <IconChevronRightMd className="size-4 text-white/40" />
              </button>

              {/* Note */}
              <div className="px-3 py-2">
                <p className="text-[13px] text-white/50 leading-[18px] tracking-[-0.32px] font-normal">
                  For best results, select the language you mainly speak. If it's not listed, it may
                  still be supported via auto-detection.
                </p>
              </div>
            </div>
          </div>

          {/* Suggestions Section */}
          <div className="mb-6">
            <h3 className="text-[14px] font-semibold leading-[20px] tracking-[-0.3px] text-white/90 mb-3">
              Suggestions
            </h3>
            <div className="space-y-0.5">
              {/* Autocomplete */}
              <div className="flex items-center justify-between px-3 py-2.5 hover:bg-white/5 rounded-lg transition-colors">
                <div className="flex items-center gap-3">
                  <ListChecks className="size-4 text-white/60" />
                  <span className="text-[14px] font-normal leading-[20px] tracking-[-0.3px] text-white/90">
                    Autocomplete
                  </span>
                </div>
                <button
                  onClick={() => setAutocomplete(!autocomplete)}
                  className={`relative inline-flex h-5 w-9 items-center rounded-full transition-colors ${
                    autocomplete ? "bg-[#40C977]" : "bg-white/20"
                  }`}
                >
                  <span
                    className={`inline-block size-4 transform rounded-full bg-white transition-transform ${
                      autocomplete ? "translate-x-[18px]" : "translate-x-0.5"
                    }`}
                  />
                </button>
              </div>

              {/* Trending searches */}
              <div className="flex items-center justify-between px-3 py-2.5 hover:bg-white/5 rounded-lg transition-colors">
                <div className="flex items-center gap-3">
                  <TrendingUp className="size-4 text-white/60" />
                  <span className="text-[14px] font-normal leading-[20px] tracking-[-0.3px] text-white/90">
                    Trending searches
                  </span>
                </div>
                <button
                  onClick={() => setTrendingSearches(!trendingSearches)}
                  className={`relative inline-flex h-5 w-9 items-center rounded-full transition-colors ${
                    trendingSearches ? "bg-[#40C977]" : "bg-white/20"
                  }`}
                >
                  <span
                    className={`inline-block size-4 transform rounded-full bg-white transition-transform ${
                      trendingSearches ? "translate-x-[18px]" : "translate-x-0.5"
                    }`}
                  />
                </button>
              </div>

              {/* Follow-up suggestions */}
              <div className="flex items-center justify-between px-3 py-2.5 hover:bg-white/5 rounded-lg transition-colors">
                <div className="flex items-center gap-3">
                  <Lightbulb className="size-4 text-white/60" />
                  <span className="text-[14px] font-normal leading-[20px] tracking-[-0.3px] text-white/90">
                    Follow-up suggestions
                  </span>
                </div>
                <button
                  onClick={() => setFollowUpSuggestions(!followUpSuggestions)}
                  className={`relative inline-flex h-5 w-9 items-center rounded-full transition-colors ${
                    followUpSuggestions ? "bg-[#40C977]" : "bg-white/20"
                  }`}
                >
                  <span
                    className={`inline-block size-4 transform rounded-full bg-white transition-transform ${
                      followUpSuggestions ? "translate-x-[18px]" : "translate-x-0.5"
                    }`}
                  />
                </button>
              </div>
            </div>
          </div>

          {/* About Section */}
          <div className="mb-6">
            <h3 className="text-[14px] font-semibold leading-[20px] tracking-[-0.3px] text-white/90 mb-3">
              About
            </h3>
            <div className="space-y-0.5">
              {/* Report bug */}
              <button className="w-full flex items-center justify-between px-3 py-2.5 hover:bg-white/5 rounded-lg transition-colors">
                <div className="flex items-center gap-3">
                  <Bug className="size-4 text-white/60" />
                  <span className="text-[14px] font-normal leading-[20px] tracking-[-0.3px] text-white/90">
                    Report bug
                  </span>
                </div>
                <IconChevronRightMd className="size-4 text-white/40" />
              </button>

              {/* Help Center */}
              <button className="w-full flex items-center justify-between px-3 py-2.5 hover:bg-white/5 rounded-lg transition-colors">
                <div className="flex items-center gap-3">
                  <HelpCircle className="size-4 text-white/60" />
                  <span className="text-[14px] font-normal leading-[20px] tracking-[-0.3px] text-white/90">
                    Help Center
                  </span>
                </div>
                <IconChevronRightMd className="size-4 text-white/40" />
              </button>

              {/* Terms of Use */}
              <button className="w-full flex items-center justify-between px-3 py-2.5 hover:bg-white/5 rounded-lg transition-colors">
                <div className="flex items-center gap-3">
                  <FileText className="size-4 text-white/60" />
                  <span className="text-[14px] font-normal leading-[20px] tracking-[-0.3px] text-white/90">
                    Terms of Use
                  </span>
                </div>
                <IconChevronRightMd className="size-4 text-white/40" />
              </button>

              {/* Privacy Policy */}
              <button className="w-full flex items-center justify-between px-3 py-2.5 hover:bg-white/5 rounded-lg transition-colors">
                <div className="flex items-center gap-3">
                  <Lock className="size-4 text-white/60" />
                  <span className="text-[14px] font-normal leading-[20px] tracking-[-0.3px] text-white/90">
                    Privacy Policy
                  </span>
                </div>
                <IconChevronRightMd className="size-4 text-white/40" />
              </button>

              {/* ChatGPT for macOS with version */}
              <div className="flex items-center justify-between px-3 py-2.5 hover:bg-white/5 rounded-lg transition-colors">
                <div className="flex items-center gap-3">
                  <Info className="size-4 text-white/60" />
                  <span className="text-[14px] font-normal leading-[20px] tracking-[-0.3px] text-white/90">
                    ChatGPT for macOS
                  </span>
                </div>
                <span className="text-[14px] font-normal leading-[20px] tracking-[-0.3px] text-white/60">
                  1.2025.343 (176593692)
                </span>
              </div>

              {/* Log out */}
              <button className="w-full flex items-center justify-between px-3 py-2.5 hover:bg-white/5 rounded-lg transition-colors">
                <div className="flex items-center gap-3">
                  <LogOut className="size-4 text-white/60" />
                  <span className="text-[14px] font-normal leading-[20px] tracking-[-0.3px] text-white/90">
                    Log out
                  </span>
                </div>
                <IconChevronRightMd className="size-4 text-white/40" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
