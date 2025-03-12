import { callAPi } from "./http-comman";

const login = (data) => callAPi.post("/api/v1/login", data);
const signup = (id, data) => callAPi.post(`/api/v1/register`, data);
const googleLogin = (id, data) => callAPi.post(`/api/v1/googleLogin`, data);

const authService = {
  login,
  signup,
  googleLogin,
};

export default authService;
