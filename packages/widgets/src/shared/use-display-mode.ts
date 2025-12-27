import { type DisplayMode } from "./types";
import { useOpenAiGlobal } from "./use-openai-global";

export const useDisplayMode = (): DisplayMode | null => {
  const mode = useOpenAiGlobal("displayMode");
  return mode ?? null;
};
