import { useAuth } from "../shared/context/auth";
import NoGamesDashboard from "./NoGamesDashboard";

const Dashboard = () => {
  const { selectedGame } = useAuth();

  return (
    <div>
      {selectedGame == "" && <NoGamesDashboard />}
      {selectedGame != "" && selectedGame}
    </div>
  );
};

export default Dashboard;
