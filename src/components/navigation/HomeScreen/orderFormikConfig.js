import * as yup from 'yup';
import {strings} from 'constants/strings';

const {requiredField, minimumFieldLength} = strings.validations;

export const FIELDS = {
  START_POINT: 'startPoint',
  END_POINT: 'endPoint',
  DESC: 'descriptiom',
  VALUE: 'value',
  SIZE: 'size',
};

const initialValues = {
  [FIELDS.START_POINT]: '',
  [FIELDS.END_POINT]: '',
  [FIELDS.DESC]: '',
  [FIELDS.VALUE]: 0,
  [FIELDS.SIZE]: 0,
};

const validationSchema = yup.object({
  [FIELDS.START_POINT]: yup.string().required(requiredField),
  [FIELDS.END_POINT]: yup.string().required(requiredField),
  [FIELDS.DESC]: yup
    .string()
    .min(4, minimumFieldLength)
    .required(requiredField),
  [FIELDS.VALUE]: yup.number().required(requiredField),
  [FIELDS.SIZE]: yup.number().required(requiredField),
});

export const formikConfig = (onSubmit) => ({
  onSubmit,
  initialValues,
  validationSchema,
});
