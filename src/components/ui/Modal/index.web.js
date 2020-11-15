import React, {useRef} from 'react';
import {View} from 'react-native';
import styled from 'styled-components';
import {useHeaderHeight} from '@react-navigation/stack';

export const Modal = ({isVisible, onBackdropPress}) => {
  const headerHeight = useHeaderHeight();
  const containerRef = useRef(null);

  return (
    <>
      <Backdrop
        headerHeight={headerHeight}
        isVisible={isVisible}
        onClick={onBackdropPress}
      />
      <Container
        isVisible={isVisible}
        ref={containerRef}
        headerHeight={headerHeight}>
        <ModalContent>
          <p>Hola</p>
        </ModalContent>
      </Container>
    </>
  );
};

const Container = styled(View)`
  position: fixed;
  top: ${(props) => (props.isVisible ? '50%' : props.theme.scale(400))};
  bottom: 50%;
  align-items: center;
  justify-content: center;
  visibility: ${(props) => (props.isVisible ? 'visible' : 'hidden')};
  transition: top 150ms linear, visibility 150ms linear;
`;

const Backdrop = styled(View)`
  position: fixed;
  top: ${(props) => props.headerHeight};
  left: 0;
  right: 0;
  bottom: 0;
  background-color: ${(props) => props.theme.colors.backdropColor};
  visibility: ${(props) => (props.isVisible ? 'visible' : 'hidden')};
  transition: visibility 300ms linear, opacity 300ms linear;
  opacity: ${(props) => (props.isVisible ? 0.7 : 0)};
`;

const ModalContent = styled(View)`
  display: flex;
  z-index: 10;
  border-radius: 8px;
  min-width: ${(props) => props.theme.scale(250)}px;
  min-height: ${(props) => props.theme.scale(250)}px;
  padding: ${(props) => props.theme.scale(5)}px;
  background-color: ${(props) => props.theme.colors.backgroundColor};
`;
