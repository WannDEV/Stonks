import "../styles/index.css";

import { ThemeProvider } from "@mui/material/styles";

import { AuthProvider } from "../shared/context/auth";
import ProtectRoute from "../routes/ProtectRoutes";
import Header from "../layouts/Header";
import Footer from "../layouts/Footer";
import theme from "../themes/default-dark";

function MyApp({ Component, pageProps }) {
  return (
    <AuthProvider>
      <ThemeProvider theme={theme}>
        <Header />
        <ProtectRoute pageProps={pageProps}>
          <Component {...pageProps} />
        </ProtectRoute>
        <Footer />
      </ThemeProvider>
    </AuthProvider>
  );
}

export default MyApp;
