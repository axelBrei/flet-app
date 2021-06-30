import React, {useCallback} from 'react';
import {Title} from 'components/ui/Title';
import styled from 'styled-components';
import {AppText} from 'components/ui/AppText';
import {theme} from 'constants/theme';
import Map from 'components/ui/Map';

export const NextShipmentInformation = ({shipment}) => {
  const {destinations, currentDestination} = shipment;
  const destinationIndex =
    destinations?.findIndex(d => d.id === currentDestination) || 0;

  const destination = destinations?.[destinationIndex] || {};
  const nextDestination = destinations?.[destinationIndex + 1] || {};

  const getDistance = useCallback(() => {
    const {distance} = nextDestination;
    if (distance > 999) {
      return `${(distance / 1000).toString().substring(0, 4)} Km.`;
    }
    return `${distance} Mts.`;
  }, [nextDestination]);

  const getDuration = useCallback(() => {
    const {duration} = nextDestination;
    const hours = Math.round(duration / 3600);
    return `${hours > 0 ? `${hours} hs` : ''} ${Math.round(
      (hours > 0 ? duration - hours * 3600 : duration) / 60,
    )} min.`;
  }, [nextDestination]);

  return (
    <>
      <Container>
        <Title>Próximo paquete</Title>
        <Label>
          Paquete entregado en:{' '}
          <Value>{destination.address?.name.split(',')[0]}</Value>
        </Label>
        <Label>
          Dirección de entrega:{' '}
          <Value>{nextDestination?.address?.name?.split(',')[0]}</Value>
        </Label>
        <Label>
          Distancia: <Value>{getDistance()}</Value>
        </Label>
        <Label>
          Tiempo estimado: <Value>{getDuration()}</Value>
        </Label>
      </Container>
      <StyledMap
        edgePadding={{
          top: 25,
          left: 90,
          right: 90,
          bottom: 25,
        }}
        markers={[destination?.address, nextDestination?.address]}
      />
    </>
  );
};

const Container = styled.View`
  flex: 1;
`;

const Label = styled(AppText)`
  padding: 5px 0;
`;

const Value = styled(AppText)`
  color: ${theme.primaryColor};
  font-weight: bold;
`;

const StyledMap = styled(Map)`
  align-self: center;
  margin-top: 25px;
  height: 150px;
  border-radius: 20px;
  width: ${({theme}) => theme.screenWidth - 100}px;
`;
