const User = require("../models/user");
const Cleaner = require("../models/cleaner");
const Booking = require("../models/booking");
const Advertisement = require("../models/advertisement");
const mongoose = require("mongoose");
const Service = require("../models/service");
const Notification = require("../models/notification");
const { malaysiaTime } = require("../utils/timeUtils");

exports.getAdminOverview = async (req, res) => {
  try {
    const totalUsers = await User.countDocuments();
    const pendingCleaners = await Cleaner.countDocuments({ approved: false });

    const overview = [
      { label: "Total User", value: totalUsers },
      { label: "Pending Cleaners", value: pendingCleaners },
    ];

    return res.status(200).json(overview);
  } catch (e) {
    return res.status(500).json({ error: "Internal server error" });
  }
};

exports.getPendingCleaners = async (req, res) => {
  try {
    const pendingCleaners = await Cleaner.find({ approved: false }).populate({
      path: "userId",
      model: "User",
      select: "firstName lastName profilePicture email",
    });
    return res.status(200).json(pendingCleaners);
  } catch (e) {
    return res.status(500).json({ error: "Internal server error" });
  }
};

exports.approveCleaner = async (req, res) => {
  const { cleanerId } = req.body;

  try {
    const findCleaner = await Cleaner.findByIdAndUpdate(
      cleanerId,
      { approved: true },
      { new: true }
    );

    if (!findCleaner) {
      return res.status(404).json({ error: "Cleaner not found" });
    }

    const newNotification = new Notification({
      id: findCleaner.userId,
      title: "Cleaner Registration Approved",
      desc: "Your registration as a cleaner has been approved!",
      isRead: false,
      createdAt: malaysiaTime,
    });
    await newNotification.save();

    return res.status(200).json({ message: "Cleaner approved successfully" });
  } catch (error) {
    return res.status(500).json({ error: "Internal server error" });
  }
};

exports.rejectCleaner = async (req, res) => {
  const { cleanerId } = req.body;

  try {
    const findCleaner = await Cleaner.findByIdAndDelete(cleanerId);

    if (!findCleaner) {
      return res.status(404).json({ error: "Cleaner not found" });
    }

    const newNotification = new Notification({
      id: findCleaner.userId,
      title: "Cleaner Registration Rejected",
      desc: "Your registration as a cleaner has been rejected!",
      isRead: false,
      createdAt: malaysiaTime,
    });
    await newNotification.save();

    return res.status(200).json({ message: "Cleaner rejected and removed" });
  } catch (error) {
    return res.status(500).json({ error: "Internal server error" });
  }
};

exports.createNewAdvertisement = async (req, res) => {
  const {
    adverTitle,
    adverDesc,
    adverStart,
    adverEnd,
    discountType,
    percentage,
    amount,
    promoCode,
    adverStatus,
  } = req.body;

  try {
    const newAdvertisement = new Advertisement({
      _id: new mongoose.Types.ObjectId(),
      adverTitle: adverTitle,
      adverDesc: adverDesc,
      adverStart: adverStart,
      adverEnd: adverEnd,
      discountType: discountType,
      percentage: percentage,
      amount: amount,
      promoCode: promoCode,
      adverStatus: adverStatus,
    });

    await newAdvertisement.save();

    return res.status(200).json({ adverId: newAdvertisement._id });
  } catch (e) {
    return res.status(500).json({ error: "Internal server error" });
  }
};

exports.updateAdvertisement = async (req, res) => {
  const {
    adverId,
    adverPopUpImage,
    adverBannerImage,
    adverTitle,
    adverDesc,
    adverStart,
    adverEnd,
    discountType,
    percentage,
    amount,
    promoCode,
    adverStatus,
  } = req.body;

  const findAdvertisement = await Advertisement.findById(adverId);
  if (!findAdvertisement) {
    return res.status(400).json({ error: "Advertisement not found" });
  }

  try {
    await Advertisement.findByIdAndUpdate(
      adverId,
      {
        adverPopUpImage: adverPopUpImage,
        adverBannerImage: adverBannerImage,
        adverTitle: adverTitle,
        adverDesc: adverDesc,
        adverStart: adverStart,
        adverEnd: adverEnd,
        discountType: discountType,
        percentage: percentage,
        amount: amount,
        promoCode: promoCode,
        adverStatus: adverStatus,
      },
      { new: true }
    );

    return res
      .status(200)
      .json({ message: "Advertisement updated successfully" });
  } catch (e) {
    return res.status(500).json({ error: "Internal server error" });
  }
};

exports.deleteAdvertisement = async (req, res) => {
  const { adverId } = req.body;

  try {
    const findAdvertisement = await Advertisement.findByIdAndDelete(adverId);
    if (!findAdvertisement) {
      return res.status(404).json({ error: "Advertisement not found" });
    }

    return res
      .status(200)
      .json({ message: "Advertisement deleted successfully" });
  } catch (e) {
    return res.status(500).json({ error: "Internal server error" });
  }
};

exports.getAdvertisements = async (req, res) => {
  try {
    const findAdvertisement = await Advertisement.find();

    return res.status(200).json(findAdvertisement);
  } catch (e) {
    return res.status(500).json({ error: "Internal server error" });
  }
};

exports.createNewService = async (req, res) => {
  const {
    serviceName,
    serviceCategory,
    serviceDesc,
    servicePricingType,
    servicePrice,
  } = req.body;

  try {
    const newService = new Service({
      _id: new mongoose.Types.ObjectId(),
      serviceName: serviceName,
      serviceCategory: serviceCategory,
      serviceDesc: serviceDesc,
      servicePricingType: servicePricingType,
      servicePrice: servicePrice,
    });

    await newService.save();

    return res.status(200).json({ serviceId: newService._id });
  } catch (e) {
    return res.status(500).json({ error: "Internal server error" });
  }
};

exports.updateService = async (req, res) => {
  const {
    serviceId,
    serviceImage,
    serviceName,
    serviceCategory,
    serviceDesc,
    servicePricingType,
    servicePrice,
  } = req.body;

  const findService = await Service.findById(serviceId);
  if (!findService) {
    return res.status(400).json({ error: "Service not found" });
  }

  try {
    await Service.findByIdAndUpdate(
      serviceId,
      {
        serviceImage: serviceImage,
        serviceName: serviceName,
        serviceCategory: serviceCategory,
        serviceDesc: serviceDesc,
        servicePricingType: servicePricingType,
        servicePrice: servicePrice,
      },
      { new: true }
    );

    return res.status(200).json({ message: "Service updated successfully" });
  } catch (e) {
    return res.status(500).json({ error: "Internal server error" });
  }
};

exports.deleteService = async (req, res) => {
  const { serviceId } = req.body;

  try {
    const findService = await Service.findByIdAndDelete(serviceId);
    if (!findService) {
      return res.status(404).json({ error: "Service not found" });
    }

    return res.status(200).json({ message: "Service deleted successfully" });
  } catch (e) {
    return res.status(500).json({ error: "Internal server error" });
  }
};

exports.getServices = async (req, res) => {
  try {
    const findServices = await Service.find();

    return res.status(200).json(findServices);
  } catch (e) {
    return res.status(500).json({ error: "Internal server error" });
  }
};

exports.getBookings = async (req, res) => {
  try {
    const findBookings = await Booking.find()
      .populate({
        path: "userId",
        model: "User",
        select: "firstName lastName profilePicture email",
      })
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
          select:
            "serviceImage serviceName serviceCategory serviceDesc servicePricingType servicePrice",
        },
      });

    return res.status(200).json(findBookings);
  } catch (e) {
    return res.status(500).json({ error: "Internal server error" });
  }
};
