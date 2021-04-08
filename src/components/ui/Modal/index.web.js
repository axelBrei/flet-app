import React from 'react';
import {Modal as ModalLib} from 'react-native-web';
import styled from 'styled-components';
import {useWindowDimension} from 'components/Hooks/useWindowsDimensions';

export const Modal = ({isVisible, children, ...props}) => {
  const {isMobile} = useWindowDimension();
  return (
    <ModalLib
      visible={isVisible}
      animationType={isMobile && props.fullscreen ? 'slide' : 'fade'}
      {...props}
      transparent>
      <Container fullscreen={isMobile && props.fullscreen}>
        <Backdrop onClick={props.closeModal} />
        <Content>{children}</Content>
      </Container>
    </ModalLib>
  );
};

const Container = styled.View`
  flex: 1;
  justify-content: ${props => (props.fullscreen ? 'flex-end' : 'center')};
  align-items: center;
`;

const Backdrop = styled.View`
  position: fixed;
  align-self: center;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: ${props => props.theme.colors.backdropColor};
  transition: visibility 300ms linear, opacity 300ms linear;
  cursor: initial;
`;

const Content = styled.View`
  background-color: white;
`;
