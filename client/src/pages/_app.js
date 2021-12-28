import "../styles/index.css";

import { ThemeProvider } from "@mui/material/styles";

import { AuthProvider } from "../shared/context/auth";
import ProtectRoute from "../routes/ProtectRoutes";
import Header from "../layouts/Header";
import Footer from "../layouts/Footer";
import theme from "../themes/default-dark";
import { styled } from "@mui/material/styles";

const PushFooterToBottom = styled("div")(({}) => ({
  display: "flex",
  minHeight: "100vh",
  flexDirection: "column",
  justifyContent: "space-between",
}));

function MyApp({ Component, pageProps }) {
  return (
    <AuthProvider>
      <ThemeProvider theme={theme}>
        <Header />
        <PushFooterToBottom>
          <ProtectRoute pageProps={pageProps}>
            <Component {...pageProps} />
          </ProtectRoute>
          <Footer />
        </PushFooterToBottom>
      </ThemeProvider>
    </AuthProvider>
  );
}

export default MyApp;
