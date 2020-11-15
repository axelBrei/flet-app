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
      swipeDirection={['down']}
      avoidKeyboard>
      <Content>{children}</Content>
    </ModalLib>
  );
};

const Content = styled(View)`
  display: flex;
  z-index: 10;
  border-radius: 8px;
  min-height: ${(props) => props.theme.scale(250)}px;
  padding: ${(props) => props.theme.scale(5)}px;
  background-color: ${(props) => props.theme.colors.backgroundColor};
`;
