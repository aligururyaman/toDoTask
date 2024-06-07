/** @type {import('tailwindcss').Config} */
module.exports = {
  // NOTE: Update this to include the paths to all of your component files.
  content: ["./app/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        customBlue: "#BDE0FE",
        customPink: "#CA87F4",
        customPinkTwo: "#F3C4FB",
        customWhite: "#F8EEFF",
        customButton: "#F6F6F6",
        customDay: "#DEB5E4",
        customWhite: "#F5F5F5",
        customGrey: "#D9D9D9",
        customYellow: "#FFEE93",
        customGreen: "#ADF7B6",
        customOrtange: "#FFC09F",
        customAqua: "#8FFFF8",
        customRed: "#CC2222",
        customLightYellow: "#FBF1BA",
        customDarkBlue: "#7075E5",
        customDarkPink: "#FF36F7",
        customTaskwhite: "#EDEAEA",
        customSoftBlue: "#ABDDF4",
      },
      fontSize: {
        textMain: "5.5rem",
        androidText: "3rem",
      },
    },
  },
  plugins: [],
};
