import React from 'react';
import styled from 'styled-components';
import {TouchableOpacity} from 'react-native';
import {AppText} from 'components/ui/AppText';
import {theme} from 'constants/theme';

export const PlaceItem = ({name, onPress}) => {
  return (
    <Button onPress={onPress}>
      <Text numberOfLines={1} ellipsizeMode="tail">
        {name}
      </Text>
    </Button>
  );
};

PlaceItem.defaultProps = {
  onPress: () => {},
};

const Text = styled(AppText)`
  font-size: 14px;
  min-width: 100%;
  text-align: left;
`;

const Button = styled(TouchableOpacity)`
  min-width: 100%;
  padding: 15px 20px;
  border-bottom-width: 0.5px;
  border-color: ${theme.lightGray};
`;
