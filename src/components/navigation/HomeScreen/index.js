import React from 'react';
import {TouchableOpacity, Text} from 'react-native';
import {Screen} from 'components/ui/Screen';
import {MainButton} from 'components/ui/MainButton';
import CalendarPicker from 'components/ui/CalendarPicker/index';
import InputField from 'components/ui/InputField';

export default ({navigation}) => {
  const [isVisible, setIsVisible] = React.useState(false);
  return (
    <Screen>
      <CalendarPicker
        calendarOptions={{
          past: true,
        }}
      />
      <InputField label={'Hola'} />
      <MainButton
        label="Siguiente"
        icon="chevron-right"
        onPress={() => setIsVisible(!isVisible)}
      />
    </Screen>
  );
};
