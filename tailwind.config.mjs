/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  theme: {
    extend: {
      colors: {
        dark: "var(--bp-dark)",
        darker: "var(--bp-darker)",
        light: "var(--bp-light)",
        danger: "var(--bp-danger)",
        warning: "var(--bp-warning)",
        success: "var(--bp-success)"
      },
      fontFamily: {
        display: ['"RC Guidelines"', "sans-serif"],
        "display-dark": ['"RC Guidelines Dark"', "sans-serif"],
        "display-light": ['"RC Guidelines Light"', "sans-serif"],
        "display-empty": ['"RC Guidelines Empty"', "sans-serif"],
        sans: ['"Phantom Sans"', "system-ui", "sans-serif"]
      }
    }
  }
};
