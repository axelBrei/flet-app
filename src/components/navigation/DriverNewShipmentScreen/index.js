import React, {useState, useMemo, useEffect, useCallback} from 'react';
import {Screen} from 'components/ui/Screen';
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
  selectPendingShipmentError,
} from 'redux-store/slices/driverShipmentSlice';
import {useMarkerList} from 'components/navigation/DriverNewShipmentScreen/useMarkerList';
import {updatePosition} from 'redux-store/slices/driverSlice';
import {ShipmentDescription} from 'components/navigation/DriverNewShipmentScreen/ShipmentDescription';
import {Alert} from 'react-native';

export default ({}) => {
  const dispatch = useDispatch();
  const currentShipmentError = useSelector(selectPendingShipmentError);
  const [directions, setDirections] = useState([]);
  const shipment = useSelector(selectDriverShipmentData);

  useEffect(() => {
    return () => {
      currentShipmentError &&
        !shipment &&
        Alert.alert('El cliente canceló el envio');
    };
  }, [currentShipmentError, shipment]);

  const {markersList, loadingMakers, loadingMessage} = useMarkerList(position =>
    dispatch(updatePosition(position)),
  );

  useEffect(() => {
    if (shipment?.polyline && directions.length === 0) {
      setDirections(decodeDirections(shipment.polyline));
    }
  }, [directions, shipment]);

  useFocusEffect(
    useCallback(() => {
      const num = setInterval(() => {
        dispatch(fetchCurrentShipment());
      }, 6000);
      return () => {
        clearInterval(num);
      };
    }, []),
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
          directions={directions}
          markers={markersList}
        />
        <ShipmentDescription />
      </Loader>
    </ScreenComponent>
  );
};

const ScreenComponent = styled(Screen)`
  display: flex;
  height: 100%;
`;
