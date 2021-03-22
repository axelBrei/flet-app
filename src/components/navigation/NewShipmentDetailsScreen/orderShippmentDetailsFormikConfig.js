import * as yup from 'yup';
import {strings} from 'constants/strings';

export const FIELDS = {
  SIZE: 'vehiculeSize',
  EXTRA_HELP: 'extraHelp',
};

const initialValues = (values) => ({
  [FIELDS.SIZE]: values?.[FIELDS.SIZE] || null,
  [FIELDS.EXTRA_HELP]: values?.[FIELDS.EXTRA_HELP] || false,
});

const {requiredField} = strings.validations;
const validationSchema = yup.object({
  [FIELDS.SIZE]: yup.object().nullable().required(requiredField),
  [FIELDS.EXTRA_HELP]: yup.bool(),
});

export const formikConfig = (onSubmit, values) => ({
  onSubmit,
  initialValues: initialValues(values),
  validationSchema,
});
