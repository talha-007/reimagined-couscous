import { Button } from "@material-tailwind/react";
import Layout from "../../layout/layout";
import { useEffect, useState } from "react";
import BuyNow from "./buyNow";
import Auctions from "./auctions";
import Bids from "./bids";
import marketPlaceServices from "../../../redux/services/marketplaceServices";
import { getBids, getMarketPlaces } from "../../../redux/slice/marketSlice";
import { useDispatch, useSelector } from "react-redux";

const Marketplace = () => {
  const dispatch = useDispatch();
  const [activeTab, setActiveTab] = useState("Buy Now");

  const marketData = useSelector((s) => s?.markets?.data);
  const bids = useSelector((s) => s?.markets);
  // console.log(marketData, bids);

  useEffect(() => {
    fetchMarketData();
    fetchBids();
  }, []);
  const fetchMarketData = async () => {
    try {
      await dispatch(getMarketPlaces());
    } catch (error) {
      console.log(error);
    }
  };
  const fetchBids = async () => {
    try {
      await dispatch(getBids());
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Layout>
      <div
        className="absolute bottom-[75%] left-[-30%] translate-x-1/2 w-[450px] h-[450px] rounded-full bg-[#B48B34] blur-[250px] opacity-50 -z-10"
        style={{
          boxShadow: "0 0 200px 100px rgba(180, 139, 52, 0.6)",
        }}
      ></div>
      <div
        className="absolute bottom-[30%] left-[-250px] translate-x-1/2 w-[450px] h-[450px] rounded-full bg-[#B48B34] blur-[350px] opacity-50 -z-10"
        style={{
          boxShadow: "0 0 200px 100px rgba(180, 139, 52, 0.6)",
        }}
      ></div>
      <div
        className="absolute bottom-[50%] right-0 translate-x-1/2 w-[450px] h-[450px] rounded-full bg-[#B48B34] blur-[250px] opacity-50 -z-10"
        style={{
          boxShadow: "0 0 200px 100px rgba(180, 139, 52, 0.6)",
        }}
      ></div>
      <div
        className="absolute bottom-[550px] right-0 translate-x-1/2 w-[450px] h-[450px] rounded-full bg-[#B48B34] blur-[250px] opacity-50 -z-10"
        style={{
          boxShadow: "0 0 200px 100px rgba(180, 139, 52, 0.6)",
        }}
      ></div>
      <div className="max-w-7xl w-full mx-auto relative px-4 mt-30">
        <div>
          <h1
            className="text-[16px] font-bold lg:text-[24px] leading-[1.2] lg:leading-[20px] uppercase"
            style={{
              backgroundImage:
                "linear-gradient(to right, #B48B34 0%, #E8C776 50%, #A67921 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            Welcome to the million dollar marketplace
          </h1>
          <p className="font-[Montserrat] text-[16px] font-light text-white mt-4">
            A place to buy and sell your valuable pixel and earn.
          </p>
        </div>

        <div className="border-b-[1px] border-[#353535] flex">
          {["Buy Now", "Auction", "Bids"].map((tab) => (
            <Button
              key={tab}
              className={`relative bg-transparent p-4 text-white`}
              onClick={() => setActiveTab(tab)}
            >
              {tab}
              {activeTab === tab && (
                <span className="absolute left-0 bottom-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[#FFE395] to-transparent"></span>
              )}
            </Button>
          ))}
        </div>
        {activeTab === "Buy Now" && <BuyNow marketData={marketData} />}
        {activeTab === "Auction" && <Auctions marketData={marketData} />}
        {activeTab === "Bids" && <Bids bids={bids} />}
      </div>
    </Layout>
  );
};

export default Marketplace;
