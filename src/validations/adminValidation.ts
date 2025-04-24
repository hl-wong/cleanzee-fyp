import * as Yup from "yup";

export const adverSchema = Yup.object().shape({
  adverPopUpImage: Yup.string().required("Pop-up image is required"),
  adverBannerImage: Yup.string().required("Banner image is required"),
  adverTitle: Yup.string().required("Title is required"),
  adverDesc: Yup.string()
    .min(10, "Description must be at least 20 characters")
    .required("Description is required"),
  adverStart: Yup.string().required("Start date is required"),
  adverEnd: Yup.string().required("End date is required"),
  discountType: Yup.string()
    .required("Discount type is required")
    .oneOf(["Percentage", "Fixed Amount"], "Invalid discount type"),
  percentage: Yup.string()
    .nullable()
    .when("discountType", ([discountType], schema) =>
      discountType === "Percentage"
        ? schema.required("Percentage is required")
        : schema
    ),
  amount: Yup.string()
    .nullable()
    .when("discountType", ([discountType], schema) =>
      discountType === "Fixed Amount"
        ? schema.required("Amount is required")
        : schema
    ),
  promoCode: Yup.string().required("Promo code is required"),
});

export const serviceSchema = Yup.object().shape({
  serviceImage: Yup.string().required("Image is required"),
  serviceName: Yup.string().required("Service name is required"),
  serviceCategory: Yup.string().required("Service category is required"),
  serviceDesc: Yup.string()
    .min(10, "Description must be at least 20 characters")
    .required("Description is required"),
  servicePricingType: Yup.string().required("Pricing type is required"),
  servicePrice: Yup.array().when(
    "servicePricingType",
    ([servicePricingType], schema) => {
      if (servicePricingType === "Hour") {
        return schema.of(
          Yup.object().shape({
            label: Yup.string().required("Label is required"),
            price: Yup.string().required("Price is required"),
            duration: Yup.string().required("Duration is required"),
          })
        );
      }

      if (servicePricingType === "Sqft") {
        return schema.of(
          Yup.object().shape({
            label: Yup.string().required("Label is required"),
            price: Yup.string().required("Price is required"),
            sqftRange: Yup.string().required("Sqft is required"),
          })
        );
      }

      if (servicePricingType === "Fixed") {
        return schema.of(
          Yup.object().shape({
            price: Yup.string().required("Price is required"),
          })
        );
      }

      return schema;
    }
  ),
});
