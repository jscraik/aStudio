import "@testing-library/jest-dom/vitest";
import { cleanup } from "@testing-library/react";
import { afterEach, vi } from "vitest";

// Cleanup after each test
afterEach(() => {
  cleanup();
});

// Mock ResizeObserver (used by Radix components) - must be a class
class ResizeObserverMock {
  observe = vi.fn();
  unobserve = vi.fn();
  disconnect = vi.fn();
}
global.ResizeObserver = ResizeObserverMock;

// Mock matchMedia (used by responsive hooks)
Object.defineProperty(window, "matchMedia", {
  writable: true,
  value: vi.fn().mockImplementation((query: string) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(),
    removeListener: vi.fn(),
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })),
});

// Mock scrollIntoView (used by focus management)
Element.prototype.scrollIntoView = vi.fn();

// Mock getComputedStyle for CSS custom properties
const originalGetComputedStyle = window.getComputedStyle;
window.getComputedStyle = (element: Element) => {
  const style = originalGetComputedStyle(element);
  return {
    ...style,
    getPropertyValue: (prop: string) => {
      // Return sensible defaults for foundation tokens
      if (prop.startsWith("--foundation-")) {
        return "#000000";
      }
      return style.getPropertyValue(prop);
    },
  };
};
