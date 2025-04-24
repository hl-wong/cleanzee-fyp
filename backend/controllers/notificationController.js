const User = require("../models/user");
const Cleaner = require("../models/cleaner");
const Notification = require("../models/notification");

exports.getUserNotifications = async (req, res) => {
  const { userId } = req.params;

  const findUser = await User.findById(userId);
  if (!findUser) {
    return res.status(400).send({ error: "User not found" });
  }

  try {
    const findNotifications = await Notification.find({ id: userId });

    return res.status(200).json(findNotifications);
  } catch (e) {
    return res.status(500).json({ error: "Server error" });
  }
};

exports.getCleanerNotifications = async (req, res) => {
  const { cleanerId } = req.body;

  const findCleaner = await Cleaner.findById(cleanerId);
  if (!findCleaner) {
    return res.status(400).json({ error: "Cleaner not found" });
  }

  try {
    const findNotifications = await Notification.find({ id: cleanerId });

    return res.status(200).json(findNotifications);
  } catch (e) {
    return res.status(500).json({ error: "Server error" });
  }
};
