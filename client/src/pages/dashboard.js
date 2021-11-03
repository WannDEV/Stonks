import OwnedStocksLayout from "../layouts/OwnedStocks";

const Dashboard = () => {
    return (
        <div>
            <OwnedStocksLayout />
        </div>
    )
}

export async function getStaticProps(context) {
    return {
      props: {
        protected: true,
        userTypes: ["unassigned", "user","admin"],
      },
    };
  }

export default Dashboard;