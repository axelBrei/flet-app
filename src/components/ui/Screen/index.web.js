import React, {useCallback} from 'react';
import {View, ScrollView} from 'react-native';
import styled from 'styled-components';
import {theme} from 'constants/theme';
import {useWindowDimension} from 'components/Hooks/useWindowsDimensions';
import {useRoute, useFocusEffect} from '@react-navigation/native';
import {useBodyLock} from 'components/Contexts/BodyLockContext/index';
import {PLATFORMS, usePlatformEffect} from 'components/Hooks/usePlatformEffect';

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
  const {lockBody, unlockBody} = useBodyLock();
  const route = useRoute();
  const {isMobile, width} = useWindowDimension();

  const ScrollableLayer = scrollable ? ScrollView : View;

  useFocusEffect(
    useCallback(() => {
      if (isMobile && !scrollable) {
        lockBody(route);
        return () => {
          unlockBody(route);
        };
      }
    }, [scrollable, isMobile, lockBody, unlockBody, route]),
  );

  usePlatformEffect(
    () => {
      if (isMobile && scrollable) {
        unlockBody(route);
      }
    },
    [scrollable],
    PLATFORMS.WEB,
  );

  return (
    <Container>
      <ScrollableLayer
        nativeID={route.name}
        showsVerticalScrollIndicator={false}
        classname={classname}
        contentContainerStyle={props.contentContainerStyle}
        refreshControl={props.refreshControl}
        style={[
          {backgroundColor: theme.white, overflowX: 'hidden'},
          !scrollable
            ? {
                alignItems,
                overflow: 'hidden',
                overscrollBehavior: 'none',
                maxWidth: width,
                height: '100%',
              }
            : {},
          style,
        ]}>
        {children}
      </ScrollableLayer>
    </Container>
  );
};

Screen.defaultProps = {
  removeTWF: false,
  scrollable: false,
  enableAvoidKeyboard: true,
};

export default Screen;

const Container = styled.View`
  background-color: ${props => props.theme.colors.white};
  height: 100%;
  width: 100%;
`;
