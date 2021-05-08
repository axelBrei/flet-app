import React from 'react';
import styled from 'styled-components';
import AwaitForConfirmationImage from 'resources/images/await_for_confirmation.svg';
import {useWindowDimension} from 'components/Hooks/useWindowsDimensions';
import {Title} from 'components/ui/Title';
import {AppText} from 'components/ui/AppText';

export const EmptyListComponent = () => {
  const {widthWithPadding} = useWindowDimension();
  return (
    <Container>
      <AwaitForConfirmationImage width={widthWithPadding * 0.6} height={210} />
      <Title>Estamos analizando tu caso</Title>
      <AppText>Te notificaremos cuando tengamos novedades</AppText>
    </Container>
  );
};
const Container = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
`;
