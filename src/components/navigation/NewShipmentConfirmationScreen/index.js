import React, {useCallback, useState, useEffect} from 'react';
import styled from 'styled-components';
import {Screen} from 'components/ui/Screen';
import {AppText} from 'components/ui/AppText';
import {MainButton} from 'components/ui/MainButton';
import {RadioGroup} from 'components/ui/RadioGroup';
import {theme} from 'constants/theme';
import {scaleDpTheme, scaleDp} from 'helpers/responsiveHelper';
import {Container} from 'components/ui/Container';
import {PaymentOption} from 'components/navigation/NewShipmentConfirmationScreen/PaymentOption';
import {useFormikCustom} from 'components/Hooks/useFormikCustom';
import {
  formikConfig,
  FIELDS,
} from 'components/navigation/NewShipmentConfirmationScreen/orderConfirmationFormikConfig';
import {UserSelectionTextField} from 'components/ui/UserSelectionTextField';
import {useDispatch, useSelector} from 'react-redux';
import {
  selectNewShipmentData,
  selectNewShipmentError,
  selectNewShipmentLoading,
  createNewShipment,
} from 'redux-store/slices/newShipmentSlice';
import {routes} from 'constants/config/routes';
import {Loader} from 'components/ui/Loader';

const insuranceOptions = [
  {text: 'Sí', value: true},
  {text: 'No', value: false},
];
const paymentOptions = [
  {id: 0, text: 'Tarjeta de crédito', icon: 'credit-card-outline'},
  {id: 1, text: 'Efectivo', icon: 'cash'},
];

export default ({navigation}) => {
  const dispatch = useDispatch();
  const loading = useSelector(selectNewShipmentLoading);
  const error = useSelector(selectNewShipmentError);
  const {shipmentDescription, shipmentVehicule} = useSelector(
    selectNewShipmentData,
  );

  const onSubmit = useCallback(
    (values) => {
      const {[FIELDS.ADD_INSURANCE]: insurance, ...rest} = values;
      dispatch(
        createNewShipment({
          ...rest,
          [FIELDS.ADD_INSURANCE]: insurance.value,
          [FIELDS.PAYMENT_METHOD]: '',
        }),
      );
    },
    [dispatch],
  );

  const {values, handleSubmit, _setFieldValue, isSubmitting} = useFormikCustom(
    formikConfig(onSubmit, {
      [FIELDS.PAYMENT_METHOD]: paymentOptions[0],
      [FIELDS.ADD_INSURANCE]: insuranceOptions[1],
    }),
  );

  useEffect(() => {
    if (isSubmitting && !loading && !error) {
      console.log(navigation);
      // TODO navigate to confirmation success screen
      // navigation.navigate(routes.shipmentScreen);
    }
  }, [loading, error, isSubmitting, navigation]);

  const renderPaymentOptions = useCallback(
    (item, idx) => (
      <PaymentOption
        onPress={_setFieldValue(FIELDS.PAYMENT_METHOD)}
        {...item}
        key={idx}
        selected={values[FIELDS.PAYMENT_METHOD]?.id === item.id}
      />
    ),
    [_setFieldValue, values],
  );

  return (
    <Loader
      loading={loading}
      message={'Aguardá unos segundos mientras\nconfirmamos el pedidos'}>
      <Screen scrollable>
        <FormContainer>
          <UserSelectionTextField
            label="Desde"
            value={shipmentDescription?.endPoint?.name}
            icon="notification-clear-all"
          />
          <UserSelectionTextField
            label="Desde"
            value={shipmentDescription?.startPoint?.name}
            icon="map-marker-outline"
          />
          <Title>
            Vehículo seleccionado:{' '}
            <SelectedItemText>
              {shipmentVehicule?.vehiculeSize?.title}
            </SelectedItemText>
          </Title>
          <Title>
            Requiere ayuda:{' '}
            <SelectedItemText>
              {shipmentVehicule?.extraHelp?.text}
            </SelectedItemText>
          </Title>
          <Title>
            Valor aproximado:{' '}
            <SelectedItemText>${shipmentDescription?.value}</SelectedItemText>
            <InsuranceDisclaimer>
              {'\nSe asegura el 1% de este valor'}
            </InsuranceDisclaimer>
          </Title>
          <Title>¿Querés asegurar el envío?</Title>
          <RadioGroup
            initialIndex={1}
            options={insuranceOptions}
            style={{
              marginLeft: scaleDp(10),
            }}
          />
          <Title>¿Cómo querés pagar?</Title>
          {paymentOptions.map(renderPaymentOptions)}
          <ConfirmationButton label="Confirmar" onPress={handleSubmit} />
        </FormContainer>
      </Screen>
    </Loader>
  );
};

const FormContainer = styled(Container)`
  background-color: ${theme.backgroundColor};
  width: ${(props) =>
    props.theme.isMobile ? props.theme.screenWidth : scaleDp(350)}px;
  padding: ${scaleDpTheme(30)} ${scaleDpTheme(20)};
  align-items: flex-start;
  ${(props) => props.theme.isMobile && 'padding-top: 5px;'}
`;

const Title = styled(AppText)`
  margin-top: ${scaleDpTheme(10)};
  margin-bottom: ${scaleDpTheme(5)};
  font-size: ${scaleDpTheme(16)};
  font-weight: bold;
`;

const SelectedItemText = styled(AppText)`
  font-weight: 400;
`;

const InsuranceDisclaimer = styled(AppText)`
  color: ${theme.disabled};
  font-size: ${scaleDpTheme(12)};
`;

const ConfirmationButton = styled(MainButton)`
  margin-top: ${scaleDpTheme(15)};
  align-self: ${(props) => (props.theme.isMobile ? 'center' : 'flex-start')};
`;
