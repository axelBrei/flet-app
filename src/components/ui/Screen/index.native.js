import React from 'react';
import {
  StatusBar,
  View,
  Keyboard,
  ScrollView,
  useColorScheme,
} from 'react-native';
import styled from 'styled-components';
import {theme} from 'constants/theme';
import {useWindowDimension} from 'components/Hooks/useWindowsDimensions';
import {useRoute, useFocusEffect} from '@react-navigation/native';
import {KeyboardAvoidScreen} from 'components/ui/KeyboardaAvoidScreen';
import {SafeAreaView, useSafeAreaInsets} from 'react-native-safe-area-context';
import {isLightColor} from 'helpers/colorHelper';

const Screen = ({
  children,
  scrollable,
  removeTWF,
  classname,
  enableAvoidKeyboard,
  alignItems,
  style,
  notchColor,
  ...props
}) => {
  const route = useRoute();
  const {width} = useWindowDimension();

  const ScrollableLayer = scrollable ? ScrollView : View;
  return (
    <>
      <StatusBar
        backgroundColor={notchColor || theme.primaryColor}
        barStyle={isLightColor(notchColor) ? 'dark-content' : 'light-content'}
      />
      <KeyboardAvoidScreen>
        <Container
          accessible={!scrollable}
          disabled={removeTWF}
          onPress={Keyboard.dismiss}>
          <ScrollableLayer
            nativeID={route.name}
            showsVerticalScrollIndicator={false}
            classname={classname}
            contentContainerStyle={props.contentContainerStyle}
            refreshControl={props.refreshControl}
            style={[
              !scrollable && {
                alignItems,
                overflow: 'hidden',
                overscrollBehavior: 'none',
                maxWidth: width,
                height: '100%',
              },
              style,
              {backgroundColor: theme.backgroundColor},
            ]}>
            {children}
          </ScrollableLayer>
        </Container>
      </KeyboardAvoidScreen>
    </>
  );
};

Screen.defaultProps = {
  removeTWF: false,
  scrollable: false,
  enableAvoidKeyboard: true,
  notchColor: theme.primaryColor,
};
export default Screen;

const Container = styled.TouchableWithoutFeedback`
  background-color: ${theme.backgroundColor};
  height: 100%;
  width: 100%;
`;
