const Advertisement = require("../models/advertisement");
const Booking = require("../models/booking");
const Notification = require("../models/notification");
const { malaysiaTime } = require("../utils/timeUtils");
const Cleaner = require("../models/cleaner");
const CleanerService = require("../models/cleanerService");

exports.validatePromoCode = async (req, res) => {
  const { userId, promoCode } = req.body;

  if (!promoCode) {
    return res.status(400).json({ error: "Promo code is required" });
  }

  const findAdvertisement = await Advertisement.findOne({
    promoCode: promoCode,
  });
  if (!findAdvertisement) {
    return res.status(400).json({ error: "Invalid promo code" });
  }

  if (!findAdvertisement.usedBy) {
    findAdvertisement.usedBy = [];
  }

  if (findAdvertisement.usedBy.includes(userId)) {
    return res
      .status(400)
      .json({ error: "You have already used this promo code" });
  }

  try {
    await findAdvertisement.save();

    if (findAdvertisement.discountType === "Percentage") {
      return res.status(200).json({
        discountType: findAdvertisement.discountType,
        percentage: findAdvertisement.percentage,
        message: "Promo code applied",
      });
    }

    if (findAdvertisement.discountType === "Fixed Amount") {
      return res.status(200).json({
        discountType: findAdvertisement.discountType,
        amount: findAdvertisement.amount,
        message: "Promo code applied",
      });
    }
  } catch (e) {
    return res.status(500).json({ error: "Internal server error" });
  }
};

exports.requestBooking = async (req, res) => {
  const {
    userId,
    cleanerId,
    cleanerServiceId,
    address,
    date,
    time,
    total,
    bookingStatus,
    currentStatus,
    promoCode,
    discountType,
    percentage,
    amount,
    subtotal,
    fee,
    isRated,
    isReleased,
  } = req.body;

  const findAdvertisement = await Advertisement.findOne({
    promoCode: promoCode,
  });

  try {
    const newBooking = new Booking({
      userId: userId,
      cleanerId: cleanerId,
      cleanerServiceId: cleanerServiceId,
      address: address,
      date: date,
      time: time,
      total: total,
      bookingStatus: bookingStatus,
      currentStatus: currentStatus,
      promoCode: promoCode,
      discountType: discountType,
      percentage: percentage,
      amount: amount,
      subtotal: subtotal,
      fee: fee,
      remainingBalance: total,
      isRated: isRated,
      isReleased: isReleased,
      createdAt: malaysiaTime,
    });
    await newBooking.save();

    if (promoCode) {
      findAdvertisement.usedBy.push(userId);
      await findAdvertisement.save();
    }

    const newNotification = new Notification({
      id: cleanerId,
      title: "New Booking Request",
      desc: "A customer has requested your cleaning service. Check your bookings.",
      type: "booking",
      isRead: false,
      createdAt: malaysiaTime,
    });
    await newNotification.save();
    return res.status(200).json({ message: "Booking requested successful" });
  } catch (e) {
    return res.status(500).json({ error: "Internal server error" });
  }
};

exports.getBookings = async (req, res) => {
  const { id, role } = req.body;

  let bookings = [];

  try {
    if (role === "customer") {
      bookings = await Booking.find({ userId: id })
        .populate({
          path: "cleanerId",
          model: "Cleaner",
          populate: {
            path: "userId",
            model: "User",
            select: "firstName lastName profilePicture",
          },
        })
        .populate({
          path: "cleanerServiceId",
          model: "CleanerService",
          populate: {
            path: "serviceId",
            model: "Service",
          },
        });
    } else if (role === "cleaner") {
      bookings = await Booking.find({ cleanerId: id })
        .populate({
          path: "userId",
          model: "User",
          select: "firstName lastName profilePicture",
        })
        .populate({
          path: "cleanerServiceId",
          model: "CleanerService",
          populate: {
            path: "serviceId",
            model: "Service",
          },
        });
    }

    return res.status(200).json(bookings);
  } catch (e) {
    return res.status(500).json({ error: "Internal server error" });
  }
};

