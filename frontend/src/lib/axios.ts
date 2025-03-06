import Axios from "axios";

const axios = Axios.create({});

const serverUrl = import.meta.env.VITE_API_URL;
export const baseURL = `${serverUrl}`;

axios.defaults.timeout = 120000; // Milliseconds
axios.interceptors.request.use(
  async function (config) {
    // Retreive token from Redux OR localStorage or ....
    const token = localStorage.getItem("jwt-token");

    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
      config.headers["Access-Control-Allow-Credentials"] = true;
    }
    config.headers["Content-Type"] = "application/json";
    // config.credentials = "same-origin";
    config.baseURL = baseURL;

    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

export default axios;
