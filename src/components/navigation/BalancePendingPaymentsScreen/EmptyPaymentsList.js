import React from 'react';
import styled from 'styled-components';
import {Title} from 'components/ui/Title';
import {AppText} from 'components/ui/AppText';
import {Icon} from 'components/ui/Icon';
import {theme} from 'constants/theme';
import {useWindowDimension} from 'components/Hooks/useWindowsDimensions';

export const EmptyPaymentList = ({error}) => {
  const {widthWithPadding} = useWindowDimension();
  return (
    <Container>
      <Icon
        name="playlist-remove"
        size={widthWithPadding * 0.4}
        color={theme.fontColor}
      />
      <TextContainer>
        <Title textAlign="center">Todavía no tenes pagos pendientes</Title>
        <AppText textAlign="center">
          {error ||
            'Una vez que tengas viejaes realizados\npodrás retirar tus fondos presionando\nel boton de retirar dinero.\n'}
        </AppText>
      </TextContainer>
    </Container>
  );
};

const Container = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
  padding: 20px;
`;

const TextContainer = styled.View`
  padding: 20px 0;
`;
