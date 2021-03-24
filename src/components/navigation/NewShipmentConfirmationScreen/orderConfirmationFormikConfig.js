import * as yup from 'yup';
import {strings} from 'constants/strings';

const {requiredField} = strings.validations;

export const FIELDS = {
  INSURANCE: 'insurance',
  PAYMENT_METHOD: 'paymentMethod',
};

const initialValues = {
  [FIELDS.INSURANCE]: null,
  [FIELDS.PAYMENT_METHOD]: null,
};

const validationSchema = yup.object({
  [FIELDS.INSURANCE]: yup
    .object({
      id: yup.number().required(),
      title: yup.string(),
      value: yup.number(),
      valueModificator: yup.number(),
    })
    .nullable()
    .required(requiredField),
  [FIELDS.PAYMENT_METHOD]: yup
    .object({
      id: yup.number().required(),
      title: yup.string(),
    })
    .nullable()
    .required(requiredField),
});

export const formikConfig = (onSubmit, initialV) => ({
  onSubmit,
  initialValues,
  validationSchema,
});
