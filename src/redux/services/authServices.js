import { callAPi } from "./http-comman";

const login = (data) => callAPi.post("/api/v1/login", data);
const signup = (data) => {
  console.log("Signup Data:", data); // Check if data is coming
  return callAPi.post(`/api/v1/register`, data);
};

const googleLogin = (data) => callAPi.post(`/api/v1/googleLogin`, data);

const authService = {
  login,
  signup,
  googleLogin,
};

export default authService;
