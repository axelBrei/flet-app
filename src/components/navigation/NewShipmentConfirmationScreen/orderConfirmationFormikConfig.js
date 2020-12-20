import * as yup from 'yup';
import {strings} from 'constants/strings';

const {requiredField} = strings.validations;

export const FIELDS = {
  ADD_INSURANCE: 'addInsurance',
  PAYMENT_METHOD: 'paymentMethod',
};

const initialValues = (values) => ({
  [FIELDS.ADD_INSURANCE]: values[FIELDS.ADD_INSURANCE] || false,
  [FIELDS.PAYMENT_METHOD]: values[FIELDS.PAYMENT_METHOD] || null,
});

const validationSchema = yup.object({
  [FIELDS.ADD_INSURANCE]: yup.object().nullable(),
  [FIELDS.PAYMENT_METHOD]: yup.object().nullable().required(requiredField),
});

export const formikConfig = (onSubmit, initialV) => ({
  onSubmit,
  initialValues: initialValues(initialV),
  validationSchema,
});
