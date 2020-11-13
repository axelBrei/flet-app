import React from 'react';
import {TouchableOpacity, Text} from 'react-native';
import {routes} from 'constants/config/routes';
import {Screen} from 'components/ui/Screen';
import {scaleDpTheme} from 'helpers/responsiveHelper';
import styled from 'styled-components';
import InputField from 'components/ui/InputField/index';

export default ({navigation}) => {
  return (
    <Screen>
      <InputField label="Prueba" />
      <InputField label="Prueba" />
      <Button onPress={() => navigation.navigate(routes.profileScreen)}>
        <Text>Hola</Text>
      </Button>
    </Screen>
  );
};

const Button = styled(TouchableOpacity)`
  background-color: ${(props) => props.theme.colors.primaryColor};
  margin: 20px;
  width: ${scaleDpTheme(250)};
  height: ${scaleDpTheme(35)};
  border-radius: 10px;
  align-items: center;
  justify-content: center;
`;
