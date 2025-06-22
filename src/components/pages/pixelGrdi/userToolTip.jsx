import { useNavigate } from "react-router-dom";
import { useState, useEffect, forwardRef } from "react";
import fbIcon from "../../../assets/icons/fb.svg";
import instaIcon from "../../../assets/icons/insta.svg";
import tiktokIcon from "../../../assets/icons/tiktok.svg";
import CustomButton from "../../button";
import { motion } from "framer-motion";
import { IMAGE_BASEURL } from "../../../redux/services/http-comman";
import followerServices from "../../../redux/services/followerServices";
import { useDispatch, useSelector } from "react-redux";
import { getUserProfile } from "../../../redux/slice/userSlice";
import PropTypes from "prop-types";

const UserToolTip = forwardRef(({ tooltipPos, hoveredUser }, ref) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false); // State to track loading
  const [isFollowing, setIsFollowing] = useState(false); // State to track follow status

  const loggedInUserId = useSelector((s) => s?.user?.data?.data);
  useEffect(() => {
    fetchProfileData();
  }, []);
  const fetchProfileData = async () => {
    try {
      await dispatch(getUserProfile());
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    // Check if the logged-in user is in the followers array
    if (hoveredUser?.followers?.includes(loggedInUserId?._id)) {
      setIsFollowing(true);
    } else {
      setIsFollowing(false);
    }
  }, [hoveredUser, loggedInUserId]);

  const handleFollow = async () => {
    setLoading(true); // Start loader
    try {
      const datas = {
        followeeId: hoveredUser?._id,
      };
      await followerServices.followUser(datas);
      // Toggle follow status after successful API call
      setIsFollowing((prev) => !prev);
    } catch (error) {
      console.error("Error following/unfollowing user:", error);
    } finally {
      setLoading(false); // Stop loader
    }
  };

  UserToolTip.displayName = "UserToolTip";

  UserToolTip.propTypes = {
    tooltipPos: PropTypes.shape({
      x: PropTypes.number.isRequired,
      y: PropTypes.number.isRequired,
    }).isRequired,
    hoveredUser: PropTypes.shape({
      _id: PropTypes.string,
      profilePicture: PropTypes.string,
      firstName: PropTypes.string,
      lastName: PropTypes.string,
      facebook: PropTypes.string,
      instagram: PropTypes.string,
      twitter: PropTypes.string,
      bio: PropTypes.string,
      followers: PropTypes.arrayOf(PropTypes.string),
    }).isRequired,
  };

  return (
    <motion.div
      ref={ref}
      className="absolute text-black text-sm px-3 py-2 shadow-lg font-[Montserrat] "
      style={{
        top: tooltipPos.y + 10,
        left: tooltipPos.x + 10,
        background: "#000000a6",
        backdropFilter: "blur(39px)",
        border: "1px solid",
        borderImage: "linear-gradient(to right, #FFF8C5, #8C5E1C) 1",
        padding: "1rem",
        width: "320px",
        height: "fit-content",
      }}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0 }}
    >
      <div
        style={{
          position: "absolute",
          top: "4px",
          left: "0px",
          width: "0",
          height: "0",
          borderLeft: "10px solid transparent",
          borderRight: "10px solid transparent",
          borderBottom: "10px solid #FEDB6B", // Adjust color
          transform: "rotate(-45deg)",
        }}
      ></div>
      <div className="flex flex-col gap-2">
        <div className="flex items-center  gap-3">
          <div
            style={{
              width: "84px",
              height: "84px",
            }}
          >
            <img
              src={
                hoveredUser?.profilePicture &&
                IMAGE_BASEURL + hoveredUser?.profilePicture
              }
              alt="User"
              className="h-full "
            />
          </div>
          <div className="flex flex-col items-center ">
            <p className="font-semibold text-[16px] text-[#FEDB6B]">
              {hoveredUser?.firstName || ""} {hoveredUser?.lastName || ""}
            </p>
            <div>
              <ul className="text-[#FEDB6B] font-light text-[10px] gap-1">
                <li
                  className="flex items-center gap-1 "
                  style={{ padding: "3px 0" }}
                >
                  <div
                    style={{
                      width: "14px",
                      height: "14px",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <img src={fbIcon} alt="icon" />
                  </div>
                  <a href="">{hoveredUser?.facebook}</a>
                </li>

                {/* Middle item with top and bottom border fading on left and right */}
                <li
                  className="flex items-center gap-1 relative"
                  style={{
                    position: "relative",
                    padding: "3px 0",
                  }}
                >
                  {/* Gradient border effect for top */}
                  <div
                    style={{
                      content: '""',
                      position: "absolute",
                      top: 0,
                      left: 0,
                      width: "100%",
                      height: "1px",
                      background:
                        "linear-gradient(to right, rgba(242, 234, 183, 0) 0%, rgba(127, 120, 118, 0.43) 50%, rgba(254, 246, 192, 0) 100%)",
                    }}
                  />

                  {/* Icon and Text */}
                  <div
                    style={{
                      width: "14px",
                      height: "14px",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <img src={instaIcon} alt="icon" />
                  </div>
                  <a href="">{hoveredUser?.instagram}</a>

                  {/* Gradient border effect for bottom */}
                  <div
                    style={{
                      content: '""',
                      position: "absolute",
                      bottom: 0,
                      left: 0,
                      width: "100%",
                      height: "1px",
                      background:
                        "linear-gradient(to right, rgba(242, 234, 183, 0) 0%, rgba(127, 120, 118, 0.43) 50%, rgba(254, 246, 192, 0) 100%)",
                    }}
                  />
                </li>

                <li
                  className="flex items-center gap-1"
                  style={{ padding: "3px 0" }}
                >
                  <div
                    style={{
                      width: "14px",
                      height: "14px",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <img src={tiktokIcon} alt="icon" />
                  </div>
                  <a href="">{hoveredUser?.twitter}</a>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div>
          <p className="text-[13px] text-[#DDA74D] font-semibold ">Bio</p>
          <p className="text-[10px] text-[#DDA74D] font-light ">
            {hoveredUser?.bio}
          </p>
        </div>
        <div className="flex items-center justify-center gap-2">
          <CustomButton
            py="py-2"
            hidden="block"
            name={
              loading
                ? isFollowing
                  ? "Unfollowing..."
                  : "Following..."
                : isFollowing
                ? "Unfollow"
                : "Follow"
            } // Show appropriate text
            onClick={handleFollow}
            disabled={loading} // Disable button while loading
            bgGradient="linear-gradient(to right, #D9D9D9 0%, #ffffff 50%, #D9D9D9 100%)"
            strokeGradient="linear-gradient(to right, #FFFFFF 0%, #B7B7B7 100%)"
          />
          <CustomButton
            py="py-2"
            bgGradient="linear-gradient(to right, #B48B34 0%, #E8C776 50%, #A67921 100%)"
            strokeGradient="linear-gradient(to right, #7A5018cc 0%, #FEEA9Acc 100%)"
            hidden="hidden"
            onClick={() => navigate(`/influencer-profile/${hoveredUser?._id}`)}
            name="See Profile"
          />
        </div>
      </div>
    </motion.div>
  );
});

export default UserToolTip;
