import React, {useRef, useEffect, useState} from 'react';
import {Animated} from 'react-native';
import styled from 'styled-components';
import {useHeaderHeight} from '@react-navigation/stack';
import {useWindowDimension} from 'components/Hooks/useWindowsDimensions';
import {theme} from 'constants/theme';
import {AppText} from 'components/ui/AppText';

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
  visibility: ${(props) => (props.isVisible ? 'visible' : 'hidden')};
  align-items: center;
  justify-content: ${(props) =>
    props.theme.isMobile && props.fullscreen ? 'flex-end' : 'center'};
  height: ${({theme}) => theme.screenHeight}px;
  width: ${({theme}) => theme.screenWidth}px;
`;

const Backdrop = styled.View`
  position: fixed;
  align-self: center;
  width: ${({theme}) => theme.screenWidth}px;
  //height: ${({theme}) => theme.screenHeight}px;
  z-index: 90;
  top: 0;
  bottom: 0;
  left: 0;
  background-color: ${(props) => props.theme.colors.backdropColor};
  visibility: ${(props) => (props.isVisible ? 'visible' : 'hidden')};
  transition: visibility 300ms linear, opacity 300ms linear;
  opacity: ${(props) => (props.isVisible ? 0.7 : 0)};
`;

const ModalContent = styled(Animated.View)`
  align-self: center;
  z-index: 999;
  border-radius: 8px;
  padding: 5px;
  background-color: ${(props) => props.theme.colors.white};
  width: 100%;
  display: flex;
`;
