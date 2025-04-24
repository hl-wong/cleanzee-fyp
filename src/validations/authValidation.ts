import * as Yup from "yup";

export const registerSchema = Yup.object().shape({
  firstName: Yup.string().required("First Name is required"),
  lastName: Yup.string().required("Last Name is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string()
    .min(8, "Password must be at least 8 characters")
    .matches(/[A-Z]/, "Must include an uppercase letter")
    .matches(/[a-z]/, "Must include a lowercase letter")
    .matches(/\d/, "Must include a number")
    .matches(/[@$!%*?&]/, "Includes a symbol")
    .required("Password is required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password")], "Password must match")
    .required("Confirm Password is required"),
});

export const otpValidationSchema = Yup.object().shape({
  otp: Yup.string()
    .matches(/^\d+$/, "OTP must contain only numbers")
    .length(6, "OTP must be exactly 6 digits")
    .required("OTP is required"),
});

export const forgotPasswordSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Email is required"),
});

export const resetPasswordSchema = Yup.object().shape({
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
