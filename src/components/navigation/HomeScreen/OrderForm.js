import React, {useEffect, useCallback, useState} from 'react';
import styled from 'styled-components';
import InputField from 'components/ui/InputField';
import {MainButton} from 'components/ui/MainButton';
import {Container} from 'components/ui/Container';
import {scaleDpTheme} from 'helpers/responsiveHelper';
import {Slider} from 'components/ui/Slider';
import {AppText} from 'components/ui/AppText';
import {useFormikCustom} from 'components/Hooks/useFormikCustom';
import {
  formikConfig,
  FIELDS,
} from 'components/navigation/HomeScreen/orderFormikConfig';
import {useNavigation} from '@react-navigation/native';
import {routes} from 'constants/config/routes';
import {useDispatch} from 'react-redux';
import {updateShipmentDecription} from 'redux-store/slices/shipmentSlice';
import {Dropdown} from 'components/ui/Dropdown';
import {useDebouncedGeocoding} from 'components/Hooks/useDebouncedGeocoding';
import {useBackHandler} from 'components/Hooks/useBackHandle';

const options = [
  {label: 'Chico'},
  {label: 'Mediano'},
  {label: 'Grande'},
  {label: 'Muy grande'},
];
export const OrderForm = ({
  isOpen,
  open,
  close,
  onSelectStartPoint,
  onSelectEndPoint,
}) => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [startPointText, setStartPointText] = useState('');
  const [endPointText, setEndPointText] = useState('');

  const onSubmit = useCallback(
    (values) => {
      close(() => {
        dispatch(
          updateShipmentDecription({
            ...values,
            [FIELDS.SIZE]: options[values[FIELDS.SIZE]],
          }),
        );
        navigation.navigate(routes.newShipmentDetailScreen);
      });
    },
    [isOpen, close, navigation, dispatch],
  );

  useBackHandler(() => {
    isOpen && close();
    return isOpen;
  });

  const {
    values,
    errors,
    touched,
    _setFieldValue,
    _setFieldTouched,
    handleSubmit,
  } = useFormikCustom(formikConfig(onSubmit));

  const {
    results: startPointResults,
    loading: startPointLoading,
    error: startPointError,
  } = useDebouncedGeocoding(startPointText);
  const {
    results: endPointResults,
    loading: endPointLoading,
    error: endPointError,
  } = useDebouncedGeocoding(endPointText);

  const _onSelectStartPoint = useCallback(
    (v) => {
      _setFieldValue(FIELDS.START_POINT)(v);
      onSelectStartPoint(v);
    },
    [_setFieldValue, onSelectStartPoint],
  );

  const _onSelectEndPoint = useCallback(
    (v) => {
      _setFieldValue(FIELDS.END_POINT)(v);
      onSelectEndPoint(v);
    },
    [onSelectEndPoint, _setFieldValue],
  );

  return (
    <FormContainer>
      <Title>Datos de la encomienda</Title>
      <Dropdown
        label="¿De donde salimos?"
        icon="notification-clear-all"
        data={startPointResults}
        onFocus={() => {
          _setFieldTouched(FIELDS.START_POINT)();
          open();
        }}
        onItemPress={_onSelectStartPoint}
        onChangeText={setStartPointText}
        value={values[FIELDS.START_POINT]}
        loading={startPointLoading}
        error={
          startPointError ||
          (touched[FIELDS.START_POINT] && errors[FIELDS.START_POINT])
        }
      />
      <Dropdown
        label="¿A donde lo llevamos?"
        icon="map-marker-outline"
        data={endPointResults}
        onFocus={_setFieldTouched(FIELDS.END_POINT)}
        onChangeText={setEndPointText}
        onItemPress={_onSelectEndPoint}
        value={values[FIELDS.END_POINT]}
        loading={endPointLoading}
        error={
          endPointError ||
          (touched[FIELDS.END_POINT] && errors[FIELDS.END_POINT])
        }
      />
      <InputField
        label="¿Que estamos llevando?"
        icon="package-variant-closed"
        onFocus={_setFieldTouched(FIELDS.DESC)}
        onChangeText={_setFieldValue(FIELDS.DESC)}
        value={values[FIELDS.DESC]}
        error={touched[FIELDS.DESC] && errors[FIELDS.DESC]}
      />
      <Slider
        label="¿Cuanto vale lo que estamos llevando?"
        minValue={0}
        maxValue={100000}
        valueSign="$"
        showValue
        value={values[FIELDS.VALUE]}
        onValueChange={_setFieldValue(FIELDS.VALUE)}
        error={touched[FIELDS.VALUE] && errors[FIELDS.VALUE]}
      />
      <Slider
        options={options}
        label="¿Que tan grande es?"
        stepsEnabled
        value={values[FIELDS.SIZE]}
        onValueChange={_setFieldValue(FIELDS.SIZE)}
        error={touched[FIELDS.SIZE] && errors[FIELDS.SIZE]}
      />
      <ContinueButton label="Continuar" onPress={handleSubmit} />
    </FormContainer>
  );
};

OrderForm.defaultProps = {
  open: () => {},
  close: () => {},
  onSelectStartPoint: () => {},
  onSelectEndPoint: () => {},
};

const FormContainer = styled(Container)`
  width: 100%;
  align-items: center;
  min-height: ${(props) => props.theme.screenHeight * 0.7}px;
  padding-bottom: ${scaleDpTheme(10)};
`;

const Title = styled(AppText)`
  width: 100%;
  text-align: left;
  padding-bottom: ${scaleDpTheme(15)};
  font-size: ${scaleDpTheme(18)};
`;

const ContinueButton = styled(MainButton)`
  margin-top: ${scaleDpTheme(20)};
  width: 85%;
  min-height: ${scaleDpTheme(30)};
`;
