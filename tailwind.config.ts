import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        ink: "#16110d",
        paper: "#f7f0e3",
        ember: "#e76632",
        olive: "#617157",
        haze: "#d9d0c4",
        brass: "#ba9f6a",
      },
      boxShadow: {
        halo: "0 0 0 1px rgba(247, 240, 227, 0.08), 0 24px 80px rgba(22, 17, 13, 0.35)",
      },
      backgroundImage: {
        grain:
          "radial-gradient(circle at 20% 20%, rgba(231, 102, 50, 0.12), transparent 22%), radial-gradient(circle at 80% 10%, rgba(186, 159, 106, 0.16), transparent 18%), radial-gradient(circle at 50% 80%, rgba(97, 113, 87, 0.14), transparent 20%)",
      },
      fontFamily: {
        display: ['"Iowan Old Style"', '"Palatino Linotype"', '"Book Antiqua"', "serif"],
        body: ['"Avenir Next"', "Avenir", '"Segoe UI"', "sans-serif"],
        mono: ['"IBM Plex Mono"', '"SFMono-Regular"', "monospace"],
      },
    },
  },
  plugins: [],
};

export default config;
