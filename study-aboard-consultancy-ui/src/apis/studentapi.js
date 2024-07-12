import axios from "axios";
import axiosInstance from "../utilities/AxiosInstance";

export const createApplication = async (data) => {
  try {
    const response = await axiosInstance.post("/create-application", data);
    return response.data;
  } catch (error) {
    console.error("Error fetching user data:", error);
    throw error;
  }
};

export const editApplication = async (data, id) => {
  try {
    const response = await axiosInstance.put(`/update-application/${id}`, data);
    return response.data;
  } catch (error) {
    console.error("Error fetching user data:", error);
    throw error;
  }
};

export const createMediacalInsurance = async (data) => {
  try {
    const response = await axiosInstance.post(
      `/request-medical-insurnace`,
      data
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching user data:", error);
    throw error;
  }
};

export const getStudentMedicalInsurance = async (id) => {
  try {
    const response = await axiosInstance.get(`/medical-insurance/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching user data:", error);
    throw error;
  }
};

export const deleteStudentMedicalInsurance = async (id) => {
  try {
    const response = await axiosInstance.delete(
      `/delete-medical-insurance/${id}`
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching user data:", error);
    throw error;
  }
};

export const editInsurance = async (data, id) => {
  try {
    const response = await axiosInstance.put(
      `/update-medical-insurance/${id}`,
      data
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching user data:", error);
    throw error;
  }
};

export const getStudentDocuments = async (id) => {
  try {
    const response = await axiosInstance.get(`/student-documents/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching user data:", error);
    throw error;
  }
};

export const uploadDocument = async (data) => {
  try {
    const response = await axios.post(
      "http://localhost:3000/api/upload-document",
      data,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
          "Content-Type": "multipart/form-data",
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching user data:", error);
    throw error;
  }
};

export const getBroadCastMessages = async (id) => {
  try {
    const response = await axiosInstance.get(`/broadcastmessages`);
    return response.data;
  } catch (error) {
    console.error("Error fetching user data:", error);
    throw error;
  }
};

export const getStudentLoan = async (id) => {
  try {
    const response = await axiosInstance.get(`/loan-details/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching user data:", error);
    throw error;
  }
};

export const createStudentLoan = async (data) => {
  try {
    const response = await axiosInstance.post(`/request-loan`, data);
    return response.data;
  } catch (error) {
    console.error("Error fetching user data:", error);
    throw error;
  }
};

export const editLoan = async (data, id) => {
  try {
    const response = await axiosInstance.put(`/update-loan/${id}`, data);
    return response.data;
  } catch (error) {
    console.error("Error fetching user data:", error);
    throw error;
  }
};

export const deleteStudentLoan = async (id) => {
  try {
    const response = await axiosInstance.delete(`/delete-loan/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching user data:", error);
    throw error;
  }
};
