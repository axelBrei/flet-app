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
  acceptShipment,
  rejectShipment,
  selectDriverRejectShipmentError,
  selectDriverRejectShipmentLoading,
} from 'redux-store/slices/driverShipmentSlice';
import {Loader} from 'components/ui/Loader';
import {getRotatedMarker} from 'components/ui/Map/helper';
import {getBearingFromCoords, trackUserPosition} from 'helpers/locationHelper';
import {Platform} from 'react-native';
import CAR_MARKER from 'resources/assets/driver_car.png';
import CarMarker from 'resources/assets/driver_car';
import {useWindowDimension} from 'components/Hooks/useWindowsDimensions';

export default ({navigation}) => {
  const dispatch = useDispatch();
  const {height} = useWindowDimension();
  const loading = useSelector(selectDriverRejectShipmentLoading);
  const error = useSelector(selectDriverRejectShipmentError);
  const [isOnline, setIsOnline] = useState(false);
  const [lastUserPosition, setLastUserPosition] = useState(null);
  const [userCurrentPosition, setUserCurrentPosition] = useState(null);

  useEffect(() => {
    const handleNewPosition = (position) => {
      if (position.coords.latitude !== userCurrentPosition?.latitude) {
        setLastUserPosition(userCurrentPosition);
        setUserCurrentPosition(position.coords);
      }
    };
    return trackUserPosition(handleNewPosition);
  }, [userCurrentPosition]);

  const positionMarker = useMemo(() => {
    const orientation = getBearingFromCoords(
      lastUserPosition,
      userCurrentPosition,
    );
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
        ...userCurrentPosition,
        ...marker,
      },
    ];
  }, [userCurrentPosition, lastUserPosition]);

  const {Modal, toggle, open} = useModal(NewTripModalContent, {
    distance: 500,
    dropZone: 'Capital federal',
    onPressAccept: () => {
      toggle();
      dispatch(acceptShipment(13123));
      navigation.navigate(routes.driverNewShipmentScreen);
    },
    onPressReject: () => {
      dispatch(rejectShipment());
    },
  });

  const onChangeOnlineStatus = useCallback(
    (newOnlineStatus) => {
      setIsOnline(newOnlineStatus);
      newOnlineStatus && setTimeout(toggle, 1000); // TODO: remove this line
    },
    [toggle],
  );

  return (
    <ScreenComponent>
      <Loader loading={loading} unmount={false}>
        <Map
          style={{flex: 1, width: '100%'}}
          markers={positionMarker}
          showsMyLocationButton
        />
        <FloatingHamburguerButton />
        <AvailableContainer>
          <Switch value={isOnline} onChange={onChangeOnlineStatus} />
          <AppText padding={10}>Esperando Viajes</AppText>
        </AvailableContainer>
        <Modal />
      </Loader>
    </ScreenComponent>
  );
};
const ScreenComponent = styled(Screen)`
  height: ${(props) => props.theme.screenHeight}px;
`;

const AvailableContainer = styled(Container)`
  background-color: ${theme.white};
  align-items: center;
  justify-content: center;
  height: ${scaleDpTheme(80)};
  width: 100%;
  flex-direction: row;
`;
