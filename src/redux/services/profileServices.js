import { callAPi, callAPiMultiPart } from "./http-comman";

const userProfile = (data) => callAPi.get("/api/v1/login", data);
const deleteUser = () => callAPi.patch("/api/v1/deleteUser");
const uploadPromo = (data) =>
  callAPiMultiPart.patch("/api/v1/uploadPromo", data);
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
  deleteUser,
  uploadPromo,
};

export default profileServices;
