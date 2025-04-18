import coinsPurchased from "../../../assets/icons/coinspurchased.svg";
import CustomButton from "../../button";

const FinishScreen = ({ handleSubmit }) => {
  return (
    <div className="max-w-5xl w-full mx-auto mt-16  font-[Montserrat] flex items-center justify-center">
      <div className="text-center flex items-center flex-col justify-center">
        <div
          style={{
            background: "linear-gradient(150deg, #fef6c026 40%,#e8c77682)",
            width: "220px",
            height: "220px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
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
            }}
          >
            <img src={coinsPurchased} alt="" />
          </div>
        </div>
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
            Purchase successfull
          </h1>
          <p className="text-[16px] lg:text-[16px] text-white font-light">
            Your payment has been successfully done <br /> enjoy your pixels!{" "}
          </p>
        </div>
        <div className="flex gap-4 max-w-5xl w-full justify-center mx-auto my-8 ">
          <CustomButton
            py="py-4"
            hidden="block"
            name={"Finish"}
            onClick={handleSubmit}
            width="w-[200px] md:w-[400px]"
            bgGradient="linear-gradient(to right, #B48B34 0%, #E8C776 50%, #A67921 100%)"
            strokeGradient="linear-gradient(to right, #7A5018cc 0%, #FEEA9Acc 100%)"
          />
        </div>
      </div>
    </div>
  );
};

export default FinishScreen;
