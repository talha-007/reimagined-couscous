import {
  Dialog,
  DialogHeader,
  DialogBody,
  ThemeProvider,
  IconButton,
  Radio,
} from "@material-tailwind/react";
import closeBtn from "../../../assets/icons/close btn.svg";
import cardIcon from "../../../assets/icons/card.svg";
import visa from "../../../assets/icons/visa.svg";
import { useState } from "react";
import { useCountries } from "use-react-countries";
import CustomButton from "../../button";
import bitcoin from "../../../assets/icons/bitcoin.png";
import bnb from "../../../assets/icons/bnb.png";
import eth from "../../../assets/icons/eth.png";
import usdt from "../../../assets/icons/usdt.png";

const cryptoTokens = [
  {
    name: "Bitcoin",
    symbol: "BTC",
    icon: bitcoin,
  },
  {
    name: "Ethereum",
    symbol: "ETH",
    icon: eth,
  },
  {
    name: "Binance Coin",
    symbol: "BNB",
    icon: bnb,
  },
  {
    name: "Tether",
    symbol: "USDT",
    icon: usdt,
  },
];
const customTheme = {
  dialog: {
    styles: {
      base: {
        backdrop: {
          backgroundColor: "#00000024",
        },
      },
    },
  },
  radio: {
    valid: {
      colors: ["yellow"],
    },
    styles: {
      colors: {
        yellow: {
          color: "#FEDB6B",
          border: "checked:border-[#FEDB6B]",
          before: "checked:before:bg-[#FEDB6B]",
        },
      },
    },
  },
};

