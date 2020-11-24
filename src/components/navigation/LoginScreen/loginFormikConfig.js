import * as yup from 'yup';
import {strings} from 'constants/strings';

export const LOGIN_FIELDS = {
  USERNAME: 'username',
  PASSWORD: 'password',
};
const FIELDS = LOGIN_FIELDS;

const {requiredField} = strings.validations;
const validationSchema = yup.object().shape({
  [FIELDS.USERNAME]: yup.string().required(requiredField),
  [FIELDS.PASSWORD]: yup.string().required(requiredField),
});
export const initialValues = {
  [FIELDS.USERNAME]: '',
  [FIELDS.PASSWORD]: '',
};

export const loginFormikConfig = (onSubmit) => ({
  initialValues,
  validationSchema,
  onSubmit,
});
