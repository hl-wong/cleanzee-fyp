import axios from "axios";
import { API_ENDPOINTS } from "../constants";

export const getNearbyCleaners = async (userId, latitude, longitude) => {
  try {
    const response = await axios.post(
      `${API_ENDPOINTS.nearby}/nearby-cleaners`,
      {
        userId: userId,
        latitude: latitude,
        longitude: longitude,
      }
    );
    return response;
  } catch (e) {
    throw e.response.data;
  }
};
