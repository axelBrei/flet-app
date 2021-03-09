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
  selectCurrentShipmentStatus,
  selectDriverPosition,
} from 'redux-store/slices/shipmentSlice';
import {SHIPMENT_STATE} from 'constants/shipmentStates';
import {decodeDirections} from 'helpers/locationHelper';

const positionEnabledStates = [
  SHIPMENT_STATE.COURRIER_CONFIRMED,
  SHIPMENT_STATE.ON_PROCESS,
];

export default ({route}) => {
  const dispatch = useDispatch();
  const {height, width} = useWindowDimension();
  const driverPosition = useSelector(selectDriverPosition);
  const shipmentStatus = useSelector(selectCurrentShipmentStatus);
  const [directions, setDirections] = useState([]);

  useEffect(() => {
    if (positionEnabledStates.includes(shipmentStatus?.status)) {
      if (directions.length === 0) {
        setDirections(decodeDirections(shipmentStatus?.polyline));
      }
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
    <Screen
      style={{height, width}}
      scrollable={false}
      enableAvoidKeyboard={false}>
      <Map
        style={{height, width}}
        markers={markers}
        minMarkerAnimation={0}
        directions={directions}
      />
      <DraggableBottomView initialHiddenContentPercentage={0.35}>
        <CardContainer>
          <ShipmentDetailCard />
        </CardContainer>
      </DraggableBottomView>
    </Screen>
  );
};

const CardContainer = styled(Container)`
  height: ${(props) =>
    Platform.select({
      web: props.theme.screenHeight * 0.7,
      native: scaleDp(450),
    })}px;
`;
