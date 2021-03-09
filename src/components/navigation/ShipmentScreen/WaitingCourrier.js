import React from 'react';
import styled from 'styled-components';
import {Container} from 'components/ui/Container';
import {useSelector} from 'react-redux';
import {Loader} from 'components/ui/Loader';
import {AppText} from 'components/ui/AppText';
import {scaleDpTheme} from 'helpers/responsiveHelper';

export const WaitingCourrier = () => {
  return (
    <Container
      alignItems="center"
      justifyContent="center"
      padding={` 0px 0px ${scaleDpTheme(10)}`}>
      <AppText>Estamos buscando un driver para tu pedido</AppText>
      <Loader loading />
    </Container>
  );
};
