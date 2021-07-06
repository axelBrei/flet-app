import React, {useState} from 'react';
import styled from 'styled-components';
import Screen from 'components/ui/Screen';
import {View} from 'react-native';
import {theme} from 'constants/theme';
import {UserProfileHeader} from 'components/ui/UserProfileHeader';
import {NewShipmentForm} from 'components/navigation/HomeScreen/NewShipmentForm';
import {MainButton} from 'components/ui/MainButton';
import {useUserData} from 'components/Hooks/useUserData';
import {routes} from 'constants/config/routes';

export default ({navigation}) => {
  const {isDriver} = useUserData();

  return (
    <ScreenContainer
      notchColor={theme.primaryColor}
      enableAvoidKeyboard={false}>
      <UserProfileHeader />
      <BodyContainer>
        <NewShipmentForm />

        {isDriver && (
          <LastShipmentsContainer>
            <MainButton
              inverted
              onPress={() => navigation.navigate(routes.lastShipmentStack)}
              label="Ver mis ultimos pedidos"
            />
          </LastShipmentsContainer>
        )}
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

const LastShipmentsContainer = styled.View`
  flex: 1;
  align-items: center;
  justify-content: flex-end;
  padding-bottom: 20px;
  min-height: 60px;
`;
