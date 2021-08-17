import React, {useCallback} from 'react';
import styled, {css} from 'styled-components';
import Screen from 'components/ui/Screen';
import {AppText} from 'components/ui/AppText';
import {MainButton} from 'components/ui/MainButton';
import {useDispatch, useSelector} from 'react-redux';
import {
  cleanShipments,
  selectCurrentShipment,
} from 'redux-store/slices/shipmentSlice';
import {Icon} from 'components/ui/Icon';
import {theme} from 'constants/theme';
import {Row} from 'components/ui/Row';

export default ({route}) => {
  const dispatch = useDispatch();
  const reduxShipment = useSelector(selectCurrentShipment);
  const shipment = route.params?.shipment || reduxShipment || {};

  const onPressButton = useCallback(() => {
    dispatch(cleanShipments());
  }, []);

  return (
    <Screen alignItems={'center'}>
      <ScreenContainer>
        <Icon name="check-circle" size={80} color={theme.online} />
        <Title bold>{'El pedido ya fue entregado\ncorrectamente'}</Title>
        <DataContainer>
          {shipment?.price && (
            <Row>
              <Label>Costo del envío: </Label>
              <Value>${shipment?.price}</Value>
            </Row>
          )}

          <Row>
            <Label>Desde: </Label>
            <Value>
              {shipment?.addresses?.[0].address?.name?.split(',')?.[0]}
            </Value>
          </Row>

          {shipment?.addresses?.length > 2 && (
            <Row>
              <Label>Pasando por: </Label>
              <Value>
                {shipment?.addresses?.[1].address?.name?.split(',')?.[0]}
              </Value>
            </Row>
          )}
          <Row>
            <Label>Hasta: </Label>
            <Value>
              {
                shipment?.addresses?.[
                  (shipment?.addresses?.length || 1) - 1
                ]?.address?.name?.split(',')?.[0]
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
  margin-top: 35px;
  align-items: center;
  padding-left: 12px;
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
  font-size: 20px;
  text-align: center;
  padding-bottom: 20px;
`;

const DataContainer = styled.View`
  flex: 1;
  align-items: center;
  width: 100%;
  padding: 20px;
`;

const Label = styled(AppText)`
  margin-right: 5px;
  padding: 5px 0;
`;

const Value = styled(AppText)`
  color: ${theme.primaryColor};
  padding: 5px 0;
  text-align: left;
  flex: 1;
`;
