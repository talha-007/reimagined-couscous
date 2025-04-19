import { callAPi, callAPiMultiPart } from "./http-comman";

const getAllMarketPlace = () => callAPi.get("/api/v1/getAllMarketPlace");
const getAllBids = () => callAPi.get("/api/v1/getAllBids");
const createMarketPlace = (data) =>
  callAPi.post("/api/v1/createMarketPlace", data);

const createBid = (id, data) => callAPi.post(`/api/v1/createBid/${id}`, data);

const marketPlaceServices = {
  getAllMarketPlace,
  getAllBids,
  createMarketPlace,
  createBid,
};

export default marketPlaceServices;
