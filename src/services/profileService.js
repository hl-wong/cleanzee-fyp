import axios from "axios";
import { API_ENDPOINTS } from "../constants";

export const changePassword = async (userId, currentPassword, newPassword) => {
  try {
    const response = await axios.post(
      `${API_ENDPOINTS.profile}/change-password`,
      {
        userId: userId,
        currentPassword: currentPassword,
        newPassword: newPassword,
      }
    );
    return response;
  } catch (e) {
    if (e.response && e.response.data) {
      throw new Error(e.response.data.error);
    } else {
      throw new Error("Network error. Please try again.");
    }
  }
};

export const updateProfilePicture = async (userId, imageUri) => {
  try {
    const response = await axios.post(
      `${API_ENDPOINTS.profile}/update-profile-picture`,
      {
        userId: userId,
        imageUri: imageUri,
      }
    );
    return response;
  } catch (e) {
    throw e.response.data;
  }
};

export const updateProfile = async (userData) => {
  try {
    const response = await axios.post(
      `${API_ENDPOINTS.profile}/update-profile`,
      userData
    );
    return response;
  } catch (e) {
    throw e.response.data;
  }
};

export const addNewAddress = async (addressData) => {
  try {
    const response = await axios.post(
      `${API_ENDPOINTS.profile}/add-new-address`,
      addressData
    );
    return response;
  } catch (e) {
    throw e.response.data;
  }
};

export const updateAddress = async (addressData) => {
  try {
    const response = await axios.post(
      `${API_ENDPOINTS.profile}/update-address`,
      addressData
    );
    return response;
  } catch (e) {
    if (e.response && e.response.data) {
      throw new Error(e.response.data.error);
    } else {
      throw new Error("Network error. Please try again.");
    }
  }
};

export const deleteAddress = async (userId, addressId) => {
  try {
    const response = await axios.post(
      `${API_ENDPOINTS.profile}/delete-address`,
      {
        userId: userId,
        addressId: addressId,
      }
    );
    return response;
  } catch (e) {
    if (e.response && e.response.data) {
      throw new Error(e.response.data.error);
    } else {
      throw new Error("Network error. Please try again.");
    }
  }
};

export const registerAsCleaner = async (cleanerData) => {
  try {
    const response = await axios.post(
      `${API_ENDPOINTS.profile}/register-as-cleaner`,
      cleanerData
    );
    return response;
  } catch (e) {
    throw e.response.data;
  }
};

export const deleteAccount = async (userId) => {
  try {
    const response = await axios.post(
      `${API_ENDPOINTS.profile}/delete-account`,
      { userId: userId }
    );
    return response;
  } catch (e) {
    throw e.response.data;
  }
};
