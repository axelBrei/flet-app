import React from 'react';
import {TouchableOpacity, Text} from 'react-native';
import {Screen} from 'components/ui/Screen';
import {MainButton} from 'components/ui/MainButton';
import {RadioGroup} from 'components/ui/RadioGroup';

export default ({navigation}) => {
  const [isVisible, setIsVisible] = React.useState(false);
  return (
    <Screen>
      <RadioGroup
        options={[
          {text: '¿Manejas por tu cuenta?'},
          {text: '¿Manejas por tu cuenta?'},
        ]}
      />
      <MainButton
        label="Siguiente"
        icon="chevron-right"
        onPress={() => setIsVisible(!isVisible)}
      />
    </Screen>
  );
};
