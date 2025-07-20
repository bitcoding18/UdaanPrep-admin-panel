import { ApiEndPoints } from "../constants";

const imageCache = new Map();

export const fetchImageWithCache = async (fileId) => {
  if (imageCache.has(fileId)) {
    return imageCache.get(fileId);
  }

  const URL = `${ApiEndPoints.GET_IMAGE_BY_ID}?fileId=${fileId}`;
  try {
    const response = await apiService.patch(URL);
    if (response?.data?.statusCode !== 200) {
      throw new Error(response?.data?.message || "Invalid response");
    }
    const result = response?.data?.data?.base64;
    // Cache the result
    imageCache.set(fileId, result);
  } catch (error) {
    const message =
      error?.response?.data?.message || error?.message || "Unknown error";
    throw new Error(message);
  }
};

export default {
  fetchImageWithCache,
};
