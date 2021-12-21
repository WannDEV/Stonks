import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#dc3c4d",
    },
    secondary: {
      main: "#202020",
      light: "#303030",
      dark: "#101010",
    },
    background: {
      main: "#202020",
      light: "#303030",
      dark: "#101010",
    },
    common: {
      white: "#ffffff",
    },
    white: {
      main: "#ffffff",
    },
  },
  typography: {
    fontFamily: ["Open Sans", "sans-serif"].join(","),
    fontSize: 14,
  },
});

export default theme;
