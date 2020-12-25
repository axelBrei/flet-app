import * as yup from 'yup';
import {strings} from 'constants/strings';
import {capitallize} from 'helpers/stringHelper';

const {requiredField, minimumFieldLength} = strings.validations;

export const FIELDS = {
  START_POINT: 'startPoint',
  END_POINT: 'endPoint',
  DESC: 'description',
  VALUE: 'value',
  SIZE: 'size',
};

const initialValues = {
  [FIELDS.START_POINT]: null,
  [FIELDS.END_POINT]: null,
  [FIELDS.DESC]: '',
  [FIELDS.VALUE]: 0,
  [FIELDS.SIZE]: 0,
};

const pointShape = {
  id: yup.string(),
  latitude: yup.number().required(requiredField),
  longitude: yup.number().required(requiredField),
  name: yup.string(),
};

const validationSchema = yup.object({
  [FIELDS.START_POINT]: yup
    .object(pointShape)
    .nullable()
    .required(requiredField),
  [FIELDS.END_POINT]: yup.object(pointShape).nullable().required(requiredField),
  [FIELDS.DESC]: yup
    .string()
    .min(4, minimumFieldLength)
    .required(requiredField),
  [FIELDS.VALUE]: yup.number(),
  [FIELDS.SIZE]: yup.number(),
});

export const formikConfig = (onSubmit) => ({
  onSubmit,
  initialValues,
  validationSchema,
});
