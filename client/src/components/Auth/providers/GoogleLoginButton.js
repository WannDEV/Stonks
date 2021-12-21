import Cookie from "js-cookie";
import { useRouter } from "next/router";
import { GoogleLogin } from "react-google-login";
import api from "../../../services/api";
import { useAuth } from "../../../shared/context/auth";

const axiosApiCall = (url, method, body = {}) =>
  api({
    method,
    url,
    data: body,
  });

const GoogleLoginButton = () => {
  const router = useRouter();
  const { login } = useAuth();

  const onSuccess = (response) => {
    const access_token = response.accessToken;
    axiosApiCall("oauth/google", "post", { access_token }).then((res) => {
      const { accessToken, refreshToken, user } = res.data;
      login(user);
      Cookie.set("accessToken", accessToken);
      router.push("/");
    });
  };

  return (
    <GoogleLogin
      clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID}
      buttonText="Sign up with Google"
      onSuccess={onSuccess}
      onFailure={() => {}}
    />
  );
};

export default GoogleLoginButton;
