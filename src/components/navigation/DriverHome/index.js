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
import {
  confirmShipment,
  fetchPendingShipments,
  rejectShipment,
  selectDriverRejectShipmentError,
  selectDriverRejectShipmentLoading,
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
  selectOnlineStatusError,
  selectOnlineStatusLoading,
  selectPreviosPosition,
  updatePosition,
} from 'redux-store/slices/driverSlice';
import {useIsFocused} from '@react-navigation/native';

export default ({navigation}) => {
  const dispatch = useDispatch();
  const isFocused = useIsFocused();
  const {height, isMobile} = useWindowDimension();
  const loading = useSelector(selectLoadingPendingShipmentAnswer);
  const error = useSelector(selectDriverRejectShipmentError);
  const isOnline = useSelector(selectOnlineStatus);
  const currentPosition = useSelector(selectCurrentPosition);
  const previosPosition = useSelector(selectPreviosPosition);
  const pendingShipment = useSelector(selectPendingShipment);
  const currentShipment = useSelector(selectDriverShipmentData);

  useEffect(() => {
    const handleNewPosition = (p) => {
      const position = p.coords;
      if (
        !currentPosition.latitude ||
        position.latitude !== currentPosition?.latitude
      ) {
        dispatch(updatePosition(position));
      }
    };
    return trackUserPosition(handleNewPosition);
  }, [currentPosition]);

  useEffect(() => {
    if (isOnline && isFocused) {
      const timeout = setInterval(() => {
        dispatch(fetchPendingShipments());
      }, 7 * 1000);
      return () => clearInterval(timeout);
    }
  }, [isOnline, pendingShipment]);

  useEffect(() => {
    if (pendingShipment) {
      toggle();
    }
  }, [pendingShipment]);

  useEffect(() => {
    if (currentShipment && !pendingShipment) {
      navigation.navigate(routes.driverShipmentScreen);
    }
  }, [loading, error, navigation]);

  const positionMarker = useMemo(() => {
    if (!currentPosition.latitude) return;

    const orientation = getBearingFromCoords(previosPosition, currentPosition);
    const marker = getRotatedMarker(
      Platform.select({
        web: CAR_MARKER,
        native: CarMarker,
      }),
      orientation,
      scaleDp(40),
    );
    return [
      {
        ...currentPosition,
        ...marker,
      },
    ];
  }, [currentPosition, previosPosition]);

  const {Modal, toggle, open} = useModal(NewTripModalContent, {
    distance: pendingShipment?.startPoint?.distance,
    dropZone: pendingShipment?.endPoint?.name.split(',')[2],
    onPressAccept: () => {
      dispatch(confirmShipment());
      toggle();
    },
    onPressReject: () => {
      dispatch(rejectShipment());
    },
  });

  const onChangeOnlineStatus = useCallback((newOnlineStatus) => {
    dispatch(changeOnlineStatus(newOnlineStatus));
  }, []);

  return (
    <ScreenComponent>
      <Loader unmount={false}>
        <ContentContainer>
          <Map
            style={{flex: 1, width: '100%'}}
            markers={positionMarker}
            showsMyLocationButton
          />
          {isMobile && <FloatingHamburguerButton />}
          <AvailableContainer>
            <Switch value={isOnline} onChange={onChangeOnlineStatus} />
            <AppText padding={10}>Esperando Viajes</AppText>
          </AvailableContainer>
          <Modal />
        </ContentContainer>
      </Loader>
    </ScreenComponent>
  );
};
const ScreenComponent = styled(Screen)`
  height: ${(props) => props.theme.screenHeight}px;
`;

const ContentContainer = styled(Container)`
  flex: 1;
  height: 100%;
  width: 100%;
`;

const AvailableContainer = styled(Container)`
  background-color: ${theme.white};
  align-items: center;
  justify-content: center;
  height: ${scaleDpTheme(80)};
  width: 100%;
  flex-direction: row;
`;
