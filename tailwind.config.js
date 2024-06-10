/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      backgroundImage: {
        "login-bg": "url('./src/assets/img/backgroundHome.jpg')",
      },
      colors: {
        hijau1: "#006666",
        hijauMd: "#ACFFE3",
        "green-primer": "#006666",
        hijau1txt: "#DDDDDD",
        hovertxt: "#ffffff",
      },
      opacity: {
        75: "0.75",
        100: "1",
      },
      backdropBlur: {
        none: "none",
        sm: "4px",
        DEFAULT: "8px",
        md: "12px",
        lg: "16px",
        xl: "24px",
        "2xl": "40px",
        "3xl": "64px",
      },
      boxShadow: {
        custom: "10px 10px 20px rgba(0, 0, 0, 0.5)",
      },
    },
  },
  plugins: [],
};