exports.cancelBooking = async (req, res) => {
  const { bookingId, cleanerId } = req.body;

  try {
    const newNotification = new Notification({
      id: cleanerId,
      title: "Booking Cancelled",
      desc: "A customer has cancelled their booking. Check your schedule for updates.",
      isRead: false,
      createdAt: malaysiaTime,
    });
    await newNotification.save();

    await Booking.findByIdAndUpdate(bookingId, {
      bookingStatus: "Cancelled",
      currentStatus: "Cancelled",
    });

    return res
      .status(200)
      .json({ success: true, message: "Booking cancelled" });
  } catch (e) {
    return res.status(500).json({ error: "Error on cancelling booking" });
  }
};

exports.rejectBooking = async (req, res) => {
  const { bookingId, userId } = req.body;

  try {
    const newNotification = new Notification({
      id: userId,
      title: "Booking Declined",
      desc: "Your booking request has been declined. You may try to booking another cleaner.",
      isRead: false,
      createdAt: malaysiaTime,
    });
    await newNotification.save();

    await Booking.findByIdAndUpdate(bookingId, {
      bookingStatus: "Rejected",
      currentStatus: "Rejected",
    });

    return res.status(200).json({ success: true, message: "Booking rejected" });
  } catch (e) {
    return res
      .status(500)
      .json({ error: "Failed to decline the booking request" });
  }
};

exports.acceptBooking = async (req, res) => {
  const { bookingId, userId } = req.body;

  const malaysiaTime = new Date().toLocaleString("en-US", {
    timeZone: "Asia/Kuala_Lumpur",
  });

  try {
    const newNotification = new Notification({
      id: userId,
      title: "Booking Accepted",
      desc: "Your booking has been accepted. Please proceed with the deposit",
      isRead: false,
      createdAt: malaysiaTime,
    });
    await newNotification.save();

    await Booking.findByIdAndUpdate(bookingId, {
      bookingStatus: "Deposit",
      currentStatus: "Deposit",
    });

    return res.status(200).json({ success: true, message: "Booking accepted" });
  } catch (e) {
    return res
      .status(500)
      .json({ error: "Failed to accept the booking request" });
  }
};

exports.payDeposit = async (req, res) => {
  const { bookingId, cleanerId } = req.body;

  const findBooking = await Booking.findById(bookingId);
  if (!findBooking) {
    return res.status(400).json({ error: "Booking not found" });
  }

  try {
    const updateBooking = await Booking.findByIdAndUpdate(
      bookingId,
      {
        remainingBalance: findBooking.total / 2,
        bookingStatus: "Deposit",
        currentStatus: "Admin Review",
      },
      { new: true }
    );

    const newNotification = new Notification({
      id: cleanerId,
      title: "Deposit Received",
      desc: "A customer have paid the deposit for their booking. Awaiting for admin review.",
      isRead: false,
      createdAt: malaysiaTime,
    });
    await newNotification.save();

    return res.status(200).json({
      message: "Deposit paid",
    });
  } catch (e) {
    return res.status(500).json({ error: "Internal server error" });
  }
};

exports.completeBooking = async (req, res) => {
  const { bookingId, userId } = req.body;

  try {
    const newNotification = new Notification({
      id: userId,
      title: "Payment Required",
      desc: "Your cleaning service is completed. Please proceed to pay the remaining balance.",
      isRead: false,
      createdAt: malaysiaTime,
    });
    await newNotification.save();

    await Booking.findByIdAndUpdate(bookingId, {
      bookingStatus: "In Progress",
      currentStatus: "Balance",
    });

    return res
      .status(200)
      .json({ success: true, message: "Booking completed" });
  } catch (e) {
    return res.status(500).json({ error: "Failed to complete the booking" });
  }
};

