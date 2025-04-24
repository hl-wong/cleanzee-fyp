const User = require("../models/user");
const Cleaner = require("../models/cleaner");
const axios = require("axios");
const geolib = require("geolib");

const getCoordinatesFromAddress = async (address) => {
  const geocodeUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
    address
  )}&key=${process.env.GOOGLE_API_KEY}`;

  try {
    const response = await axios.get(geocodeUrl);
    if (response.data.status === "OK") {
      const location = response.data.results[0].geometry.location;
      return {
        latitude: location.lat,
        longitude: location.lng,
      };
    } else {
      throw new Error("Geocoding failed: Address not found");
    }
  } catch (error) {
    console.error("Error during geocoding:", error);
    throw error;
  }
};

exports.getNearbyCleaners = async (req, res) => {
  const { userId, latitude, longitude } = req.body;

  const findUser = await User.findById(userId);
  if (!findUser) {
    return res.status(400).json({ error: "User not found" });
  }

  if (!latitude || !longitude) {
    return res.status(400).json({ error: "Location is required" });
  }

  const findCleaners = await Cleaner.find({
    approved: true,
    userId: { $ne: userId },
  })
    .populate({
      path: "userId",
      model: "User",
      select: "firstName lastName profilePicture",
    })
    .populate({
      path: "reviews.userId",
      model: "User",
      select: "firstName lastName profilePicture",
    });

  try {
    const findNearbyCleaners = [];

    for (const cleaner of findCleaners) {
      if (!cleaner.address) continue;

      const { latitude: cleanerLatitude, longitude: cleanerLongitude } =
        await getCoordinatesFromAddress(cleaner.address);

      const distance = geolib.getDistance(
        { latitude, longitude },
        { latitude: cleanerLatitude, longitude: cleanerLongitude }
      );

      const reviews = cleaner.reviews.map((review) => ({
        userRating: review.userRating,
        userReview: review.userReview,
        userId: review.userId
          ? {
              _id: review.userId._id,
              firstName: review.userId.firstName,
              lastName: review.userId.lastName,
              profilePicture: review.userId.profilePicture,
            }
          : null,
        createdAt: review.createdAt,
      }));

      if (distance <= 5000) {
        findNearbyCleaners.push({
          ...cleaner.toObject(),
          distance: distance,
          latitude: cleanerLatitude,
          longitude: cleanerLongitude,
          reviews: reviews,
        });
      }
    }

    return res.status(200).json(findNearbyCleaners);
  } catch (e) {
    return res.status(500).json({ error: "Server error" });
  }
};
