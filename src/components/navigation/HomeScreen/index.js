import React from 'react';
import {TouchableOpacity, Text} from 'react-native';
import {Screen} from 'components/ui/Screen';
import {MainButton} from 'components/ui/MainButton';
import {Checkbox} from 'components/ui/Checkbox';
import {CheckboxGroup} from 'components/ui/CheckboxGroup';

export default ({navigation}) => {
  const [isVisible, setIsVisible] = React.useState(false);
  return (
    <Screen>
      <Checkbox
        isChecked={isVisible}
        text="¿Sos conductor?"
        onPress={() => setIsVisible(!isVisible)}
      />
      <CheckboxGroup
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
