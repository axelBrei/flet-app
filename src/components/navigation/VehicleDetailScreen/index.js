import React, {useEffect} from 'react';
import styled from 'styled-components';
import Screen from 'components/ui/Screen';
import Motorbike from 'resources/images/scooter';
import Car from 'resources/images/car';
import Pickup from 'resources/images/van';
import Truck from 'resources/images/truck';
import {theme} from 'constants/theme';
import {Title} from 'components/ui/Title';
import {MainButton} from 'components/ui/MainButton';
import {Column} from 'components/ui/Row';
import {AppText} from 'components/ui/AppText';
import {useWindowDimension} from 'components/Hooks/useWindowsDimensions';
import {ImageItem} from 'components/navigation/VehicleDetailScreen/ImageItem';
import {Carousel} from 'components/ui/Carrousel';
import {Platform} from 'react-native';
import {PLATFORMS, usePlatformEffect} from 'components/Hooks/usePlatformEffect';

const iconMapping = {
  1: Motorbike,
  2: Car,
  3: Pickup,
  4: Truck,
};

export default ({route, navigation}) => {
  const {vehicle} = route?.params || {};
  const {isMobile} = useWindowDimension();

  usePlatformEffect(
    () => {
      vehicle === undefined && history.back();
    },
    [vehicle],
    PLATFORMS.WEB,
  );

  const Image = iconMapping[vehicle?.type?.id] || React.Fragment;
  return (
    <Screen removeTWF scrollable={!isMobile || vehicle?.insuranceUrl}>
      <Header>
        <Column>
          <Title padding="10px 0 0">{vehicle?.model}</Title>
          <AppText>Patente: {vehicle?.number}</AppText>
          <AppText>Año: {vehicle?.year}</AppText>
          <AppText>Color: {vehicle?.color}</AppText>
        </Column>
        <IconContainer>
          <Image height={60} width={60} />
        </IconContainer>
      </Header>

      <Title padding="0 20px 10">Cedula del vehiculo</Title>
      <Carousel
        displayDots
        data={[vehicle?.drivingPermitFront, vehicle?.drivingPermitBack]}
        renderItem={({item}) => <ImageItem uri={item} />}
      />
      {vehicle?.insuranceUrl !== '' && (
        <>
          <Title padding="0 20px 10">Seguro</Title>
          <ImageItem uri={vehicle?.insuranceUrl} />
        </>
      )}
      {/*<DeleteButton color={theme.error}>Eliminar vehiculo</DeleteButton>*/}
    </Screen>
  );
};

const Header = styled.View`
  width: 100%;
  padding: 20px;
  flex-direction: row;
  align-items: flex-start;
  justify-content: space-between;
`;

const IconContainer = styled.View`
  height: 95px;
  width: 95px;
  border-radius: 50px;
  align-items: center;
  justify-content: center;
  background-color: ${theme.grayBackground};
  margin-right: 10px;
`;

const DeleteButton = styled(MainButton)`
  background-color: ${theme.backgroundColor};
  border-color: ${theme.error};
  border-width: 1px;
  margin: 10px 20px;
`;
