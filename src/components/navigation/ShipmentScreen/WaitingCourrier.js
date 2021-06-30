import React from 'react';
import styled from 'styled-components';
import {Platform} from 'react-native';
import {Loader} from 'components/ui/Loader';
import {Title} from 'components/ui/Title';
import {AppText} from 'components/ui/AppText';

export const WaitingCourrier = () => (
  <Container>
    <Title width="100%">Estamos buscándote un conductor</Title>
    <AppText italic width="100%">
      Esto puede tardar varios minutos, podés cerrar la app y nosotros te
      avisamos.
    </AppText>
  </Container>
);

const Container = styled.View`
  width: 100%;
  flex-direction: column;
`;
