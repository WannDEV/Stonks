import { useState } from "react";
import { useRouter } from "next/router";

import SearchBar from "../components/SearchBar";
import Login from "../components/Auth/login";
import TestButton from "../components/TestButton";
import { useAuth } from "../shared/context/auth";
import api from "../services/api";

const Index = () => {
  const { user, isAuthenticated, role } = useAuth();
  const router = useRouter();
  console.log(user);
  console.log(isAuthenticated);

  const goToDashboard = () => router.push("/dashboard");

  const testError = () => {
    api
      .get("/test/testerror")
      .then((response) => {
        console.log(response);
        if (response) console.log(response);
        else console.log("Why wont this work");
      })
      .catch((err) => console.log(`Caught error: ${err}`));
  };

  return (
    <div>
      <h1>Welcome to Google Oauth in Next.js Application</h1>
      <Login />
      <TestButton />
      <p>{isAuthenticated ? user.name : "Not signed in"}</p>
      <p>Login status: {isAuthenticated ? "Signed in" : "Not signed in"}</p>
      <p>User role: {role}</p>
      <p>
        Remember that refresh- and accesstoken lifetime has been changed for dev
        purposes
      </p>
      <SearchBar />
      <button onClick={goToDashboard}>Dashboard</button>
      <button onClick={testError}>Test error</button>
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
