import React, {useState, useMemo, useEffect, useCallback} from 'react';
import Screen from 'components/ui/Screen';
import Map from 'components/ui/Map/index';
import {usePermission, PERMISSIONS} from 'components/Hooks/usePermission';
import {Loader} from 'components/ui/Loader';
import {useDispatch, useSelector} from 'react-redux';
import styled from 'styled-components';
import {useFocusEffect} from '@react-navigation/native';
import {decodeDirections, trackUserPosition} from 'helpers/locationHelper';
import {
  fetchCurrentShipment,
  selectDriverShipmentData,
  selectCurrentShipmentError,
  receiveChangeShipmentStatusSuccess,
} from 'redux-store/slices/driverShipmentSlice';
import {useMarkerList} from 'components/navigation/DriverNewShipmentScreen/useMarkerList';
import {ShipmentDescription} from 'components/navigation/DriverNewShipmentScreen/ShipmentDescription';
import {Alert} from 'react-native';
import BottomSheet from 'components/ui/DraggableBottomView';

const DriverNewShipmentScreen = () => {
  const dispatch = useDispatch();
  const currentShipmentError = useSelector(selectCurrentShipmentError);
  const [directions, setDirections] = useState([]);
  const shipments = useSelector(selectDriverShipmentData);
  const closestShipment = shipments[0];

  useEffect(() => {
    return () => {
      currentShipmentError &&
        !closestShipment &&
        Alert.alert('El cliente canceló el envio');
    };
  }, [currentShipmentError, closestShipment]);

  const {markersList, loadingMakers, loadingMessage} = useMarkerList();

  useEffect(() => {
    if (closestShipment?.polyline && directions.length === 0) {
      setDirections(decodeDirections(closestShipment.polyline));
    }
  }, [directions, closestShipment]);

  useFocusEffect(
    useCallback(() => {
      if (closestShipment.id) {
        const num = setInterval(() => {
          dispatch(fetchCurrentShipment(closestShipment.id));
        }, 6000);
        return () => {
          clearInterval(num);
        };
      }
    }, [closestShipment]),
  );

  return (
    <ScreenComponent>
      <Loader unmount={false} loading={loadingMakers} message={loadingMessage}>
        <Map
          style={{
            flex: 1,
          }}
          followsUserLocation
          showsMyLocationButton
          markers={markersList}
          edgePadding={{
            top: 100,
            bottom: 120,
            left: 20,
            right: 20,
          }}
        />
        <BottomSheet>
          <ShipmentDescription />
        </BottomSheet>
      </Loader>
    </ScreenComponent>
  );
};
export default DriverNewShipmentScreen;

const ScreenComponent = styled(Screen)`
  display: flex;
  height: 100%;
`;
