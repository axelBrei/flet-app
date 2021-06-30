import React, {useState} from 'react';
import styled from 'styled-components';
import Screen from 'components/ui/Screen';
import {View} from 'react-native';
import {theme} from 'constants/theme';
import {UserProfileHeader} from 'components/ui/UserProfileHeader';
import {NewShipmentForm} from 'components/navigation/HomeScreen/NewShipmentForm';

export default () => {
  return (
    <ScreenContainer enableAvoidKeyboard={false}>
      <UserProfileHeader />
      <BodyContainer>
        <NewShipmentForm />
      </BodyContainer>
    </ScreenContainer>
  );
};

const ScreenContainer = styled(Screen)`
  background-color: ${theme.primaryLightColor};
`;

const BodyContainer = styled(View)`
  flex: 1;
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
  background-color: ${theme.backgroundColor};
  padding: 40px 20px 0;
`;
