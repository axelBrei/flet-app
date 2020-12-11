import React from 'react';
import {
  Platform,
  StatusBar,
  View,
  Keyboard,
  TouchableWithoutFeedback,
  ScrollView,
} from 'react-native';
import styled from 'styled-components';
import {theme} from 'constants/theme';
import {scaleDp} from 'helpers/responsiveHelper';
import {useWindowDimension} from 'components/Hooks/useWindowsDimensions';

export const Screen = ({
  children,
  scrollable,
  removeeTWF,
  classname,
  style,
}) => {
  const {isMobile} = useWindowDimension();
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

  return (
    <>
      <StatusBar backgroundColor={theme.primaryDarkColor} />
      <ViewComponent accessible={!scrollable} onPress={Keyboard.dismiss}>
        <ScrollableLayer
          classname={classname}
          style={[
            !scrollable && {
              alignItems: 'center',
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
    </>
  );
};

Screen.defaultProps = {
  removeTWF: false,
};
