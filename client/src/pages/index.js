import { useState } from "react";

import Login from "../components/login";
import TestButton from "../components/TestButton";
import { useAuth } from "../shared/context/auth";
import AllStocksButton from "../components/AllStocksButton";

const Index = () => {
  const { user, isAuthenticated, role } = useAuth();
  console.log(user);
  console.log(isAuthenticated);
  return (
    <div>
      <h1>Welcome to Google Oauth in Next.js Application</h1>
      <Login />
      <TestButton />
      <AllStocksButton />
      <p>{isAuthenticated ? user.name : "Not signed in"}</p>
      <p>Login status: {isAuthenticated ? "Signed in" : "Not signed in"}</p>
      <p>User role: {role}</p>
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

export default Index;
