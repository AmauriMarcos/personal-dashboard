import * as yup from "yup";

export const SignupSchema = yup.object().shape({
    email: yup.string().email().required("This field is required."),
    password: yup
      .string()
      .min(6, "Password is too short.")
      .max(20, "Password is too long.")
      .required("This field is required."),
    passwordConfirmation: yup
      .string()
      .min(6, "Password is too short.")
      .max(20, "Password is too long.")
      .required("This field is required."),
  });
