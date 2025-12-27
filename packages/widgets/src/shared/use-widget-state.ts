import { useCallback, useEffect, useState, type SetStateAction } from "react";
import { useHost } from "@chatui/runtime";

import { useOpenAiGlobal } from "./use-openai-global";
import type { UnknownObject } from "./types";

export function useWidgetState<T extends UnknownObject>(
  defaultState: T | (() => T),
): readonly [T, (state: SetStateAction<T>) => void];
export function useWidgetState<T extends UnknownObject>(
  defaultState?: T | (() => T | null) | null,
): readonly [T | null, (state: SetStateAction<T | null>) => void];
export function useWidgetState<T extends UnknownObject>(
  defaultState?: T | (() => T | null) | null,
): readonly [T | null, (state: SetStateAction<T | null>) => void] {
  const widgetStateFromWindow = useOpenAiGlobal("widgetState") as T;
  const host = useHost();

  const [widgetState, _setWidgetState] = useState<T | null>(() => {
    if (widgetStateFromWindow != null) {
      return widgetStateFromWindow;
    }

    return typeof defaultState === "function" ? defaultState() : (defaultState ?? null);
  });

  useEffect(() => {
    _setWidgetState(widgetStateFromWindow);
  }, [widgetStateFromWindow]);

  const setWidgetState = useCallback(
    (state: SetStateAction<T | null>) => {
      _setWidgetState((prevState) => {
        const newState = typeof state === "function" ? state(prevState) : state;

        if (newState != null) {
          if (host.setState) {
            host.setState(newState);
          } else if (typeof window !== "undefined") {
            void window.openai?.setWidgetState?.(newState);
          }
        }

        return newState;
      });
    },
    [host],
  );

  return [widgetState, setWidgetState] as const;
}
