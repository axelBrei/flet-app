import React from 'react';
import styled from 'styled-components';
import {useSelector} from 'react-redux';
import {Loader} from 'components/ui/Loader';
import {AppText} from 'components/ui/AppText';
import {scaleDpTheme} from 'helpers/responsiveHelper';
import {useWindowDimension} from 'components/Hooks/useWindowsDimensions';
import {Title} from 'components/ui/Title';

export const WaitingCourrier = () => (
  <Container>
    <Title width="80%">Estamos buscando al mejor conductor para vos</Title>
    <Loader loading />
  </Container>
);

const Container = styled.View`
  width: 100%;
  height: 45px;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;
