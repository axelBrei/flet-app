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
import {useWindowDimension} from 'components/Hooks/useWindowsDimensions';
import {useIsFocused, useRoute} from '@react-navigation/native';
import {usePlatformEffect, PLATFORMS} from 'components/Hooks/usePlatformEffect';

export const Screen = ({
  children,
  scrollable,
  removeeTWF,
  classname,
  enableAvoidKeyboard,
  alignItems,
  style,
}) => {
  const route = useRoute();
  const {isMobile, height, width} = useWindowDimension();
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

  usePlatformEffect(
    () => {
      const BodyScrollLock = require('body-scroll-lock');
      const body = document.body;
      if (isFocused && isMobile) {
        if (!scrollable) {
          BodyScrollLock.disableBodyScroll(body);
        } else {
          BodyScrollLock.enableBodyScroll(body);
        }
      }
    },
    [isFocused, isMobile, scrollable],
    PLATFORMS.WEB,
  );

  return (
    <>
      <StatusBar backgroundColor={theme.primaryDarkColor} />
      <NativeSafeAreaView
        {...(Platform.OS !== 'web' && {
          style: {
            height: '100%',
            width,
            backgroundColor: theme.backgroundColor,
          },
        })}>
        <KeyboardAvoidingView
          behavior="position"
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
                {backgroundColor: theme.backgroundColor},
                !scrollable && {
                  alignItems,
                  overflow: 'hidden',
                  overscrollBehavior: 'none',
                  maxHeight: height,
                  maxWidth: width,
                  height: '100%',
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
  alignItems: 'center',
};
