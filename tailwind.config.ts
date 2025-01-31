import type { Config } from "tailwindcss";
import tailwindcssAnimate from "tailwindcss-animate";

export default {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        RIGHT: ["Righteous", "sans-serif"],
        JSF: ["Josefin Sans", "sans-serif"],
      },
      colors: {
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primaryColor: "#2CAB00",
        secondaryColor: "#9CD788",
      },
    },
  },
  plugins: [tailwindcssAnimate],
} satisfies Config;
