import axios from "axios";

axios.interceptors.request.use(
  (config) => {
    config.baseURL = "http://localhost:5000/Api/";
    config.headers.authorization = `Bearer ${localStorage.getItem("token")}`;
    //console.log(config);
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axios.interceptors.response.use(null, (error) => {
  //No autorizado, el token expiró
  if (error.response.status === 401) {
    localStorage.clear();
    window.location.href = "/";
  }
  return Promise.reject(error);
});

export default axios;
