// tailwind.config.js
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          100: "var(--primary-100)",
          200: "var(--primary-200)",
          300: "var(--primary-300)",
          400: "var(--primary-400)",
          500: "var(--primary-500)",
          600: "var(--primary-600)",
          700: "var(--primary-700)",
          800: "var(--primary-800)",
          900: "var(--primary-900)",
        },
        neutral: {
          100: "var(--neutral-100)",
          150: "var(--neutral-150)",
          200: "var(--neutral-200)",
          300: "var(--neutral-300)",
          400: "var(--neutral-400)",
          500: "var(--neutral-500)",
          600: "var(--neutral-600)",
          700: "var(--neutral-700)",
          800: "var(--neutral-800)",
          900: "var(--neutral-900)",
          1000: "var(--neutral-1000)",
        },
        support: {
          error: "var(--support-error)",
          success: "var(--support-success)",
          warning: "var(--support-warning)",
          info: "var(--support-info)",
        },
        specials: {
          recommended: "var(--specials-recommended)",
          executed: "var(--specials-executed)",
          cbot: "var(--specials-cbot)",
          cbotLight: "var(--specials-cbot-light)",
          basis: "var(--specials-basis)",
          basisLight: "var(--specials-basis-light)",
          dollar: "var(--specials-dollar)",
          dollarLight: "var(--specials-dollar-light)",
        }
      },
    },
  },
  plugins: [],
};
