import axios from "axios";
import { API_ENDPOINTS } from "../constants";

export const getUserNotifications = async (userId) => {
  try {
    const response = await axios.get(`${API_ENDPOINTS.notification}/${userId}`);
    return response;
  } catch (e) {
    throw e.response.data;
  }
};

export const getCleanerNotifications = async (cleanerId) => {
  try {
    const response = await axios.post(
      `${API_ENDPOINTS.notification}/get-cleaner-notifications`,
      { cleanerId: cleanerId }
    );
    return response;
  } catch (e) {
    throw e.response.data;
  }
};
