import axios from "axios";
import { API_ENDPOINTS } from "../constants";

export const getUserData = async (id) => {
  try {
    const response = await axios.get(`${API_ENDPOINTS.user}/${id}`);
    return response;
  } catch (e) {
    throw e.response.data;
  }
};

export const getCleanerData = async (userId) => {
  try {
    const response = await axios.get(`${API_ENDPOINTS.user}/cleaner/${userId}`);
    return response;
  } catch (e) {
    throw e.response.data;
  }
};

export const getActiveAdvertisements = async () => {
  try {
    const response = await axios.post(
      `${API_ENDPOINTS.user}/get-active-advertisements`
    );
    return response;
  } catch (e) {
    throw e.response.data;
  }
};

export const searchServices = async (serviceName, userId) => {
  try {
    const response = await axios.post(`${API_ENDPOINTS.user}/search-services`, {
      serviceName: serviceName,
      userId: userId,
    });
    return response;
  } catch (e) {
    throw e.response.data;
  }
};

export const getRandomServices = async (userId) => {
  try {
    const response = await axios.post(
      `${API_ENDPOINTS.user}/get-random-services`,
      { userId: userId }
    );
    return response;
  } catch (e) {
    throw e.response.data;
  }
};

export const getServiceCategory = async (userId, category) => {
  try {
    const response = await axios.post(
      `${API_ENDPOINTS.user}/get-service-category`,
      { userId: userId, category: category }
    );
    return response;
  } catch (e) {
    throw e.response.data;
  }
};
