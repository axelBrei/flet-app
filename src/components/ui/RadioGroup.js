import React, {useCallback, useState} from 'react';
import styled from 'styled-components';
import {View, TouchableOpacity, Platform} from 'react-native';
import {Icon} from 'components/ui/Icon';
import {AppText} from 'components/ui/AppText';
import {theme} from 'constants/theme';
import {scaleDp} from 'helpers/responsiveHelper';

export const RadioGroup = ({options, onPressOption}) => {
  const [selectedOption, setSelectedOption] = useState(null);

  const onSelectOption = useCallback(
    (item, index) => () => {
      setSelectedOption(index);
      onPressOption(item, index);
    },
    [onPressOption, setSelectedOption],
  );

  const renderRadioButton = useCallback(
    (item, index) => (
      <RadioContainer onPress={onSelectOption(item, index)}>
        <Icon
          name={selectedOption === index ? 'radiobox-marked' : 'radiobox-blank'}
          color={theme.accentColor}
          size={scaleDp(Platform.OS === 'web' ? 12 : 18)}
        />
        <Text fontSize={Platform.OS === 'web' ? 12 : 16}>{item.text}</Text>
      </RadioContainer>
    ),
    [onSelectOption, selectedOption],
  );

  return <Container>{options.map(renderRadioButton)}</Container>;
};

RadioGroup.defaultProps = {
  options: [],
  onPressOption: () => {},
};

const Container = styled(View)`
  flex-direction: column;
`;

const RadioContainer = styled(TouchableOpacity)`
  flex-direction: row;
  justify-content: center;
  align-items: center;
  margin-top: ${(props) => props.theme.scale(3)}px;
  margin-bottom: ${(props) => props.theme.scale(3)}px;
`;

const Text = styled(AppText)`
  margin-left: ${(props) => props.theme.scale(3)}px;
  margin-bottom: ${(props) => props.theme.scale(1)}px;
`;
