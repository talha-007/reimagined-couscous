import { callAPi } from "./http-comman";

const userProfile = (data) => callAPi.get("/api/v1/login", data);
const getUserProfile = () => callAPi.get("/api/v1/getProfile");
const editProfile = (data) => {
  console.log("Signup Data:", data); // Check if data is coming
  return callAPi.post(`/api/v1/register`, data);
};

const profileServices = {
  userProfile,
  editProfile,
  getUserProfile,
};

export default profileServices;
