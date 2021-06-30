import React from 'react';
import styled from 'styled-components';
import InpurField from 'components/ui/InputField';
import InputField from 'components/ui/InputField';
import CalendarInput from 'components/ui/CalendarPicker';
import SelectImage from 'components/ui/SelectImage/index';
import {FIELDS} from 'components/navigation/RegisterPersonalDataScreen/formikConfig';

export const DriverExtraData = ({
  values,
  touched,
  errors,
  setFieldTouched,
  setFieldValue,
}) => (
  <>
    <InputField
      label="Número de documento"
      keyboardType="numeric"
      value={values[FIELDS.DOCUMENT]}
      onBlur={setFieldTouched(FIELDS.DOCUMENT)}
      error={touched[FIELDS.DOCUMENT] && errors[FIELDS.DOCUMENT]}
      onChangeText={setFieldValue(FIELDS.DOCUMENT)}
    />
    <CalendarInput
      label="Fecha de nacimiento"
      hideIcon
      clearable
      value={values[FIELDS.DATE_OF_BIRTH]}
      onBlur={setFieldTouched(FIELDS.DATE_OF_BIRTH)}
      error={touched[FIELDS.DATE_OF_BIRTH] && errors[FIELDS.DATE_OF_BIRTH]}
      onSelectDay={setFieldValue(FIELDS.DATE_OF_BIRTH)}
    />
    <SelectImage
      label="Foto tuya de frente"
      value={values[FIELDS.PROFILE_PIC]}
      onBlur={setFieldTouched(FIELDS.PROFILE_PIC)}
      error={errors[FIELDS.PROFILE_PIC]}
      onSelectImage={setFieldValue(FIELDS.PROFILE_PIC)}
      acceptFrontCamera
    />
  </>
);
