import { callAPi } from "./http-comman";

const createInfluencerProfile = (data) =>
  callAPi.post("/api/v1/createInfluencerProfile", data);
const uploadPromo = () => callAPi.patch("/api/v1/uploadPromo");
const deleteUser = (data) => {
  return callAPi.patch(`/api/v1/deleteUser`, data);
};

const influencerProfileServices = {
  deleteUser,
  uploadPromo,
  createInfluencerProfile,
};

export default influencerProfileServices;
