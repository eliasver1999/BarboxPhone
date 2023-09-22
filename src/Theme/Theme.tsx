import { createTheme, createText, createBox } from "@shopify/restyle";

const palette = {
  purpleLight: "#8C6FF7",
  purplePrimary: "#5A31F4",
  purpleDark: "#3F22AB",

  greenLight: "#56DCBA",
  greenPrimary: "#0ECD9D",
  greenDark: "#0A906E",
  redDark: "#c23033",
  black: "#3b3b3b",
  white: "#FFF",
  yellow: "#8bcf34",
  orange: "#f56416",
  cyan: "#16f5f1",
  purple: "#b216f5",
  pink: "#f51668",
  gray: "#595959",
  transparent: "transparent",
};

const theme = createTheme({
  colors: {
    gray: palette.gray,
    pink: palette.pink,
    purple: palette.purple,
    cyan: palette.cyan,
    orange: palette.orange,
    greenLight: palette.greenLight,
    mainBackground: palette.greenLight,
    cardPrimaryBackground: palette.redDark,
    primary: palette.greenDark,
    bottomDrawer: palette.redDark,
    body: palette.black,
    white: palette.white,
    transparent: palette.transparent,
  },
  spacing: {
    s: 8,
    m: 16,
    l: 24,
    xl: 40,
  },
  breakpoints: {
    phone: 0,
    tablet: 768,
  },
  textVariants: {
    hero: {
      fontSize: 80,
      lineHeight: 80,
      color: "white",
      textAlign: "center",
    },
    title1: {
      fontSize: 28,
      color: "gray",
    },
    label: {
      fontSize: 14,
      color: "gray",
    },
    button: {
      fontSize: 14,
    },
    date: {
      fontSize: 16,
    },
    title2: {
      fontSize: 18,
      lineHeight: 30,
      color: "gray",
    },
    card: {
      fontSize: 18,
      color: "gray",
    },
    cardLabel: {
      fontSize: 12,
      color: "gray",
    },
    body: {
      fontSize: 22,
      lineHeight: 30,
      color: "body",
    },
    tabs: {
      fontSize: 16,
      lineHeight: 30,
      color: "body",
      fontWeight: "bold",
    },
    header: {
      fontSize: 12,
      lineHeight: 24,
      color: "white",
    },
  },
});

export type Theme = typeof theme;
export const Text = createText<Theme>();
export const Box = createBox<Theme>();
export default theme;
