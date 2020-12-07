import * as yup from 'yup';
import {strings} from 'constants/strings';

const {
  requiredField,
  minimumFieldLength,
  onlyNumbers,
  specifycLength,
} = strings.validations;

export const FIELDS = {
  PLATE: 'carPlate',
  MODEL: 'carModel',
  YEAR: 'carYear',
  COLOR: 'carColor',
  LICENSE_FRONT: 'licenseFront',
  LICENSE_BACK: 'licenseBack',
};

const initialValues = {
  [FIELDS.PLATE]: '',
  [FIELDS.MODEL]: '',
  [FIELDS.YEAR]: '',
  [FIELDS.COLOR]: '',
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
  [FIELDS.YEAR]: yup.string().length(4, specifycLength).required(requiredField),
  [FIELDS.COLOR]: yup.string().required(requiredField),
  [FIELDS.LICENSE_FRONT]: yup.object().nullable().required(requiredField),
  [FIELDS.LICENSE_BACK]: yup.object().nullable().required(requiredField),
});

export const vehiculeDataFormikConfig = (onSubmit) => ({
  onSubmit,
  initialValues,
  validationSchema,
});
