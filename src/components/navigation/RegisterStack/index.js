import React, {useCallback, useState} from 'react';
import styled from 'styled-components';
import {createStackNavigator} from '@react-navigation/stack';
import {routes} from 'constants/config/routes';
import {navigationConfig} from 'constants/config/navigationConfig';
import RegisterScreen from 'components/navigation/RegisterScreen';
import {theme} from 'constants/theme';
import {Screen as BaseScreen} from 'components/ui/Screen';
import RegisterPersonalDataScreen from 'components/navigation/RegisterPersonalDataScreen';
import {StepSelector} from 'components/navigation/RegisterStack/StepSelector';
import {CustomHeaderBackButton} from 'components/ui/CustomHeaderBackButton';

const {Navigator, Screen} = createStackNavigator();

export default ({navigation: parentNav, route}) => {
  const [currentScreenIndex, setCurrentScreenIndex] = useState(
    route.params.screen ? 1 : 0,
  );
  const [headerHidden, setHeaderHidden] = useState(false);
  const {screen, ...params} = route.params;
  const [childrenNavigator, setChildrenNavigator] = useState(null);

  const getScreenListeners = useCallback(
    screenIndex => ({
      focus: () => setCurrentScreenIndex(screenIndex),
      blur: () => setCurrentScreenIndex(screenIndex - 1),
      beforeRemove: e => {
        console.log(e, currentScreenIndex, screenIndex, route);
        if (
          currentScreenIndex > route.params.screen
            ? 1
            : 0 && currentScreenIndex < screenIndex
        ) {
          setCurrentScreenIndex(currentScreenIndex - 1);
        }
        // childrenNavigator?.goBack();
        // e.preventDefault?.();
      },
    }),
    [childrenNavigator, currentScreenIndex, route],
  );

  React.useLayoutEffect(() => {
    parentNav.setOptions({
      headerLeft: props => (
        <CustomHeaderBackButton
          {...props}
          onPress={childrenNavigator?.goBack || props.onPress}
        />
      ),
    });
  }, [childrenNavigator]);

  return (
    <ScreenComponent>
      <Container>
        <Navigator
          screenOptions={({navigation}) => {
            setChildrenNavigator(navigation);
            return navigationConfig({
              title: '',
              headerShown: true,
              headerStyle: {height: 1},
              headerLeft: null,
            });
          }}>
          <Screen
            name={routes.registerScreen}
            component={RegisterScreen}
            initialParams={params}
            listeners={getScreenListeners(0)}
          />
          <Screen
            name={routes.registerPersonalData}
            component={RegisterPersonalDataScreen}
            initialParams={params}
            listeners={getScreenListeners(1)}
          />
          <Screen
            name={routes.registerDriverVehiculeScreen}
            getComponent={() =>
              require('components/navigation/RegisterDriverVehiculeDataScreen')
                .default
            }
            listeners={getScreenListeners(2)}
          />
          <Screen
            name={routes.registerDriverLegalsScreen}
            getComponent={() =>
              require('components/navigation/RegisterDriverLegalDataScreen')
                .default
            }
            listeners={getScreenListeners(3)}
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
