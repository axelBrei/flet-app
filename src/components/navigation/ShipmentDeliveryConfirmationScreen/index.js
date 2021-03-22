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
  selectIsLoadingSecureCode,
  uploadConfirmationCode,
} from 'redux-store/slices/driverShipmentSlice';
import {Loader} from 'components/ui/Loader';
import {ShipmentValueCard} from 'components/navigation/ShipmentDeliveryConfirmationScreen/ShipmentValueCard';

export default () => {
  const dispatch = useDispatch();
  const {widthWithPadding} = useWindowDimension();

  const [securityCode, setSecurityCode] = useState('');

  const onPressAccept = useCallback(() => {
    if (securityCode.length === 5) {
      dispatch(uploadConfirmationCode(securityCode));
    } else {
      Alert.alert('Debe completar todos los campos del código');
    }
  }, [securityCode]);

  return (
    <Screen scrollable>
      <ScreenContainer>
        <ShipmentValueCard />
        <ImageContainer>
          <PackageDelivered width={widthWithPadding} height={150} />
        </ImageContainer>
        <SecurityCodeInput
          value={securityCode}
          onChangeValue={setSecurityCode}
          onPressAccept={onPressAccept}
        />
      </ScreenContainer>
    </Screen>
  );
};

const ScreenContainer = styled(Screen)`
  padding: 0 20px 65px;
  align-items: center;
  justify-content: center;
`;

const ImageContainer = styled.View`
  margin: 20px 0;
`;
