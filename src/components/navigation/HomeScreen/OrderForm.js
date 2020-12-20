import React, {useCallback} from 'react';
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

const options = [
  {label: 'Chico'},
  {label: 'Mediano'},
  {label: 'Grande'},
  {label: 'Muy grande'},
];
export const OrderForm = ({isOpen, open}) => {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const onSubmit = useCallback(
    (values) => {
      values.size = options[values.size];
      dispatch(updateShipmentDecription(values));
      navigation.navigate(routes.newShipmentDetailScreen);
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

  return (
    <FormContainer>
      <Title>Datos de la encomienda</Title>
      <InputField
        label="¿De donde salimos?"
        icon="notification-clear-all"
        onFocus={() => {
          _setFieldTouched(FIELDS.START_POINT)();
          open();
        }}
        onChangeText={_setFieldValue(FIELDS.START_POINT)}
        value={values[FIELDS.START_POINT]}
        error={touched[FIELDS.START_POINT] && errors[FIELDS.START_POINT]}
      />
      <InputField
        label="¿A donde lo llevamos?"
        icon="map-marker-outline"
        onFocus={_setFieldTouched(FIELDS.END_POINT)}
        onChangeText={_setFieldValue(FIELDS.END_POINT)}
        value={values[FIELDS.END_POINT]}
        error={touched[FIELDS.END_POINT] && errors[FIELDS.END_POINT]}
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

const FormContainer = styled(Container)`
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
  width: ${scaleDpTheme(250)};
  min-height: ${scaleDpTheme(30)};
`;
