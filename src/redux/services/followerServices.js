import { callAPi } from "./http-comman";

const followUser = (data) => callAPi.patch("/api/v1/followUser", data);
const getFollowers = (data) => callAPi.patch("/api/v1/getFollowers", data);
const getFollowing = (data) => callAPi.patch("/api/v1/getFollowing", data);

const followerServices = {
  followUser,
  getFollowers,
  getFollowing,
};

export default followerServices;
