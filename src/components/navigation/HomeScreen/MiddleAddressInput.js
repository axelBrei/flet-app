import React, {useEffect, useRef, useState} from 'react';
import {Animated, LayoutAnimation} from 'react-native';
import InputField from 'components/ui/InputField';
import {FIELDS} from 'components/navigation/HomeScreen/newShipmentFormikConfig';
import {Icon} from 'components/ui/Icon';
import styled from 'styled-components';
import {AppText} from 'components/ui/AppText';

export const MiddleAddressInput = ({visible, onPressRemove, ...props}) => {
  const [hidden, setHidden] = useState(!visible);
  const opacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    Animated.spring(opacity, {
      toValue: visible ? 1 : 0,
      useNativeDriver: true,
    }).start(() => {
      setHidden(!visible);
    });
  }, [visible]);

  return (
    visible && (
      <Container
        style={{
          opacity,
          height: visible ? 90 : 1,
        }}>
        <InputField {...props} />
        <RemoveMidAddresContainer onPress={onPressRemove}>
          <AppText>Quitar</AppText>
          <Icon name="close" size={22} />
        </RemoveMidAddresContainer>
      </Container>
    )
  );
};

const Container = styled(Animated.View)`
  width: 100%;
  align-items: flex-end;
  justify-content: center;
  margin-top: 5px;
`;

const RemoveMidAddresContainer = styled.TouchableOpacity`
  padding-bottom: 8px;
  flex-direction: row;
  padding-right: 20px;
  top: -8px;
`;
