import axios from "axios";
import { API_ENDPOINTS } from "../constants";

export const validatePromoCode = async (userId, promoCode) => {
  try {
    const response = await axios.post(
      `${API_ENDPOINTS.booking}/validate-promo-code`,
      {
        userId: userId,
        promoCode: promoCode,
      }
    );
    return response;
  } catch (e) {
    throw e.response.data;
  }
};

export const requestBooking = async (bookingData) => {
  try {
    const response = await axios.post(
      `${API_ENDPOINTS.booking}/request-booking`,
      bookingData
    );
    return response;
  } catch (e) {
    throw e.response.data;
  }
};

export const getBookings = async (id, role) => {
  try {
    const response = await axios.post(`${API_ENDPOINTS.booking}/get-bookings`, {
      id: id,
      role: role,
    });
    return response;
  } catch (e) {
    throw e.response.data;
  }
};

export const cancelBooking = async (bookingId, cleanerId) => {
  try {
    const response = await axios.post(
      `${API_ENDPOINTS.booking}/cancel-booking`,
      {
        bookingId: bookingId,
        cleanerId: cleanerId,
      }
    );
    return response;
  } catch (e) {
    throw e.response.data;
  }
};

export const rejectBooking = async (bookingId, userId) => {
  try {
    const response = await axios.post(
      `${API_ENDPOINTS.booking}/reject-booking`,
      {
        bookingId: bookingId,
        userId: userId,
      }
    );
    return response;
  } catch (e) {
    throw e.response.data;
  }
};

export const acceptBooking = async (bookingId, userId) => {
  try {
    const response = await axios.post(
      `${API_ENDPOINTS.booking}/accept-booking`,
      {
        bookingId: bookingId,
        userId: userId,
      }
    );
    return response;
  } catch (e) {
    throw e.response.data;
  }
};

export const payDeposit = async (bookingId, cleanerId) => {
  try {
    const response = await axios.post(`${API_ENDPOINTS.booking}/pay-deposit`, {
      bookingId: bookingId,
      cleanerId: cleanerId,
    });
    return response;
  } catch (e) {
    throw e.response.data;
  }
};

export const completeService = async (bookingId, userId) => {
  try {
    const response = await axios.post(
      `${API_ENDPOINTS.booking}/complete-service`,
      {
        bookingId: bookingId,
        userId: userId,
      }
    );
    return response;
  } catch (e) {
    throw e.response.data;
  }
};

export const payBalance = async (bookingId, cleanerId) => {
  try {
    const response = await axios.post(`${API_ENDPOINTS.booking}/pay-balance`, {
      bookingId: bookingId,
      cleanerId: cleanerId,
    });
    return response;
  } catch (e) {
    throw e.response.data;
  }
};

export const rateService = async (ratingData) => {
  try {
    const response = await axios.post(
      `${API_ENDPOINTS.booking}/rate-service`,
      ratingData
    );
    return response;
  } catch (e) {
    throw e.response.data;
  }
};

export const completeReview = async (bookingId) => {
  try {
    const response = await axios.post(
      `${API_ENDPOINTS.booking}/complete-review`,
      { bookingId: bookingId }
    );
    return response;
  } catch (e) {
    throw e.response.data;
  }
};

export const releasePayment = async (bookingId, userId, cleanerId) => {
  try {
    const response = await axios.post(
      `${API_ENDPOINTS.booking}/release-payment`,
      { bookingId: bookingId, userId: userId, cleanerId: cleanerId }
    );
    return response;
  } catch (e) {
    throw e.response.data;
  }
};
