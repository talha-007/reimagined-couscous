import { useState } from "react";
import CustomButton from "../../button";
import { motion } from "framer-motion";
import { IMAGE_BASEURL } from "../../../redux/services/http-comman";

const BuyNow = ({ marketData }) => {
  const [hoveredId, setHoveredId] = useState(null);
  // console.log("buy now", marketData);

  const filteredData = marketData?.data?.filter(
    (item) => item?.isBid === false
  );

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 my-4 mx-auto min-h-[352px]">
      {filteredData?.length > 0 ? (
        filteredData.map((item) => (
          <motion.div
            key={item?._id}
            className="max-w-[none] md:max-w-[235px] max-h-[352px] h-[352px] border-[1px] border-transparent overflow-hidden relative hover:border-[#DDA74D]"
            onHoverStart={() => setHoveredId(item?._id)}
            onHoverEnd={() => setHoveredId(null)}
          >
            {hoveredId === item?._id && (
              <div className="absolute right-2 top-2">
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
              className="w-full md:w-[235px]"
              style={{
                backgroundImage: `url(${
                  IMAGE_BASEURL + (item?.userId?.pixelImage).replace(/\\/g, "/")
                })`,
                backgroundRepeat: "no-repeat",
                backgroundSize: "cover",
                height: "235px",
              }}
            ></div>

            {/* Details Section (Will Slide Up on Hover) */}
            <motion.div
              className="absolute bottom-0 left-0 w-full bg-black"
              initial={{ y: 56 }}
              animate={{ y: hoveredId === item?._id ? 0 : 56 }}
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
                      {item?.userId?.firstName
                        ? item?.userId?.firstName
                        : "N/A"}{" "}
                      {item?.userId?.lastName ? item?.userId?.lastName : "N/A"}
                    </p>
                    <p className="text-[#FEDB6B] font-semibold text-[16px]">
                      {item?.followers ? item?.followers : "N/A"}
                    </p>
                  </div>
                  <div className="flex items-center justify-between">
                    <p className="text-[#feea9a9c] font-light text-[12px]">
                      {item?.userId?.username}
                    </p>
                    <p className="text-[#feea9a9c] font-light text-[12px]">
                      Followers
                    </p>
                  </div>
                  {hoveredId === item?._id && (
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
                      Price
                    </p>
                    <p className="text-[#FEDB6B] font-semibold text-[16px]">
                      ${item?.price ? item?.price?.toLocaleString() : 0}
                    </p>
                  </div>
                  <div className="mt-3">
                    <CustomButton
                      bgGradient="linear-gradient(to right, #B48B34 0%, #E8C776 50%, #A67921 100%)"
                      strokeGradient="linear-gradient(to right, #7A5018cc 0%, #FEEA9Acc 100%)"
                      py="py-2"
                      width="w-full"
                      name="Buy Now"
                    />
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        ))
      ) : (
        <div className="col-span-full text-center text-[#FEDB6B] font-semibold text-[18px] flex items-center justify-center h-full">
          <p>No data available to display.</p>
        </div>
      )}
    </div>
  );
};

export default BuyNow;
