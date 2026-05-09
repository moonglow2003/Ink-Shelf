import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        "surface-variant": "#e2e2e2",
        "on-tertiary-container": "#838484",
        "on-primary-fixed": "#1b1b1b",
        "secondary-fixed-dim": "#c8c6c6",
        "on-background": "#1a1c1c",
        "secondary-container": "#e4e2e1",
        "on-tertiary-fixed": "#1a1c1c",
        "on-secondary-fixed-variant": "#474747",
        "on-tertiary": "#ffffff",
        "secondary": "#5f5e5e",
        "error-container": "#ffdad6",
        "on-primary-container": "#848484",
        "on-secondary": "#ffffff",
        "outline": "#7e7576",
        "tertiary-fixed-dim": "#c6c6c7",
        "primary": "#000000",
        "surface-container-low": "#f3f3f4",
        "tertiary": "#000000",
        "inverse-on-surface": "#f0f1f1",
        "surface-container-highest": "#e2e2e2",
        "on-secondary-fixed": "#1b1c1c",
        "surface-container": "#eeeeee",
        "inverse-primary": "#c6c6c6",
        "on-primary": "#ffffff",
        "on-error-container": "#93000a",
        "background": "#f9f9f9",
        "primary-fixed": "#e2e2e2",
        "on-surface-variant": "#4c4546",
        "on-secondary-container": "#656464",
        "on-primary-fixed-variant": "#474747",
        "surface-tint": "#5e5e5e",
        "on-surface": "#1a1c1c",
        "surface-container-high": "#e8e8e8",
        "surface-dim": "#dadada",
        "secondary-fixed": "#e4e2e1",
        "outline-variant": "#cfc4c5",
        "surface-bright": "#f9f9f9",
        "tertiary-container": "#1a1c1c",
        "on-error": "#ffffff",
        "primary-fixed-dim": "#c6c6c6",
        "surface": "#f9f9f9",
        "inverse-surface": "#2f3131",
        "tertiary-fixed": "#e2e2e2",
        "on-tertiary-fixed-variant": "#454747",
        "primary-container": "#1b1b1b",
        "surface-container-lowest": "#ffffff",
        "error": "#ba1a1a"
      },
      borderRadius: {
        "DEFAULT": "0.125rem",
        "lg": "0.25rem",
        "xl": "0.5rem",
        "full": "0.75rem"
      },
      spacing: {
        "gutter": "2rem",
        "md": "1.5rem",
        "sm": "1rem",
        "unit": "4px",
        "xs": "0.5rem",
        "lg": "2.5rem",
        "xl": "4rem",
        "xxl": "8rem"
      },
      fontFamily: {
        "label-md": ["hankenGrotesk", "sans-serif"],
        "body-md": ["hankenGrotesk", "sans-serif"],
        "headline-lg": ["bricolageGrotesque", "sans-serif"],
        "body-lg": ["hankenGrotesk", "sans-serif"],
        "headline-md": ["bricolageGrotesque", "sans-serif"],
        "display-lg": ["bricolageGrotesque", "sans-serif"]
      },
      fontSize: {
        "label-md": ["14px", { lineHeight: "1", fontWeight: "700" }],
        "body-md": ["16px", { lineHeight: "1.6", fontWeight: "400" }],
        "headline-lg": ["32px", { lineHeight: "1.2", fontWeight: "700" }],
        "body-lg": ["18px", { lineHeight: "1.6", fontWeight: "400" }],
        "headline-md": ["24px", { lineHeight: "1.3", fontWeight: "600" }],
        "display-lg": ["48px", { lineHeight: "1.1", letterSpacing: "-0.02em", fontWeight: "800" }]
      }
    },
  },
  plugins: [],
};
export default config;
