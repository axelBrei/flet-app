import React from 'react';
import styled from 'styled-components';
import {View} from 'react-native';
import {AppText} from 'components/ui/AppText';

export const VehicleDimensions = ({dimensions, maxWeight}) => {
  return (
    <Container>
      <Title>Dimensiones aproximadas</Title>
      <DataText>
        <DataText bold>Ancho:</DataText> {dimensions?.width} mts.{' '}
        <DataText bold>Largo:</DataText> {dimensions?.length} mts.{' '}
        <DataText bold>Alto:</DataText> {dimensions?.height} mts.
      </DataText>
      <DataText>
        <DataText bold>Peso máximo:</DataText> {maxWeight} Kg.
      </DataText>
    </Container>
  );
};

const Container = styled(View)`
  padding: 15px 0;
  width: 100%;
`;

const Title = styled(AppText)`
  font-weight: bold;
  font-size: 16px;
  padding-bottom: 7px;
`;

const DataText = styled(AppText)`
  font-size: 13px;
  line-height: 22px;
`;
