import preset from "../tokens/tailwind.preset";

export default {
  presets: [preset],
  content: [
    "./src/**/*.{ts,tsx}",
    "../ui/src/**/*.{ts,tsx}",
  ],
};