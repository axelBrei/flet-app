import React, {useCallback, useEffect, useRef, useState} from 'react';
import styled from 'styled-components';
import {Animated} from 'react-native';
import {theme} from 'constants/theme';
import {Icon} from 'components/ui/Icon';
import {Title} from 'components/ui/Title';
import PropTypes from 'prop-types';
import {AppText} from 'components/ui/AppText';
import {MainButton} from 'components/ui/MainButton';

export const OperationResult = ({
  visible,
  onHideOperationResult,
  buttonText,
  ...props
}) => {
  const [localVisible, setLocalVisible] = useState(false);
  const scale = useRef(new Animated.Value(0)).current;
  const opacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (visible) {
      setLocalVisible(true);
      !buttonText &&
        setTimeout(() => {
          setLocalVisible(false);
          onHideOperationResult();
        }, 2500);
    } else {
      setLocalVisible(visible);
    }
  }, [visible, setLocalVisible, onHideOperationResult]);

  useEffect(() => {
    Animated.parallel([
      Animated.spring(scale, {
        toValue: localVisible ? 1 : 0,
        speed: 1,
        useNativeDriver: true,
      }),
      Animated.timing(opacity, {
        toValue: localVisible ? 1 : 0,
        duration: 350,
        useNativeDriver: true,
      }),
    ]).start();
  }, [localVisible]);

  const hide = useCallback(() => {
    setLocalVisible(false);
    onHideOperationResult();
  }, [onHideOperationResult]);

  return localVisible ? (
    <Container style={{opacity}} backgroundColor={props.theme?.backgroundColor}>
      <Animated.View style={{transform: [{scale}]}}>
        <IconContainer color={props.theme?.iconColor || theme.online}>
          <Icon
            name={props.icon || 'check-circle-outline'}
            size={props.theme?.iconSize || 80}
            color={props.theme?.iconColor || theme.online}
          />
        </IconContainer>
      </Animated.View>
      {(props.title || props.message) && (
        <TextContainer>
          {props.title ? (
            <Title textAlign="center">{props.title || 'Exito!'}</Title>
          ) : (
            <></>
          )}
          {props.message ? (
            <AppText textAlign="center">{props.message}</AppText>
          ) : (
            <></>
          )}
        </TextContainer>
      )}
      {buttonText && (
        <ButtonContainer>
          <MainButton onPress={hide}>{buttonText}</MainButton>
        </ButtonContainer>
      )}
    </Container>
  ) : (
    props.children || <></>
  );
};

OperationResult.propTypes = {
  icon: PropTypes.string.required,
  visible: PropTypes.bool.required,
  title: PropTypes.string,
  message: PropTypes.string,
  theme: PropTypes.object,
  onHideOperationResult: PropTypes.func,
};

OperationResult.defaultProps = {
  onHideOperationResult: () => {},
  theme: {},
  visible: false,
};

const Container = styled(Animated.View)`
  flex: 1;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  border-radius: 20px;
  padding: 20px 10px;
  background-color: ${({backgroundColor}) => backgroundColor || 'transparent'};
`;

const IconContainer = styled(Animated.View)`
  padding: 0 10px;
  border-radius: 40px;
`;

const TextContainer = styled.View`
  margin-top: 20px;
`;

const ButtonContainer = styled.View`
  flex: 1;
  justify-content: flex-end;
`;
