import CustomButton from "../button";
import logo from "../../assets/logo.png";
import googleIcon from "../../assets/google.svg";
import { motion } from "framer-motion";

import AuthLayout from "../layout/authLayout";
import { useState } from "react";
import { useDispatch } from "react-redux";
import authService from "../../redux/services/authServices";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { googleLoginUser, loginUser } from "../../redux/slice/authSlice";
import {
  loginWithGoogle,
  logoutUser,
} from "../../redux/services/googleAuthApi";

const initialValues = {
  email: "",
  password: "",
};
const Signin = () => {
  const dispatch = useDispatch();
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const validateEmail = (email) => {
    return /\S+@\S+\.\S+/.test(email);
  };
  const handleOnChange = (e) => {
    const { name, value } = e.target;

    setValues((prev) => ({ ...prev, [name]: value }));

    if (name === "email") {
      if (!value) {
        // Remove error if the field is empty
        setErrors((prev) => {
          const newErrors = { ...prev };
          delete newErrors.email;
          return newErrors;
        });
      } else if (!validateEmail(value)) {
        setErrors((prev) => ({ ...prev, email: "Invalid email format" }));
      } else {
        setErrors((prev) => {
          const newErrors = { ...prev };
          delete newErrors.email;
          return newErrors;
        });
      }
    }

    if (name === "password") {
      if (!value) {
        setErrors((prev) => {
          const newErrors = { ...prev };
          delete newErrors.password;
          return newErrors;
        });
      }
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    let newErrors = {};

    if (!values.email) {
      newErrors.email = "Email is required";
    } else if (!validateEmail(values.email)) {
      newErrors.email = "Invalid email format";
    }

    if (!values.password) {
      newErrors.password = "Password is required";
    }

    setErrors(newErrors);
    if (Object.keys(newErrors).length === 0) {
      dispatch(loginUser(values))
        .unwrap()
        .then(() => navigate("/"))
        .catch((error) => toast.error(error));
    }
  };

  // const handleGoogleLogin = async () => {
  //   dispatch(googleLoginUser())
  //     .unwrap()
  //     .then(() => navigate("/home"))
  //     .catch((error) => toast.error(error));
  // };
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));
  console.log("user", user);

  const handleGoogleLogin = async () => {
    const response = await loginWithGoogle();
    // console.log("response", response);

    if (response.success) {
      setUser(response.user);
      dispatch(googleLoginUser(response.user));
    }
  };

  const handleLogout = async () => {
    await logoutUser();
    setUser(null);
  };

  return (
    <AuthLayout>
      <div className="flex items-center justify-center">
        <div className=" p-8 w-full max-w-md">
          <motion.div
            className="flex flex-col items-center justify-center"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <a href="/">
              <img src={logo} alt="logo" />
            </a>

            <h1
              className="text-[24px] lg:text-[36px] leading-[1.2] lg:leading-[100px] uppercase"
              style={{
                backgroundImage:
                  "linear-gradient(to right, #B48B34 0%, #E8C776 50%, #A67921 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                fontFamily: "Montserrat",
                fontWeight: "800",
              }}
            >
              Welcome
            </h1>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <div className="flex flex-col mb-4">
              <label className="text-white font-medium mb-1 text-[14px] uppercase">
                Email
              </label>
              <input
                type="email"
                className="px-4 py-3 border border-[#766E53cc] bg-transparent text-white placeholder:text-[#aaa] focus:ring-2 focus:ring-[#7d6a2b] outline-none uppercase"
                placeholder="Enter your email"
                required
                name="email"
                autoComplete="off"
                value={values.email}
                onChange={handleOnChange}
              />
              {errors.email && (
                <p className="text-red-500 text-[10px]">{errors.email}</p>
              )}
            </div>

            <div className="flex flex-col mb-4">
              <label className="text-white font-medium mb-1 text-[14px] uppercase">
                Password
              </label>
              <input
                type="password"
                className="px-4 py-3 border border-[#766E53cc] bg-transparent text-white placeholder:text-[#aaa] focus:ring-2 focus:ring-[#7d6a2b] outline-none uppercase"
                placeholder="Enter your password"
                required
                name="password"
                value={values.password}
                onChange={handleOnChange}
              />
              {errors.password && (
                <p className="text-red-500 text-[10px]">{errors.password}</p>
              )}
            </div>

            <div className="flex flex-col items-center gap-6">
              <CustomButton
                bgGradient="linear-gradient(to right, #B48B34 0%, #E8C776 50%, #A67921 100%)"
                strokeGradient="linear-gradient(to right, #7A5018cc 0%, #FEEA9Acc 100%)"
                py="py-4"
                hidden="block"
                name="Login"
                width="w-full"
                onClick={handleSubmit}
                isLoading={isLoading}
              />
              <p className="text-white">
                Don't have an account?{" "}
                <span style={{ color: "#FFE395" }}>
                  {" "}
                  <a href="/sign-up">signup</a>
                </span>
              </p>
              <CustomButton
                bgGradient="linear-gradient(to right, #D9D9D9 0%, #ffffff 50%, #D9D9D9 100%)"
                strokeGradient="linear-gradient(to right, #FFFFFF 0%, #B7B7B7 100%)"
                py="py-4"
                hidden="block"
                name="Continue with Google"
                icon={googleIcon}
                onClick={handleGoogleLogin}
                width="w-full"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </AuthLayout>
  );
};

export default Signin;
