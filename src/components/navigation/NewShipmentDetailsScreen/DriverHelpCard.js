import React, {useState} from 'react';
import styled from 'styled-components';
import {View, TouchableOpacity} from 'react-native';
import DriverImage from 'resources/images/deliveryman.svg';
import {IconCard} from 'components/ui/IconCard';
import {AppText} from 'components/ui/AppText';
import {theme} from 'constants/theme';

export const DriverHelpCard = ({onChangeValue, value}) => (
  <Container>
    <IconCard
      reduced
      reverse
      renderImage={(size) => <DriverImage width={size} height={size} />}>
      <Title>¿Requerí ayuda del conductor?</Title>
      <ButtonsContainer>
        <Button selected={value} onPress={() => onChangeValue(true)}>
          <AppText bold color={!value ? theme.fontColor : theme.white}>
            Si
          </AppText>
        </Button>
        <Button onPress={() => onChangeValue(false)} selected={!value}>
          <AppText bold color={value ? theme.fontColor : theme.white}>
            No
          </AppText>
        </Button>
      </ButtonsContainer>
    </IconCard>
  </Container>
);

DriverHelpCard.defaultProps = {
  onChangeValue: () => {},
};

const Container = styled(View)`
  width: 100%;
  padding: 15px 0;
  align-items: center;
`;

const Title = styled(AppText)`
  font-size: 14px;
  font-weight: bold;
  text-align: center;
  color: ${theme.white};
  margin-bottom: 10px;
`;

const ButtonsContainer = styled(View)`
  flex-direction: row;
  width: 100%;
  justify-content: space-around;
`;

const Button = styled(TouchableOpacity)`
  border-radius: 20px;
  width: 55px;
  padding: 5px;
  background-color: ${({selected}) =>
    selected ? theme.primaryDarkColor : theme.grayBackground};
  align-items: center;
  justify-content: center;
`;
