import React from "react";
import Login from "../components/Auth/login";

const LoggedOutPage = () => {
  return (
    <div>
      <h1>Du er nu successfuldt logget ud</h1>
      <Login />
    </div>
  );
};

export async function getStaticProps(context) {
  return {
    props: {
      protected: false,
      userTypes: ["user", "admin", "unassigned"],
    },
  };
}

export default LoggedOutPage;
