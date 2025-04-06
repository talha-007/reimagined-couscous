import { callAPi, callAPiMultiPart } from "./http-comman";

const userProfile = (data) => callAPi.get("/api/v1/login", data);
const uploadCover = (data) =>
  callAPiMultiPart.patch("/api/v1/uploadCover", data);
const getUserProfile = () => callAPi.get("/api/v1/getProfile");
const editProfile = (data) => {
  // console.log("Signup Data:", data); // Check if data is coming
  return callAPi.post(`/api/v1/register`, data);
};

const profileServices = {
  userProfile,
  editProfile,
  getUserProfile,
  uploadCover,
};

export default profileServices;
