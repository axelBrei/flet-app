import React from 'react';
import styled from 'styled-components';
import {Container} from 'components/ui/Container';
import {useSelector} from 'react-redux';
import {Loader} from 'components/ui/Loader';
import {AppText} from 'components/ui/AppText';
import {scaleDpTheme} from 'helpers/responsiveHelper';
import {useWindowDimension} from 'components/Hooks/useWindowsDimensions';

export const WaitingCourrier = () => {
  const {isMobile} = useWindowDimension();
  return (
    <Container
      alignItems="center"
      justifyContent="center"
      width="100%"
      padding={isMobile ? 0 : `${scaleDpTheme(10)} 0px`}>
      <AppText>Estamos buscando un driver para tu pedido</AppText>
      <Loader loading />
    </Container>
  );
};
