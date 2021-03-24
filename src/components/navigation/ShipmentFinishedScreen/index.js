import React, {useCallback} from 'react';
import styled from 'styled-components';
import {Screen} from 'components/ui/Screen';
import {AppText} from 'components/ui/AppText';
import {MainButton} from 'components/ui/MainButton';
import {useDispatch} from 'react-redux';
import {cleanShipments} from 'redux-store/slices/shipmentSlice';
import {scaleDpTheme} from 'helpers/responsiveHelper';
import {Container} from 'components/ui/Container';
import PackageDelivered from 'resources/images/box_delivered.svg';
import {useWindowDimension} from 'components/Hooks/useWindowsDimensions';

export default ({navigation}) => {
  const dispatch = useDispatch();
  const {width, isMobile} = useWindowDimension();

  const onPressButton = useCallback(() => {
    dispatch(cleanShipments());
  }, [navigation]);

  return (
    <Screen alignItems={isMobile ? 'center' : 'flex-start'}>
      <ScreenContainer>
        <Title bold>El pedido ya fue entregado</Title>
        <PackageDelivered width={width * (isMobile ? 0.8 : 0.3)} height={300} />
        <MainButton label="Volver al inicio" onPress={onPressButton} />
      </ScreenContainer>
    </Screen>
  );
};

const ScreenContainer = styled.View`
  margin-top: ${scaleDpTheme(35)};
  align-items: center;
  padding-left: ${scaleDpTheme(12)};
`;

const Title = styled(AppText)`
  font-size: ${scaleDpTheme(20)};
  text-align: center;
`;
