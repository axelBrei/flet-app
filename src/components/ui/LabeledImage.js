import React from 'react';
import styled from 'styled-components';
import {theme} from 'constants/theme';
import {AppText} from 'components/ui/AppText';

export const LabeledImage = ({label, source, renderImage}) => {
  return (
    <Container>
      {source ? (
        <Image source={source} />
      ) : (
        <ImageContainer>{renderImage?.(50)}</ImageContainer>
      )}
      <AppText numberOfLines={2} textAlign="center">
        {label}
      </AppText>
    </Container>
  );
};

const Container = styled.View`
  align-items: center;
  justify-content: center;
  width: 80px;
`;

const ImageContainer = styled.View`
  height: 70px;
  width: 70px;
  border-radius: 35px;
  overflow: hidden;
  background-color: ${theme.primaryLightColor};
  align-items: center;
  justify-content: center;
`;

const Image = styled.Image`
  height: 70px;
  width: 70px;
  border-radius: 35px;
`;
