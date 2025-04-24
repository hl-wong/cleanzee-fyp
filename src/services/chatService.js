import axios from "axios";
import { API_ENDPOINTS } from "../constants";

export const checkExistChat = async (id, receiverId) => {
  try {
    const response = await axios.get(`${API_ENDPOINTS.chat}/check-exist-chat`, {
      params: { id, receiverId },
    });
    return response;
  } catch (e) {
    throw e.response.data;
  }
};

export const getChats = async (id, role) => {
  try {
    const response = await axios.get(`${API_ENDPOINTS.chat}/${id}/${role}`);
    return response;
  } catch (e) {
    throw e.response.data;
  }
};
