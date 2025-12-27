import type { ReactNode } from "react";
import { createContext, useContext, useSyncExternalStore } from "react";

export const SET_GLOBALS_EVENT_TYPE = "openai:set_globals" as const;

type UnknownRecord = Record<string, unknown>;

// Display modes per Apps SDK spec
export type OpenAiDisplayMode = "inline" | "pip" | "fullscreen";
export type OpenAiTheme = "light" | "dark";

/**
 * Globals provided by the ChatGPT host via window.openai
 * @see https://developers.openai.com/apps-sdk/build/chatgpt-ui
 */
export interface OpenAiGlobals {
  /** Arguments supplied when the tool was invoked */
  toolInput?: UnknownRecord;
  /** structuredContent from tool result - surfaced to model and component */
  toolOutput?: UnknownRecord;
  /** _meta payload from tool result - only widget sees it, never the model */
  toolResponseMetadata?: UnknownRecord;
  /** Snapshot of UI state persisted between renders */
  widgetState?: UnknownRecord | null;
  /** BCP 47 locale string (e.g., "en-US") */
  locale?: string;
  /** Current theme */
  theme?: OpenAiTheme;
  /** Current display mode */
  displayMode?: OpenAiDisplayMode;
  /** Maximum height for the widget iframe */
  maxHeight?: number;
  /** Safe area insets for mobile */
  safeArea?: UnknownRecord;
  /** View configuration */
  view?: UnknownRecord;
  /** User agent hint for analytics or formatting */
  userAgent?: string;
}

/**
 * Full window.openai bridge interface per Apps SDK spec
 * @see https://developers.openai.com/apps-sdk/reference
 */
export interface OpenAiBridge extends OpenAiGlobals {
  /** Stores a new widget state snapshot synchronously */
  setWidgetState?: (state: UnknownRecord | null) => void;
  /** Gets current widget state */
  getWidgetState?: () => UnknownRecord | null;
  /** Invoke another MCP tool from the widget */
  callTool?: (name: string, args?: UnknownRecord) => Promise<unknown>;
  /** Ask ChatGPT to post a message authored by the component */
  sendFollowUpMessage?: (args: { prompt: string }) => Promise<unknown>;
  /** Upload a user-selected file and receive a fileId (supports image/png, image/jpeg, image/webp) */
  uploadFile?: (file: File) => Promise<{ fileId: string }>;
  /** Request a temporary download URL for a file */
  getFileDownloadUrl?: (args: { fileId: string }) => Promise<{ downloadUrl: string }>;
  /** Request PiP/fullscreen modes */
  requestDisplayMode?: (args: { mode: OpenAiDisplayMode }) => Promise<unknown>;
  /** Spawn a modal owned by ChatGPT */
  requestModal?: (args: UnknownRecord) => Promise<unknown>;
  /** Report dynamic widget heights to avoid scroll clipping */
  notifyIntrinsicHeight?: (args: { height: number }) => void;
  /** Open a vetted external link in the user's browser */
  openExternal?: (args: { href: string }) => Promise<unknown>;
  /** Request to close the widget */
  requestClose?: () => void;
}

export interface SetGlobalsEvent extends CustomEvent<{ globals: OpenAiGlobals }> {
  type: typeof SET_GLOBALS_EVENT_TYPE;
}

declare global {
  interface Window {
    openai?: OpenAiBridge;
  }
}

/**
 * Host abstraction for both embedded (ChatGPT) and standalone modes
 */
export type Host = {
  mode: "embedded" | "standalone";
  toolInput?: unknown;
  toolOutput?: unknown;
  toolResponseMetadata?: unknown;
  callTool?: (name: string, args?: unknown) => Promise<unknown>;
  sendMessage?: (text: string) => Promise<void>;
  getState?: () => unknown;
  setState?: (state: unknown) => void;
  uploadFile?: (file: File) => Promise<{ fileId: string }>;
  getFileDownloadUrl?: (args: { fileId: string }) => Promise<{ downloadUrl: string }>;
  requestDisplayMode?: (args: { mode: OpenAiDisplayMode }) => Promise<unknown>;
  requestModal?: (args: UnknownRecord) => Promise<unknown>;
  openExternal?: (args: { href: string }) => Promise<unknown>;
  requestClose?: () => void;
  notifyIntrinsicHeight?: (args: { height: number }) => void;
};

const HostContext = createContext<Host | null>(null);

export function HostProvider({ host, children }: { host: Host; children: ReactNode }) {
  return <HostContext.Provider value={host}>{children}</HostContext.Provider>;
}

export function useHost() {
  const host = useContext(HostContext);
  if (!host) {
    throw new Error("HostProvider is missing. Wrap your app in <HostProvider />.");
  }
  return host;
}

/**
 * Create a host adapter for embedded ChatGPT mode (wraps window.openai)
 */
export function createEmbeddedHost(): Host {
  const openai = typeof window !== "undefined" ? window.openai : undefined;

  return {
    mode: "embedded",
    get toolInput() {
      return openai?.toolInput;
    },
    get toolOutput() {
      return openai?.toolOutput;
    },
    get toolResponseMetadata() {
      return openai?.toolResponseMetadata;
    },
    callTool: openai?.callTool
      ? (name: string, args?: unknown) => openai.callTool!(name, args as UnknownRecord)
      : undefined,
    sendMessage: openai?.sendFollowUpMessage
      ? async (text) => {
          await openai.sendFollowUpMessage?.({ prompt: text });
        }
      : undefined,
    getState: openai?.getWidgetState?.bind(openai),
    setState: openai?.setWidgetState
      ? (state: unknown) => openai.setWidgetState!(state as UnknownRecord | null)
      : undefined,
    uploadFile: openai?.uploadFile?.bind(openai),
    getFileDownloadUrl: openai?.getFileDownloadUrl?.bind(openai),
    requestDisplayMode: openai?.requestDisplayMode
      ? (args: { mode: OpenAiDisplayMode }) => openai.requestDisplayMode!(args)
      : undefined,
    requestModal: openai?.requestModal
      ? (args: UnknownRecord) => openai.requestModal!(args)
      : undefined,
    openExternal: openai?.openExternal
      ? (args: { href: string }) => openai.openExternal!(args)
      : undefined,
    requestClose: openai?.requestClose?.bind(openai),
    notifyIntrinsicHeight: openai?.notifyIntrinsicHeight
      ? (args: { height: number }) => openai.notifyIntrinsicHeight!(args)
      : undefined,
  };
}

