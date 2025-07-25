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
import { useState, useEffect } from "react";
import { useCountries } from "use-react-countries";
import CustomButton from "../../button";
import bitcoin from "../../../assets/icons/bitcoin.png";
import bnb from "../../../assets/icons/bnb.png";
import eth from "../../../assets/icons/eth.png";
import usdt from "../../../assets/icons/usdt.png";
import trx from "../../../assets/icons/tron-trx-logo.svg";
import ton from "../../../assets/icons/toncoin-ton-logo.svg";
import sol from "../../../assets/icons/solana-sol-logo.svg";
import influencerProfileServices from "../../../redux/services/influencerProfileServices";
import { useDispatch } from "react-redux";
import { getUserProfile } from "../../../redux/slice/userSlice";
import { toast } from "react-toastify";
import axios from "axios";
import { API_URL } from "../../../redux/services/http-comman";

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
    name: "Tron",
    symbol: "trx",
    icon: trx,
  },
  {
    name: "Solana",
    symbol: "sol",
    icon: sol,
  },
  {
    name: "Toncoin",
    symbol: "ton",
    icon: ton,
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

const initialCardDetails = {
  cardNumber: "",
  expiryDate: "",
  cvv: "",
  cardHolder: "",
  country: "",
  address: "",
};

const PayModel = ({ open, handleClose, handleShowSuccessPop, profileData }) => {
  const dispatch = useDispatch();
  const [selected, setSelected] = useState("card");
  const [selectedCountry, setSelectedCountry] = useState("");
  const [credit, setCredit] = useState(null);
  const { countries } = useCountries();
  const [amount, setAmount] = useState("");
  const [selectedToken, setSelectedToken] = useState("");
  const [cardDetails, setCardDetails] = useState(initialCardDetails);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [cryptoEstimate, setCryptoEstimate] = useState(null);
  const [isEstimating, setIsEstimating] = useState(false);
  const [walletAddress, setWalletAddress] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    let formattedValue = value;

    if (name === "cardNumber") {
      formattedValue = value.replace(/\D/g, "").slice(0, 16);
      formattedValue = formattedValue.replace(/(.{4})/g, "$1 ").trim();
    }

    if (name === "expiryDate") {
      formattedValue = value.replace(/\D/g, "").slice(0, 4);
      if (formattedValue.length >= 3) {
        formattedValue = `${formattedValue.slice(0, 2)}/${formattedValue.slice(
          2
        )}`;
      }
    }

    if (name === "cvv") {
      formattedValue = value.replace(/\D/g, "").slice(0, 4);
    }

    setCardDetails({ ...cardDetails, [name]: formattedValue });
  };

  const validateForm = () => {
    let newErrors = {};

    // Card Number Validation
    const cleanCardNumber = cardDetails.cardNumber.replace(/\s/g, "");
    if (!/^\d{16}$/.test(cleanCardNumber)) {
      newErrors.cardNumber = "Invalid card number. Must be 16 digits.";
    }

    // Expiry Date Validation
    if (!/^(0[1-9]|1[0-2])\/\d{2}$/.test(cardDetails.expiryDate)) {
      newErrors.expiryDate = "Invalid format (MM/YY)";
    } else {
      const [month, year] = cardDetails.expiryDate.split("/");
      const expiry = new Date(`20${year}`, month);
      const today = new Date();
      if (expiry <= today) {
        newErrors.expiryDate = "Card expired";
      }
    }

    // CVV Validation
    if (!/^\d{3,4}$/.test(cardDetails.cvv)) {
      newErrors.cvv = "Invalid CVV (3-4 digits)";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleBuyCredits = async () => {
    if (!validateForm()) {
      return;
    }

    if (!credit || credit <= 0) {
      toast.error("Please enter a valid credit amount");
      return;
    }

    setIsLoading(true);

    try {
      // Step 1: Initialize payment with backend
      const initResponse = await axios.post(`${API_URL}api/v1/initialize`, {
        email: profileData?.email,
        amount: Number(credit),
      });

      if (initResponse.data.status) {
        const { authorization_url, reference } = initResponse.data.data;

        // Open the authorization URL in a new window
        window.open(authorization_url, "_blank");

        // Set up a polling mechanism to check payment status
        let retryCount = 0;
        const maxRetries = 12; // Will try for 1 minute (12 * 5 seconds)

        const checkPaymentStatus = async () => {
          try {
            if (retryCount >= maxRetries) {
              toast.error(
                "Payment verification timeout. Please check your payment status manually."
              );
              setIsLoading(false);
              return;
            }

            const verifyResponse = await axios.get(
              `${API_URL}api/v1/verify/${reference}`
            );
            console.log("verifyResponse", verifyResponse);

            // Check the gateway response message
            if (
              verifyResponse.data.data?.gateway_response === "[Test] Approved"
            ) {
              // Add coins after successful payment verification
              const datas = {
                coins: Number(credit),
                email: profileData?.email,
              };

              const res = await influencerProfileServices.addCoins(datas);
              if (res?.status === 200) {
                toast.success("Credits added successfully!");
                handleShowSuccessPop();
                dispatch(getUserProfile());
                setCardDetails(initialCardDetails);
                setCredit(null);
                setIsLoading(false);
                return; // Stop polling after success
              } else {
                throw new Error("Failed to add coins.");
              }
            } else if (
              verifyResponse.data.data?.gateway_response ===
              "The transaction was not completed"
            ) {
              // Continue polling if transaction is not completed
              retryCount++;
              setTimeout(checkPaymentStatus, 5000); // Check every 5 seconds
            } else {
              // Handle other cases as failed
              toast.error("Payment failed. Please try again.");
              setIsLoading(false);
              return; // Stop polling after failure
            }
          } catch (error) {
            console.error("Error checking payment status:", error);
            toast.error("Failed to process payment. Please contact support.");
            setIsLoading(false);
          }
        };

        // Start polling for payment status
        checkPaymentStatus();
      } else {
        toast.error(
          initResponse.data.message || "Failed to initialize payment"
        );
        setIsLoading(false);
      }
    } catch (error) {
      console.error("Payment initialization error:", error);
      toast.error(
        error?.response?.data?.message ||
          "Failed to initialize payment. Please try again."
      );
      setIsLoading(false);
    }
  };

  const getCryptoEstimate = async (usdAmount, token) => {
    if (!usdAmount || !token) return;
    if (!credit || credit <= 0) {
      toast.error("Please enter a valid credit amount");
      return;
    }
    setIsEstimating(true);
    try {
      const response = await axios.get(
        `https://api.nowpayments.io/v1/estimate?amount=${usdAmount}&currency_from=usd&currency_to=${token.toLowerCase()}`,
        {
          headers: {
            "x-api-key": "9P7PYPH-VRQ4NZK-GCPRMMF-B6YGT9K",
          },
        }
      );
      console.log(response);

      setCryptoEstimate(response.data);
    } catch (error) {
      console.error("Error getting crypto estimate:", error);
      toast.error("Failed to get crypto estimate");
    } finally {
      setIsEstimating(false);
    }
  };

  // Update estimate when amount or token changes
  useEffect(() => {
    if (selected === "crypto" && amount && selectedToken) {
      getCryptoEstimate(amount, selectedToken);
    }
  }, [amount, selectedToken, selected]);

  const handleCryptoPayment = async () => {
    if (!credit || credit <= 0) {
      toast.error("Please enter a valid credit amount");
      return;
    }
    if (!cryptoEstimate) {
      toast.error("Please enter all required information");
      return;
    }

    setIsLoading(true);
    try {
      const response = await axios.post(
        "https://api.nowpayments.io/v1/invoice",
        {
          price_amount: cryptoEstimate.estimated_amount,
          price_currency: selectedToken ? selectedToken.toLowerCase() : "",
          pay_currency: selectedToken ? selectedToken.toLowerCase() : "",
          order_id: `order_${Date.now()}`,
          order_description: `Buying ${credit} credits`,
          ipn_callback_url: "https://milliondollarinfluencer.com/", // You may want to handle this for backend notifications
          success_url: `https://milliondollarinfluencer.com/success?credits=${credit}`,
          cancel_url: "https://milliondollarinfluencer.com/cancel",
        },
        {
          headers: {
            "x-api-key": "9P7PYPH-VRQ4NZK-GCPRMMF-B6YGT9K",
          },
        }
      );
      console.log("res", response);

      if (response.data) {
        // Open the payment URL in a new window
        window.open(response.data.invoice_url, "_blank");
        // Do NOT call addCoins here. It will be called on the success page.
      }
    } catch (error) {
      console.error("Error creating crypto payment:", error);
      toast.error("Failed to create crypto payment. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleNext = () => {
    if (selected === "card") {
      handleBuyCredits();
    } else {
      handleCryptoPayment();
    }
  };

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
                Purchase Information
              </h1>
              <p className="text-[16px] lg:text-[16px] text-[#FFF8C5] font-light">
                Fill in the details to make your purchase
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
                  value={credit}
                  type="number"
                  min="0"
                  step="any"
                  onChange={(e) => {
                    const value = e.target.value;
                    // Only allow valid numbers (not empty, not just a dot)
                    if (value === "" || isNaN(Number(value)) || value === ".") {
                      setCredit("");
                    } else {
                      setCredit(value);
                    }
                  }}
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
                        <p className="text-white font-[Inter] text-[14px] font-light">
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
                              name="cardNumber"
                              value={cardDetails.cardNumber}
                              onChange={handleChange}
                              placeholder="Card Number (EG **** **** 1234 1234)"
                              className="px-4 py-3  bg-[#000000]  text-white placeholder:text-[#aaa]  outline-none  w-full"
                            />
                          </div>

                          {/* Right Side: Visa Icon */}
                          <img
                            src={visa}
                            alt="Visa Logo"
                            className="w-10 h-auto"
                          />
                        </div>
                        {errors.cardNumber && (
                          <p className="text-red-500 text-xs">
                            {errors.cardNumber}
                          </p>
                        )}

                        <div className="flex items-center w-full">
                          <div
                            style={{
                              borderRight: "1px solid #766E53",
                              borderTop: "1px solid #766E53",
                              width: "50%",
                            }}
                          >
                            <input
                              className="px-4 py-3  bg-[#000000]  text-white placeholder:text-[#aaa]  outline-none  w-full"
                              required
                              type="text"
                              name="expiryDate"
                              value={cardDetails.expiryDate}
                              onChange={handleChange}
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
                              className="px-4 py-3  bg-[#000000]  text-white placeholder:text-[#aaa]  outline-none  w-full"
                              required
                              type="text"
                              name="cvv"
                              value={cardDetails.cvv}
                              onChange={handleChange}
                              placeholder="CVV"
                            />
                          </div>
                        </div>
                      </div>
                      {errors.expiryDate && (
                        <p className="text-red-500 text-xs">
                          {errors.expiryDate}
                        </p>
                      )}
                      {errors.cvv && (
                        <p className="text-red-500 text-xs">{errors.cvv}</p>
                      )}
                    </div>
                    <div className="mb-4">
                      <p className="text-white font-[Inter]  text-[14px] font-light">
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
                          className="px-4 py-3  bg-[#000000]  text-white placeholder:text-[#aaa]  outline-none  w-full"
                          required
                          placeholder="Enter card holder name"
                          type="text"
                          name="cardHolder"
                          value={cardDetails.cardHolder}
                          onChange={handleChange}
                        />
                      </div>
                    </div>

                    <div className="mb-6">
                      <p className="text-white font-[Inter]  text-[14px] font-light">
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
                          className="px-4 py-3 bg-[#000000] text-white outline-none w-full "
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
                          className="px-4 py-3 bg-[#000000] text-white placeholder:text-[#aaa] outline-none  w-full"
                          required
                          type="text"
                          name="address"
                          value={cardDetails.address}
                          onChange={handleChange}
                          placeholder="Enter your billing address"
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
                      <p className="text-white font-[Inter]  text-[14px] font-light">
                        Select Token <span className="text-[#FFE395]">*</span>
                      </p>

                      <div
                        style={{
                          border: "1px solid #766E53",
                          width: "100%",
                        }}
                        className="mb-4"
                      >
                        <div className="flex items-center px-4 bg-[#000000]">
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
                            className="py-3 bg-[#000000] text-white outline-none w-full "
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

                        {/* USD Amount Input */}
                        <div className="relative">
                          <input
                            className="px-4 py-3 bg-[#000000] text-white placeholder:text-[#aaa] outline-none  w-full pr-14"
                            required
                            placeholder="Enter Amount in USD"
                            value={amount}
                            onChange={(e) => {
                              const value = e.target.value;
                              // Allow only numbers (integer or decimal)
                              if (/^\d*\.?\d*$/.test(value)) {
                                setAmount(value);
                              }
                            }}
                            style={{
                              borderTop: "1px solid #766E53",
                            }}
                          />
                          <span className="absolute right-4 top-1/2 transform -translate-y-1/2 text-[#50AF95] font-[Inter] uppercase">
                            USD
                          </span>
                        </div>

                        {/* Crypto Estimate Display */}
                        <div className="relative">
                          <input
                            className="px-4 py-3 bg-[#000000] text-white placeholder:text-[#aaa] outline-none  w-full pr-14"
                            readOnly
                            placeholder="Estimated Amount"
                            value={
                              isEstimating
                                ? "Calculating..."
                                : cryptoEstimate
                                ? `${cryptoEstimate.estimated_amount}`
                                : ""
                            }
                            style={{
                              borderTop: "1px solid #766E53",
                            }}
                          />
                          <span className="absolute right-4 top-1/2 transform -translate-y-1/2 text-[#50AF95] font-[Inter] uppercase">
                            {selectedToken || ""}
                          </span>
                        </div>
                      </div>

                      <div className="mb-4">
                        <p className="text-white font-[Inter]  text-[14px] font-light">
                          Your Wallet Address{" "}
                          <span className="text-[#FFE395]">*</span>
                        </p>
                        <div
                          style={{
                            border: "1px solid #766E53",
                            width: "100%",
                          }}
                        >
                          <input
                            className="px-4 py-3 bg-[#000000] text-white placeholder:text-[#aaa] outline-none  w-full"
                            required
                            placeholder="Enter your wallet address"
                            value={walletAddress}
                            onChange={(e) => setWalletAddress(e.target.value)}
                          />
                        </div>
                      </div>
                    </div>
                  </>
                )}
                <div className={`${selected === "crypto" ? "mt-20" : "mt-8"} `}>
                  <CustomButton
                    py="py-4"
                    hidden="block"
                    isLoading={isLoading}
                    name="Next"
                    onClick={handleNext}
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
