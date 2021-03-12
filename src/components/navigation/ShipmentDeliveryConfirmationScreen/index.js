import React, {useState, useCallback} from 'react';
import styled from 'styled-components';
import {Screen} from 'components/ui/Screen';
import {AppText} from 'components/ui/AppText';
import {MainButton} from 'components/ui/MainButton';
import {SecurityCodeInput} from 'components/navigation/ShipmentDeliveryConfirmationScreen/SecurityCodeInput';
import {scaleDpTheme} from 'helpers/responsiveHelper';
import {Container} from 'components/ui/Container';
import {Alert, View} from 'react-native';
import PackageDelivered from 'resources/assets/package_delivered.svg';
import {useWindowDimension} from 'components/Hooks/useWindowsDimensions';
import {useDispatch, useSelector} from 'react-redux';
import {
  selectIsLoadingSecureCode,
  uploadConfirmationCode,
} from 'redux-store/slices/driverShipmentSlice';
import {Loader} from 'components/ui/Loader';

export default () => {
  const dispatch = useDispatch();
  const {width, height} = useWindowDimension();
  const [securityCode, setSecurityCode] = useState('');
  const loading = useSelector(selectIsLoadingSecureCode);

  const onPressAccept = useCallback(() => {
    if (securityCode.length === 5) {
      dispatch(uploadConfirmationCode(securityCode));
    } else {
      Alert.alert('Debe completar todos los campos del código');
    }
  }, [securityCode]);

  return (
    <Screen>
      <Title bold>Ingrese el codigo de seguridad</Title>
      <AppText textAlign="center">
        {
          'Pedile este codigo a la persona que\\nrealizo el envío para poder finalizarlo'
        }
      </AppText>
      <PackageDelivered width={width * 0.7} height={height * 0.3} />
      <ContentContainer>
        <InputContainer>
          <SecurityCodeInput
            value={securityCode}
            onChangeValue={setSecurityCode}
          />
        </InputContainer>
        <Loader loading={loading}>
          <MainButton label="Finalizar envío" onPress={onPressAccept} />
        </Loader>
      </ContentContainer>
    </Screen>
  );
};

const Title = styled(AppText)`
  font-size: ${scaleDpTheme(20)};
  margin-top: ${scaleDpTheme(15)};
  margin-bottom: ${scaleDpTheme(30)};
`;

const ContentContainer = styled(View)`
  display: flex;
  flex: 1;
  padding-top: ${scaleDpTheme(15)};
  padding-bottom: ${scaleDpTheme(35)};
  align-items: center;
`;

const InputContainer = styled(View)`
  flex: 1;
`;
