import React, {useCallback} from 'react';
import {Screen as ScreenComponent} from 'components/ui/Screen';
import {Card} from 'components/ui/Card';
import {StyleSheet, Platform} from 'react-native';
import styled from 'styled-components';
import {scaleDp, scaleDpTheme} from 'helpers/responsiveHelper';
import {RegisterForm} from 'components/navigation/RegisterPersonalDataScreen/RegisterForm';
import Directions from 'resources/assets/directions.svg';
export default () => {
  return (
    <Screen>
      <RegisterForm />
    </Screen>
  );
};

const Screen = styled(ScreenComponent)`
  flex: 1;
  align-items: center;
  padding-top: ${scaleDpTheme(scaleDp(Platform.OS === 'web' ? 100 : 20))};
`;
