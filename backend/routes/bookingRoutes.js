const express = require("express");
const {
  validatePromoCode,
  requestBooking,
  getBookings,
  cancelBooking,
  rejectBooking,
  acceptBooking,
  payDeposit,
  completeBooking,
  payBalance,
  rateService,
  completeReview,
  releasePayment,
} = require("../controllers/bookingController");
const router = express.Router();

router.post("/validate-promo-code", validatePromoCode);
router.post("/request-booking", requestBooking);
router.post("/get-bookings", getBookings);
router.post("/cancel-booking", cancelBooking);
router.post("/reject-booking", rejectBooking);
router.post("/accept-booking", acceptBooking);
router.post("/pay-deposit", payDeposit);
router.post("/complete-service", completeBooking);
router.post("/pay-balance", payBalance);
router.post("/rate-service", rateService);
router.post("/complete-review", completeReview);
router.post("/release-payment", releasePayment);

module.exports = router;
