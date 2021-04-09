import React from 'react';
import styled from 'styled-components';
import {Platform} from 'react-native';
import {Loader} from 'components/ui/Loader';
import {Title} from 'components/ui/Title';
import {AppText} from 'components/ui/AppText';

export const WaitingCourrier = () => (
  <Container>
    <InformationContainer>
      <Title numberOfLines={2} ellipsizeMode="tail" width="90%">
        Estamos buscando al mejor conductor para vos
      </Title>
      <Loader
        loading
        size={Platform.select({
          native: 'large',
          web: 'small',
        })}
      />
    </InformationContainer>
    <AppText italic width="100%">
      {
        'Esto puede tardar varios minutos, podés cerrar la app.\nNosotros te avisamos'
      }
    </AppText>
  </Container>
);

const Container = styled.View`
  width: 100%;
  flex-direction: column;
`;

const InformationContainer = styled.View`
  flex-direction: row;
  width: 100%;
  justify-content: space-between;
  align-items: center;
`;
