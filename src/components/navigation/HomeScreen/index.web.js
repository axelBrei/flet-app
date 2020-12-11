import React from 'react';
import {Screen} from 'components/ui/Screen';
import {WithMobileSupport} from 'components/HOC/WithMobileSupport';
import MobileScreen from './index.native';

const HomeScreen = () => {
  return <Screen />;
};

export default WithMobileSupport(HomeScreen, MobileScreen);
