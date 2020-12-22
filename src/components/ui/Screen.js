import React, {useEffect, useCallback} from 'react';
import {
  Platform,
  StatusBar,
  View,
  Keyboard,
  TouchableWithoutFeedback,
  ScrollView,
  KeyboardAvoidingView,
  SafeAreaView,
} from 'react-native';
import styled from 'styled-components';
import {theme} from 'constants/theme';
import {disableBodyScroll, enableBodyScroll} from 'body-scroll-lock';
import {useWindowDimension} from 'components/Hooks/useWindowsDimensions';
import {useIsFocused, useRoute} from '@react-navigation/native';

export const Screen = ({
  children,
  scrollable,
  removeeTWF,
  classname,
  enableAvoidKeyboard,
  style,
}) => {
  const route = useRoute();
  const {isMobile} = useWindowDimension();
  const isFocused = useIsFocused();
  const ViewComponent = React.useMemo(() => {
    return styled(
      Platform.OS === 'android' && !removeeTWF
        ? TouchableWithoutFeedback
        : View,
    )`
      background-color: ${(props) => props.theme.colors.backgroundColor};
      height: 100%;
      width: 100%;
    `;
  }, [removeeTWF]);

  const ScrollableLayer = scrollable ? ScrollView : View;
  const NativeSafeAreaView =
    Platform.OS === 'web' ? React.Fragment : SafeAreaView;

  useEffect(() => {
    if (isFocused && !scrollable) {
      Platform.select({
        native: () => {},
        web: () => {
          const body = document.body;
          if (isMobile) {
            disableBodyScroll(body);
          } else {
            enableBodyScroll(body);
          }
        },
      })();
    }
  }, [route, isMobile, isFocused, scrollable]);

  return (
    <>
      <StatusBar backgroundColor={theme.primaryDarkColor} />
      <NativeSafeAreaView
        {...(Platform.OS !== 'web' && {
          style: {
            height: '100%',
            width: '100%',
            backgroundColor: theme.backgroundColor,
          },
        })}>
        <KeyboardAvoidingView
          behavior="height"
          enabled={enableAvoidKeyboard}
          style={{
            height: '100%',
            width: '100%',
          }}>
          <ViewComponent accessible={!scrollable} onPress={Keyboard.dismiss}>
            <ScrollableLayer
              showsVerticalScrollIndicator={false}
              classname={classname}
              style={[
                !scrollable && {
                  alignItems: 'center',
                  overflow: 'hidden',
                  overscrollBehavior: 'none',
                },
                isMobile && {
                  flex: 1,
                },
                Platform.select({
                  web: {
                    overflowX: 'hidden',
                  },
                }),
                style,
              ]}>
              {children}
            </ScrollableLayer>
          </ViewComponent>
        </KeyboardAvoidingView>
      </NativeSafeAreaView>
    </>
  );
};

Screen.defaultProps = {
  removeTWF: false,
  scrollable: false,
  enableAvoidKeyboard: true,
};
