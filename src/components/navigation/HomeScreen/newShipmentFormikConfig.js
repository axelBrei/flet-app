import * as yup from 'yup';
import {strings} from 'constants/strings';
import {capitallize} from 'helpers/stringHelper';

const {requiredField, minimumFieldLength} = strings.validations;

export const FIELDS = {
  START_POINT: 'startPoint',
  END_POINT: 'endPoint',
};

const initialValues = {
  [FIELDS.START_POINT]: null,
  [FIELDS.END_POINT]: null,
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
});

export const formikConfig = (onSubmit) => ({
  onSubmit,
  initialValues,
  validationSchema,
});
