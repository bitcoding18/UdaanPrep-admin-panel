import { ApiEndPoints } from "../../constants";
import apiService from "../apiService";

const registerStudentAPI = async (reqBody) => {
  const URL = ApiEndPoints.REGISTER_STUDENT_API;
  try {
    const response = await apiService.post(URL, reqBody);
    if (response?.data?.statusCode !== 200) {
      throw new Error(response?.data?.message || "Invalid response");
    }
    if (response?.data?.statusCode === 200) {
      return response.data;
    }
  } catch (error) {
    const message =
      error?.response?.data?.message || error?.message || "Unknown error";
    throw new Error(message);
  }
};

const getAllStudentsAPI = async (page = 1, limit = 10) => {
  const URL = `${ApiEndPoints.GET_STUDENTS_LIST_API}?page=${page}&limit=${limit}`;
  try {
    const response = await apiService.get(URL);
    if (response?.data?.statusCode !== 200) {
      throw new Error(response?.data?.message || "Invalid response");
    }
    if (response?.data?.statusCode === 200) {
      return response.data;
    }
  } catch (error) {
    const message =
      error?.response?.data?.message || error?.message || "Unknown error";
    throw new Error(message);
  }
};

const updateStudentDetailsAPI = async (studentId, reqBody) => {
  const URL = `${ApiEndPoints.UPDATE_STUDENT_API}/${studentId}`;
  try {
    const response = await apiService.put(URL, reqBody);
    if (response?.data?.statusCode !== 200) {
      throw new Error(response?.data?.message || "Invalid response");
    }
    if (response?.data?.statusCode === 200) {
      return response.data;
    }
  } catch (error) {
    const message =
      error?.response?.data?.message || error?.message || "Unknown error";
    throw new Error(message);
  }
};

const deleteStudentAPI = async (studentId) => {
  const URL = `${ApiEndPoints.DELETE_STUDENT_API}/${studentId}`;
  try {
    const response = await apiService.delete(URL);
    if (response?.data?.statusCode !== 200) {
      throw new Error(response?.data?.message || "Invalid response");
    }
    if (response?.data?.statusCode === 200) {
      return response.data;
    }
  } catch (error) {
    const message =
      error?.response?.data?.message || error?.message || "Unknown error";
    throw new Error(message);
  }
};

const changeStudentStatusAPI = async (studentId, newStatus) => {
  const URL = `${ApiEndPoints.CHANGE_STUDENT_STATUS_API}/${studentId}/status`;
  try {
    const response = await apiService.patch(URL);
    if (response?.data?.statusCode !== 200) {
      throw new Error(response?.data?.message || "Invalid response");
    }
    if (response?.data?.statusCode === 200) {
      return response.data;
    }
  } catch (error) {
    const message =
      error?.response?.data?.message || error?.message || "Unknown error";
    throw new Error(message);
  }
};

export {
  registerStudentAPI,
  getAllStudentsAPI,
  updateStudentDetailsAPI,
  deleteStudentAPI,
  changeStudentStatusAPI,
};
