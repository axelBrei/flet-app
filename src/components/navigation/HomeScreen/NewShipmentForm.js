import React, {useEffect, useCallback, useState} from 'react';
import styled, {css} from 'styled-components';
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
import {fetchUserAddresses} from 'redux-store/slices/personalData/addressSlice';
import {TextLink} from 'components/ui/TextLink';
import {Icon} from 'components/ui/Icon';
import {MiddleAddressInput} from 'components/navigation/HomeScreen/MiddleAddressInput';

export const NewShipmentForm = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [showThirdAddress, setShowThirdAddress] = useState(false);

  useEffect(() => {
    dispatch(fetchUserAddresses());
  }, []);

  const onSubmit = useCallback(
    values => {
      dispatch(
        updateNewShipmentLocations([
          values[FIELDS.START_POINT],
          values[FIELDS.MID_POINT],
          values[FIELDS.END_POINT],
        ]),
      );
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
      allowFavorites: true,
    },
    {
      avoidKeyboard: false,
      fullscreen: true,
    },
  );

  const toggleModal = useCallback(
    field => () => {
      toggle({field});
      _setFieldTouched(field);
      return true;
    },
    [toggle, _setFieldTouched],
  );

  const clearInput = useCallback(
    fieldName => t => {
      if (t === '') {
        _setFieldValue(fieldName)(null);
      }
    },
    [_setFieldValue],
  );

  const onPressAddAddress = useCallback(() => {
    _setFieldValue(FIELDS.MID_POINT)(values[FIELDS.END_POINT]);
    _setFieldValue(FIELDS.END_POINT)(null);
    setShowThirdAddress(true);
  }, [values]);

  const onPressRemoveAddress = useCallback(() => {
    if (values[FIELDS.END_POINT]) {
      _setFieldValue(FIELDS.END_POINT)(values[FIELDS.END_POINT]);
    }
    _setFieldValue(FIELDS.MID_POINT)(null);
    setShowThirdAddress(false);
  }, [values]);

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
        <MiddleAddressInput
          onChangeText={clearInput(FIELDS.MID_POINT)}
          label="Punto intermedio"
          icon="ray-start-arrow"
          onFocus={toggleModal(FIELDS.MID_POINT)}
          value={values[FIELDS.MID_POINT]?.name}
          error={touched[FIELDS.MID_POINT] && errors[FIELDS.MID_POINT]}
          clearable
          visible={showThirdAddress}
          onPressRemove={onPressRemoveAddress}
        />
        <InputField
          onChangeText={clearInput(FIELDS.END_POINT)}
          label="¿A donde lo llevamos?"
          icon={'map-marker'}
          onFocus={toggleModal(FIELDS.END_POINT)}
          value={values[FIELDS.END_POINT]?.name}
          error={touched[FIELDS.END_POINT] && errors[FIELDS.END_POINT]}
          clearable
        />

        {!showThirdAddress && (
          <AddAddressButton onPress={onPressAddAddress}>
            <TextLink>Agregar dirección</TextLink>
          </AddAddressButton>
        )}
      </FormContainer>
      <ContinueButton label="Continuar" onPress={handleSubmit} />
      <Modal />
    </>
  );
};

NewShipmentForm.defaultProps = {
  open: () => {},
  close: cb => {
    cb && cb();
  },
  onSelectStartPoint: () => {},
  onSelectEndPoint: () => {},
};

const FormContainer = styled(Container)`
  width: 100%;
  padding: 20px 10px;
  ${({theme}) =>
    theme.isMobile &&
    css`
      flex: 1;
      padding: 20px 10px 100px;
    `}
`;

const ContinueButton = styled(MainButton)`
  margin-top: ${scaleDpTheme(20)};
  width: 85%;
  min-height: ${scaleDpTheme(30)};
  align-self: center;
  margin-bottom: 20px;
`;

const AddAddressButton = styled.TouchableOpacity`
  width: 100%;
  align-items: flex-end;
  justify-content: center;
  padding: 10px 0;
`;

const RemoveMidAddresContainer = styled.TouchableOpacity`
  flex-direction: row;
  padding: 10px 0;
  width: 100%;
  align-items: center;
  justify-content: flex-end;
`;
