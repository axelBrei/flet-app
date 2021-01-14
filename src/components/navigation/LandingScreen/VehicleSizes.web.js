import React from 'react';
import styled from 'styled-components';
import {Container} from 'components/ui/Container';
import {AppText} from 'components/ui/AppText';
import {scaleDp, scaleDpTheme} from 'helpers/responsiveHelper';
import {theme} from 'constants/theme';
import Hoverable from 'components/ui/Hoverable/index';
import MOTORCYCLE_THUMBNAIL from 'resources/assets/motorcycle_thumbnail.svg';
import CAR_THMBNAIL from 'resources/assets/car_thumbnail.svg';
import PICKUP_THMBNAIL from 'resources/assets/pickup_thumbnail.svg';
import TRUCK_THMBNAIL from 'resources/assets/truck_thumbnail.svg';

const list = [
  {
    title: 'Moto',
    Icon: MOTORCYCLE_THUMBNAIL,
  },
  {
    title: 'Auto',
    Icon: CAR_THMBNAIL,
  },
  {
    title: 'Camioneta',
    Icon: PICKUP_THMBNAIL,
  },
  {
    title: 'Camión',
    Icon: TRUCK_THMBNAIL,
  },
];

export const VehicleSizes = () => {
  return (
    <Container width="100%" padding={`0 ${scaleDpTheme(30)}`}>
      <AppText fontSize={24} bold padding="10px 0">
        No importa el tamaño
      </AppText>
      <AppText fontSize={13}>
        En FletApp contás cont doos los tamaños posibles de vehículos para
        realizar tus envios
      </AppText>
      <Container
        dir="row"
        alignItems="center"
        justifyContent="space-between"
        width="100%">
        {list.map(({title, Icon}) => (
          <Hoverable>
            {(isHovered) => (
              <VehicleItemContainer hover={isHovered}>
                <Icon height={scaleDp(50)} width={scaleDp(50)} />
                <AppText>{title}</AppText>
              </VehicleItemContainer>
            )}
          </Hoverable>
        ))}
      </Container>
    </Container>
  );
};

const VehicleItemContainer = styled(Container)`
  height: ${scaleDpTheme(100)};
  width: ${scaleDpTheme(100)};
  max-width: 1000px;
  border-radius: ${scaleDpTheme(75)};
  box-shadow: 0px 0px 6px ${theme.shadowColor};
  background-color: ${theme.white};
  align-items: center;
  justify-content: center;
  margin: ${scaleDpTheme(15)} 0;
  margin-bottom: ${scaleDpTheme(35)};
  padding: 0 ${scaleDpTheme(45)};
  min-width: 150px;
  min-height: 150px;
  transition: all 100ms linear;
  transform: scale(${(props) => (props.hover ? 1.1 : 1)});
`;
