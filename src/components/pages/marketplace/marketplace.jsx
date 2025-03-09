import { Button } from "@material-tailwind/react";
import Layout from "../../layout/layout";
import { useState } from "react";
import BuyNow from "./buyNow";
import Auctions from "./auctions";
import Bids from "./bids";

const Marketplace = () => {
  const [activeTab, setActiveTab] = useState("Buy Now");
  return (
    <Layout>
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
        {activeTab === "Buy Now" && <BuyNow />}
        {activeTab === "Auction" && <Auctions />}
        {activeTab === "Bids" && <Bids />}
      </div>
    </Layout>
  );
};

export default Marketplace;
