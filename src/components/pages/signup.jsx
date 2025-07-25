import CustomButton from "../button";
import logo from "../../assets/logo.svg";
import googleIcon from "../../assets/google.svg";
import { motion } from "framer-motion";

import AuthLayout from "../layout/authLayout";
import { useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { googleLoginUser, signupUser } from "../../redux/slice/authSlice";
import { useDispatch } from "react-redux";
import {
  AiOutlineEye,
  AiOutlineEyeInvisible,
  AiOutlineLoading3Quarters,
} from "react-icons/ai"; // install react-icons if not already

import {
  loginWithGoogle,
  logoutUser,
} from "../../redux/services/googleAuthApi";
const initialValues = {
  email: "",
  password: "",
  confirm_password: "",
};
const Signup = () => {
  const dispatch = useDispatch();
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
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
    if (!values.confirm_password) {
      newErrors.confirm_password = "Confirm Password is required";
    } else if (values.password !== values.confirm_password) {
      newErrors.confirm_password = "Passwords do not match";
    }

    setErrors(newErrors);
    if (Object.keys(newErrors).length === 0) {
      setIsLoading(true); // Show loader
      dispatch(
        signupUser({ ...values, confirmPassword: values.confirm_password })
      )
        .unwrap()
        .then(() => {
          toast.success("Signup successful!");
          navigate("/pixel-grid");
        })
        .catch((error) => toast.error(error))
        .finally(() => setIsLoading(false)); // Hide loader
    }
  };
  // const handleGoogleLogin = async () => {
  //   try {
  //     const res = await authService.googleLogin();
  //     console.log("google login res", res);
  //     if (res.data.success) {
  //       toast.success(res.data.message);
  //       setIsLoading(false);
  //       localStorage.setItem("token", res.data.token);
  //       localStorage.setItem("userData", JSON.stringify(res.data));
  //       navigate("/home");
  //     }
  //   } catch (error) {
  //     console.log("error", error);
  //     toast.error(error?.response?.data?.message);
  //   }
  // };

  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));
  console.log("user", user);

  const handleGoogleLogin = async () => {
    const response = await loginWithGoogle();
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
      {isLoading && (
        <div className="fixed inset-0 bg-black bg-opacity-20 flex items-center justify-center z-50">
          <AiOutlineLoading3Quarters
            className="text-white animate-spin"
            size={50}
          />
        </div>
      )}
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
                className="px-4 py-3 border border-[#766E53cc] bg-transparent text-white placeholder:text-[#aaa] focus:ring-2 focus:ring-[#7d6a2b] outline-none "
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

            <div className="flex flex-col mb-4 relative">
              <label className="text-white font-medium mb-1 text-[14px] uppercase">
                Password
              </label>
              <input
                type={showPassword ? "text" : "password"}
                className="px-4 py-3 border border-[#766E53cc] bg-transparent text-white placeholder:text-[#aaa] focus:ring-2 focus:ring-[#7d6a2b] outline-none  pr-10"
                placeholder="Enter your password"
                required
                name="password"
                autoComplete="off"
                value={values.password}
                onChange={handleOnChange}
              />
              <span
                className="absolute right-3 top-[50%] translate-y-1 cursor-pointer text-white"
                onClick={() => setShowPassword((prev) => !prev)}
              >
                {showPassword ? (
                  <AiOutlineEyeInvisible size={20} />
                ) : (
                  <AiOutlineEye size={20} />
                )}
              </span>
              {errors.password && (
                <p className="text-red-500 text-[10px]">{errors.password}</p>
              )}
            </div>

            {/* Confirm Password Field */}
            <div className="flex flex-col mb-6 relative">
              <label className="text-white font-medium mb-1 text-[14px] uppercase">
                Confirm Password
              </label>
              <input
                type={showConfirm ? "text" : "password"}
                className="px-4 py-3 border border-[#766E53cc] bg-transparent text-white placeholder:text-[#aaa] focus:ring-2 focus:ring-[#7d6a2b] outline-none  pr-10"
                placeholder="Confirm your password"
                required
                name="confirm_password"
                autoComplete="off"
                value={values.confirm_password}
                onChange={handleOnChange}
              />
              <span
                className="absolute right-3 top-[50%] translate-y-1 cursor-pointer text-white"
                onClick={() => setShowConfirm((prev) => !prev)}
              >
                {showConfirm ? (
                  <AiOutlineEyeInvisible size={20} />
                ) : (
                  <AiOutlineEye size={20} />
                )}
              </span>
              {errors.confirm_password && (
                <p className="text-red-500 text-[10px]">
                  {errors.confirm_password}
                </p>
              )}
            </div>
            <div className="flex flex-col items-center gap-6">
              <CustomButton
                bgGradient="linear-gradient(to right, #B48B34 0%, #E8C776 50%, #A67921 100%)"
                strokeGradient="linear-gradient(to right, #7A5018cc 0%, #FEEA9Acc 100%)"
                py="py-4"
                hidden="block"
                name="sign up"
                onClick={handleSubmit}
                width="w-full"
                isLoading={isLoading}
              />
              <p className="text-white">
                Already have an account?{" "}
                <span className="text-[#FFE395] font-[Montserrat] font-light">
                  {" "}
                  <a href="/sign-in">login</a>
                </span>
              </p>
              {/* <CustomButton
                bgGradient="linear-gradient(to right, #D9D9D9 0%, #ffffff 50%, #D9D9D9 100%)"
                strokeGradient="linear-gradient(to right, #FFFFFF 0%, #B7B7B7 100%)"
                py="py-4"
                hidden="block"
                name="Continue with Google"
                icon={googleIcon}
                onClick={handleGoogleLogin}
                width="w-full"
              /> */}
            </div>
          </motion.div>
        </div>
      </div>
    </AuthLayout>
  );
};

export default Signup;
