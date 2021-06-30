import React from 'react';
import styled, {css} from 'styled-components';
import {AppText} from 'components/ui/AppText';
import {theme} from 'constants/theme';

export const PaymentMethodItem = ({imageUrl, title, onPress, selected}) => {
  return (
    <>
      {selected && (
        <SelectTextContainer>
          <AppText textAlign="center" color="white">
            Seleccionado
          </AppText>
        </SelectTextContainer>
      )}
      <Container onPress={onPress} selected={selected}>
        <ImageContainer>
          <Image source={{uri: imageUrl}} />
        </ImageContainer>
        <BodyContainer>
          <Title>{title}</Title>
        </BodyContainer>
      </Container>
    </>
  );
};

const Container = styled.TouchableOpacity`
  flex-direction: row;
  background-color: ${theme.primaryLightColor};
  border-radius: 20px;
  margin: 0 0 10px;
  padding: 10px 20px;
  overflow: hidden;

  ${({selected}) =>
    selected &&
    css`
      border-top-left-radius: 0;
      border-color: ${theme.fontColor};
      border-width: 2px;
    `};
`;

const ImageContainer = styled.View`
  border-radius: 50px;
  background-color: ${theme.primaryDarkColor};
  padding: 10px;
`;
const Image = styled.Image`
  height: 50px;
  width: 50px;
`;

const BodyContainer = styled.View`
  flex-direction: column;
  margin-left: 15px;
`;

const Title = styled(AppText)`
  font-weight: bold;
  font-size: 18px;
  color: ${theme.white};
`;

const SelectTextContainer = styled.View`
  background-color: ${theme.fontColor};
  border-color: ${theme.fontColor};
  border-width: 2px;
  color: ${theme.white};
  width: 150px;
  border-top-left-radius: 12px;
  border-top-right-radius: 12px;
  align-items: center;
  justify-content: center;
`;
