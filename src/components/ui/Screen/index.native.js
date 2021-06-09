import React from 'react';
import {
  StatusBar,
  View,
  Keyboard,
  ScrollView,
  useColorScheme,
  SafeAreaView,
} from 'react-native';
import styled from 'styled-components';
import {theme} from 'constants/theme';
import {useWindowDimension} from 'components/Hooks/useWindowsDimensions';
import {useRoute, useFocusEffect} from '@react-navigation/native';
import {KeyboardAvoidScreen} from 'components/ui/KeyboardaAvoidScreen';
import {Platform} from 'react-native-web';

const Screen = ({
  children,
  scrollable,
  removeTWF,
  classname,
  enableAvoidKeyboard,
  alignItems,
  style,
  ...props
}) => {
  const colorScheme = useColorScheme();
  const route = useRoute();
  const {width} = useWindowDimension();

  const ScrollableLayer = scrollable ? ScrollView : View;
  return (
    <>
      <StatusBar
        backgroundColor={theme.primaryDarkColor}
        barStyle={
          colorScheme
            ? colorScheme === 'light'
              ? 'dark-content'
              : 'light-content'
            : 'default'
        }
      />
      <SafeArea>
        <KeyboardAvoidScreen>
          <Container accessible={!scrollable} onPress={Keyboard.dismiss}>
            <ScrollableLayer
              nativeID={route.name}
              showsVerticalScrollIndicator={false}
              classname={classname}
              contentContainerStyle={props.contentContainerStyle}
              refreshControl={props.refreshControl}
              style={[
                {backgroundColor: theme.white},
                !scrollable && {
                  alignItems,
                  overflow: 'hidden',
                  overscrollBehavior: 'none',
                  maxWidth: width,
                  height: '100%',
                },
                style,
              ]}>
              {children}
            </ScrollableLayer>
          </Container>
        </KeyboardAvoidScreen>
      </SafeArea>
    </>
  );
};

Screen.defaultProps = {
  removeTWF: false,
  scrollable: false,
  enableAvoidKeyboard: true,
};
export default Screen;

const Container = styled.TouchableWithoutFeedback`
  background-color: ${props => props.theme.colors.white};
  height: 100%;
  width: 100%;
`;

const SafeArea = styled(SafeAreaView)`
  flex: 1;
  height: 100%;
  width: 100%;
  background-color: ${theme.backgroundColor};
`;
