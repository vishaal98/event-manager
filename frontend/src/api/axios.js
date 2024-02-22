import Axios from "axios";

function authRequestInterceptor(config) {
  const token = JSON.parse(localStorage.getItem("token"));

  config.headers.authorization = "Bearer " + token;
  config.headers.Accept = "application/json";
  return config;
}

const axios = Axios.create({
  baseURL: "http://127.0.0.1:8080/",
});

axios.interceptors.request.use(authRequestInterceptor);

export default axios;
