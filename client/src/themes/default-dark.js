import { createTheme } from "@mui/material/styles";
import { alpha } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#dc3c4d",
      light: "#ed7e79",
      contrastText: "#fff",
    },
    secondary: {
      main: "#202020",
      light: "#303030",
      dark: "#101010",
      contrastText: "#fff",
    },
    background: {
      main: "#202020",
      light: "#303030",
      dark: "#101010",
    },
    text: {
      primary: "#fff",
      secondary: alpha("#fff", 0.7),
      disabled: alpha("#fff", 0.5),
    },
    grey: {
      main: "#525151",
      light: "#A9A9A9",
    },
    white: {
      main: "#fff",
      dark: "#FAF9F6",
    },
    black: {
      main: "#000",
    },
    green: {
      main: "#2e7d32",
    },
    red: {
      main: "#D22B2B",
    },
  },
  typography: {
    fontFamily: ["Open Sans", "sans-serif"].join(","),
    fontSize: 14,
  },
  breakpoints: {
    values: {
      xs: 330,
      sm: 600,
      md: 900,
      lg: 1200,
      xl: 1536,
    },
  },
});

export default theme;
