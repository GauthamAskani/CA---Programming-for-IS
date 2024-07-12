import axiosInstance from "../utilities/AxiosInstance";

export const createUniversaty = async (data) => {
  try {
    const response = await axiosInstance.post("/admin/create-university", data);
    return response.data;
  } catch (error) {
    console.error("Error fetching user data:", error);
    throw error;
  }
};

export const getUniversatyList = async () => {
  try {
    const response = await axiosInstance.get("/admin/universities");
    return response.data;
  } catch (error) {
    console.error("Error fetching user data:", error);
    throw error;
  }
};

export const editUniversaty = async (data, id) => {
  try {
    const response = await axiosInstance.put(
      `/admin/update-university/${id}`,
      data
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching user data:", error);
    throw error;
  }
};

export const deleteUniversaty = async (id) => {
  try {
    const response = await axiosInstance.put(`/admin/delete-university/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching user data:", error);
    throw error;
  }
};

export const getCoursesList = async (id) => {
  try {
    const response = await axiosInstance.get(`/admin/university/${id}/courses`);
    return response.data;
  } catch (error) {
    console.error("Error fetching user data:", error);
    throw error;
  }
};

export const createCourse = async (data) => {
  try {
    const response = await axiosInstance.post("/admin/create-course", data);
    return response.data;
  } catch (error) {
    console.error("Error fetching user data:", error);
    throw error;
  }
};

export const editCourse = async (data, id) => {
  try {
    const response = await axiosInstance.put(
      `/admin/update-course/${id}`,
      data
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching user data:", error);
    throw error;
  }
};

export const deleteCourse = async (id) => {
  try {
    const response = await axiosInstance.put(`/admin/delete-course/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching user data:", error);
    throw error;
  }
};

export const getMedicalList = async () => {
  try {
    const response = await axiosInstance.get(
      `/admin/medicalinsurance-requests`
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
      `/admin/update-medical-insurance/${id}`,
      data
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching user data:", error);
    throw error;
  }
};

export const editLoan = async (data, id) => {
  try {
    const response = await axiosInstance.put(`/admin/update-loan/${id}`, data);
    return response.data;
  } catch (error) {
    console.error("Error fetching user data:", error);
    throw error;
  }
};

export const getLoansList = async () => {
  try {
    const response = await axiosInstance.get(`/admin/loan-requests`);
    return response.data;
  } catch (error) {
    console.error("Error fetching user data:", error);
    throw error;
  }
};

export const getBroadCastList = async () => {
  try {
    const response = await axiosInstance.get(`/admin/broadcasts`);
    return response.data;
  } catch (error) {
    console.error("Error fetching user data:", error);
    throw error;
  }
};

export const deleteBroadcast = async (id) => {
  try {
    const response = await axiosInstance.put(`/admin/delete-broadcast/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching user data:", error);
    throw error;
  }
};

export const createBroadcast = async (data) => {
  try {
    const response = await axiosInstance.post("/admin/create-broadcast", data);
    return response.data;
  } catch (error) {
    console.error("Error fetching user data:", error);
    throw error;
  }
};

export const editBroadcast = async (data, id) => {
  try {
    const response = await axiosInstance.put(
      `/admin/update-broadcast/${id}`,
      data
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching user data:", error);
    throw error;
  }
};

export const editApplication = async (data, id) => {
  try {
    const response = await axiosInstance.put(`/admin/update-application`, data);
    return response.data;
  } catch (error) {
    console.error("Error fetching user data:", error);
    throw error;
  }
};

export const getApplication = async (data) => {
  try {
    const response = await axiosInstance.get(`/applications-list`, {
      params: data,
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching user data:", error);
    throw error;
  }
};

export const deleteApplication = async (id) => {
  try {
    const response = await axiosInstance.get(`/delete-application/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching user data:", error);
    throw error;
  }
};

export const getDocumnets = async (id) => {
  try {
    const response = await axiosInstance.get(`/student-documents/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching user data:", error);
    throw error;
  }
};

export const getStudentList = async (id) => {
  try {
    const response = await axiosInstance.get(`/admin/students-list`);
    return response.data;
  } catch (error) {
    console.error("Error fetching user data:", error);
    throw error;
  }
};

export const getDocumentsList = async (id) => {
  try {
    const response = await axiosInstance.get(`/admin/all-documents`);
    return response.data;
  } catch (error) {
    console.error("Error fetching user data:", error);
    throw error;
  }
};

export const updateDocument = async (data, id) => {
  try {
    const response = await axiosInstance.put(
      `/admin/update-document/${id}`,
      data
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching user data:", error);
    throw error;
  }
};
