import * as yup from 'yup';
import {strings} from 'constants/strings';
import {setLocale} from 'yup';

yup.setLocale({
  mixed: {
    notType: ({path, type, value, originalValue}) => {
      switch (type) {
        case 'number':
          return 'Debe ser númerico';
        default:
          return 'El tipo ingresado es invalido';
      }
    },
  },
});

const {requiredField, onlyNumbers} = strings.validations;

export const FIELDS = {
  DESCRIPTION: 'description',
  VALUE: 'value',
  SIZE: 'vehiculeSize',
  EXTRA_HELP: 'extraHelp',
};

const initialValues = values => ({
  [FIELDS.DESCRIPTION]: '',
  [FIELDS.VALUE]: null,
  [FIELDS.SIZE]: values?.[FIELDS.SIZE] || null,
  [FIELDS.EXTRA_HELP]: values?.[FIELDS.EXTRA_HELP] || false,
});

const validationSchema = yup.object({
  [FIELDS.DESCRIPTION]: yup.string().required(requiredField),
  [FIELDS.VALUE]: yup.number(onlyNumbers).nullable().required(requiredField),
  [FIELDS.SIZE]: yup.object().nullable().required(requiredField),
  [FIELDS.EXTRA_HELP]: yup.bool(),
});

export const formikConfig = (onSubmit, values = null) => ({
  initialValues: initialValues(values),
  initialErrors: {
    [FIELDS.DESCRIPTION]: null,
    [FIELDS.VALUE]: null,
    [FIELDS.SIZE]: null,
    [FIELDS.EXTRA_HELP]: null,
  },
  validationSchema,
  onSubmit,
});
