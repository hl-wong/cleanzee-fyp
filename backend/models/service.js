const mongoose = require("mongoose");

const ServiceSchema = new mongoose.Schema({
  serviceImage: String,
  serviceName: String,
  serviceCategory: String,
  serviceDesc: String,
  servicePricingType: String,
  servicePrice: [
    {
      label: { type: String, required: false },
      sqftRange: { type: String, required: false },
      duration: { type: String, required: false },
      price: { type: String, required: true },
    },
  ],
});

module.exports = mongoose.model("Service", ServiceSchema);
