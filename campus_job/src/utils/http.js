import axios from "axios";
import router from "../router";
import store from "../store";

let http = axios.create({
  headers: {},
  //  baseURL:"http://localhost:3000/"
  baseURL: "/api"
});

http.interceptors.request.use(
  config => {
    const token = sessionStorage.getItem("token");

    if (token) {
      config.headers.token = token;
    }

    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

// http.interceptors.response.use(
//   response => {
//     const token = sessionStorage.getItem("token");
//       if (!token) {

//         console.log('没有token,调回登录');
//         router.replace({
//             path: "/login",
//             query: {}
//           });
//       }
    
//     return response;
//   },
//   error => {
//     return Promise.reject(error.response.status);
//   }
// );

export default http;
