module.exports = {
  purge: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  darkMode: false,
  theme: {
    colors: {
      primary: "#daa520",
      black: "#000000",
      white: "#ffffff",
      gray: "#333333"
    }
  },
  variants: {
    ringColor: ["hover"],
    ringWidth: ["hover"]
  }
}
