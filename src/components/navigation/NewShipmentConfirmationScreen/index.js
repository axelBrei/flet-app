import React, {useCallback, useState, useEffect} from 'react';
import styled, {css} from 'styled-components';
import {Screen} from 'components/ui/Screen';
import Map from 'components/ui/Map';
import {theme} from 'constants/theme';
import {useFormikCustom} from 'components/Hooks/useFormikCustom';
import {
  formikConfig,
  FIELDS,
} from 'components/navigation/NewShipmentConfirmationScreen/orderConfirmationFormikConfig';
import {useDispatch, useSelector} from 'react-redux';
import {
  selectNewShipmentData,
  selectNewShipmentError,
  selectNewShipmentLoading,
  createNewShipment,
  fetchShipmentPrice,
  clearShipmentPrice,
  selectNewShipmentPrice,
  selectShipmentPriceError,
} from 'redux-store/slices/newShipmentSlice';
import {Loader} from 'components/ui/Loader';
import {CardContainer} from 'components/ui/CardContainer';
import {useWindowDimension} from 'components/Hooks/useWindowsDimensions';
import {StaticInputField} from 'components/ui/StaticInputField';
import {InsuranceCard} from 'components/navigation/NewShipmentConfirmationScreen/InsuranceCard';
import {PaymentMethodCard} from 'components/navigation/NewShipmentConfirmationScreen/PaymentMethodCard';
import {MainButton} from 'components/ui/MainButton';
import {ShipmentPrice} from 'components/navigation/NewShipmentConfirmationScreen/ShipmentPrice';

export default ({navigation}) => {
  const {isMobile} = useWindowDimension();
  const dispatch = useDispatch();
  const loading = useSelector(selectNewShipmentLoading);
  const error = useSelector(selectNewShipmentError);
  const {shipmentDescription} = useSelector(selectNewShipmentData);
  const priceError = useSelector(selectShipmentPriceError);
  const currentPrice = useSelector(selectNewShipmentPrice);

  useEffect(() => {
    dispatch(clearShipmentPrice());
  }, []);

  const onSubmit = useCallback(
    (values) => {
      dispatch(createNewShipment(values));
    },
    [dispatch],
  );

  const {
    values,
    handleSubmit,
    errors,
    touched,
    _setFieldTouched,
    _setFieldValue,
    isSubmitting,
  } = useFormikCustom(formikConfig(onSubmit));

  const onChangeInsurance = useCallback(
    (val) => {
      _setFieldValue(FIELDS.INSURANCE)(val);
      dispatch(fetchShipmentPrice(values));
    },
    [_setFieldValue, values],
  );

  return (
    <ScreenComponent scrollable={!loading}>
      <Loader
        loading={loading}
        message={'Aguardá unos segundos mientras\nconfirmamos el pedidos'}>
        <ShipmentInformationContainer>
          <StyledMap
            edgePadding={{
              top: isMobile ? 35 : 0,
              bottom: isMobile ? 35 : -5,
            }}
            markers={[
              shipmentDescription.startPoint,
              shipmentDescription.endPoint,
            ]}
          />
          <ColorizedCard>
            <StaticInputField label="Desde">
              {shipmentDescription.startPoint?.name}
            </StaticInputField>
            <StaticInputField label="Hasta">
              {shipmentDescription.endPoint?.name}
            </StaticInputField>
          </ColorizedCard>
        </ShipmentInformationContainer>
        <FormContainer>
          <InsuranceCard
            onChangeInsurance={onChangeInsurance}
            selectedInsurance={values[FIELDS.INSURANCE]}
            error={touched[FIELDS.INSURANCE] && errors[FIELDS.INSURANCE]}
            onFocus={_setFieldTouched(FIELDS.INSURANCE)}
          />
          <PaymentMethodCard
            selectedMethod={values[FIELDS.PAYMENT_METHOD]}
            onChangeSelectedMethod={_setFieldValue(FIELDS.PAYMENT_METHOD)}
            error={
              touched[FIELDS.PAYMENT_METHOD] && errors[FIELDS.PAYMENT_METHOD]
            }
            onFocus={_setFieldTouched(FIELDS.PAYMENT_METHOD)}
          />
          <CardContainer backgroundColor={theme.grayBackground}>
            <ShipmentPrice />
            <Button
              label="Confirmar"
              onPress={handleSubmit}
              disabled={priceError || !currentPrice}
            />
          </CardContainer>
        </FormContainer>
      </Loader>
    </ScreenComponent>
  );
};

const ScreenComponent = styled(Screen)`
  padding: 20px;
  ${({theme}) =>
    !theme.isMobile &&
    css`
      padding-top: 70px;
    `}
`;

const ShipmentInformationContainer = styled.View`
  display: flex;
  flex-direction: ${({theme}) => (theme.isMobile ? 'column' : 'row')};
  justify-content: flex-start;
`;

const FormContainer = styled.View`
  background-color: ${theme.backgroundColor};
  max-width: ${(props) => (props.theme.isMobile ? '100%' : '414px')};
  align-items: center;
  width: 100%;
`;

const StyledMap = styled(Map)`
  height: 150px;
  border-radius: 20px;
  top: 15px;
  ${({theme}) =>
    !theme.isMobile &&
    css`
      top: 0;
      width: 414px;
    `};
`;

const ColorizedCard = styled(CardContainer)`
  margin: 0;
  top: -10px;
  ${({theme}) =>
    !theme.isMobile &&
    css`
      top: 0;
      flex: 1;
      max-width: 414px;
      left: 15px;
    `}
`;

const Button = styled(MainButton)`
  margin: 0 20px 20px;
`;
