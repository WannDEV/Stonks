import React from "react";
import Login from "../components/Auth/login";

const LoggedOutPage = () => {
  return (
    <div>
      <h1>Logged out...</h1>
      <p>You've been logged out due to security reasons</p>
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
