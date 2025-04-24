import * as Yup from "yup";

export const bookingRequestSchema = Yup.object().shape({
  date: Yup.string().required("Please select date"),
  time: Yup.string().required("Please select time"),
  address: Yup.string().required("Address is required"),
});

export const rateReviewSchema = Yup.object().shape({
  serviceRating: Yup.number()
    .min(1, "Please rate ther service")
    .required("Please rate the service"),
  serviceReview: Yup.string().required("Please review the service"),
  cleanerRating: Yup.number()
    .min(1, "Please rate ther cleaner")
    .required("Please rate the cleaner"),
  cleanerReview: Yup.string().required("Please review the cleaner"),
});
