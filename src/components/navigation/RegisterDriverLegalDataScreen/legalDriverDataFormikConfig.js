import * as yup from 'yup';
import {strings} from 'constants/strings';

const {requiredField} = strings.validations;

export const FIELDS = {
  DOCUMENT_FRONT: 'documentFront',
  DOCUMENT_BACK: 'documentBack',
  LICENSE_FRONT: 'driverPermitFront',
  LICENSE_BACK: 'driverPermitBack',
  INSURANCE: 'insurance',
  BACKGROUND: 'background',
  ADDRESS_VALIDATION: 'addressValidation',
};

export const initialValues = {
  [FIELDS.DOCUMENT_FRONT]: null,
  [FIELDS.DOCUMENT_BACK]: null,
  [FIELDS.LICENSE_FRONT]: null,
  [FIELDS.LICENSE_BACK]: null,
  [FIELDS.INSURANCE]: null,
  [FIELDS.BACKGROUND]: null,
  [FIELDS.ADDRESS_VALIDATION]: null,
};

const validationSchema = yup.object({
  [FIELDS.DOCUMENT_FRONT]: yup.object().nullable().required(requiredField),
  [FIELDS.DOCUMENT_BACK]: yup.object().nullable().required(requiredField),
  [FIELDS.LICENSE_FRONT]: yup.object().nullable().required(requiredField),
  [FIELDS.LICENSE_BACK]: yup.object().nullable().required(requiredField),
  [FIELDS.INSURANCE]: yup.object().nullable().required(requiredField),
  [FIELDS.BACKGROUND]: yup.object().nullable().required(requiredField),
  [FIELDS.ADDRESS_VALIDATION]: yup.object().nullable().required(requiredField),
});

export const legalDriverDataFormikConfig = (onSubmit) => ({
  onSubmit,
  initialValues,
  validationSchema,
});
