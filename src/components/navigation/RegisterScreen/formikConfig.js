import * as yup from 'yup';
import {strings} from 'constants/strings';

export const REGISTER_PERSONAL_DATA_FIELDS = {
  NAME: 'name',
  LAST_NAME: 'lastName',
  PHONE: 'phone',
  MAIL: 'email',
  PASSWORD: 'password',
};

const FIELDS = REGISTER_PERSONAL_DATA_FIELDS;
export const initialValues = {
  [FIELDS.NAME]: '',
  [FIELDS.LAST_NAME]: '',
  [FIELDS.PHONE]: '',
  [FIELDS.MAIL]: '',
  [FIELDS.PASSWORD]: '',
};
const initialTouched = {
  [FIELDS.NAME]: false,
  [FIELDS.LAST_NAME]: false,
  [FIELDS.PHONE]: false,
  [FIELDS.MAIL]: false,
  [FIELDS.PASSWORD]: false,
};

const {
  requiredField,
  emailRequired,
  minimumFieldLength,
  validPhone,
} = strings.validations;

const validationSchema = yup.object().shape({
  [FIELDS.NAME]: yup
    .string()
    .min(3, minimumFieldLength)
    .required(requiredField),
  [FIELDS.LAST_NAME]: yup.string().required(requiredField),
  [FIELDS.PHONE]: yup
    .string()
    .min(5, minimumFieldLength)
    .matches(/[0-9]{6,8}$/gm, {
      // ^(\+54)?9?(11|15){1}
      excludeEmptyString: true,
      message: validPhone,
    })
    .required(requiredField),
  [FIELDS.MAIL]: yup
    .string()
    .min(8, minimumFieldLength)
    .email(emailRequired)
    .required(requiredField),
  [FIELDS.PASSWORD]: yup
    .string()
    .min(5, minimumFieldLength)
    .required(requiredField),
});

export const personalDataFormikConfig = (onSubmit) => ({
  onSubmit,
  initialTouched,
  initialValues,
  validationSchema,
});
