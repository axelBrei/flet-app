import React from 'react';
import styled, {css} from 'styled-components';
import {Platform, TouchableOpacity, View} from 'react-native';
import {scaleDp, scaleDpTheme} from 'helpers/responsiveHelper';
import {theme} from 'constants/theme';

export const DraggableContent = React.forwardRef(({isOpen, children}, ref) => {
  return (
    <DrawableContainer ref={ref} activeOpacity={1}>
      <DrawerLine />
      {children}
    </DrawableContainer>
  );
});

const DrawableContainer = styled(TouchableOpacity)`
  width: 100%;
  min-height: ${scaleDpTheme(200)};
  padding: ${scaleDpTheme(10)};
  border-top-left-radius: ${scaleDp(8)};
  border-top-right-radius: ${scaleDp(8)};
  background-color: ${theme.white};
  box-shadow: 0.5px -1px 3px ${theme.shadowColor};
  elevation: 3;
  z-index: 10;
  ${Platform.select({
    web: css`
      cursor: auto;
    `,
  })}
`;

const DrawerLine = styled(View)`
  align-self: center;
  width: ${scaleDpTheme(30)};
  height: 4px;
  border-radius: ${scaleDpTheme(1000)};
  background-color: ${theme.disabled};
  margin-bottom: ${scaleDpTheme(10)};
`;
