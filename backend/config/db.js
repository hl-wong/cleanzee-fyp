const mongoose = require("mongoose");

const connectDB = async () => {
  mongoose
    .connect(process.env.MONGODB_URL)
    .then(() => console.log("Database is connected"))
    .catch((e) => console.log(e));
};

module.exports = connectDB;
