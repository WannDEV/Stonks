import useSWR from "swr";
import ContentLoader from "react-content-loader";

import TestButton from "../components/TestButton";
import { useAuth } from "../shared/context/auth";
import api from "../services/api";
import Logout from "../components/Auth/logout";

const ProtectedPage = () => {
  const { loading, role } = useAuth();
  const { data, isValidating } = useSWR(
    loading ? false : "/test/testfetch",
    api.get
  );

  const showSkeleton = isValidating || loading;

  console.log(
    `isValidating: ${isValidating}, loading: ${loading}, data: ${data}, showSkeleton: ${showSkeleton}`
  );

  return (
    <div>
      <h1>This is a protected page</h1>
      <p>role: {role}</p>
      <TestButton />
      <Logout />
      {!showSkeleton && data.data.message}
      {showSkeleton && (
        <ContentLoader>
          <rect y="10" rx="3" ry="3" width="1000" height="20" />
        </ContentLoader>
      )}
    </div>
  );
};

export async function getStaticProps(context) {
  return {
    props: {
      protected: true,
      userTypes: ["user", "admin", "unassigned"],
    },
  };
}

export default ProtectedPage;
