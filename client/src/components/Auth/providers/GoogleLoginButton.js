import Cookie from "js-cookie";
import { GoogleLogin } from "react-google-login";
import api from "../../../services/api";
import { useAuth } from "../../../shared/context/auth";

const axiosApiCall = (url, method, body = {}) =>
  api({
    method,
    url,
    data: body,
  });

const GoogleLoginButton = (props) => {
  const { login } = useAuth();

  const onSuccessFunc = props.onSuccessFunc;

  const onSuccess = (response) => {
    const access_token = response.accessToken;
    axiosApiCall("oauth/google", "post", { access_token }).then((res) => {
      const { accessToken, refreshToken, user } = res.data;
      login(user);
      Cookie.set("accessToken", accessToken);
      onSuccessFunc();
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
