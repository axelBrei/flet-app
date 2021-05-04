import * as yup from 'yup';
import {strings} from 'constants/strings';

const {validations} = strings;

export const FIELDS = {
  EMAIL: 'email',
  PHONE: 'telephone',
};

const initialValues = {
  [FIELDS.EMAIL]: '',
  [FIELDS.PHONE]: '',
};

const validationSchema = yup.object({
  [FIELDS.EMAIL]: yup
    .string()
    .email(validations.emailRequired)
    .nullable()
    .required(validations.requiredField),
  [FIELDS.PHONE]: yup
    .number(validations.onlyNumbers)
    .nullable()
    .required(validations.requiredField),
});

export const formikConfig = onSubmit => ({
  initialValues,
  validationSchema,
  onSubmit,
});
