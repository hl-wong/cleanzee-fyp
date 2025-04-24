import axios from "axios";
import { API_ENDPOINTS } from "../constants";

export const setAvailability = async (cleanerId, availability) => {
  try {
    const response = await axios.post(
      `${API_ENDPOINTS.cleaner}/set-availability`,
      {
        cleanerId: cleanerId,
        availability: availability,
      }
    );
    return response;
  } catch (e) {
    return e.response.data;
  }
};

export const assignService = async (serviceData) => {
  try {
    const response = await axios.post(
      `${API_ENDPOINTS.cleaner}/assign-service`,
      serviceData
    );
    return response;
  } catch (e) {
    return e.response.data;
  }
};

export const getAssignServices = async (cleanerId) => {
  try {
    const response = await axios.get(`${API_ENDPOINTS.cleaner}/${cleanerId}`);
    return response;
  } catch (e) {
    return e.response.data;
  }
};

export const updateAssignService = async (serviceData) => {
  try {
    const response = await axios.post(
      `${API_ENDPOINTS.cleaner}/update-assign-service`,
      serviceData
    );
    return response;
  } catch (e) {
    return e.response.data;
  }
};

export const deleteAssignService = async (cleanerId, serviceId) => {
  try {
    const response = await axios.post(
      `${API_ENDPOINTS.cleaner}/delete-assign-service`,
      {
        cleanerId: cleanerId,
        serviceId: serviceId,
      }
    );
    return response;
  } catch (e) {
    return e.response.data;
  }
};

export const getAdminServices = async () => {
  try {
    const response = await axios.post(
      `${API_ENDPOINTS.cleaner}/get-admin-services`
    );
    return response;
  } catch (e) {
    throw e.response.data;
  }
};

export const getBookingStatus = async (cleanerId) => {
  try {
    const response = await axios.post(
      `${API_ENDPOINTS.cleaner}/get-booking-status`,
      {
        cleanerId: cleanerId,
      }
    );
    return response;
  } catch (e) {
    throw e.response.data;
  }
};
