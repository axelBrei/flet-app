import React from 'react';
import styled from 'styled-components';
import {Platform} from 'react-native';
import {Loader} from 'components/ui/Loader';
import {Title} from 'components/ui/Title';

export const WaitingCourrier = () => (
  <Container>
    <Title numberOfLines={2} ellipsizeMode="tail" width="80%">
      Estamos buscando al mejor conductor para vos
    </Title>
    <Loader
      loading
      size={Platform.select({
        native: 'large',
        web: 'small',
      })}
    />
  </Container>
);

const Container = styled.View`
  width: 100%;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;