exports.payBalance = async (req, res) => {
  const { bookingId, cleanerId } = req.body;

  const findBooking = await Booking.findById(bookingId);
  if (!findBooking) {
    return res.status(400).json({ error: "Booking not found" });
  }

  if (findBooking.currentStatus !== "Balance") {
    return res
      .status(400)
      .json({ error: "Balance payment not allowed. Booking is not completed" });
  }

  try {
    findBooking.remainingBalance = 0;
    findBooking.bookingStatus = "In Progress";
    findBooking.currentStatus = "Admin Review";
    await findBooking.save();

    const newNotification = new Notification({
      id: cleanerId,
      title: "Payment Received.",
      desc: "The customer has completed the full payment for the service. Awaiting for admin review",
      isRead: false,
      createdAt: malaysiaTime,
    });
    await newNotification.save();

    return res.status(200).json({
      message: "Payment successful",
    });
  } catch (e) {
    return res.status(500).json({ error: "Internal server error" });
  }
};

exports.rateService = async (req, res) => {
  const {
    userId,
    cleanerId,
    serviceId,
    bookingId,
    serviceRating,
    serviceReview,
    cleanerRating,
    cleanerReview,
  } = req.body;

  const findCleaner = await Cleaner.findById(cleanerId);
  if (!findCleaner) {
    return res.status(400).json({ error: "Cleaner not found" });
  }

  const findService = await CleanerService.findById(serviceId);
  if (!findService) {
    return res.status(400).json({ error: "Service not found" });
  }

  const findBooking = await Booking.findById(bookingId);
  if (!findBooking) {
    return res.status(400).json({ error: "Booking not found" });
  }

  try {
    findCleaner.reviews.push({
      userId,
      userRating: cleanerRating,
      userReview: cleanerReview,
      createdAt: malaysiaTime,
    });

    findService.reviews.push({
      userId,
      userRating: serviceRating,
      userReview: serviceReview,
      createdAt: malaysiaTime,
    });

    await findCleaner.save();
    await findService.save();

    const newNotification = new Notification({
      id: cleanerId,
      title: "You've received a new rating!",
      desc: "A customer has rated your service. Check it out to see their feedback!",
      isRead: false,
      createdAt: malaysiaTime,
    });
    await newNotification.save();

    findBooking.isRated = true;
    await findBooking.save();

    return res.status(200).json({ message: "Review submitted successfully" });
  } catch (e) {
    return res.status(500).json({ error: "Internal server error" });
  }
};

exports.completeReview = async (req, res) => {
  const { bookingId } = req.body;

  const findBooking = await Booking.findById(bookingId);
  if (!findBooking) {
    return res.status(400).json({ error: "Booking not found" });
  }

  try {
    if (
      findBooking.bookingStatus === "Deposit" &&
      findBooking.currentStatus === "Admin Review"
    ) {
      findBooking.bookingStatus = "In Progress";
      findBooking.currentStatus = "In Progress";
    }

    if (
      findBooking.bookingStatus === "In Progress" &&
      findBooking.currentStatus === "Admin Review"
    ) {
      findBooking.bookingStatus = "Completed";
      findBooking.currentStatus = "Completed";
    }

    await findBooking.save();
    return res.status(200).json({ message: "Status updated successful" });
  } catch (e) {
    return res.status(500).json({ error: "Internal server error" });
  }
};

exports.releasePayment = async (req, res) => {
  const { bookingId, userId, cleanerId } = req.body;

  const findBooking = await Booking.findById(bookingId);
  if (!findBooking) {
    return res.status(400).json({ error: "Booking not found" });
  }

  const findCleaner = await Cleaner.findById(cleanerId);
  if (!findCleaner) {
    return res.status(400).json({ error: "Cleaner not found" });
  }

  try {
    const finalAmount = findBooking.total - findBooking.fee;

    findCleaner.balance = (findCleaner.balance || 0) + finalAmount;
    findCleaner.transactions.push({
      userId,
      createdAt: malaysiaTime,
      finalAmount: finalAmount,
    });
    await findCleaner.save();

    findBooking.isReleased = true;
    await findBooking.save();

    return res.status(200).json({ message: "Payment released successful" });
  } catch (e) {
    return res.status(500).json({ error: "Internal server error" });
  }
};
