import React, {useEffect, useState, useCallback, useMemo} from 'react';
import {Screen} from 'components/ui/Screen';
import Map from 'components/ui/Map/index';
import {useModal} from 'components/Hooks/useModal';
import {NewTripModalContent} from 'components/navigation/DriverHome/NewTripModalContent';
import {useDispatch, useSelector} from 'react-redux';
import {
  confirmShipment,
  rejectShipment,
  selectPendingShipment,
  selectPendingShipmentAnswerError,
  selectPendingShipmentError,
} from 'redux-store/slices/driverShipmentSlice';
import {Loader} from 'components/ui/Loader';
import {getRotatedMarker} from 'components/ui/Map/helper';
import {getBearingFromCoords} from 'helpers/locationHelper';
import {Platform, Alert} from 'react-native';
import CAR_MARKER from 'resources/assets/driver_car.png';
import CarMarker from 'resources/assets/driver_car';
import {
  changeOnlineStatus,
  selectCurrentPosition,
  selectOnlineStatus,
  selectPreviosPosition,
  updatePosition,
} from 'redux-store/slices/driverSlice';
import {useFetcingPendingShipment} from 'components/navigation/DriverHome/useFetchPendignShipment';
import {OnlineStatusCard} from 'components/navigation/DriverHome/OnlineStatusCard';
import useBackgroundLocation from 'components/Hooks/useBackgroundLocation';
import {useUserData} from 'components/Hooks/useUserData';
import {useIsFocused} from '@react-navigation/native';
import {usePermission, PERMISSIONS} from 'components/Hooks/usePermission';

export default ({navigation}) => {
  const dispatch = useDispatch();
  const isFocused = useIsFocused();
  const {courrier} = useUserData();
  const isOnline = useSelector(selectOnlineStatus);
  const previosPosition = useSelector(selectPreviosPosition);
  const pendingShipment = useSelector(selectPendingShipment);
  const pendingShipmentError = useSelector(selectPendingShipmentError);
  const error = useSelector(selectPendingShipmentAnswerError);
  const debouncedCurrentPosition = useSelector(selectCurrentPosition);
  const {check, status} = usePermission([PERMISSIONS.backgroundLocation]);

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
      debouncedCurrentPosition.bearing || orientation,
      40,
    );
    return [
      {
        ...debouncedCurrentPosition,
        ...marker,
      },
    ];
  }, [debouncedCurrentPosition, previosPosition]);

  const {Modal, isModalVisible, open, close} = useModal(
    NewTripModalContent,
    {
      distance: pendingShipment?.startPoint?.distance,
      dropZone: pendingShipment?.endPoint?.name.split(',')[2],
      onPressAccept: () => {
        dispatch(confirmShipment());
      },
      onPressReject: () => {
        dispatch(rejectShipment());
      },
    },
    {cancelable: false, fullscreen: false},
  );

  useEffect(() => {
    if (!error && !pendingShipmentError && pendingShipment && !isModalVisible) {
      open();
    } else if (error && isModalVisible) {
      close();
    }
  }, [pendingShipment, error, pendingShipmentError, isModalVisible]);

  const onChangeOnlineStatus = useCallback(
    (newOnlineStatus, time) => {
      if (!courrier.enabled) {
        Alert.alert(
          'Ya casi!',
          'Todavía estamos analizando tu perfil.\nNosotros te avisaremos cuando puedas empezar a realizar envíos',
        );
        return;
      }
      if (status) {
        dispatch(changeOnlineStatus(newOnlineStatus, time.until));
      } else {
        check();
      }
    },
    [status, check, courrier],
  );

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
