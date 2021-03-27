import React, {useState} from 'react';
import styled from 'styled-components';
import {createStackNavigator} from '@react-navigation/stack';
import {routes} from 'constants/config/routes';
import {navigationConfig} from 'constants/config/navigationConfig';
import RegisterScreen from 'components/navigation/RegisterScreen';
import {theme} from 'constants/theme';
import {Screen as BaseScreen} from 'components/ui/Screen';
import RegisterPersonalDataScreen from 'components/navigation/RegisterPersonalDataScreen';
import {StepSelector} from 'components/navigation/RegisterStack/StepSelector';

const {Navigator, Screen} = createStackNavigator();

export default ({route}) => {
  const [currentScreenIndex, setCurrentScreenIndex] = useState(0);
  const [headerHidden, setHeaderHidden] = useState(false);
  return (
    <ScreenComponent scrollable>
      <Container>
        <Navigator
          // initialRouteName={routes.registerDriverVehiculeScreen}
          screenOptions={navigationConfig({
            title: '',
            headerShown: false,
          })}>
          <Screen
            name={routes.registerScreen}
            component={RegisterScreen}
            initialParams={route.params}
            listeners={{
              focus: () => setCurrentScreenIndex(0),
            }}
          />
          <Screen
            name={routes.registerPersonalData}
            component={RegisterPersonalDataScreen}
            initialParams={route.params}
            listeners={{
              focus: () => setCurrentScreenIndex(1),
            }}
          />
          <Screen
            name={routes.registerDriverVehiculeScreen}
            getComponent={() =>
              require('components/navigation/RegisterDriverVehiculeDataScreen')
                .default
            }
            listeners={{
              focus: () => setCurrentScreenIndex(2),
            }}
          />
          <Screen
            name={routes.registerDriverLegalsScreen}
            getComponent={() =>
              require('components/navigation/RegisterDriverLegalDataScreen')
                .default
            }
            listeners={{
              focus: () => setCurrentScreenIndex(3),
            }}
          />
          <Screen
            name={routes.registerDriverCompleteScreen}
            getComponent={() =>
              require('components/navigation/RegisterCompleteDriver').default
            }
            listeners={{
              focus: () => setHeaderHidden(true),
            }}
          />
        </Navigator>
        {!headerHidden && (
          <StepSelector
            currentIndex={currentScreenIndex}
            reduced={!route.params?.driver}
          />
        )}
      </Container>
    </ScreenComponent>
  );
};

const ScreenComponent = styled(BaseScreen)`
  background-color: ${theme.white};
`;

const Container = styled.View`
  background-color: transparent;
  flex-direction: column-reverse;
  height: ${({theme}) => theme.screenHeight - 65}px;
`;
