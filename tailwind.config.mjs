/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  theme: {
    extend: {
      colors: {
        dark: "rgb(var(--bp-dark-rgb) / <alpha-value>)",
        darker: "rgb(var(--bp-darker-rgb) / <alpha-value>)",
        light: "rgb(var(--bp-light-rgb) / <alpha-value>)",
        danger: "rgb(var(--bp-danger-rgb) / <alpha-value>)",
        warning: "rgb(var(--bp-warning-rgb) / <alpha-value>)",
        success: "rgb(var(--bp-success-rgb) / <alpha-value>)"
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
