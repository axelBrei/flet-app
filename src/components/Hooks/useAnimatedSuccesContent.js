import React, {useCallback, useEffect, useRef} from 'react';
import styled from 'styled-components';
import {Animated} from 'react-native';
import {AppText} from 'components/ui/AppText';
import {Icon} from 'components/ui/Icon';
import {theme} from 'constants/theme';
import {Title} from 'components/ui/Title';

const Content = props => {
  const scale = useRef(new Animated.Value(0)).current;
  const opacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.spring(scale, {
        toValue: 1,
        speed: 1,
        useNativeDriver: true,
      }),
      Animated.timing(opacity, {
        toValue: 1,
        duration: 350,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);
  return (
    <Container style={{opacity}}>
      <Animated.View style={{transform: [{scale}]}}>
        <IconContainer color={props.theme.iconColor || theme.online}>
          <Icon
            name={props.icon || 'check-outline'}
            size={56}
            color={props.theme.iconColor || theme.online}
          />
        </IconContainer>
      </Animated.View>
      <Title textAlign="center">{props.title || 'Exito!'}</Title>
      {props.message && <AppText textAlign="center">{props.message}</AppText>}
    </Container>
  );
};

export const useAnimatedSucccesContent = (
  successConditions = [],
  title,
  message,
  icon,
  customTheme: theme,
) => {
  const isSuccesful =
    successConditions.length > 0 && successConditions.every(i => !!i);
  return {
    isSuccesful,
    SuccessContent: () =>
      isSuccesful ? (
        <Content
          title={title}
          message={message}
          icon={icon}
          theme={customTheme}
        />
      ) : null,
  };
};

const Container = styled(Animated.View)`
  justify-content: center;
  align-items: center;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  border-radius: 20px;
  background-color: ${theme.backgroundColor};
  padding: 10px;
`;

const IconContainer = styled(Animated.View)`
  padding: 10px;
  border-radius: 40px;
  border-width: 4px;
  border-color: ${({color}) => color};
  margin-bottom: 20px;
`;
