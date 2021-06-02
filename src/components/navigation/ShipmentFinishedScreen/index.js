import React, {useCallback, useEffect} from 'react';
import styled, {css} from 'styled-components';
import {Screen} from 'components/ui/Screen';
import {AppText} from 'components/ui/AppText';
import {MainButton} from 'components/ui/MainButton';
import {useDispatch} from 'react-redux';
import {cleanShipments} from 'redux-store/slices/shipmentSlice';
import {scaleDpTheme} from 'helpers/responsiveHelper';
import {Container} from 'components/ui/Container';
import PackageDelivered from 'resources/images/box_delivered.svg';
import {useWindowDimension} from 'components/Hooks/useWindowsDimensions';
import {routes} from 'constants/config/routes';
import {Icon} from 'components/ui/Icon';
import {theme} from 'constants/theme';
import {Row} from 'components/ui/Row';

export default ({navigation, route}) => {
  const {shipment} = route.params || {};
  const dispatch = useDispatch();
  const {width, isMobile} = useWindowDimension();

  console.log(shipment);

  const onPressButton = useCallback(() => {
    dispatch(cleanShipments());
  }, [navigation]);

  return (
    <Screen alignItems={'center'}>
      <ScreenContainer>
        <Icon name="check-circle" size={80} color={theme.online} />
        <Title bold>{'El pedido ya fue entregado\ncorrectamente'}</Title>
        <DataContainer>
          <Row>
            <Label>Costo del envío: </Label>
            <Value>${shipment?.price}</Value>
          </Row>

          <Row>
            <Label>Desde: </Label>
            <Value>
              {shipment?.addresses?.[0].address?.name?.split(',')[0]}
            </Value>
          </Row>

          {shipment?.addresses?.length > 2 && (
            <Row>
              <Label>Pasando por: </Label>
              <Value>
                {shipment?.addresses?.[1].address?.name?.split(',')[0]}
              </Value>
            </Row>
          )}
          <Row>
            <Label>Hasta: </Label>
            <Value>
              {
                shipment?.addresses?.[
                  shipment?.addresses.length - 1
                ]?.address?.name?.split(',')[0]
              }
            </Value>
          </Row>
        </DataContainer>
        <MainButton label="Volver al inicio" onPress={onPressButton} />
      </ScreenContainer>
    </Screen>
  );
};

const ScreenContainer = styled.View`
  margin-top: ${scaleDpTheme(35)};
  align-items: center;
  padding-left: ${scaleDpTheme(12)};
  display: flex;
  flex: 1;
  width: 100%;
  padding-bottom: 20px;

  ${({theme}) =>
    !theme.isMobile &&
    css`
      flex: 0.6;
      padding-top: 40px;
      max-width: 414px;
    `}
`;

const Title = styled(AppText)`
  font-size: ${scaleDpTheme(20)};
  text-align: center;
  padding-bottom: 20px;
`;

const DataContainer = styled.View`
  flex: 1;
  padding-top: 20px;
  align-items: center;
  width: 100%;
`;

const Label = styled(AppText)`
  width: 50%;
  margin-right: 5px;
  text-align: right;
  padding: 5px 0;
`;

const Value = styled(AppText)`
  color: ${theme.primaryColor};
  width: 50%;
  text-align: left;
  padding: 5px 0;
`;
