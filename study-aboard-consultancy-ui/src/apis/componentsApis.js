import { toast } from "react-toastify";
import axiosInstance from "../utilities/AxiosInstance";

const handleError = (error) => {
  toast.error(
    error?.response?.data?.messsage ||
      error?.response?.data?.error ||
      error?.message ||
      error?.error?.error ||
      "Something went wrong"
  );
};

export const createAccount = async (data) => {
  try {
    const response = await axiosInstance.post("/signup", data);
    return response.data;
  } catch (error) {
    handleError(error);
    console.error("Error fetching user data:", error);
    throw error;
  }
};

export const loginApi = async (data) => {
  try {
    const response = await axiosInstance.post("/login", data);
    return response.data;
  } catch (error) {
    handleError(error);
    console.error("Error fetching user data:", error);
    throw error;
  }
};

export const forgotPasscode = async (data) => {
  try {
    const response = await axiosInstance.post("/lost-passcode", data);
    return response.data;
  } catch (error) {
    handleError(error);
    console.error("Error fetching user data:", error);
    throw error;
  }
};

export const forgotPassword = async (data) => {
  try {
    const response = await axiosInstance.post("/forgot-password", data);
    return response.data;
  } catch (error) {
    handleError(error);
    console.error("Error fetching user data:", error);
    throw error;
  }
};

export const editProfile = async (data) => {
  try {
    const response = await axiosInstance.put("/update-profile", data);
    return response.data;
  } catch (error) {
    handleError(error);
    console.error("Error fetching user data:", error);
    throw error;
  }
};
