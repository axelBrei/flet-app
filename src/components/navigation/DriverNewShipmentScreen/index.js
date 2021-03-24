import React, {useState, useMemo, useEffect} from 'react';
import {Screen} from 'components/ui/Screen';
import Map from 'components/ui/Map/index';
import {usePermission, PERMISSIONS} from 'components/Hooks/usePermission';
import {Loader} from 'components/ui/Loader';
import {useDispatch, useSelector} from 'react-redux';
import styled from 'styled-components';
import {scaleDpTheme} from 'helpers/responsiveHelper';
import {decodeDirections, trackUserPosition} from 'helpers/locationHelper';
import {selectDriverShipmentData} from 'redux-store/slices/driverShipmentSlice';
import {theme} from 'constants/theme';
import {Container} from 'components/ui/Container';
import {useMarkerList} from 'components/navigation/DriverNewShipmentScreen/useMarkerList';
import {updatePosition} from 'redux-store/slices/driverSlice';
import {ShipmentDescription} from 'components/navigation/DriverNewShipmentScreen/ShipmentDescription';

export default ({}) => {
  const dispatch = useDispatch();
  const [directions, setDirections] = useState([]);
  const {loading: loadingPermissions, status, check} = usePermission(
    [PERMISSIONS.location],
    true,
  );
  const shipment = useSelector(selectDriverShipmentData);

  const {
    markersList,
    loadingMakers,
    loadingMessage,
  } = useMarkerList((position) => dispatch(updatePosition(position)));

  useEffect(() => {
    if (shipment?.polyline && directions.length === 0) {
      setDirections(decodeDirections(shipment.polyline));
    }
  }, [directions, shipment]);

  useEffect(() => {
    if (status !== 'granted') {
      check();
    }
  }, [loadingPermissions, status, check]);

  return (
    <ScreenComponent>
      <Loader
        unmount={false}
        loading={loadingPermissions || loadingMakers}
        message={loadingMessage}>
        <Map
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
`;
