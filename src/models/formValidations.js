import { required, number, minValue, minLength, maxLength } from "react-admin";

const formValidation = {
  validateRequired: [required("emptyValidation")],
  validateDni: [required("emptyValidation"), number("numericValidation")],
  validateText: [required("emptyValidation"), minLength(4), maxLength(50)],
  validateCard: [required("emptyValidation"), number("numericValidation")],
  validateCvc: [required("emptyValidation"), number("numericValidation")],
  validateNumber: [
    required("emptyValidation"),
    number("numericValidation"),
    minValue(1),
  ],
};

export default formValidation;
