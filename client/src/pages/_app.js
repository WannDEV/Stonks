import { AuthProvider } from "../shared/context/auth";
import ProtectRoute from "../routes/ProtectRoutes";

import "../components/utils/Modal/Backdrop.css";
import "../components/utils/Modal/Modal.css";

function MyApp({ Component, pageProps }) {
  return (
    <AuthProvider>
      <ProtectRoute pageProps={pageProps}>
        <Component {...pageProps} />
      </ProtectRoute>
    </AuthProvider>
  );
}

export default MyApp;
