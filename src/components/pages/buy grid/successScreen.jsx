import coinsPurchased from "../../../assets/icons/coinspurchased.svg";
import CustomButton from "../../button";
import { useNavigate, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { useSelector } from "react-redux";
import influencerProfileServices from "../../../redux/services/influencerProfileServices";
import { useEffect } from "react";
import { toast } from "react-toastify";

const SuccessScreen = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const user = useSelector((state) => state.auth.user);
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const credits = Number(params.get("credits"));
    const email = user?.email;
    if (credits && credits > 0 && email) {
      influencerProfileServices
        .addCoins({ coins: credits, email })
        .then((res) => {
          if (res?.status === 200) {
            toast.success("Credits added successfully!");
          } else {
            toast.error("Failed to add credits.");
          }
        })
        .catch(() => {
          toast.error("Failed to add credits.");
        });
    }
  }, [location.search, user]);
  return (
    <div className="max-w-5xl w-full mx-auto mt-16  font-[Montserrat] flex items-center justify-center">
      <div className="text-center flex items-center flex-col justify-center">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          style={{
            background: "linear-gradient(150deg, #fef6c026 40%,#e8c77682)",
            width: "220px",
            height: "220px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            borderRadius: "50%",
          }}
        >
          <div
            style={{
              background: "linear-gradient(150deg, #fef6c026 100%,#e8c77682)",
              width: "170px",
              height: "170px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              borderRadius: "50%",
            }}
          >
            <img src={coinsPurchased} alt="success" />
          </div>
        </motion.div>
        <div className="mt-4">
          <h1
            className="text-[16px] font-bold lg:text-[20px] leading-[1.2] lg:leading-[20px] uppercase"
            style={{
              backgroundImage:
                "linear-gradient(to right, #B48B34 0%, #E8C776 50%, #A67921 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            Payment Successful
          </h1>
          <p className="text-[16px] lg:text-[16px] text-white font-light">
            Your payment has been successfully completed.
            <br />
            Enjoy your pixels!
          </p>
        </div>
        <div className="flex gap-4 max-w-5xl w-full justify-center mx-auto my-8 ">
          <CustomButton
            py="py-4"
            hidden="block"
            name={"Go to Pixel Grid"}
            onClick={() => navigate("/pixel-grid")}
            width="w-[200px] md:w-[400px]"
            bgGradient="linear-gradient(to right, #B48B34 0%, #E8C776 50%, #A67921 100%)"
            strokeGradient="linear-gradient(to right, #7A5018cc 0%, #FEEA9Acc 100%)"
          />
        </div>
      </div>
    </div>
  );
};

export default SuccessScreen;
