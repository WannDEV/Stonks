import FacebookLogin from "react-facebook-login";

const responseFacebook = (response) => {
  console.log(response);
};

const FacebookLoginButton = () => {
  return (
    <FacebookLogin
      appId={process.env.FACEBOOK_APP_ID}
      autoLoad={true}
      fields="name,email,picture"
      onClick={() => {}}
      callback={responseFacebook}
    />
  );
};

export default FacebookLoginButton;
