import React from 'react';
import {TouchableOpacity, Text} from 'react-native';
import {routes} from 'constants/config/routes';
import {Screen} from 'components/ui/Screen';
import {scaleDp, scaleDpTheme} from 'helpers/responsiveHelper';
import styled from 'styled-components';
import InputField from 'components/ui/InputField/index';
import {Icon} from 'components/ui/Icon';
import {MainButton} from 'components/ui/MainButton';
// import {Calendar} from 'react-native-calendars';
import {Calendar} from 'components/ui/Calendar';
import {View} from 'react-native-web';
import {AppText} from 'components/ui/AppText';
import {Modal} from 'components/ui/Modal/index';

export default ({navigation}) => {
  const [isVisible, setIsVisible] = React.useState(false);
  return (
    <Screen>
      <Calendar />
      <MainButton
        label="Siguiente"
        icon="chevron-right"
        onPress={() => setIsVisible(!isVisible)}
      />
      <Modal
        isVisible={isVisible}
        onBackdropPress={() => setIsVisible(false)}
      />
    </Screen>
  );
};
