import { ApiEndPoints } from "../../constants";
import apiService from "../apiService";

const loginAPI = async (contextData, reqBody) => {
  const URL = ApiEndPoints.LOGIN_API;
  const { setAdminData, setIsLogin } = contextData;
  try {
    const response = await apiService.post(URL, reqBody);
    localStorage.setItem("authToken", response?.data?.data?.token);
    if (response?.data?.statusCode !== 200) {
      throw new Error(response?.data?.message || "Invalid response");
    }
    if (response?.data?.statusCode === 200) {
      setAdminData(response?.data?.data);
      setIsLogin(true);
      return response.data;
    }
  } catch (error) {
    const message =
      error?.response?.data?.message || error?.message || "Unknown error";
    throw new Error(message);
  }
};

const registerAdminAPI = async (reqBody) => {
  const URL = ApiEndPoints.REGISTER_ADMIN_API;
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

const getAllAdminsAPI = async (page = 1, limit = 10, search = "") => {
  const URL = `${ApiEndPoints.GET_ADMINS_LIST_API}?page=${page}&limit=${limit}&search=${search}`;
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

const changeAdminStatusAPI = async (adminId) => {
  const URL = `${ApiEndPoints.CHANGE_ADMIN_STATUS_API}/${adminId}/status`;
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

const deleteAdminAccountAPI = async (adminId) => {
  const URL = `${ApiEndPoints.DELETE_ADMIN_ACCOUNT_API}/${adminId}`;
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

export {
  loginAPI,
  registerAdminAPI,
  getAllAdminsAPI,
  changeAdminStatusAPI,
  deleteAdminAccountAPI,
};
