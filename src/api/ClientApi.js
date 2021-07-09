import axios from "axios";
import queryString from "query-string";

const clientApi = axios.create({
  baseURL: "https://tuanna-demo.herokuapp.com/api",
  paramsSerializer: (params) => queryString.stringify(params),
});

clientApi.interceptors.request.use((config) => {
  config.headers.Authorization =
    "bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MGUwMjEyOGNmM2MxNjNjZmNiYjBlYzAiLCJpYXQiOjE2MjUzMDEzMDZ9.fWFdH-4vYJNBXal0wU_0ffqfwRoTOOLzKBcFc2kqhC0";
  return config;
});

clientApi.interceptors.response.use((data) => data.data);

export default clientApi;
