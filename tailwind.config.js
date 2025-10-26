/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,ts}"],
  theme: {
    extend: {
      colors: {
        primary: "var(--primary)",
        toggle: "var(--toggle)",
        text: "var(--text)",
        hover: "var(--hover)",
        placeholder: "var(--placeholder)",
        border: "var(--border)",
        black: "var(--black)",
        location: "var(--location)",
        forecast: "var(--forecast)",
        spinner: "var(--spinner)"
      },
      backgroundImage: {
        gradient: "var(--gradient)",
        forecast: "var(--forecast)",
        forecastSecondary: "var(--forecastSecondary)",
      },
    },
  },
  plugins: [],
};
