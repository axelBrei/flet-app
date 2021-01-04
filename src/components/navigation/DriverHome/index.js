import React, {useEffect, useState, useCallback} from 'react';
import {Screen} from 'components/ui/Screen';
import Map from 'components/ui/Map/index';
import {FloatingHamburguerButton} from 'components/ui/FloatingHamburgerButton';
import {Container} from 'components/ui/Container';
import styled from 'styled-components';
import {theme} from 'constants/theme';
import {AppText} from 'components/ui/AppText';
import {scaleDpTheme} from 'helpers/responsiveHelper';
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
import {Platform} from 'react-native';

export default ({navigation}) => {
  const dispatch = useDispatch();
  const loading = useSelector(selectDriverRejectShipmentLoading);
  const error = useSelector(selectDriverRejectShipmentError);
  const [isOnline, setIsOnline] = useState(false);

  const {Modal, toggle, open} = useModal(NewTripModalContent, {
    distance: 500,
    dropZone: 'Capital federal',
    onPressAccept: () => {
      dispatch(acceptShipment(13123));
      navigation.navigate(routes.driverNewShipmentScreen);
      toggle();
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
      <Loader unmount={false} loading={loading}>
        <Map
          style={Platform.select({
            web: {height: '90%', width: '100%'},
          })}
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
  height: 100%;
  display: flex;
`;

const AvailableContainer = styled(Container)`
  background-color: ${theme.white};
  align-items: center;
  justify-content: center;
  height: ${scaleDpTheme(80)};
  width: 100%;
  flex-direction: row;
`;
