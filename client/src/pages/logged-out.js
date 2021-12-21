import React from "react";
import GoogleLoginButton from "../components/Auth/providers/GoogleLoginButton";

const LoggedOutPage = () => {
  return (
    <div>
      <h1>Du er nu successfuldt logget ud</h1>
      <GoogleLoginButton />
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
