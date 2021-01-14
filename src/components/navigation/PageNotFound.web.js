import React, {useCallback} from 'react';
import styled from 'styled-components';
import {Icon} from 'components/ui/Icon';
import {Screen} from 'components/ui/Screen';
import {MainButton} from 'components/ui/MainButton';
import {AppText} from 'components/ui/AppText';
import {scaleDp, scaleDpTheme} from 'helpers/responsiveHelper';
import EmptySvg from 'resources/assets/empty.svg';
import {routes} from 'constants/config/routes';

export default ({navigation}) => {
  const navigateToLanding = useCallback(
    () =>
      navigation.reset({
        index: 0,
        routes: [{name: routes.landingScreen}],
      }),
    [navigation],
  );

  return (
    <ScreenComponent>
      <AppText bold fontSize={25} padding={`${scaleDpTheme(50)} 0`}>
        La página a la que querés acceder no existe
      </AppText>
      <EmptySvg height={scaleDp(250)} />
      <Button label="Ir al inicio" onPress={navigateToLanding} height={30} />
    </ScreenComponent>
  );
};

const ScreenComponent = styled(Screen)`
  height: ${({theme}) => theme.screenHeight}px;
  width: ${({theme}) => theme.screenWidth}px;
`;

const Button = styled(MainButton)`
  margin-top: ${scaleDpTheme(70)};
`;
