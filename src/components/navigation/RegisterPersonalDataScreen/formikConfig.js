import * as yup from 'yup';
import {strings} from 'constants/strings';
import dayjs from 'dayjs';

const {
  requiredField,
  specifycLength,
  minimumFieldLength,
  onlyNumbers,
  maximumFieldLength,
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
  COUNTRY_CODE: 'countryCode',
  AREA_CODE: 'areaCode',
  PHONE: 'number',
  DOCUMENT: 'document',
  DATE_OF_BIRTH: 'dateOfBirth',
  // BANK: 'bankNumber',
  PROFILE_PIC: 'profile',
};

export const initialValues = (values, isDriver) => ({
  [FIELDS.COUNTRY_CODE]: values?.[FIELDS.COUNTRY_CODE]?.toString() || null,
  [FIELDS.AREA_CODE]: values?.[FIELDS.AREA_CODE]?.toString() || null,
  [FIELDS.PHONE]: values?.[FIELDS.PHONE]?.toString() || null,

  ...(isDriver && {
    // ONLY FOR DRIVERS
    [FIELDS.DOCUMENT]: values?.[FIELDS.DOCUMENT]?.toString() || '',
    [FIELDS.DATE_OF_BIRTH]:
      dayjs(values?.[FIELDS.DATE_OF_BIRTH], 'DD/MM/YYYY') || null,
    // [FIELDS.BANK]: values?.[FIELDS.BANK]?.toString() || '',
    [FIELDS.PROFILE_PIC]: values?.[FIELDS.PROFILE_PIC] || null,
  }),
});

const validationSchema = isDriver =>
  yup.object({
    [FIELDS.COUNTRY_CODE]: yup.number().nullable().required(requiredField),
    [FIELDS.AREA_CODE]: yup.number().nullable().required(requiredField),
    [FIELDS.PHONE]: yup
      .number()
      .nullable()
      // .minLength(6, minimumFieldLength)
      // .maxLength(10, maximumFieldLength)
      .required(requiredField),

    ...(isDriver && {
      // ONLY FOR DRIVERS
      [FIELDS.DOCUMENT]: yup
        .number()
        .nullable()
        // .minLength(6, minimumFieldLength)
        // .maxLength(8, maximumFieldLength)
        .required(requiredField),
      [FIELDS.DATE_OF_BIRTH]: yup.string().nullable().required(requiredField),
      // [FIELDS.BANK]: yup
      //   .number()
      //   .nullable()
      //   // .length(22, specifycLength)
      //   .required(requiredField),
      [FIELDS.PROFILE_PIC]: yup.object().nullable().required(requiredField),
    }),
  });

export const formikConfig = (values, isDriver = false, onSubmit) => ({
  initialValues: initialValues(values, isDriver),
  validationSchema: validationSchema(isDriver),
  onSubmit,
});
