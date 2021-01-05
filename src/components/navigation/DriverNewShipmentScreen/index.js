import React, {useState, useMemo, useEffect} from 'react';
import {Screen} from 'components/ui/Screen';
import Map from 'components/ui/Map/index';
import {usePermission, PERMISSIONS} from 'components/Hooks/usePermission';
import {Loader} from 'components/ui/Loader';
import {FloatingHamburguerButton} from 'components/ui/FloatingHamburgerButton';
import {useDispatch, useSelector} from 'react-redux';
import {
  getDirectionsFromCurrentLocation,
  selectCurrentDirections,
  selectLoadingDirections,
} from 'redux-store/slices/geolocationSlice';
import styled from 'styled-components';
import {scaleDpTheme} from 'helpers/responsiveHelper';
import {
  selectDriverAcceptShipmentError,
  selectDriverAcceptShipmentLoading,
  selectDriverShipmentData,
} from 'redux-store/slices/driverShipmentSlice';
import {theme} from 'constants/theme';
import {PickupShipment} from 'components/navigation/DriverNewShipmentScreen/PickupShipment';
import {Container} from 'components/ui/Container';
import {selectIsDriverShipmentPickedUp} from 'redux-store/slices/driverShipmentSlice';
import {DeliverShipmentInformation} from 'components/navigation/DriverNewShipmentScreen/DeliverShipmentInformation';
import {useMarkerList} from 'components/navigation/DriverNewShipmentScreen/useMarkerList';
import {Platform} from 'react-native';

export default () => {
  const dispatch = useDispatch();
  const loading = useSelector(selectDriverAcceptShipmentLoading);
  const error = useSelector(selectDriverAcceptShipmentError);
  const {loading: loadingPermissions, status, check} = usePermission(
    [PERMISSIONS.location],
    true,
  );
  const shipmentData = useSelector(selectDriverShipmentData);
  const isPackagePickedUp = useSelector(selectIsDriverShipmentPickedUp);
  const directions = useSelector(selectCurrentDirections);
  const {
    markersList,
    loadingMakers,
    loadingMessage,
    loadingDirections,
  } = useMarkerList();

  useEffect(() => {
    if (!loadingDirections && !status) {
      check();
    }
  }, [loadingPermissions, status, check]);

  useEffect(() => {
    if (isPackagePickedUp ? shipmentData?.endPoint : shipmentData?.startPoint) {
      dispatch(
        getDirectionsFromCurrentLocation(
          isPackagePickedUp ? shipmentData.endPoint : shipmentData.startPoint,
        ),
      );
    }
  }, [dispatch, shipmentData, isPackagePickedUp]);

  return (
    <ScreenComponent>
      <Loader
        unmount={false}
        loading={
          loading || loadingPermissions || loadingMakers || loadingDirections
        }
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