/**
 * Create a host adapter for standalone mode (API-based)
 */
export function createStandaloneHost(apiBase: string): Host {
  return {
    mode: "standalone",
    async callTool(name, args) {
      const res = await fetch(`${apiBase}/api/${name}`, {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(args),
      });
      if (!res.ok) {
        throw new Error(`HTTP ${res.status}`);
      }
      return await res.json();
    },
    async sendMessage(text) {
      console.log("standalone send:", text);
    },
    getState: () => null,
    setState: () => {},
    uploadFile: async () => {
      throw new Error("uploadFile is not available in standalone mode");
    },
    getFileDownloadUrl: async () => {
      throw new Error("getFileDownloadUrl is not available in standalone mode");
    },
    requestDisplayMode: async () => {},
    requestModal: async () => {},
    openExternal: async () => {},
    requestClose: () => {},
    notifyIntrinsicHeight: () => {},
  };
}

/**
 * Create a mock host for testing/Storybook
 */
export function createMockHost(overrides: Partial<Host> = {}): Host {
  return {
    mode: "standalone",
    callTool: async () => ({ ok: true }),
    sendMessage: async () => {},
    getState: () => null,
    setState: () => {},
    uploadFile: async () => ({ fileId: "mock-file-id" }),
    getFileDownloadUrl: async () => ({ downloadUrl: "https://example.com/mock-file" }),
    requestDisplayMode: async () => {},
    requestModal: async () => {},
    openExternal: async () => {},
    requestClose: () => {},
    notifyIntrinsicHeight: () => {},
    ...overrides,
  };
}

/**
 * Subscribe to `window.openai` global changes dispatched by the host.
 * Based on the Apps SDK docs: `openai:set_globals` events + `useSyncExternalStore`.
 * @see https://developers.openai.com/apps-sdk/build/chatgpt-ui
 */
export function useOpenAiGlobal<K extends keyof OpenAiGlobals>(key: K): OpenAiGlobals[K] {
  const isBrowser = typeof window !== "undefined";
  return useSyncExternalStore(
    (onChange: () => void) => {
      if (!isBrowser) return () => {};
      const handleSetGlobal = (event: Event) => {
        const typed = event as SetGlobalsEvent;
        const value = typed.detail?.globals?.[key];
        if (value === undefined) return;
        onChange();
      };

      window.addEventListener(SET_GLOBALS_EVENT_TYPE, handleSetGlobal, {
        passive: true,
      });

      return () => {
        window.removeEventListener(SET_GLOBALS_EVENT_TYPE, handleSetGlobal);
      };
    },
    () => (isBrowser ? window.openai?.[key] : undefined),
    () => undefined,
  );
}

// Convenience hooks for common globals
export function useToolInput() {
  return useOpenAiGlobal("toolInput");
}

export function useToolOutput() {
  return useOpenAiGlobal("toolOutput");
}

export function useToolResponseMetadata() {
  return useOpenAiGlobal("toolResponseMetadata");
}

export function useWidgetState() {
  return useOpenAiGlobal("widgetState");
}

export function useTheme() {
  return useOpenAiGlobal("theme");
}

export function useDisplayMode() {
  return useOpenAiGlobal("displayMode");
}

export function useLocale() {
  return useOpenAiGlobal("locale");
}

export function useMaxHeight() {
  return useOpenAiGlobal("maxHeight");
}

/**
 * Create a mock window.openai object for standalone/Storybook use
 */
export function createMockOpenAI(overrides: Partial<OpenAiBridge> = {}): OpenAiBridge {
  const mock: OpenAiBridge = {
    theme: "dark",
    displayMode: "inline",
    locale: "en-US",
    maxHeight: 600,
    toolInput: {},
    toolOutput: {
      demo: true,
      message: "Standalone mode: window.openai was mocked.",
    },
    toolResponseMetadata: {},
    widgetState: null,
    setWidgetState: () => {},
    getWidgetState: () => null,
    callTool: async () => {
      throw new Error(
        "callTool is not available in standalone mode. Run this UI inside ChatGPT (Apps SDK) or provide a mock implementation.",
      );
    },
    sendFollowUpMessage: async () => {
      throw new Error(
        "sendFollowUpMessage is not available in standalone mode. Run this UI inside ChatGPT (Apps SDK) or provide a mock implementation.",
      );
    },
    uploadFile: async () => ({ fileId: "mock-file-id" }),
    getFileDownloadUrl: async () => ({ downloadUrl: "https://example.com/mock-file" }),
    requestDisplayMode: async () => {},
    requestModal: async () => {},
    notifyIntrinsicHeight: () => {},
    openExternal: async () => {},
    requestClose: () => {},
    ...overrides,
  };

  return mock;
}

/**
 * For standalone / Storybook: provide a minimal `window.openai` so UI code can run.
 */
export function ensureMockOpenAI(overrides: Partial<OpenAiBridge> = {}) {
  if (typeof window === "undefined") return;
  if (window.openai) return;
  window.openai = createMockOpenAI(overrides);
}
