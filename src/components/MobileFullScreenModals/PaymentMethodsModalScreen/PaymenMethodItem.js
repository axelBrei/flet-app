import React from 'react';
import styled from 'styled-components';
import {AppText} from 'components/ui/AppText';
import {theme} from 'constants/theme';

export const PaymentMethodItem = ({imageUrl, title, onPress, selected}) => {
  return (
    <Container onPress={onPress}>
      <ImageContainer>
        <Image source={{uri: imageUrl}} />
      </ImageContainer>
      <BodyContainer>
        <Title>{title}</Title>
        {selected && <SelectedText>Seleccionado</SelectedText>}
      </BodyContainer>
    </Container>
  );
};

const Container = styled.TouchableOpacity`
  flex-direction: row;
  background-color: ${theme.primaryLightColor};
  border-radius: 20px;
  margin: 10px 0;
  padding: 10px 20px;
  overflow: hidden;
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

const SelectedText = styled(AppText)`
  background-color: ${theme.primaryLightColor};
  border-color: ${theme.white};
  border-width: 2px;
  color: ${theme.white};
  padding: 2px 5px;
  overflow: hidden;
  border-radius: 20px;
  margin-top: 10px;
  width: 105px;
  text-align: center;
`;
