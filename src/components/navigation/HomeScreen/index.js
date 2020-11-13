import React from 'react';
import {TouchableOpacity, Text} from 'react-native';
import {routes} from 'constants/config/routes';
import {Screen} from 'components/ui/Screen';
import {scaleDp, scaleDpTheme} from 'helpers/responsiveHelper';
import styled from 'styled-components';
import InputField from 'components/ui/InputField/index';
import {Icon} from 'components/ui/Icon';
import {MainButton} from 'components/ui/MainButton';

export default ({navigation}) => {
  return (
    <Screen>
      <InputField label="Prueba" />
      <InputField label="Prueba" />
      <MainButton label="Siguiente" icon="chevron-right" />
    </Screen>
  );
};
