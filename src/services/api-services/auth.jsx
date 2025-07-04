import { ApiEndPoints } from "../../constants";
import apiService from "../apiService";

const loginAPI = async (contextData, reqBody) => {
  const URL = ApiEndPoints.LOGIN_API;
  const { setAdminData, setIsLogin } = contextData;
  try {
    const response = await apiService.post(URL, reqBody);
    localStorage.setItem("authToken", response?.data?.data?.token);
    if (response?.data?.statusCode === 200) {
      setAdminData(response?.data?.data);
      setIsLogin(true);
    }
    return response.data;
  } catch (error) {
    return error?.response?.data;
  }
};

export { loginAPI };
