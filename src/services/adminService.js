import axios from "axios";
import { API_ENDPOINTS } from "../constants";
import { uploadImageToCloudinary } from "./cloudinaryService";

export const getAdminOverview = async () => {
  try {
    const response = await axios.get(`${API_ENDPOINTS.admin}/get-overview`);
    return response;
  } catch (e) {
    throw e.response.data;
  }
};

export const getPendingCleaners = async () => {
  try {
    const response = await axios.get(
      `${API_ENDPOINTS.admin}/get-pending-cleaners`
    );
    return response;
  } catch (e) {
    throw e.response.data;
  }
};

export const approveCleaner = async (cleanerId) => {
  try {
    const response = await axios.post(
      `${API_ENDPOINTS.admin}/approve-cleaner`,
      { cleanerId: cleanerId }
    );
    return response;
  } catch (e) {
    throw e.response.data;
  }
};

export const rejectCleaner = async (cleanerId) => {
  try {
    const response = await axios.post(`${API_ENDPOINTS.admin}/reject-cleaner`, {
      cleanerId: cleanerId,
    });
    return response;
  } catch (e) {
    throw e.response.data;
  }
};

export const createAdvertisement = async (
  adverData,
  uploadPreset,
  assetFolder
) => {
  try {
    const createResponse = await axios.post(
      `${API_ENDPOINTS.admin}/create-new-advertisement`,
      adverData
    );
    if (createResponse.status !== 200) {
      return createResponse.data.error;
    }

    const adverId = createResponse.data.adverId;

    const adverPopUpImage = await uploadImageToCloudinary(
      uploadPreset,
      assetFolder,
      adverData.adverPopUpImage,
      `${adverId}-pop-up`
    );
    if (!adverPopUpImage) {
      throw { error: "Failed to upload pop up image" };
    }

    const adverBannerImage = await uploadImageToCloudinary(
      uploadPreset,
      assetFolder,
      adverData.adverBannerImage,
      `${adverId}-banner`
    );
    if (!adverBannerImage) {
      throw { error: "Failed to upload banner image" };
    }

    adverData.adverPopUpImage = adverPopUpImage;
    adverData.adverBannerImage = adverBannerImage;

    const updateResponse = await axios.post(
      `${API_ENDPOINTS.admin}/update-advertisement`,
      {
        ...adverData,
        adverId,
      }
    );
    if (updateResponse.status !== 200) {
      return updateResponse.data.error;
    }

    return updateResponse;
  } catch (e) {
    throw e.response.data;
  }
};

export const updateAdvertisement = async (
  adverData,
  uploadPreset,
  assetFolder
) => {
  try {
    const adverPopUpImage = await uploadImageToCloudinary(
      uploadPreset,
      assetFolder,
      adverData.adverPopUpImage,
      `${adverData.adverId}-pop-up`
    );
    if (!adverPopUpImage) throw { error: "Failed to upload pop up image" };

    const adverBannerImage = await uploadImageToCloudinary(
      uploadPreset,
      assetFolder,
      adverData.adverBannerImage,
      `${adverData.adverId}-banner`
    );
    if (!adverBannerImage) {
      throw { error: "Failed to upload banner image" };
    }

    adverData.adverPopUpImage = adverPopUpImage;
    adverData.adverBannerImage = adverBannerImage;

    const response = await axios.post(
      `${API_ENDPOINTS.admin}/update-advertisement`,
      adverData
    );
    if (response.status !== 200) {
      return response.data.error;
    }

    return response;
  } catch (e) {
    throw e.response.data;
  }
};

export const deleteAdvertisement = async (adverId) => {
  try {
    const response = await axios.post(
      `${API_ENDPOINTS.admin}/delete-advertisement`,
      { adverId: adverId }
    );
    return response;
  } catch (e) {
    throw e.response.data;
  }
};

export const getAdvertisements = async () => {
  try {
    const response = await axios.get(
      `${API_ENDPOINTS.admin}/get-advertisements`
    );
    return response;
  } catch (e) {
    throw e.response.data;
  }
};

export const createService = async (serviceData, uploadPreset, assetFolder) => {
  try {
    const createResponse = await axios.post(
      `${API_ENDPOINTS.admin}/create-new-service`,
      serviceData
    );
    if (createResponse.status !== 200) {
      return createResponse.data.error;
    }

    const serviceId = createResponse.data.serviceId;
    const serviceImage = await uploadImageToCloudinary(
      uploadPreset,
      assetFolder,
      serviceData.serviceImage,
      serviceId
    );
    if (!serviceImage) {
      throw { error: "Failed to upload service image" };
    }
    serviceData.serviceImage = serviceImage;

    const updateResponse = await axios.post(
      `${API_ENDPOINTS.admin}/update-service`,
      {
        ...serviceData,
        serviceId,
      }
    );
    if (updateResponse.status !== 200) {
      return updateResponse.data.error;
    }

    return updateResponse;
  } catch (e) {
    if (e.response && e.response.data) {
      throw new Error(e.response.data.error);
    } else {
      throw new Error("Network error. Please try again.");
    }
  }
};

export const updateService = async (serviceData, uploadPreset, assetFolder) => {
  try {
    const serviceImage = await uploadImageToCloudinary(
      uploadPreset,
      assetFolder,
      serviceData.serviceImage,
      serviceData.serviceId
    );
    if (!serviceImage) {
      throw { error: "Failed to upload service image" };
    }
    serviceData.serviceImage = serviceImage;

    const response = await axios.post(
      `${API_ENDPOINTS.admin}/update-service`,
      serviceData
    );
    if (response.status !== 200) {
      return response.data.error;
    }

    return response;
  } catch (e) {
    if (e.response && e.response.data) {
      throw new Error(e.response.data.error);
    } else {
      throw new Error("Network error. Please try again.");
    }
  }
};

export const deleteService = async (serviceId) => {
  try {
    const response = await axios.post(`${API_ENDPOINTS.admin}/delete-service`, {
      serviceId: serviceId,
    });
    return response;
  } catch (e) {
    throw e.response.data;
  }
};

export const getServices = async () => {
  try {
    const response = await axios.get(`${API_ENDPOINTS.admin}/get-services`);
    return response;
  } catch (e) {
    throw e.response.data;
  }
};

export const getBookingsByAdmin = async () => {
  try {
    const response = await axios.get(`${API_ENDPOINTS.admin}/get-bookings`);
    return response;
  } catch (e) {
    throw e.response.data;
  }
};
