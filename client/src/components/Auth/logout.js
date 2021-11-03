import { useAuth } from "../../shared/context/auth";

const Logout = () => {
  const { logout } = useAuth();

  return <button onClick={logout}>Logout</button>;
};

export default Logout;
