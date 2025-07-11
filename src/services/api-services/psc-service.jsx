import { ApiEndPoints } from "../../constants";
import apiService from "../apiService";

const createPSCAPI = async (reqBody) => {
  const URL = ApiEndPoints.CREATE_PSC_API;
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

const getAllPSCAPI = async (page = 1, limit = 10, search = "") => {
  const URL = `${ApiEndPoints.GET_PSC_LIST_API}?page=${page}&limit=${limit}&search=${search}`;
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

const updatePSCDetailsAPI = async (studentId, reqBody) => {
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

const deletePSCAPI = async (studentId) => {
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

const changePSCstatusAPI = async (studentId) => {
  const URL = `${ApiEndPoints.CHANGE_PSC_STATUS_API}/${studentId}/status`;
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
  createPSCAPI,
  getAllPSCAPI,
  updatePSCDetailsAPI,
  deletePSCAPI,
  changePSCstatusAPI,
};
