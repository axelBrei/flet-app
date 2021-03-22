import React from 'react';
import {View} from 'react-native';
import {useWindowDimension} from 'components/Hooks/useWindowsDimensions';
import styled from 'styled-components';
const ModalLib = require('react-native-modal').default;

export const Modal = ({children, swipeToClose = true, ...props}) => {
  const {height, width} = useWindowDimension();
  return (
    <ModalLib
      useNativeDriver
      deviceHeight={height}
      deviceWidth={width}
      animationIn={swipeToClose && 'slideInUp'}
      animationOut={swipeToClose && 'slideOutDown'}
      propagateSwipe={swipeToClose}
      swipeDirection={swipeToClose && 'down'}
      onSwipeComplete={swipeToClose ? props.closeModal : () => {}}
      avoidKeyboard={props.avoidKeyboard}
      {...props}>
      <Content>{children}</Content>
    </ModalLib>
  );
};

const Content = styled(View)`
  z-index: 10;
  justify-content: center;
  border-radius: 8px;
  height: auto;
  background-color: ${(props) => props.theme.colors.white};
`;
//   padding: ${(props) => props.theme.scale(5)}px;
