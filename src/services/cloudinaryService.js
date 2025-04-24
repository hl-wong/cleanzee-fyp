import axios from "axios";
import { API_ENDPOINTS } from "../constants";

const CLOUDINARY_UPLOAD_URL = "";
const API_KEY = "";

export const uploadImageToCloudinary = async (
  uploadPreset,
  assetFolder,
  imageUri,
  id
) => {
  try {
    const timestamp = Math.floor(Date.now() / 1000);
    const signatureResponse = await axios.post(
      `${API_ENDPOINTS.cloudinary}/generate-signature`,
      {
        timestamp,
        uploadPreset,
        public_id: `${assetFolder}/${id}`,
      }
    );

    const { signature } = signatureResponse.data;

    const formData = new FormData();
    formData.append("file", {
      uri: imageUri,
      type: "image/jpeg",
      name: "upload.jpg",
    });
    formData.append("upload_preset", uploadPreset);
    formData.append("api_key", API_KEY);
    formData.append("timestamp", timestamp);
    formData.append("signature", signature);
    formData.append("public_id", `${assetFolder}/${id}`);

    const response = await axios.post(CLOUDINARY_UPLOAD_URL, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });

    return response.data.secure_url;
  } catch (e) {
    console.error("Cloudinary Upload Error:", e.response?.data || e.message);
  }
};
