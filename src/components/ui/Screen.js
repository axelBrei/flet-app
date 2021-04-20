import React, {useCallback} from 'react';
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
import {useRoute, useFocusEffect} from '@react-navigation/native';
import {useBodyLock} from 'components/Contexts/BodyLockContext/index';
import {PLATFORMS, usePlatformEffect} from 'components/Hooks/usePlatformEffect';

export const Screen = ({
  children,
  scrollable,
  removeTWF,
  classname,
  enableAvoidKeyboard,
  alignItems,
  style,
  ...props
}) => {
  const {lockBody, unlockBody} = useBodyLock();
  const route = useRoute();
  const {isMobile, width} = useWindowDimension();
  const ViewComponent = React.useMemo(() => {
    return styled(
      Platform.OS !== 'web' && !removeTWF ? TouchableWithoutFeedback : View,
    )`
      background-color: ${props => props.theme.colors.white};
      height: 100%;
      width: 100%;
    `;
  }, [removeTWF]);

  const ScrollableLayer = scrollable ? ScrollView : View;
  const NativeSafeAreaView =
    Platform.OS === 'web' ? React.Fragment : SafeAreaView;

  useFocusEffect(
    useCallback(() => {
      if (Platform.OS === PLATFORMS.WEB && isMobile && !scrollable) {
        lockBody(route);
        return () => {
          unlockBody(route);
        };
      }
    }, [scrollable, isMobile, lockBody, unlockBody, route]),
  );

  usePlatformEffect(
    () => {
      if (scrollable) {
        unlockBody(route);
      }
    },
    [scrollable],
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
            backgroundColor: theme.white,
          },
        })}>
        <KeyboardAvoidingView
          behavior={Platform.select({
            ios: 'position',
          })}
          keyboardVerticalOffset={props.keyboardVerticalOffset}
          enabled={Platform.OS !== 'web' && enableAvoidKeyboard}
          style={{
            height: '100%',
            width: '100%',
          }}>
          <ViewComponent accessible={!scrollable} onPress={Keyboard.dismiss}>
            <ScrollableLayer
              nativeID={route.name}
              showsVerticalScrollIndicator={false}
              classname={classname}
              contentContainerStyle={props.contentContainerStyle}
              style={[
                {backgroundColor: theme.white},
                !scrollable && {
                  alignItems,
                  overflow: 'hidden',
                  overscrollBehavior: 'none',
                  maxWidth: width,
                  height: '100%',
                },
                Platform.select({
                  web: {
                    // paddingTop: headerHeight,
                    // maxHeight: height,
                    // minHeight: height,
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
