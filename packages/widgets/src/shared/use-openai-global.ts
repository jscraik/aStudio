import { useOpenAiGlobal as useOpenAiGlobalRuntime } from "@chatui/runtime";
import type { OpenAiGlobals } from "@chatui/runtime";

export function useOpenAiGlobal<K extends keyof OpenAiGlobals>(key: K): OpenAiGlobals[K] | null {
  const value = useOpenAiGlobalRuntime(key);
  return value ?? null;
}
