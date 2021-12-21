import { createTheme } from "@mui/material/styles";

const landingPageHeaderTheme = createTheme({
  palette: {
    primary: {
      main: "#dc3c4d",
    },
  },
  typography: {
    fontFamily: ["Lato", "sans-serif"].join(","),
  },
});

export default landingPageHeaderTheme;
