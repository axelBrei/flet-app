import React, {useCallback} from 'react';
import {Screen as ScreenComponent} from 'components/ui/Screen';
import {View, Platform} from 'react-native';
import styled from 'styled-components';
import {scaleDp, scaleDpTheme} from 'helpers/responsiveHelper';
import {RegisterForm} from 'components/navigation/RegisterPersonalDataScreen/RegisterForm';
import Directions from 'resources/assets/directions.svg';

export default () => {
  return (
    <Screen>
      <Container>
        <Container direction="column">
          <Directions />
        </Container>
        <RegisterForm />
      </Container>
    </Screen>
  );
};

const Screen = styled(ScreenComponent)`
  flex: 1;
  align-items: center;
  padding-top: ${scaleDpTheme(scaleDp(Platform.OS === 'web' ? 100 : 20))};
`;

const Container = styled(View)`
  flex-direction: ${(props) => props.direction || 'row'};
`;
