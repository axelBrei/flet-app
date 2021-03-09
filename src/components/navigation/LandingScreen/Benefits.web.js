import React from 'react';
import styled from 'styled-components';
import ProfitImage from 'resources/assets/revenue.svg';
import {Container} from 'components/ui/Container';
import {scaleDp, scaleDpTheme} from 'helpers/responsiveHelper';
import {AppText} from 'components/ui/AppText';
import INTUITIVE_DESIGN from 'resources/assets/intuitive.svg';
import VHEICLE_TRACKING from 'resources/assets/package_tracking.svg';
import VEHICLE_SIZES from 'resources/assets/truck.svg';
import SECURE_PAYMENT from 'resources/assets/payment.svg';
import REAL_TIME_PRICING from 'resources/assets/pricing.svg';
import {theme} from 'constants/theme';

const benefits = [
  {
    title: 'Diseño intuitivo',
    Icon: INTUITIVE_DESIGN,
  },
  {
    title: 'Seguimiento del envío',
    Icon: VHEICLE_TRACKING,
  },
  {
    title: 'Distintos tamaños de vehículo',
    Icon: VEHICLE_SIZES,
  },
  {
    title: 'Pago digital seguro',
    Icon: SECURE_PAYMENT,
  },
  {
    title: 'Cotización en tiempo real',
    Icon: REAL_TIME_PRICING,
  },
];

export const Benefits = () => {
  return (
    <ComponentContainer dir={'row'}>
      <ProfitImage width={scaleDp(200)} />
      <Container flex>
        <AppText title bold fontSize={16}>
          Súmate a Fletex y ahorra con todos nuestros beneficios
        </AppText>
        <GridContainer>
          {benefits.map(({title, Icon}) => {
            return (
              <Container
                dir="row"
                alignItems="flex-start"
                justifyContent="flex-start"
                padding={`${scaleDp(5)}px 0px`}
                width={scaleDp(230)}>
                <Icon
                  width={scaleDp(30)}
                  height={scaleDp(25)}
                  fill={theme.primaryColor}
                  style={{marginRight: scaleDp(5)}}
                />
                <AppText padding="5" fontSize={13}>
                  {title}
                </AppText>
              </Container>
            );
          })}
        </GridContainer>
      </Container>
    </ComponentContainer>
  );
};

const ComponentContainer = styled(Container)`
  margin: ${scaleDpTheme(100)} 0;
  width: 100%;
`;

const GridContainer = styled(Container)`
  max-width: 1000px;
  display: grid;
  grid-auto-flow: row;
  width: 100%;
  grid-template-columns: repeat(2, 50%);
`;

const BenefitsContainer = styled(Container)`
  flex: 1;
  max-width: 1000px;
  flex-wrap: wrap;
  flex-direction: row;
  width: ${scaleDpTheme(500)};
  margin-top: ${scaleDpTheme(15)};
`;
