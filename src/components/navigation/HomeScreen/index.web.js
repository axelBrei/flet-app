import React, {useLayoutEffect} from 'react';
import {Screen} from 'components/ui/Screen';
import {Card} from 'components/ui/Card';
import {LoginButtons} from 'components/navigation/HomeScreen/LoginButtons';

export default ({navigation, route}) => {
  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => <LoginButtons orientation="row" />,
    });
  }, [navigation]);

  return (
    <Screen>
      <Card>
        <p>Hola</p>
      </Card>
    </Screen>
  );
};
