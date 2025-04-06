import { useEffect, useState } from "react";
import CustomButton from "../../button";
import { motion } from "framer-motion";
import { buyNow } from "./data";
import hourglass from "../../../assets/icons/HourglassMedium.svg";
import BidDrawer from "./bidDrawer";
import { IMAGE_BASEURL } from "../../../redux/services/http-comman";

const Auctions = ({ marketData }) => {
  const [hoveredId, setHoveredId] = useState(null);
  const [openBidDrawer, setOpenBidDrawer] = useState(false);
  const [itemData, setItemData] = useState(null);
  const [timeLeft, setTimeLeft] = useState({
    days: 5,
    hours: 24,
    minutes: 18,
  });
  console.log("marketData", marketData);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        let { days, hours, minutes } = prev;

        if (minutes > 0) {
          minutes -= 1;
        } else {
          if (hours > 0) {
            hours -= 1;
            minutes = 59;
          } else if (days > 0) {
            days -= 1;
            hours = 23;
            minutes = 59;
          } else {
            clearInterval(timer);
          }
        }

        return { days, hours, minutes };
      });
    }, 60000); // Updates every minute
    return () => clearInterval(timer);
  }, []);
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 my-4">
      {marketData?.data
        ?.filter((item) => item.isBid === false)
        ?.map((item) => (
          <motion.div
            key={item?.id}
            className="max-w-none md:max-w-[235px] max-h-[352px] h-[352px] border-[1px] border-transparent overflow-hidden relative hover:border-[#DDA74D]"
            onHoverStart={() => setHoveredId(item.id)}
            onHoverEnd={() => setHoveredId(null)}
          >
            {hoveredId === item.id && (
              <div className="absolute z-30 right-2 top-2">
                <CustomButton
                  bgGradient="linear-gradient(to right, #D9D9D9 0%, #ffffff 50%, #D9D9D9 100%)"
                  strokeGradient="linear-gradient(to right, #FFFFFF 0%, #B7B7B7 100%)"
                  py="py-1"
                  px="px-2"
                  text="text-[12px]"
                  name="View Profile"
                />
              </div>
            )}
            {/* Profile Image */}
            <div
              style={{
                backgroundImage: `url(${
                  IMAGE_BASEURL +
                  (item?.userId?.pixelImage || "").replace(/\\/g, "/")
                })`,
                backgroundRepeat: "no-repeat",
                backgroundSize: "cover",
                width: "100%",
                height: "235px",
                position: "relative",
              }}
            >
              <div
                className="absolute bottom-4 right-2 left-2 z-10 text-[#FEDB6B] uppercase py-3 px-2"
                style={{
                  background:
                    "linear-gradient(-60deg, rgb(53, 53, 53) 50%, rgb(118, 110, 83) 100%)",
                }}
              >
                <div className="flex items-center justify-between">
                  <img src={hourglass} alt="Hourglass" className="w-6 h-6" />
                  <p className="font-[Movie Poster] text-[12px]">
                    {timeLeft.days} <span className="text-[#FEF6C0]">Days</span>
                  </p>
                  <p className="font-[Movie Poster] text-[12px]">
                    {timeLeft.hours}{" "}
                    <span className="text-[#FEF6C0]">Hours</span>
                  </p>
                  <p className="font-[Movie Poster] text-[12px]">
                    {timeLeft.minutes}{" "}
                    <span className="text-[#FEF6C0]">Min</span>
                  </p>
                </div>
              </div>
            </div>

            {/* Details Section (Will Slide Up on Hover) */}
            <motion.div
              className="absolute bottom-0 left-0 w-full bg-black z-20"
              initial={{ y: 56 }}
              animate={{ y: hoveredId === item.id ? 0 : 56 }}
              transition={{ stiffness: 150 }}
            >
              <div
                className="p-4"
                style={{
                  background: "linear-gradient(0deg, #fef6c026,#e8c77685)",
                }}
              >
                <div className="flex flex-col gap-2">
                  <div className="flex items-center justify-between">
                    <p className="text-[#FEDB6B] font-semibold text-[16px]">
                      {item?.userId?.firstName}
                      {item?.userId?.lastName}
                    </p>
                    <p className="text-[#FEDB6B] font-semibold text-[16px]">
                      {item.followers}
                    </p>
                  </div>
                  <div className="flex items-center justify-between">
                    <p className="text-[#feea9a9c] font-light text-[12px]">
                      @{item?.userId?.userName}
                    </p>
                    <p className="text-[#feea9a9c] font-light text-[12px]">
                      Followers
                    </p>
                  </div>
                  {hoveredId === item.id && (
                    <div className="flex items-center justify-between">
                      <a
                        href="#"
                        className="text-[#feea9a9c] font-light text-[12px] underline"
                      >
                        View Grid
                      </a>
                      <p className="text-[#FEDB6B] font-semibold text-[16px]">
                        {item.gridSize}
                      </p>
                    </div>
                  )}
                  <div className="flex items-center justify-between">
                    <p className="text-[#feea9a9c] font-light text-[12px]">
                      Reserve Price
                    </p>
                    <p className="text-[#FEDB6B] font-semibold text-[16px]">
                      {item.price}
                    </p>
                  </div>
                  <div className="mt-4">
                    <CustomButton
                      bgGradient="linear-gradient(to right, #B48B34 0%, #E8C776 50%, #A67921 100%)"
                      strokeGradient="linear-gradient(to right, #7A5018cc 0%, #FEEA9Acc 100%)"
                      py="py-2"
                      onClick={() => {
                        setOpenBidDrawer(!openBidDrawer);
                        setItemData(item);
                      }}
                      width="w-full"
                      name="Place bid"
                    />
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        ))}
      <BidDrawer
        open={openBidDrawer}
        closeDrawer={() => setOpenBidDrawer(false)}
        itemData={itemData}
      />
    </div>
  );
};

export default Auctions;
