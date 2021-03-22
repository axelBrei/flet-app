import * as yup from 'yup';
import {strings} from 'constants/strings';
import dayjs from 'dayjs';

const {
  requiredField,
  minimumFieldLength,
  onlyNumbers,
  specifycLength,
} = strings.validations;

yup.setLocale({
  mixed: {
    notType: ({path, type, value, originalValue}) => {
      switch (type) {
        case 'number':
          return onlyNumbers;
        default:
          return 'El tipo ingresado es invalido';
      }
    },
  },
});

export const FIELDS = {
  PLATE: 'carPlate',
  MODEL: 'carModel',
  YEAR: 'carYear',
  COLOR: 'carColor',
  LICENSE_FRONT: 'licenseFront',
  LICENSE_BACK: 'licenseBack',
  HEIGHT: 'height',
  WIDTH: 'width',
  LENGTH: 'length',
};

export const initialValues = {
  [FIELDS.PLATE]: '',
  [FIELDS.MODEL]: '',
  [FIELDS.YEAR]: '',
  [FIELDS.COLOR]: '',
  [FIELDS.HEIGHT]: '',
  [FIELDS.WIDTH]: '',
  [FIELDS.LENGTH]: '',
  [FIELDS.LICENSE_FRONT]: null,
  [FIELDS.LICENSE_BACK]: null,
};

const validationSchema = yup.object({
  [FIELDS.PLATE]: yup
    .string()
    .matches(/^([a-zA-Z]{3}[0-9]{3}|[a-zA-Z]{2}[0-9]{3}[a-zA-Z]{2})$/, {
      message: 'Ingrese una pantente válida',
      excludeEmptyString: true,
    })
    .required(requiredField),
  [FIELDS.MODEL]: yup.string().required(requiredField),
  [FIELDS.YEAR]: yup
    .number()
    .moreThan(2009, 'El año debe ser mayor a ${more}')
    .test(
      'check-max-year',
      `El año debe ser menor a ${dayjs().year()}`,
      (val) => val <= dayjs().year(),
    )
    .required(requiredField),
  [FIELDS.COLOR]: yup.string().required(requiredField),
  [FIELDS.HEIGHT]: yup.string().required(requiredField),
  [FIELDS.WIDTH]: yup.number().required(requiredField),
  [FIELDS.LENGTH]: yup.number().required(requiredField),
  [FIELDS.LICENSE_FRONT]: yup.object().nullable().required(requiredField),
  [FIELDS.LICENSE_BACK]: yup.object().nullable().required(requiredField),
});

export const vehiculeDataFormikConfig = (onSubmit) => ({
  onSubmit,
  initialValues,
  validationSchema,
});
