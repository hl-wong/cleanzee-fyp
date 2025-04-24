const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");

connectDB();

const app = express();

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send({ status: "Started" });
});

const authRoutes = require("./routes/authRoutes");
app.use("/api/auth", authRoutes);
const cloudinaryRoutes = require("./routes/cloudinaryRoutes");
app.use("/api/cloudinary", cloudinaryRoutes);
const adminRoutes = require("./routes/adminRoutes");
app.use("/api/admin", adminRoutes);
const userRoutes = require("./routes/userRoutes");
app.use("/api/user", userRoutes);
const notificationRoutes = require("./routes/notificationRoutes");
app.use("/api/notification", notificationRoutes);
const nearbyRoutes = require("./routes/nearbyRoutes");
app.use("/api/nearby", nearbyRoutes);
const chatRoutes = require("./routes/chatRoutes");
app.use("/api/chat", chatRoutes);
const cleanerRoutes = require("./routes/cleanerRoutes");
app.use("/api/cleaner", cleanerRoutes);
const profileRoutes = require("./routes/profileRoutes");
app.use("/api/profile", profileRoutes);
const bookingRoutes = require("./routes/bookingRoutes");
app.use("/api/booking", bookingRoutes);

module.exports = app;
