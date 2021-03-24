import React, {useMemo, useState, useEffect} from 'react';
import {Screen} from 'components/ui/Screen';
import {ShipmentDetailCard} from 'components/navigation/ShipmentScreen/ShipmentDetailCard';
import Map from 'components/ui/Map';
import {useWindowDimension} from 'components/Hooks/useWindowsDimensions';
import {getMarkersList} from 'components/navigation/ShipmentScreen/constants';
import DraggableBottomView from 'components/ui/DraggableBottomView';
import styled from 'styled-components';
import {Platform} from 'react-native';
import {Container} from 'components/ui/Container';
import {scaleDp} from 'helpers/responsiveHelper';
import {useDispatch, useSelector} from 'react-redux';
import {
  fetchShipmentDriverPosition,
  fetchShipmentStatus,
  selectCurrentShipment,
  selectCurrentShipmentStatus,
  selectDriverPosition,
} from 'redux-store/slices/shipmentSlice';
import {SHIPMENT_STATE} from 'constants/shipmentStates';
import {decodeDirections} from 'helpers/locationHelper';
import {theme} from 'constants/theme';
import {useShipmentIntervals} from 'components/navigation/ShipmentScreen/useShipmentIntervals';

const positionEnabledStates = [
  SHIPMENT_STATE.COURRIER_CONFIRMED,
  SHIPMENT_STATE.ON_PROCESS,
];

export default ({route}) => {
  const dispatch = useDispatch();
  const {height, width} = useWindowDimension();
  const driverPosition = useSelector(selectDriverPosition);
  const shipmentStatus = useSelector(selectCurrentShipmentStatus);
  const currentShipment = useSelector(selectCurrentShipment);

  useShipmentIntervals();
  // const [directions, setDirections] = useState([]);

  // useEffect(() => {
  //   if (positionEnabledStates.includes(shipmentStatus?.status)) {
  //     if (directions.length === 0) {
  //       setDirections(decodeDirections(shipmentStatus?.polyline));
  //     }
  //   }
  // }, [shipmentStatus]);

  const markers = useMemo(
    () =>
      getMarkersList(
        shipmentStatus?.startPoint ? shipmentStatus : currentShipment,
        driverPosition,
      ),
    [shipmentStatus, driverPosition],
  );

  return (
    <Screen
      style={{height, width}}
      scrollable={false}
      enableAvoidKeyboard={false}>
      <Map
        style={
          // {width, height: height * 0.75}
          {flex: 1}
        }
        markers={markers}
        minMarkerAnimation={0}
        edgePadding={{
          top: 40,
          bottom: 40,
        }}
        // directions={directions}
      />
      <CardContainer>
        <ShipmentDetailCard />
      </CardContainer>
    </Screen>
  );
};

const CardContainer = styled.View`
  width: 100%;
  border-top-right-radius: 20px;
  border-top-left-radius: 20px;
  background-color: ${theme.white};
  box-shadow: 3px -3px 8px ${theme.shadowColor};
  margin-bottom: 40px;
  bottom: 25px;
`;
