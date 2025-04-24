const Cleaner = require("../models/cleaner");
const CleanerService = require("../models/cleanerService");
const Service = require("../models/service");
const Booking = require("../models/booking");

exports.setAvailability = async (req, res) => {
  const { cleanerId, availability } = req.body;

  const findCleaner = await Cleaner.findById(cleanerId);
  if (!findCleaner) {
    return res.status(404).json({ error: "Cleaner not found" });
  }

  try {
    findCleaner.availability = availability;
    await findCleaner.save();

    return res.status(200).json({ message: "Availability updated" });
  } catch (e) {
    return res.status(500).json({ error: "Internal server error" });
  }
};

exports.assignService = async (req, res) => {
  const {
    userId,
    cleanerId,
    serviceId,
    serviceName,
    serviceCategory,
    servicePrice,
    timeslots,
    optionId,
  } = req.body;

  const findCleaner = await Cleaner.findById(cleanerId);
  if (!findCleaner) {
    return res.status(404).json({ error: "Cleaner not found" });
  }

  const newService = {
    userId: userId,
    cleanerId: cleanerId,
    serviceId: serviceId,
    serviceName: serviceName,
    serviceCategory: serviceCategory,
    servicePrice: servicePrice,
    timeslots: timeslots,
    optionId: optionId,
  };

  try {
    const assignedService = new CleanerService(newService);
    await assignedService.save();

    return res.status(200).json({ message: "Service assigned" });
  } catch (e) {
    return res.status(500).json({ error: "Internal server error" });
  }
};

exports.getAssignServices = async (req, res) => {
  const { cleanerId } = req.params;

  const findCleaner = await Cleaner.findById(cleanerId);
  if (!findCleaner) {
    return res.status(404).json({ error: "Cleaner not found" });
  }

  try {
    const findAssignedService = await CleanerService.find({
      cleanerId: cleanerId,
    })
      .populate({
        path: "serviceId",
        model: "Service",
        select:
          "serviceImage serviceName serviceCategory serviceDesc servicePricingType servicePrice",
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
        path: "reviews.userId",
        model: "User",
        select: "firstName lastName profilePicture",
      });

    return res.status(200).json(findAssignedService);
  } catch (e) {
    return res.status(500).json({ error: "Internal server error" });
  }
};

exports.updateAssignService = async (req, res) => {
  const { cleanerId, serviceName, servicePrice, timeslots, id } = req.body;

  const findCleaner = await Cleaner.findById(cleanerId);
  if (!findCleaner) {
    return res.status(404).json({ error: "Cleaner not found" });
  }

  const findAssignedService = await CleanerService.findById(id);
  if (!findAssignedService) {
    return res.status(404).json({ error: "Cleaner's service not found" });
  }

  await CleanerService.findByIdAndUpdate(
    id,
    {
      serviceName,
      servicePrice,
      timeslots,
    },
    { new: true }
  );

  try {
    return res.status(200).json({ message: "Service update successful" });
  } catch (e) {
    return res.status(500).json({ error: "Internal server error" });
  }
};

exports.deleteAssignService = async (req, res) => {
  const { cleanerId, serviceId } = req.body;

  const findCleaner = await Cleaner.findById(cleanerId);
  if (!findCleaner) {
    return res.status(404).json({ error: "Cleaner not found" });
  }

  try {
    await CleanerService.findByIdAndDelete(serviceId);

    return res.status(200).json({ message: "Assigned service is deleted" });
  } catch (e) {
    return res.status(500).json({ error: "Internal server error" });
  }
};

exports.getAdminServices = async (req, res) => {
  try {
    const findRandomServices = await Service.aggregate([
      { $sample: { size: 50 } },
    ]);

    return res.status(200).json(findRandomServices);
  } catch (e) {
    return res.status(500).json({ error: "Internal server error" });
  }
};

exports.getBookingStatus = async (req, res) => {
  const { cleanerId } = req.body;

  const findCleaner = await Cleaner.findById(cleanerId);
  if (!findCleaner) {
    return res.status(400).json({ error: "Cleaner not found" });
  }

  const findBooking = await Booking.find({ cleanerId: cleanerId });
  if (!findBooking) {
    return res.status(400).json({ error: "Booking not found" });
  }

  try {
    const groupedBookingStatus = {
      requested: [],
      ongoing: [],
      completed: [],
    };

    findBooking.forEach((booking) => {
      const status = booking.bookingStatus;

      if (status === "Response") groupedBookingStatus.requested.push(booking);
      else if (status === "Deposit" || status === "In Progress")
        groupedBookingStatus.ongoing.push(booking);
      else if (status === "Completed" || status === "Rate")
        groupedBookingStatus.completed.push(booking);
    });

    return res.status(200).json(groupedBookingStatus);
  } catch (e) {
    return res.status(500).json({ error: "Internal server error" });
  }
};
