import Router from "next/router";

import { useAuth } from "../../shared/context/auth";

const Logout = () => {
  const { logout } = useAuth();

  const logoutFunc = () => {
    Router.push("/logged-out");
    logout();
  };

  return <button onClick={logoutFunc}>Logout</button>;
};

export default Logout;
