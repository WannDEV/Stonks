import axios from "axios";
import Cookie from "js-cookie";
import logout from "../shared/helper/logout-method";

async function refreshToken() {
  await api({
    method: "PUT",
    url: "oauth/google/refreshtoken",
  }).then((response) => {
    Cookie.set("accessToken", response.data.accessToken);
  });
}

let urls = {
  test: `http://localhost:2000/`,
  development: "http://localhost:2000/",
  // production: "https://wanntech.dk/api/",
  production: "http://localhost:2000/",
};
const api = axios.create({
  baseURL: urls[process.env.NODE_ENV],
  withCredentials: true,
});

api.interceptors.response.use(
  function (response) {
    const { status, data, config } = response;
    console.log(`Response from ${config.url}:`, {
      code: status,
      ...data,
    });
    return response;
  },
  async function (error) {
    if (error.response) {
      const { statusCode, payload } = error.response.data.output;
      console.log(
        `Error from API: ${statusCode}, ${JSON.stringify(
          error.response.data.output.payload.message
        )}`
      );
      switch (statusCode) {
        case 401:
          if (payload.message === "Access token expired") {
            try {
              await refreshToken();
              const config = error.config;

              return await api({
                method: config.method,
                url: config.url,
                data: config.data,
                withCredentials: true,
              });
            } catch (err) {
              return (window.location.href = "/error-page");
            }
          } else if (
            payload.message === "Refresh token expired" ||
            payload.message === "Access and refresh token expired"
          ) {
            logout();
            return (window.location.href = "/");
          } else {
            return (window.location.href = "/error-page");
          }
        case 400:
          if (payload.message == "User doesn't have enough stocks to sell") {
            break;
          } else {
            // return (window.location.href = "/error-page");
            return payload;
          }
        default:
          return Promise.reject(error);
      }
    } else if (error.request) {
      return Promise.reject(error);
    } else {
      return Promise.reject(error);
    }
  }
);

export default api;
