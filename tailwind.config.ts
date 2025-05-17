import type { Config } from "tailwindcss";

export default {
  content: ["./app/**/{**,.client,.server}/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: [
          "Noto Sans", // Font tối ưu cho tiếng Việt
          "ui-sans-serif",
          "system-ui",
          "sans-serif",
          "Apple Color Emoji",
          "Segoe UI Emoji",
          "Segoe UI Symbol",
          "Noto Color Emoji",
        ],
      },
      colors: {
        "cat-blue": "#1E3A8A", // Màu xanh đậm của header
        "cat-orange": "#F59E0B", // Màu cam của button
      },
    },
  },
  plugins: [],
} satisfies Config;
