import React, {useState, useCallback} from 'react';
import styled from 'styled-components';
import {Screen} from 'components/ui/Screen';
import {AppText} from 'components/ui/AppText';
import {MainButton} from 'components/ui/MainButton';
import {SecurityCodeInput} from 'components/navigation/ShipmentDeliveryConfirmationScreen/SecurityCodeInput';
import {scaleDpTheme} from 'helpers/responsiveHelper';
import {Container} from 'components/ui/Container';
import {Alert, View} from 'react-native';
import PackageDelivered from 'resources/images/box_delivered.svg';
import {useWindowDimension} from 'components/Hooks/useWindowsDimensions';
import {useDispatch, useSelector} from 'react-redux';
import {
  selectDriverShipmentData,
  selectIsLoadingSecureCode,
  selectSecureCodeError,
  uploadConfirmationCode,
} from 'redux-store/slices/driverShipmentSlice';
import {Loader} from 'components/ui/Loader';
import {ShipmentValueCard} from 'components/navigation/ShipmentDeliveryConfirmationScreen/ShipmentValueCard';
import {theme} from 'constants/theme';
import {Title as BaseTitle} from 'components/ui/Title';
import {SHIPMENT_STATE} from 'constants/shipmentStates';
import {NextShipmentInformation} from 'components/navigation/ShipmentDeliveryConfirmationScreen/NextShipmentInformation';
import {ShipmentDetailInformation} from 'components/navigation/ShipmentDeliveryConfirmationScreen/ShipmentDetailInformation';

export default () => {
  const dispatch = useDispatch();
  const {widthWithPadding} = useWindowDimension();
  const shipments = useSelector(selectDriverShipmentData);
  const isLoading = useSelector(selectIsLoadingSecureCode);
  const error = useSelector(selectSecureCodeError);
  const closestShipment = shipments[0];

  const isInDestination = closestShipment.status === SHIPMENT_STATE.DELIVERED;

  const [securityCode, setSecurityCode] = useState('');

  const onPressAccept = useCallback(() => {
    if (securityCode.length === 5) {
      dispatch(uploadConfirmationCode(securityCode, closestShipment.id));
    } else {
      Alert.alert('Debe completar todos los campos del código');
    }
  }, [securityCode, closestShipment]);

  if (!closestShipment) {
    return <></>;
  }
  return (
    <Screen scrollable enableAvoidKeyboard={false}>
      <ScreenContainer>
        <Title>Código de seguridad</Title>
        {/*<ShipmentValueCard shipment={closestShipment} />*/}

        <AppText fontSize={14} textAlign="center">
          {
            'Pedile este código a la persona\nque recibe el paquete para\npoder continuar'
          }
        </AppText>
        <SecurityCodeInput
          value={securityCode}
          onChangeValue={setSecurityCode}
          onPressAccept={onPressAccept}
        />
        <InformationContainer>
          {isInDestination ? (
            <ShipmentDetailInformation shipment={closestShipment} />
          ) : (
            <NextShipmentInformation shipment={closestShipment} />
          )}
        </InformationContainer>
        <Button
          loading={isLoading}
          onPress={onPressAccept}
          loaderColor={theme.white}>
          Confirmar envío
        </Button>
      </ScreenContainer>
    </Screen>
  );
};

const ScreenContainer = styled.View`
  padding: 20px 20px;
  align-items: center;
  justify-content: center;
  flex: 1;
  min-height: ${({theme}) => theme.screenHeight * 0.85}px;
`;

const Title = styled(BaseTitle)`
  font-size: 26px;
`;

const InformationContainer = styled.View`
  flex: 1;
  width: 100%;
  align-items: flex-start;
  justify-content: flex-start;
  padding: 20px 0;
`;

const Button = styled(MainButton)`
  margin: 20px 0;
  width: 80%;
`;
