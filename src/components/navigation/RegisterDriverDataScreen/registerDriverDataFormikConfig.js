import * as yup from 'yup';
import {strings} from 'constants/strings';

export const FIELDS = {
  DOCUMENT: 'document',
  BIRTH_DATE: 'birthDate',
  CBU: 'cbu',
  PROFILE_IMAGE: 'profileImage',
};

const initialValues = {
  [FIELDS.DOCUMENT]: '',
  [FIELDS.BIRTH_DATE]: null,
  [FIELDS.CBU]: '',
  [FIELDS.PROFILE_IMAGE]: null,
};

const {specifycLength, onlyNumbers, requiredField} = strings.validations;
const validationSchema = yup.object().shape({
  [FIELDS.DOCUMENT]: yup.number().required(requiredField),
  [FIELDS.BIRTH_DATE]: yup.string().nullable(true).required(requiredField),
  [FIELDS.CBU]: yup
    .string()
    .length(22, specifycLength)
    .matches(/[0-9]{22}/, {
      excludeEmptyString: true,
      message: onlyNumbers,
    })
    .required(requiredField),
  [FIELDS.PROFILE_IMAGE]: yup.object().nullable(false).required(requiredField),
});

export const registerDriverDataFormikConfig = (onSubmit) => ({
  onSubmit,
  initialValues,
  validationSchema,
});
