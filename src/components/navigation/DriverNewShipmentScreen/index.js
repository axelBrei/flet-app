import React, {useState, useMemo, useEffect} from 'react';
import {Screen} from 'components/ui/Screen';
import Map from 'components/ui/Map/index';
import {usePermission, PERMISSIONS} from 'components/Hooks/usePermission';
import {Loader} from 'components/ui/Loader';
import {FloatingHamburguerButton} from 'components/ui/FloatingHamburgerButton';
import {useDispatch, useSelector} from 'react-redux';
import styled from 'styled-components';
import {scaleDpTheme} from 'helpers/responsiveHelper';
import {decodeDirections} from 'helpers/locationHelper';
import {selectDriverShipmentData} from 'redux-store/slices/driverShipmentSlice';
import {theme} from 'constants/theme';
import {PickupShipment} from 'components/navigation/DriverNewShipmentScreen/PickupShipment';
import {Container} from 'components/ui/Container';
import {DeliverShipmentInformation} from 'components/navigation/DriverNewShipmentScreen/DeliverShipmentInformation';
import {useMarkerList} from 'components/navigation/DriverNewShipmentScreen/useMarkerList';
import {SHIPMENT_STATE} from 'constants/shipmentStates';

export default ({navigation}) => {
  const [directions, setDirections] = useState([]);
  const {loading: loadingPermissions, status, check} = usePermission(
    [PERMISSIONS.location],
    true,
  );
  const shipment = useSelector(selectDriverShipmentData);
  const isPackagePickedUp = shipment.status === SHIPMENT_STATE.ON_PROCESS;

  const {markersList, loadingMakers, loadingMessage} = useMarkerList();

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
          style={{flex: 1, width: '100%'}}
        />
        <FloatingContainer>
          {!isPackagePickedUp ? (
            <PickupShipment />
          ) : (
            <DeliverShipmentInformation />
          )}
        </FloatingContainer>
        <FloatingHamburguerButton />
      </Loader>
    </ScreenComponent>
  );
};

const ScreenComponent = styled(Screen)`
  display: flex;
  height: ${(props) => props.theme.screenHeight}px;
`;

const FloatingContainer = styled(Container)`
  background-color: ${theme.backgroundColor};
  elevation: 3;
  box-shadow: 0px -1px 6px ${theme.shadowColor};
  border-top-left-radius: ${scaleDpTheme(20)};
  border-top-right-radius: ${scaleDpTheme(20)};
  width: 100%;
`;
