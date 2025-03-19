// eslint-disable-next-line import/no-extraneous-dependencies
import axios from "axios";

// export const API_URL = "https://5hwtmvdt-3334.inc1.devtunnels.ms/";
// export const IMAGE_BASEURL = "https://5hwtmvdt-3334.inc1.devtunnels.ms/";
export const API_URL = "http://16.16.207.119/";
export const IMAGE_BASEURL = "http://16.16.207.119/";

export const callAPi = axios.create({
  withCredentials: true,
  baseURL: API_URL,
  headers: {
    "Content-type": "application/json",
  },
});

export const callAPiMultiPart = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-type": "multipart/form-data",
  },
});

callAPiMultiPart.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token && token !== undefined) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

callAPi.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token && token !== undefined) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);
