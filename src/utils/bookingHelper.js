import {
  acceptBooking,
  cancelBooking,
  completeReview,
  completeService,
  payBalance,
  payDeposit,
  rejectBooking,
  releasePayment,
} from "../services";
import { resetTo } from "./navigationHelper";

export const handleCancel = async (navigation, bookingId, cleanerId) => {
  const response = await cancelBooking(bookingId, cleanerId);
  if (response.status === 200) {
    resetTo(navigation, "My Booking Screen");
  }
};

export const handleReject = async (navigation, bookingId, userId) => {
  const response = await rejectBooking(bookingId, userId);
  if (response.status === 200) {
    resetTo(navigation, "My Booking Screen");
  }
};

export const handleAccept = async (navigation, bookingId, userId) => {
  const response = await acceptBooking(bookingId, userId);
  if (response.status === 200) {
    resetTo(navigation, "My Booking Screen");
  }
};

export const handlePay = async (
  navigation,
  bookingId,
  cleanerId,
  currentStatus
) => {
  if (currentStatus === "Deposit") {
    const response = await payDeposit(bookingId, cleanerId);
    if (response.status === 200) {
      resetTo(navigation, "My Booking Screen");
    }
  }

  if (currentStatus === "Balance") {
    const response = await payBalance(bookingId, cleanerId);
    if (response.status === 200) {
      resetTo(navigation, "My Booking Screen");
    }
  }
};

export const handleComplete = async (navigation, bookingId, userId) => {
  const response = await completeService(bookingId, userId);
  if (response.status === 200) {
    resetTo(navigation, "My Booking Screen");
  }
};

export const handleCompleteReview = async (navigation, bookingId) => {
  const response = await completeReview(bookingId);
  if (response.status === 200) {
    resetTo(navigation, "Booking Management Screen");
  }
};

export const handleReleasePayment = async (
  navigation,
  bookingId,
  userId,
  cleanerId
) => {
  const response = await releasePayment(bookingId, userId, cleanerId);
  if (response.status === 200) {
    resetTo(navigation, "Booking Management Screen");
  }
};
