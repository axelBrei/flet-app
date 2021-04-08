import React, {useEffect, useState, useCallback, useMemo} from 'react';
import {Screen} from 'components/ui/Screen';
import Map from 'components/ui/Map/index';
import {useModal} from 'components/Hooks/useModal';
import {NewTripModalContent} from 'components/navigation/DriverHome/NewTripModalContent';
import {useDispatch, useSelector} from 'react-redux';
import {
  confirmShipment,
  rejectShipment,
  selectDriverShipmentData,
  selectPendingShipment,
  selectPendingShipmentAnswerError,
} from 'redux-store/slices/driverShipmentSlice';
import {Loader} from 'components/ui/Loader';
import {getRotatedMarker} from 'components/ui/Map/helper';
import {getBearingFromCoords} from 'helpers/locationHelper';
import {Platform} from 'react-native';
import CAR_MARKER from 'resources/assets/driver_car.png';
import CarMarker from 'resources/assets/driver_car';
import {
  changeOnlineStatus,
  selectOnlineStatus,
  selectPreviosPosition,
  updatePosition,
} from 'redux-store/slices/driverSlice';
import {useFetcingPendingShipment} from 'components/navigation/DriverHome/useFetchPendignShipment';
import {OnlineStatusCard} from 'components/navigation/DriverHome/OnlineStatusCard';
import useBackgroundLocation from 'components/Hooks/useBackgroundLocation';
import {useUserData} from 'components/Hooks/useUserData';
import {err} from 'react-native-svg/lib/typescript/xml';

export default ({navigation}) => {
  const dispatch = useDispatch();
  const {courrier} = useUserData();
  const isOnline = useSelector(selectOnlineStatus);
  const previosPosition = useSelector(selectPreviosPosition);
  const pendingShipment = useSelector(selectPendingShipment);
  const currentShipment = useSelector(selectDriverShipmentData);
  const error = useSelector(selectPendingShipmentAnswerError);
  const [debouncedCurrentPosition, setLocation] = useState({});

  const {enable, disable} = useBackgroundLocation(
    loc =>
      new Promise(resolve => {
        setLocation(loc);
        if (loc?.latitude && Platform.OS === 'web') {
          dispatch(updatePosition(loc));
        }
        resolve();
      }),
    {
      interval: 10 * 1000,
      fastestInterval: 5 * 1000,
      activitiesInterval: 10 * 1000,
      url: 'courrier/position',
      body: {
        latitude: '@latitude',
        longitude: '@longitude',
        vehicle_id: courrier.vehicle?.[0]?.id,
      },
    },
  );

  useEffect(() => {
    (isOnline ? enable : disable)();
  }, [isOnline, enable, disable]);

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
      },
      onPressReject: () => {
        dispatch(rejectShipment());
      },
    },
    {cancelable: false},
  );

  useEffect(() => {
    if (!error && pendingShipment) {
      open();
    } else if (error) {
      close();
    }
  }, [pendingShipment, error]);

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
