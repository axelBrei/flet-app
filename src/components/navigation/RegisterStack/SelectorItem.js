import React, {useMemo} from 'react';
import styled from 'styled-components';
import {AppText} from 'components/ui/AppText';
import {theme} from 'constants/theme';

export const SelectorItem = ({item, selected, previous, reduced}) => {
  const colors = {
    background: selected
      ? theme.primaryDarkColor
      : previous
      ? theme.primaryLightColor
      : theme.grayBackground,
    font: selected || previous ? theme.white : theme.fontColor,
  };
  return (
    <Container
      reduced={reduced}
      backgroundColor={colors.background}
      selected={selected}
      previous={previous}>
      <AppText fontSize={12} bold textAlign="center" color={colors.font}>
        {item}
      </AppText>
    </Container>
  );
};

const Container = styled.View`
  width: ${(props) => (props.reduced ? '50%' : '25%')};
  background-color: ${(props) => props.backgroundColor || theme.grayBackground};
  padding: 10px 0;
  border-top-right-radius: ${(props) => (props.previous ? 0 : 20)}px;
  border-bottom-right-radius: ${(props) => (props.previous ? 0 : 20)}px;
`;
