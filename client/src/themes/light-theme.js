import { createTheme } from "@mui/material/styles";
import { alpha } from "@mui/material/styles";

const lightTheme = createTheme({
  palette: {
    primary: {
      main: "#dc3c4d",
      light: "#ed7e79",
      contrastText: "#202020",
    },
    secondary: {
      main: "#202020",
      light: "#303030",
      dark: "#101010",
      contrastText: "#202020",
    },
    background: {
      main: "#FAF9F6",
      light: "#fff",
      dark: "#undefined",
    },
    text: {
      primary: "#202020",
      secondary: alpha("#202020", 0.7),
      disabled: alpha("#202020", 0.5),
    },
    grey: {
      main: "#525151",
    },
    white: {
      main: "#fff",
    },
    black: {
      main: "#000",
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

export default lightTheme;
