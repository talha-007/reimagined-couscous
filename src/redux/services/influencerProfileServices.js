import { callAPi, callAPiMultiPart } from "./http-comman";

const createInfluencerProfile = (data) =>
  callAPiMultiPart.post("/api/v1/createInfluencerProfile", data);
const uploadPromo = () => callAPi.patch("/api/v1/uploadPromo");
const deleteUser = (data) => {
  return callAPi.patch(`/api/v1/deleteUser`, data);
};

const getInfluencer = callAPi.get("/api/v1/getInfluencer");

const uploadPixelImage = () =>
  callAPiMultiPart.patch("/api/v1/uploadPixelImage");

const influencerProfileServices = {
  deleteUser,
  uploadPromo,
  createInfluencerProfile,
  uploadPixelImage,
  getInfluencer,
};

export default influencerProfileServices;
