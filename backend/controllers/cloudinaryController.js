const cloudinary = require("cloudinary").v2;

exports.generateSignature = async (req, res) => {
  const { timestamp, uploadPreset, public_id } = req.body;
  const signature = cloudinary.utils.api_sign_request(
    { public_id, timestamp, upload_preset: uploadPreset },
    process.env.API_SECRET
  );

  if (!timestamp || !uploadPreset) {
    return res.status(400).json({ error: "Missing required parameters" });
  }

  res.status(200).send({ signature, timestamp });
};
