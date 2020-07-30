import {
  required,
  number,
  minValue,
  minLength,
  maxLength,
  email,
} from "react-admin";

const formValidation = {
  validateRequired: [required("emptyValidation")],
  validateDni: [required("emptyValidation"), number("numericValidation")],
  validateCuit: [required("emptyValidation"), number("numericValidation")],
  validateText: [required("emptyValidation"), minLength(4), maxLength(50)],
  validateCard: [required("emptyValidation"), number("numericValidation")],
  validateCvc: [required("emptyValidation"), number("numericValidation")],
  validateEmail: [required("emptyValidation"), email("emailValidation")],
  validateNumber: [
    required("emptyValidation"),
    number("numericValidation"),
    minValue(1),
  ],
  validatePoints: [
    required("emptyValidation"),
    number("numericValidation"),
    minValue(0),
  ],
  validatePhone: [required("emptyValidation"), number("numericValidation")],
};

export default formValidation;
