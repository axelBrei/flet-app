import React, {useEffect, useState, useCallback, useMemo} from 'react';
import {Screen} from 'components/ui/Screen';
import Map from 'components/ui/Map/index';
import {FloatingHamburguerButton} from 'components/ui/FloatingHamburgerButton';
import {Container} from 'components/ui/Container';
import styled from 'styled-components';
import {theme} from 'constants/theme';
import {AppText} from 'components/ui/AppText';
import {scaleDp, scaleDpTheme} from 'helpers/responsiveHelper';
import {Switch} from 'components/ui/Switch';
import {useModal} from 'components/Hooks/useModal';
import {NewTripModalContent} from 'components/navigation/DriverHome/NewTripModalContent';
import {routes} from 'constants/config/routes';
import {useDispatch, useSelector} from 'react-redux';
import PermissionManager from 'components/Permissions/index';
import {
  confirmShipment,
  fetchPendingShipments,
  rejectShipment,
  selectDriverRejectShipmentError,
  selectDriverShipmentData,
  selectLoadingPendingShipmentAnswer,
  selectPendingShipment,
} from 'redux-store/slices/driverShipmentSlice';
import {Loader} from 'components/ui/Loader';
import {getRotatedMarker} from 'components/ui/Map/helper';
import {
  getBearingFromCoords,
  getCurrentPosition,
  trackUserPosition,
} from 'helpers/locationHelper';
import {Platform} from 'react-native';
import CAR_MARKER from 'resources/assets/driver_car.png';
import CarMarker from 'resources/assets/driver_car';
import {useWindowDimension} from 'components/Hooks/useWindowsDimensions';
import {
  changeOnlineStatus,
  selectCurrentPosition,
  selectOnlineStatus,
  selectPreviosPosition,
  updatePosition,
} from 'redux-store/slices/driverSlice';
import {useIsFocused} from '@react-navigation/native';
import {useDebounce} from 'components/Hooks/useDebounce';
import {useUpdateCurrentPosition} from 'components/navigation/DriverHome/useUpdateCurrentPosition';
import {useFetcingPendingShipment} from 'components/navigation/DriverHome/useFetchPendignShipment';
import {OnlineStatusCard} from 'components/navigation/DriverHome/OnlineStatusCard';
import dayjs from 'dayjs';

export default ({navigation}) => {
  const dispatch = useDispatch();
  const loading = useSelector(selectLoadingPendingShipmentAnswer);
  const error = useSelector(selectDriverRejectShipmentError);
  const previosPosition = useSelector(selectPreviosPosition);
  const pendingShipment = useSelector(selectPendingShipment);
  const currentShipment = useSelector(selectDriverShipmentData);

  const debouncedCurrentPosition = useUpdateCurrentPosition();
  useFetcingPendingShipment();

  useEffect(() => {
    if (currentShipment && !pendingShipment) {
      navigation.navigate(routes.driverShipmentScreen);
    }
  }, [loading, error, navigation]);

  const positionMarker = useMemo(() => {
    if (!debouncedCurrentPosition.latitude) return;

    const orientation = getBearingFromCoords(
      previosPosition,
      debouncedCurrentPosition,
    );
    const marker = getRotatedMarker(
      Platform.select({
        web: CAR_MARKER,
        native: CarMarker,
      }),
      orientation,
      40,
    );
    return [
      {
        ...debouncedCurrentPosition,
        ...marker,
      },
    ];
  }, [debouncedCurrentPosition, previosPosition]);

  const {Modal, toggle, open, close} = useModal(
    NewTripModalContent,
    {
      distance: pendingShipment?.startPoint?.distance,
      dropZone: pendingShipment?.endPoint?.name.split(',')[2],
      onPressAccept: () => {
        dispatch(confirmShipment());
        close();
      },
      onPressReject: () => {
        dispatch(rejectShipment());
        close();
      },
    },
    {cancelable: false},
  );

  useEffect(() => {
    if (pendingShipment) {
      open();
    }
  }, [pendingShipment]);

  const onChangeOnlineStatus = useCallback((newOnlineStatus, time) => {
    dispatch(changeOnlineStatus(newOnlineStatus, time.until));
  }, []);

  return (
    <Screen>
      <Loader unmount={false}>
        <Map
          style={{flex: 1, width: '100%'}}
          markers={positionMarker}
          showsMyLocationButton
        />
        <OnlineStatusCard onPressButton={onChangeOnlineStatus} />
        <Modal />
      </Loader>
    </Screen>
  );
};
