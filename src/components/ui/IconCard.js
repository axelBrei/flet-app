import React from 'react';
import styled, {css} from 'styled-components';
import {View} from 'react-native';
import {theme} from 'constants/theme';
import {CardContainer} from 'components/ui/CardContainer';

export const IconCard = ({
  renderImage,
  reverse,
  children,
  reduced = false,
  imageBackground,
  ...props
}) => {
  return (
    <Container reverse={reverse} {...props}>
      <ContentContainer reverse={reverse}>{children}</ContentContainer>
      <ImageContainer
        reduced={reduced}
        imageBackground={imageBackground}
        size={props.size + 20}>
        {renderImage(reduced ? 80 : props.size || 100)}
      </ImageContainer>
    </Container>
  );
};

const Container = styled(CardContainer)`
  flex-direction: ${(props) => (props.reverse ? 'row-reverse' : 'row')};
  justify-content: center;
  align-items: center;
  border-width: 1px;
  border-color: ${(props) => (props.error ? theme.error : 'transparent')};

  ${({theme}) =>
    !theme.isMobile &&
    css`
      cursor: inherit;
      pointer-events: initial;
    `}
`;

const ImageContainer = styled(View)`
  display: flex;
  height: ${(props) => (props.reduced ? 90 : props.size || 140)}px;
  width: ${(props) => (props.reduced ? 90 : props.size || 140)}px;
  border-radius: 70px;
  background-color: ${(props) =>
    props.imageBackground || theme.primaryDarkColor};
  align-items: center;
  justify-content: center;
`;

const ContentContainer = styled(View)`
  flex: 1;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  padding-${(props) => (props.reverse ? 'left' : 'right')}:10px;
`;
