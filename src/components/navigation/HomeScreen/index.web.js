import React from 'react';
import styled from 'styled-components';
import Screen from 'components/ui/Screen';
import {WithMobileSupport} from 'components/HOC/WithMobileSupport';
import MobileScreen from './index.native';
import {NewShipmentForm} from 'components/navigation/HomeScreen/NewShipmentForm';
import {View} from 'react-native';

const HomeScreen = () => {
  return (
    <ScreenComponent>
      <BodyContainer>
        <NewShipmentForm />
      </BodyContainer>
    </ScreenComponent>
  );
};

export default WithMobileSupport(HomeScreen, MobileScreen);

const ScreenComponent = styled(Screen)`
  align-items: flex-start;
  height: ${props => props.theme.screenHeight}px;
  width: 100%;
  padding: 50px 20px 0px;
`;

const BodyContainer = styled(View)`
  width: 414px;
  align-items: stretch;
`;