const PayModel = ({ open, handleClose, handleShowSuccessPop }) => {
  const [selected, setSelected] = useState("card");
  const [selectedCountry, setSelectedCountry] = useState("");
  const { countries } = useCountries();
  const [amount, setAmount] = useState("");
  const [selectedToken, setSelectedToken] = useState("");

  return (
    <ThemeProvider value={customTheme}>
      <Dialog
        open={open}
        handler={handleClose}
        size="xl"
        style={{
          background: "#000",
          border: "1px solid #feea9a14",
          borderRadius: "0px",
        }}
      >
        <DialogHeader>
          <div className="flex justify-between items-start w-full">
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
                Pixel Information
              </h1>
              <p className="text-[16px] lg:text-[16px] text-[#FFF8C5] font-light">
                Add the necessary pixel information
              </p>
            </div>
            <IconButton onClick={handleClose}>
              <img src={closeBtn} alt="close-btn" />
            </IconButton>
          </div>
        </DialogHeader>
        <DialogBody>
          <div className="grid grid-cols-2 gap-8">
            <div>
              <div
                className="bg-[#35353540]  py-[10px] px-[10px]"
                style={{ border: "1px solid #feea9a14" }}
              >
                <p className="text-[#FFE395] font-[Inter] text-[16px]">
                  {" "}
                  Add Credits
                </p>
                <input
                  className="px-4 py-3 border bg-[#000000] border-[#766E53] text-white placeholder:text-[#aaa] focus:ring-2 focus:ring-[#7d6a2b] outline-none uppercase w-full"
                  required
                />
              </div>
            </div>

            <div>
              <div
                className="relative border border-transparent "
                style={{
                  borderImage:
                    "linear-gradient(to right, #feea9a8c, #7a501836) 1",
                  padding: "1rem",
                }}
              >
                <div
                  className="flex items-center justify-between text-white mb-6"
                  style={{ border: "1px solid #766E53" }}
                >
                  {/* Pay with Card */}
                  <div
                    style={{
                      borderRight: "1px solid #766E53",
                      width: "50%",
                      textAlign: "center",
                    }}
                  >
                    <Radio
                      name="paymentMethod"
                      value="card"
                      checked={selected === "card"}
                      onChange={() => setSelected("card")}
                      color="yellow"
                      label={
                        <span
                          className={
                            selected === "card"
                              ? "text-[#FEDB6B]"
                              : "text-white"
                          }
                        >
                          Pay with Card
                        </span>
                      }
                    />
                  </div>

                  {/* Pay with Crypto */}
                  <div style={{ width: "50%", textAlign: "center" }}>
                    <Radio
                      name="paymentMethod"
                      value="crypto"
                      color="yellow"
                      checked={selected === "crypto"}
                      onChange={() => setSelected("crypto")}
                      label={
                        <span
                          className={
                            selected === "crypto"
                              ? "text-[#FEDB6B]"
                              : "text-white"
                          }
                        >
                          Pay with Crypto
                        </span>
                      }
                    />
                  </div>
                </div>

                {selected === "card" && (
                  <>
                    <div className="mb-4">
                      <div>
                        <p className="text-white font-[Inter] uppercase text-[14px] font-light">
                          Card Information{" "}
                          <span className="text-[#FFE395]">*</span>{" "}
                        </p>
                      </div>
                      <div style={{ border: "1px solid #766E53" }}>
                        <div className="flex items-center px-4 border border-[#766E53]">
                          {/* Left Side: Card Icon and Placeholder Text */}
                          <div className="flex items-center gap-2 w-full">
                            <img
                              src={cardIcon}
                              alt="Card Icon"
                              className="w-6 h-6"
                            />
                            <input
                              type="text"
                              placeholder="Card Number (EG **** **** 1234 1234)"
                              className="px-4 py-3  bg-[#000000]  text-white placeholder:text-[#aaa]  outline-none uppercase w-full"
                            />
                          </div>

                          {/* Right Side: Visa Icon */}
                          <img
                            src={visa}
                            alt="Visa Logo"
                            className="w-10 h-auto"
                          />
                        </div>

                        <div className="flex items-center w-full">
                          <div
                            style={{
                              borderRight: "1px solid #766E53",
                              borderTop: "1px solid #766E53",
                              width: "50%",
                            }}
                          >
                            <input
                              className="px-4 py-3  bg-[#000000]  text-white placeholder:text-[#aaa]  outline-none uppercase w-full"
                              required
                              placeholder="MM/YY"
                            />
                          </div>
                          <div
                            style={{
                              borderTop: "1px solid #766E53",
                              width: "50%",
                            }}
                          >
                            <input
                              className="px-4 py-3  bg-[#000000]  text-white placeholder:text-[#aaa]  outline-none uppercase w-full"
                              required
                              placeholder="CVV"
                            />
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="mb-4">
                      <p className="text-white font-[Inter] uppercase text-[14px] font-light">
                        Card Holder Name{" "}
                        <span className="text-[#FFE395]">*</span>{" "}
                      </p>
                      <div
                        style={{
                          border: "1px solid #766E53",
                          width: "100%",
                        }}
                      >
                        <input
                          className="px-4 py-3  bg-[#000000]  text-white placeholder:text-[#aaa]  outline-none uppercase w-full"
                          required
                          placeholder="Enter card holder name"
                        />
                      </div>
                    </div>

                    <div className="mb-6">
                      <p className="text-white font-[Inter] uppercase text-[14px] font-light">
                        Billing Address{" "}
                        <span className="text-[#FFE395]">*</span>
                      </p>
                      <div
                        style={{
                          border: "1px solid #766E53",
                          width: "100%",
                        }}
                      >
                        {/* Country Selection Dropdown */}
                        <select
                          className="px-4 py-3 bg-[#000000] text-white outline-none w-full uppercase"
                          required
                          value={selectedCountry}
                          onChange={(e) => setSelectedCountry(e.target.value)}
                        >
                          <option value="" disabled>
                            Select Country
                          </option>
                          {countries.map(({ name, flags }) => {
                            return (
                              <option
                                key={name}
                                value={name}
                                className="flex items-center gap-2"
                              >
                                <img
                                  src={flags.svg}
                                  alt={name}
                                  className="h-5 w-5 rounded-full object-cover"
                                />
                                {name}
                              </option>
                            );
                          })}
                        </select>

                        {/* Manual Address Input */}
                        <input
                          className="px-4 py-3 bg-[#000000] text-white placeholder:text-[#aaa] outline-none uppercase w-full"
                          required
                          placeholder="Address Manually"
                          style={{
                            borderTop: "1px solid #766E53",
                          }}
                        />
                      </div>
                    </div>
                  </>
                )}
                {selected === "crypto" && (
                  <>
                    <div className="mb-6">
                      <p className="text-white font-[Inter] uppercase text-[14px] font-light">
                        Select Token <span className="text-[#FFE395]">*</span>
                      </p>

                      <div
                        style={{
                          border: "1px solid #766E53",
                          width: "100%",
                        }}
                        className="mb-4"
                      >
                        <div className="flex items-center px-4  bg-[#000000]">
                          {/* Show Icon When Selected */}
                          {selectedToken && (
                            <img
                              src={
                                cryptoTokens.find(
                                  (t) => t.symbol === selectedToken
                                )?.icon
                              }
                              alt={selectedToken}
                              className="w-6 h-6"
                            />
                          )}
                          <select
                            className=" py-3 bg-[#000000] text-white outline-none w-full uppercase"
                            required
                            value={selectedToken}
                            onChange={(e) => setSelectedToken(e.target.value)}
                          >
                            <option value="" disabled>
                              Select Token
                            </option>

                            {cryptoTokens.map((token) => (
                              <option key={token.symbol} value={token.symbol}>
                                {token.name}
                              </option>
                            ))}
                          </select>
                        </div>

                        {/* Amount Input with Token Symbol on the Right */}
                        <div className="relative">
                          <input
                            className="px-4 py-3 bg-[#000000] text-white placeholder:text-[#aaa] outline-none uppercase w-full pr-14"
                            required
                            placeholder="Enter Amount"
                            value={amount}
                            onChange={(e) => setAmount(e.target.value)}
                            style={{
                              borderTop: "1px solid #766E53",
                            }}
                          />
                          {selectedToken && (
                            <span
                              className={`absolute right-4 top-1/2 transform -translate-y-1/2 text-[#50AF95] font-[Inter] uppercase`}
                            >
                              {selectedToken}
                            </span>
                          )}
                        </div>
                      </div>
                      <div
                        className="relative"
                        style={{
                          border: "1px solid #766E53",
                          width: "100%",
                        }}
                      >
                        <input
                          className="px-4 py-3 bg-[#000000] text-white placeholder:text-[#aaa] outline-none uppercase w-full pr-14"
                          required
                          placeholder="Enter Address"
                          value={amount}
                          onChange={(e) => setAmount(e.target.value)}
                          style={{
                            borderTop: "1px solid #766E53",
                          }}
                        />
                        {selectedToken && (
                          <span
                            className={`absolute right-4 top-1/2 transform -translate-y-1/2 text-[#50AF95] font-[Inter] uppercase`}
                          >
                            {selectedToken}
                          </span>
                        )}
                      </div>
                    </div>
                  </>
                )}
                <div className={`${selected === "crypto" ? "mt-20" : "mt-8"} `}>
                  <CustomButton
                    py="py-4"
                    hidden="block"
                    name="Next"
                    onClick={handleShowSuccessPop}
                    width="w-full"
                    bgGradient="linear-gradient(to right, #B48B34 0%, #E8C776 50%, #A67921 100%)"
                    strokeGradient="linear-gradient(to right, #7A5018cc 0%, #FEEA9Acc 100%)"
                  />
                </div>
              </div>
            </div>
          </div>
        </DialogBody>
      </Dialog>
    </ThemeProvider>
  );
};

export default PayModel;
