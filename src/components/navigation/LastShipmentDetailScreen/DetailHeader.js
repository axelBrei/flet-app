import React from 'react';
import styled, {css} from 'styled-components';
import {theme} from 'constants/theme';
import {CenteredRow, Column, Row} from 'components/ui/Row';
import {AppText} from 'components/ui/AppText';
import {RowWithBoldData} from 'components/ui/RowWithBoldData';
import dayjs from 'dayjs';

const getDistanceIfKm = distance => {
  if (distance > 999) {
    return `${(distance / 1000).toString().substring(0, 4)} Km.`;
  }
  return `${distance} Mts.`;
};

const getDuration = duration => {
  const hours = Math.round(duration / 3600);
  return `${hours > 0 ? `${hours} hs` : ''} ${Math.round(
    (hours > 0 ? duration - hours * 3600 : duration) / 60,
  )} min.`;
};

export const DetailHeader = ({
  courrier,
  price,
  estimatedDistance,
  estimatedArrival,
  ...props
}) => {
  const lastDestination = props.destinations?.[props.destinations?.length - 1];
  const duration = dayjs(lastDestination?.arrivalDate).diff(props?.date, 's');

  return (
    <Container>
      <Row>
        {courrier && (
          <DriverContainer>
            <DriverImage source={{uri: courrier?.user?.photoUrl}} />
            <AppText color="white">
              Entregado por{'\n'}
              <AppText bold color="white">
                {courrier?.user?.name} {courrier?.user?.lastName}
              </AppText>
            </AppText>
          </DriverContainer>
        )}
        <PriceContainer>
          <AppText color="white" fontSize={10} bold>
            Precio
          </AppText>
          <AppText color="white" fontSize={20} bold>
            ${price}
          </AppText>
        </PriceContainer>
      </Row>
      <Row>
        <Column width="45%">
          <DataRow
            label="Distancia"
            data={getDistanceIfKm(estimatedDistance)}
          />
          <DataRow label="Duración" data={getDuration(duration)} />
        </Column>
        <Divider />
        <Column width="45%">
          <DataRow label="Paquete" data={props.package.description} />
          <DataRow label="Valor" data={`$${props.package.value}`} />
        </Column>
      </Row>
    </Container>
  );
};

const Container = styled.View`
  background-color: ${theme.primaryColor};
  min-height: 200px;
  padding: 70px 20px 20px;
  border-bottom-left-radius: 20px;
  border-bottom-right-radius: 20px;
  ${({theme}) =>
    !theme.isMobile &&
    css`
      border-radius: 20px;
    `}
`;

const DriverContainer = styled.View`
  flex-direction: row;
  align-items: center;
`;

const DriverImage = styled.Image`
  width: 70px;
  height: 70px;
  border-radius: 35px;
  margin-right: 15px;
`;

const PriceContainer = styled.View`
  background-color: ${theme.primaryDarkColor};
  padding: 5px 15px;
  min-width: 100px;
  justify-content: center;
  border-radius: 12px;
`;

const Divider = styled.View`
  height: 100%;
  width: 1px;
  background-color: ${theme.disabledFont};
`;

const DataRow = styled(RowWithBoldData)`
  margin: 5px 0;
`;
