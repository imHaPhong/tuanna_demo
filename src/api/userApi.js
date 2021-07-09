import clientApi from "./ClientApi";

const userApi = {
  login: (params) => {
    return clientApi.post("/login", params);
  },
};

export default userApi;
