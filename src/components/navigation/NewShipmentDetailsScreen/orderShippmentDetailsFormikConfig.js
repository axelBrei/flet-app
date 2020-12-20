import * as yup from 'yup';
import {strings} from 'constants/strings';

export const FIELDS = {
  SIZE: 'vehiculeSize',
  EXTRA_HELP: 'extraHelp',
  COMMENTS: 'comments',
};

const initialValues = (values) => ({
  [FIELDS.SIZE]: values[FIELDS.SIZE] || null,
  [FIELDS.EXTRA_HELP]: values[FIELDS.EXTRA_HELP] || null,
  [FIELDS.COMMENTS]: '',
});

const {requiredField} = strings.validations;
const validationSchema = yup.object({
  [FIELDS.SIZE]: yup.object().nullable().required(requiredField),
  [FIELDS.EXTRA_HELP]: yup.object().nullable().required(requiredField),
  [FIELDS.COMMENTS]: yup.string(),
});

export const formikConfig = (onSubmit, values) => ({
  onSubmit,
  initialValues: initialValues(values),
  validationSchema,
});
