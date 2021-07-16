import React, {useEffect, useCallback, useMemo, useRef} from 'react';
import Screen from 'components/ui/Screen';
import Map from 'components/ui/Map/index';
import {useDispatch, useSelector} from 'react-redux';
import {
  selectPendingShipmentAnswerError,
  selectCurrentShipmentError,
  selectPendingShipments,
} from 'redux-store/slices/driverShipmentSlice';
import {Loader} from 'components/ui/Loader';
import {getRotatedMarker} from 'components/ui/Map/helper';
import {getBearingFromCoords} from 'helpers/locationHelper';
import {Platform, Alert} from 'react-native';
import CAR_MARKER from 'resources/assets/driver_car.png';
import CarMarker from 'resources/assets/driver_car';
import {
  changeOnlineStatus,
  selectPreviosPosition,
} from 'redux-store/slices/driverSlice';
import {useFetcingPendingShipment} from 'components/navigation/DriverHome/useFetchPendignShipment';
import {OnlineStatusCard} from 'components/navigation/DriverHome/OnlineStatusCard';
import {useUserData} from 'components/Hooks/useUserData';
import {usePermission, PERMISSIONS} from 'components/Hooks/usePermission';
import {theme} from 'constants/theme';
import {routes} from 'constants/config/routes';
import {useCurrentUserPosition} from 'components/Hooks/useCurrentUserPosition';

const DriverHome = ({navigation}) => {
  const dispatch = useDispatch();
  const {courrier} = useUserData();
  const previosPosition = useSelector(selectPreviosPosition);
  const shipments = useSelector(selectPendingShipments);
  const pendingShipmentError = useSelector(selectCurrentShipmentError);
  const error = useSelector(selectPendingShipmentAnswerError);
  const {currentPosition: debouncedCurrentPosition} = useCurrentUserPosition();
  const mapRef = useRef(null);
  const {check, status} = usePermission(
    [PERMISSIONS.backgroundLocation, PERMISSIONS.location],
    false,
    true,
  );
  const pendingShipment = shipments[0]; // TODO: find the closest shipment

  useFetcingPendingShipment();

  const positionMarker = useMemo(() => {
    if (!debouncedCurrentPosition?.latitude) return;

    const orientation = getBearingFromCoords(
      previosPosition,
      debouncedCurrentPosition,
    );
    const marker = getRotatedMarker(
      Platform.select({
        web: CAR_MARKER,
        native: CarMarker,
      }),
      debouncedCurrentPosition.bearing > 0
        ? debouncedCurrentPosition.bearing || orientation
        : orientation,
      40,
    );
    return [
      {
        ...debouncedCurrentPosition,
        ...marker,
      },
    ];
  }, [debouncedCurrentPosition, previosPosition]);

  useEffect(() => {
    if (!error && !pendingShipmentError && pendingShipment) {
      navigation.navigate(routes.newShipmentModalScreen);
    }
  }, [navigation, pendingShipment, error, pendingShipmentError]);

  const onChangeOnlineStatus = useCallback(
    (newOnlineStatus, time) => {
      if (!courrier.enabled) {
        return Alert.alert(
          'Ya casi!',
          'Todavía estamos analizando tu perfil.\nNosotros te avisaremos cuando puedas empezar a realizar envíos',
        );
      }
      if (status) {
        newOnlineStatus && mapRef.current?.centerOnUserLocation();
        dispatch(changeOnlineStatus(newOnlineStatus, time.until));
      } else {
        check();
      }
    },
    [status, check, courrier, mapRef],
  );

  return (
    <Screen notchColor={theme.primaryColor}>
      <Loader unmount={false}>
        <Map
          ref={mapRef}
          style={{flex: 1, width: '100%'}}
          markers={positionMarker}
          minMarkerAnimation={0}
          showsMyLocationButton
        />
        <OnlineStatusCard onPressButton={onChangeOnlineStatus} />
      </Loader>
    </Screen>
  );
};
export default DriverHome;
