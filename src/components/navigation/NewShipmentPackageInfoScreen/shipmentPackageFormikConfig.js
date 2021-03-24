import * as yup from 'yup';
import {strings} from 'constants/strings';
import {setLocale} from 'yup';

yup.setLocale({
  mixed: {
    notType: ({path, type, value, originalValue}) => {
      console.log(type);
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
  HEIGHT: 'height',
  WIDTH: 'width',
  LENGTH: 'length',
  WEIGHT: 'weight',
};

const initialValues = {
  [FIELDS.DESCRIPTION]: '',
  [FIELDS.VALUE]: null,
  [FIELDS.HEIGHT]: null,
  [FIELDS.WIDTH]: null,
  [FIELDS.LENGTH]: null,
  [FIELDS.WEIGHT]: null,
};

const validationSchema = yup.object({
  [FIELDS.DESCRIPTION]: yup.string().required(requiredField),
  [FIELDS.VALUE]: yup.number(onlyNumbers).nullable().required(requiredField),
  [FIELDS.HEIGHT]: yup.number(onlyNumbers).nullable().required(requiredField),
  [FIELDS.WIDTH]: yup.number(onlyNumbers).nullable().required(requiredField),
  [FIELDS.LENGTH]: yup.number(onlyNumbers).nullable().required(requiredField),
  [FIELDS.WEIGHT]: yup.number(onlyNumbers).nullable().required(requiredField),
});

export const formikConfig = (onSubmit) => ({
  initialValues,
  validationSchema,
  onSubmit,
});
