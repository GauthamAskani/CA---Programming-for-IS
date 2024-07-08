import axiosInstance from "../utilities/AxiosInstance";

export const testApi = async () => {
  try {
    const response = await axiosInstance.get("/test");
    return response.data;
  } catch (error) {
    console.error("Error fetching user data:", error);
    throw error;
  }
};
