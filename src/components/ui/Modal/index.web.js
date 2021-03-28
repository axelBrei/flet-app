import React, {useRef, useEffect, useState} from 'react';
import {Animated} from 'react-native';
import styled, {css} from 'styled-components';
import {useHeaderHeight} from '@react-navigation/stack';
import {useWindowDimension} from 'components/Hooks/useWindowsDimensions';

export const Modal = ({isVisible, onBackdropPress, children, ...props}) => {
  const headerHeight = useHeaderHeight();
  const {height} = useWindowDimension();
  const opacity = useRef(new Animated.Value(0)).current;
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    isVisible && !mounted && setMounted(true);
    Animated.spring(opacity, {
      useNativeDriver: true,
      duration: 150,
      toValue: isVisible ? 1 : 0,
    }).start(() => setMounted(isVisible));
  }, [isVisible, height, opacity, setMounted]);

  return (
    <>
      <Container
        isVisible={mounted}
        headerHeight={headerHeight}
        fullscreen={props.fullscreen}>
        <Backdrop
          headerHeight={headerHeight}
          isVisible={mounted}
          onClick={onBackdropPress}
        />
        <ModalContent {...props} style={[props.style, {opacity}]}>
          {children}
        </ModalContent>
      </Container>
    </>
  );
};

const Container = styled(Animated.View)`
  position: fixed;
  z-index: 99;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  width: ${(props) =>
    props.fullscreen ? `${props.theme.screenWidth}px` : '100%'};
  height: 100%;
  visibility: ${(props) => (props.isVisible ? 'visible' : 'hidden')};
  align-items: center;
  justify-content: ${(props) =>
    props.theme.isMobile && props.fullscreen ? 'flex-end' : 'center'};
  flex: 1;
`;

const Backdrop = styled.View`
  position: fixed;
  align-self: center;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  z-index: 90;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: ${(props) => props.theme.colors.backdropColor};
  visibility: ${(props) => (props.isVisible ? 'visible' : 'hidden')};
  transition: visibility 300ms linear, opacity 300ms linear;
  // opacity: ${(props) => (props.isVisible ? 0.7 : 0)};
`;

const ModalContent = styled(Animated.View)`
  align-self: center;
  z-index: 999;
  border-radius: 20px;
  background-color: ${(props) => props.theme.colors.white};
  display: flex;
`;
