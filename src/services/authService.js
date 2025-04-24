import axios from "axios";
import { API_ENDPOINTS } from "../constants";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const sendOTP = async (email) => {
  try {
    const response = await axios.post(`${API_ENDPOINTS.auth}/send-otp`, {
      email: email,
    });
    return response;
  } catch (e) {
    if (e.response && e.response.data) {
      throw new Error(e.response.data.error);
    } else {
      throw new Error("Network error. Please try again.");
    }
  }
};

export const verifyOTP = async (email, otp) => {
  try {
    const response = await axios.post(`${API_ENDPOINTS.auth}/verify-otp`, {
      email: email,
      enteredOTP: otp,
    });
    return response;
  } catch (e) {
    if (e.response && e.response.data) {
      throw new Error(e.response.data.error);
    } else {
      throw new Error("Network error. Please try again.");
    }
  }
};

export const registerUser = async (userData) => {
  try {
    const response = await axios.post(
      `${API_ENDPOINTS.auth}/register`,
      userData
    );
    return response;
  } catch (e) {
    throw e.response.data;
  }
};

export const resendOTP = async (email) => {
  try {
    const response = await axios.post(`${API_ENDPOINTS.auth}/resend-otp`, {
      email: email,
    });
    return response;
  } catch (e) {
    throw e.response.data;
  }
};

export const forgotPassword = async (email) => {
  try {
    const response = await axios.post(`${API_ENDPOINTS.auth}/forgot-password`, {
      email: email,
    });
    return response;
  } catch (e) {
    if (e.response && e.response.data) {
      throw new Error(e.response.data.error);
    } else {
      throw new Error("Network error. Please try again.");
    }
  }
};

export const resetPassword = async (email, newPassword) => {
  try {
    const response = await axios.post(`${API_ENDPOINTS.auth}/reset-password`, {
      email: email,
      newPassword: newPassword,
    });
    return response;
  } catch (e) {
    if (e.response && e.response.data) {
      throw new Error(e.response.data.error);
    } else {
      throw new Error("Network error. Please try again.");
    }
  }
};

export const login = async (email, password, role) => {
  try {
    const response = await axios.post(`${API_ENDPOINTS.auth}/login`, {
      email: email,
      password: password,
      role: role,
    });

    if (response.data.token) {
      await AsyncStorage.setItem("token", response.data.token);
      await AsyncStorage.setItem("user", JSON.stringify(response.data.user));
      await AsyncStorage.setItem("role", role);
    }

    return response;
  } catch (e) {
    if (e.response && e.response.data) {
      throw new Error(e.response.data.error);
    } else {
      throw new Error("Network error. Please try again.");
    }
  }
};
