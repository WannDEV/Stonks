// import SearchBar from "../components/SearchBar";
import { useAuth } from "../shared/context/auth";
import LandingPage from "../layouts/LandingPage";
import Dashboard from "../layouts/Dashboard";

const Index = () => {
  const { isAuthenticated } = useAuth();

  if (isAuthenticated) {
    return <Dashboard />;
  } else {
    return <LandingPage />;
  }
};

export async function getStaticProps(context) {
  return {
    props: {
      protected: false,
      userTypes: ["user", "admin", "unassigned"],
    },
  };
}

export default Index;
