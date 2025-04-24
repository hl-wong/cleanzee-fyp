const User = require("../models/user");
const Cleaner = require("../models/cleaner");
const Advertisement = require("../models/advertisement");
const Service = require("../models/service");
const CleanerService = require("../models/cleanerService");

exports.getUserData = async (req, res) => {
  const { id } = req.params;

  try {
    const findUser = await User.findById(id);
    if (!findUser) {
      return res.status(401).send({ error: "Account no longer exists" });
    }

    return res.status(200).send({ user: findUser });
  } catch (e) {
    return res.status(500).send({ error: "Server error" });
  }
};

exports.getCleanerData = async (req, res) => {
  const { id } = req.params;

  const findCleaner = await Cleaner.findOne({ userId: id })
    .populate({
      path: "reviews.userId",
      model: "User",
      select: "firstName lastName profilePicture",
    })
    .populate({
      path: "transactions.userId",
      model: "User",
      select: "firstName lastName",
    });
  if (!findCleaner) {
    return res
      .status(400)
      .json({ error: "User does not register as cleaner yet" });
  }

  try {
    return res.status(200).json({ cleaner: findCleaner });
  } catch (e) {
    return res.status(500).json({ error: "Server error" });
  }
};

exports.getActiveAdvertisements = async (req, res) => {
  try {
    const findActiveAdvertisements = await Advertisement.find({
      adverStatus: true,
    });

    return res.status(200).json(findActiveAdvertisements);
  } catch (e) {
    return res.status(500).json({ error: "Server error" });
  }
};

exports.searchServices = async (req, res) => {
  const { serviceName, userId } = req.body;

  if (!serviceName) {
    return res.status(400).json({ error: "Service name is required" });
  }

  try {
    const findCleanerServices = await CleanerService.find({
      serviceName: { $regex: serviceName, $options: "i" },
      userId: { $ne: userId },
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
        path: "serviceId",
        model: "Service",
        select:
          "serviceImage serviceName serviceCategory serviceDesc servicePricingType servicePrice",
      });

    return res.status(200).json(findCleanerServices);
  } catch (e) {
    return res.status(500).json({ error: "Server error" });
  }
};

exports.getRandomServices = async (req, res) => {
  const { userId } = req.body;

  try {
    const findRandomServices = await CleanerService.find({
      userId: { $ne: userId },
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
        path: "serviceId",
        model: "Service",
        select:
          "serviceImage serviceName serviceCategory serviceDesc servicePricingType servicePrice",
      })
      .populate({
        path: "reviews.userId",
        model: "User",
        select: "firstName lastName profilePicture",
      });

    return res.status(200).json(findRandomServices);
  } catch (e) {
    return res.status(500).json({ error: "Server error" });
  }
};

exports.getServiceCategory = async (req, res) => {
  const { userId, category } = req.body;

  try {
    const findServices = await CleanerService.find({
      serviceCategory: category,
      userId: { $ne: userId },
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
        path: "serviceId",
        model: "Service",
        select:
          "serviceImage serviceName serviceCategory serviceDesc servicePricingType servicePrice",
      });

    return res.status(200).json(findServices);
  } catch (e) {
    return res.status(500).json({ error: "Server error" });
  }
};
