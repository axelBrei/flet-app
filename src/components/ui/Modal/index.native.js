import React from 'react';
import {View} from 'react-native';
import {useWindowDimension} from 'components/Hooks/useWindowsDimensions';
import styled from 'styled-components';
const ModalLib = require('react-native-modal').default;

export const Modal = ({children, ...props}) => {
  const {height, width} = useWindowDimension();
  return (
    <ModalLib
      {...props}
      useNativeDriver
      deviceHeight={height}
      deviceWidth={width}
      propagateSwipe
      avoidKeyboard>
      <Content>{children}</Content>
    </ModalLib>
  );
};

const Content = styled(View)`
  z-index: 10;
  justify-content: center;
  border-radius: 8px;
  min-height: ${(props) => props.theme.scale(250)}px;
  padding: ${(props) => props.theme.scale(5)}px;
  background-color: ${(props) => props.theme.colors.white};
`;
