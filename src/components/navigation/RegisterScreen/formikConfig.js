import * as yup from 'yup';
import {strings} from 'constants/strings';

export const REGISTER_PERSONAL_DATA_FIELDS = {
  NAME: 'name',
  LAST_NAME: 'lastName',
  MAIL: 'email',
  PASSWORD: 'password',
  CONFIRM_PASSWORD: 'confirmPassword',
};

const FIELDS = REGISTER_PERSONAL_DATA_FIELDS;
export const initialValues = (values = {}) => ({
  [FIELDS.NAME]: values?.[FIELDS.NAME] || '',
  [FIELDS.LAST_NAME]: values?.[FIELDS.LAST_NAME] || '',
  [FIELDS.MAIL]: values?.[FIELDS.MAIL] || '',
  [FIELDS.PASSWORD]: values?.[FIELDS.PASSWORD] || '',
  [FIELDS.CONFIRM_PASSWORD]: values?.[FIELDS.CONFIRM_PASSWORD] || '',
});
const initialTouched = {
  [FIELDS.NAME]: false,
  [FIELDS.LAST_NAME]: false,
  [FIELDS.MAIL]: false,
  [FIELDS.PASSWORD]: false,
  [FIELDS.CONFIRM_PASSWORD]: false,
};

const {requiredField, emailRequired, minimumFieldLength} = strings.validations;

const validationSchema = yup.object().shape({
  [FIELDS.NAME]: yup
    .string()
    .min(3, minimumFieldLength)
    .required(requiredField),
  [FIELDS.LAST_NAME]: yup.string().required(requiredField),
  [FIELDS.MAIL]: yup
    .string()
    .min(8, minimumFieldLength)
    .email(emailRequired)
    .required(requiredField),
  [FIELDS.PASSWORD]: yup
    .string()
    .min(5, minimumFieldLength)
    .required(requiredField),
  [FIELDS.CONFIRM_PASSWORD]: yup
    .string()
    .min(5, minimumFieldLength)
    .oneOf([yup.ref('password'), null], 'Las contraseñas no coinciden')
    .required(requiredField),
});

export const personalDataFormikConfig = (values = {}, onSubmit) => ({
  onSubmit,
  initialTouched,
  initialValues: initialValues(values),
  validationSchema,
});
