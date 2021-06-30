import React from 'react';
import styled from 'styled-components';
import Motorbike from 'resources/images/scooter.svg';
import Car from 'resources/images/car.svg';
import Pickup from 'resources/images/van.svg';
import Truck from 'resources/images/truck.svg';
import {Title} from 'components/ui/Title';
import {AppText} from 'components/ui/AppText';
import {theme} from 'constants/theme';
import {Icon} from 'components/ui/Icon';

const iconMapping = {
  1: Motorbike,
  2: Car,
  3: Pickup,
  4: Truck,
};

export const VehicleItem = ({item, onPress}) => {
  const Image = iconMapping[item?.type?.id];

  return (
    <Container onPress={() => onPress(item)}>
      <IconContainer>
        <Image height={60} width={60} />
      </IconContainer>
      <CarInformationContainer>
        <Title>{item?.model}</Title>
        <AppText>Color: {item?.color}</AppText>
        <AppText>Año: {item?.year}</AppText>
        <AppText>Patente: {item?.number}</AppText>
      </CarInformationContainer>
      <Icon name="chevron-right" size={32} />
    </Container>
  );
};

const Container = styled.TouchableOpacity`
  width: 100%;
  padding: 10px 20px;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
`;

const IconContainer = styled.View`
  height: 95px;
  width: 95px;
  border-radius: 50px;
  align-items: center;
  justify-content: center;
  background-color: ${theme.grayBackground};
`;

const CarInformationContainer = styled.View`
  flex-direction: column;
  margin-left: 10px;
  flex: 1;
`;
