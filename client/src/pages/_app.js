import "../styles/index.css";

import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@material-ui/core/CssBaseline";

import { AuthProvider } from "../shared/context/auth";
import ProtectRoute from "../routes/ProtectRoutes";
import Header from "../layouts/Header";
import Footer from "../layouts/Footer";
import theme from "../themes/default-dark";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";

const PushFooterToBottom = styled("div")(({}) => ({
  display: "flex",
  minHeight: "100vh",
  flexDirection: "column",
  justifyContent: "space-between",
}));

const StyledBox = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.background.main,
}));

function MyApp({ Component, pageProps }) {
  return (
    <AuthProvider>
      <ThemeProvider theme={theme}>
        <StyledBox component="div">
          <CssBaseline />
          <Header />
          <PushFooterToBottom>
            <ProtectRoute pageProps={pageProps}>
              <Component {...pageProps} />
            </ProtectRoute>
            <Footer />
          </PushFooterToBottom>
        </StyledBox>
      </ThemeProvider>
    </AuthProvider>
  );
}

export default MyApp;
