import CustomButton from "../../button";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const CancelScreen = () => {
  const navigate = useNavigate();
  return (
    <div className="max-w-5xl w-full mx-auto mt-16 font-[Montserrat] flex items-center justify-center">
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
            <span
              className="text-[80px] text-[#B48B34] font-bold"
              style={{ lineHeight: 1 }}
            >
              ×
            </span>
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
            Payment Cancelled
          </h1>
          <p className="text-[16px] lg:text-[16px] text-white font-light">
            Your payment was not completed.
            <br />
            No changes have been made.
          </p>
        </div>
        <div className="flex gap-4 max-w-5xl w-full justify-center mx-auto my-8 ">
          <CustomButton
            py="py-4"
            hidden="block"
            name={"Back to Pixel Grid"}
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

export default CancelScreen;
