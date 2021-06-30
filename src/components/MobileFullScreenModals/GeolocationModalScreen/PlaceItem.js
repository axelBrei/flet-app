import React, {useEffect, useRef, useState} from 'react';
import styled from 'styled-components';
import {Animated} from 'react-native';
import {AppText} from 'components/ui/AppText';
import {theme} from 'constants/theme';

export const PlaceItem = ({name, type, onPress, expanded}) => {
  const opacity = useRef(new Animated.Value(!expanded ? 0 : 1)).current;
  const [visible, setVisible] = useState(!expanded);

  useEffect(() => {
    if (expanded !== visible) {
      setTimeout(() => {
        setVisible(!visible);
      }, 100);
      Animated.spring(opacity, {
        toValue: visible ? 0 : 1,
        duration: 100,
        useNativeDriver: true,
      }).start();
    }
  }, [opacity, expanded, visible]);

  const scaleY = opacity.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: [0, 0.5, 1],
  });

  return (
    <Animated.View
      style={{
        opacity,
        transform: [{scaleY}],
      }}>
      {visible && (
        <Button onPress={onPress}>
          {type ? (
            <Text fontSize={12} color={theme.disabledFont}>
              {type}
            </Text>
          ) : null}
          <Text fontSize={14} numberOfLines={1} ellipsizeMode="tail">
            {name}
          </Text>
        </Button>
      )}
    </Animated.View>
  );
};

PlaceItem.defaultProps = {
  onPress: () => {},
};

const Text = styled(AppText)`
  min-width: 100%;
  text-align: left;
`;

const Button = styled.TouchableOpacity`
  min-width: 100%;
  padding: 10px 20px;
`;
