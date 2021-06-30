import React, {useMemo, useEffect} from 'react';
import {WithMobileSupport} from 'components/HOC/WithMobileSupport';
import MobileScreen from 'components/navigation/ShipmentScreen/index.native';
import Screen from 'components/ui/Screen/index.web';
import styled from 'styled-components';
import {Container} from 'components/ui/Container';
import {scaleDp, scaleDpTheme} from 'helpers/responsiveHelper';
import {theme} from 'constants/theme';
import {ShipmentDetailCard} from 'components/navigation/ShipmentScreen/ShipmentDetailCard';
import Map from 'components/ui/Map';
import {useWindowDimension} from 'components/Hooks/useWindowsDimensions';
import {getMarkersList} from 'components/navigation/ShipmentScreen/constants';
import {useDispatch, useSelector} from 'react-redux';
import {
  fetchShipmentDriverPosition,
  fetchShipmentStatus,
  selectCurrentShipment,
  selectCurrentShipmentStatus,
  selectDriverPosition,
} from 'redux-store/slices/shipmentSlice';
import {SHIPMENT_STATE} from 'constants/shipmentStates';
import {applyShadow} from 'helpers/uiHelper';

const positionEnabledStates = [
  SHIPMENT_STATE.COURRIER_CONFIRMED,
  SHIPMENT_STATE.ON_PROCESS,
];

const ShipmentScreen = ({route}) => {
  const dispatch = useDispatch();
  const {width, height} = useWindowDimension();
  const driverPosition = useSelector(selectDriverPosition);
  const shipmentStatus = useSelector(selectCurrentShipmentStatus);

  useEffect(() => {
    if (positionEnabledStates.includes(shipmentStatus?.status)) {
      const positionInterval = setInterval(
        () => dispatch(fetchShipmentDriverPosition()),
        5 * 1000,
      );
      return () => {
        clearInterval(positionInterval);
      };
    }
  }, [shipmentStatus]);

  useEffect(() => {
    const statusInterval = setInterval(() => {
      dispatch(fetchShipmentStatus());
    }, 10 * 1000);
    return () => {
      clearInterval(statusInterval);
    };
  }, []);

  const markers = useMemo(
    () => getMarkersList(shipmentStatus, driverPosition),
    [shipmentStatus, driverPosition],
  );

  return (
    <ScreenComponent>
      <Map
        markers={markers}
        minMarkerAnimation={0}
        style={{height: height - scaleDp(40), width}}
        edgePadding={{
          top: height * 0.25,
          left: height * 0.35,
          right: width * 0.2,
          bottom: 0,
        }}
      />
      <ShipmentDetailContainer>
        <ShipmentDetailCard />
      </ShipmentDetailContainer>
    </ScreenComponent>
  );
};

export default WithMobileSupport(ShipmentScreen, MobileScreen);

const ScreenComponent = styled(Screen)`
  align-items: flex-start;
  justify-content: center;
  height: 100%;
  height: ${props => props.theme.screenHeight}px;
  width: 100%;
  padding: ${scaleDpTheme(20)} 0;
`;

const ShipmentDetailContainer = styled(Container)`
  background-color: ${theme.white};
  position: absolute;
  top: ${scaleDpTheme(25)};
  left: ${scaleDpTheme(15)};
  padding: ${scaleDpTheme(10)} ${scaleDpTheme(15)};
  border-radius: ${scaleDpTheme(8)};
  box-shadow: 0 3px 6px ${theme.shadowColor};
  width: max(${scaleDpTheme(270)}, 45%);
`;
ShipmentDetailCard.defaultProps = applyShadow();
