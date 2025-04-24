import * as Yup from "yup";

export const changePasswordSchema = Yup.object().shape({
  currentPassword: Yup.string().required("Current password is required"),
  newPassword: Yup.string()
    .min(8, "Password must be at least 8 characters")
    .matches(/[A-Z]/, "Must include an uppercase letter")
    .matches(/[a-z]/, "Must include a lowercase letter")
    .matches(/\d/, "Must include a number")
    .matches(/[@$!%*?&]/, "Includes a symbol")
    .required("Password is required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("newPassword")], "Password must match")
    .required("Confirm Password is required"),
});

export const editProfileSchema = Yup.object().shape({
  firstName: Yup.string().required("First Name is required"),
  lastName: Yup.string().required("Last Name is required"),
  phoneNo: Yup.string()
    .matches(
      /^(01[0-9]-\d{7,8}|0[3-9]-\d{7,8})$/,
      "Invalid phone number format (e.g. 012-3456789)"
    )
    .required("Phone no is required"),
});

export const addressSchema = Yup.object().shape({
  label: Yup.string().required("Label is required"),
  fullName: Yup.string().required("Full name is required"),
  street: Yup.string().required("Street is required"),
  city: Yup.string().required("City is required"),
  postcode: Yup.string().required("Postcode is required"),
  state: Yup.string().required("State is required"),
  phoneNo: Yup.string()
    .matches(
      /^(01[0-9]-\d{7,8}|0[3-9]-\d{7,8})$/,
      "Invalid phone number format (e.g. 012-3456789)"
    )
    .required("Phone no is required"),
});

export const cleanerRegistrationSchema = Yup.object().shape({
  fullName: Yup.string().required("Full name is required"),
  icNumber: Yup.string()
    .matches(
      /^\d{6}-\d{2}-\d{4}$/,
      "Invalid IC number format (e.g. YYMMDD-XX-XXXX)"
    )
    .required("IC number is required"),
  selfiePhoto: Yup.string().required("Selfie with IC is required"),
  agreeToTerms: Yup.boolean()
    .oneOf([true], "You must agree to the Terms & Conditions")
    .required(),
});

export const informationSchema = Yup.object().shape({
  fullName: Yup.string().required("Full name is required"),
  phoneNo: Yup.string()
    .matches(
      /^(01[0-9]-\d{7,8}|0[3-9]-\d{7,8})$/,
      "Invalid phone number format (e.g. 012-3456789)"
    )
    .required("Phone no is required"),
  address: Yup.string().required("Address is required"),
});

export const verificationSchema = Yup.object().shape({
  icNumber: Yup.string()
    .matches(
      /^\d{6}-\d{2}-\d{4}$/,
      "Invalid IC number format (e.g. YYMMDD-XX-XXXX)"
    )
    .required("IC number is required"),
  selfiePhoto: Yup.string().required("Selfie with IC is required"),
  agreeToTerms: Yup.boolean()
    .oneOf([true], "You must agree to the Terms & Conditions")
    .required(),
});
