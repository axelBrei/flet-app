import React, {useEffect, useCallback, useState} from 'react';
import styled from 'styled-components';
import InputField from 'components/ui/InputField';
import {MainButton} from 'components/ui/MainButton';
import {Container} from 'components/ui/Container';
import {scaleDpTheme} from 'helpers/responsiveHelper';
import {Slider} from 'components/ui/Slider';
import {AppText} from 'components/ui/AppText';
import {useFormikCustom} from 'components/Hooks/useFormikCustom';
import {useNavigation} from '@react-navigation/native';
import {routes} from 'constants/config/routes';
import {useDispatch} from 'react-redux';
import {
  updateNewShipmentLocations,
  updateShipmentDecription,
} from 'redux-store/slices/newShipmentSlice';
import {
  formikConfig,
  FIELDS,
} from 'components/navigation/HomeScreen/newShipmentFormikConfig';
import {useModal} from 'components/Hooks/useModal';
import GeolocationFilterModal from 'components/MobileFullScreenModals/GeolocationModalScreen';
import {Title} from 'components/ui/Title';

export const NewShipmentForm = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const onSubmit = useCallback(
    (values) => {
      dispatch(updateNewShipmentLocations(values));
      navigation.navigate(routes.newShipmentPackageDetailScreen);
    },
    [navigation, dispatch],
  );

  const {
    values,
    errors,
    touched,
    _setFieldValue,
    _setFieldTouched,
    handleSubmit,
  } = useFormikCustom(formikConfig(onSubmit));

  const onSelectPoint = useCallback(
    (field, value) => {
      _setFieldValue(field)(value);
    },
    [_setFieldValue],
  );

  const {Modal, toggle, close} = useModal(
    GeolocationFilterModal,
    {
      onPressItem: onSelectPoint,
      values: values,
    },
    {
      avoidKeyboard: false,
      fullscreen: true,
    },
  );

  const toggleModal = useCallback(
    (field) => () => {
      toggle({field});
      _setFieldTouched(field);
      return true;
    },
    [toggle, _setFieldTouched],
  );

  const clearInput = useCallback(
    (fieldName) => (t) => {
      if (t === '') {
        _setFieldValue(fieldName)(null);
      }
    },
    [_setFieldValue],
  );

  return (
    <>
      <Title>¿Que llevamos hoy?</Title>
      <FormContainer>
        <InputField
          onChangeText={clearInput(FIELDS.START_POINT)}
          label="¿De donde salimos?"
          icon="map-marker"
          onFocus={toggleModal(FIELDS.START_POINT)}
          value={values[FIELDS.START_POINT]?.name}
          error={touched[FIELDS.START_POINT] && errors[FIELDS.START_POINT]}
          clearable
        />
        <InputField
          onChangeText={clearInput(FIELDS.END_POINT)}
          label="¿A donde lo llevamos?"
          icon="map-marker"
          onFocus={toggleModal(FIELDS.END_POINT)}
          value={values[FIELDS.END_POINT]?.name}
          error={touched[FIELDS.END_POINT] && errors[FIELDS.END_POINT]}
          clearable
        />
        <ContinueButton label="Continuar" onPress={handleSubmit} />
      </FormContainer>
      <Modal />
    </>
  );
};

NewShipmentForm.defaultProps = {
  open: () => {},
  close: (cb) => {
    cb && cb();
  },
  onSelectStartPoint: () => {},
  onSelectEndPoint: () => {},
};

const FormContainer = styled(Container)`
  width: 100%;
  align-items: center;
  padding: 20px 10px 100px;
`;

const ContinueButton = styled(MainButton)`
  margin-top: ${scaleDpTheme(20)};
  width: 85%;
  min-height: ${scaleDpTheme(30)};
`;
