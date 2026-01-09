import { useOpenAiGlobal as useRuntimeOpenAiGlobal } from "@chatui/runtime";
import type { OpenAiGlobals } from "@chatui/runtime";

export function useOpenAiGlobal<K extends keyof OpenAiGlobals>(
  key: K,
): Exclude<OpenAiGlobals[K], undefined> | null {
  const value = useRuntimeOpenAiGlobal(key);
  return value === undefined ? null : (value as Exclude<OpenAiGlobals[K], undefined>);
}
