import React, {useCallback, useState} from 'react';
import styled from 'styled-components';
import {View, TouchableOpacity, Platform} from 'react-native';
import {Icon} from 'components/ui/Icon';
import {AppText} from 'components/ui/AppText';
import {theme} from 'constants/theme';
import {scaleDp, scaleDpTheme} from 'helpers/responsiveHelper';
import {useWindowDimension} from 'components/Hooks/useWindowsDimensions';

export const RadioGroup = ({
  options,
  initialIndex,
  onPressOption,
  style,
  itemStyle,
}) => {
  const {isMobile} = useWindowDimension();
  const [selectedOption, setSelectedOption] = useState(initialIndex);

  const onSelectOption = useCallback(
    (item, index) => () => {
      setSelectedOption(index);
      onPressOption(item, index);
    },
    [onPressOption, setSelectedOption],
  );

  const renderRadioButton = useCallback(
    (item, index) => (
      <RadioContainer onPress={onSelectOption(item, index)} key={index}>
        <Icon
          name={selectedOption === index ? 'radiobox-marked' : 'radiobox-blank'}
          color={theme.accentColor}
          size={scaleDp(16)}
        />
        <Text fontSize={14}>{item.text}</Text>
      </RadioContainer>
    ),
    [onSelectOption, selectedOption],
  );

  return <Container style={style}>{options.map(renderRadioButton)}</Container>;
};

RadioGroup.defaultProps = {
  options: [],
  onPressOption: () => {},
};

const Container = styled(View)`
  flex-direction: column;
  width: 100%;
  align-items: flex-start;
`;

const RadioContainer = styled(TouchableOpacity)`
  flex-direction: row;
  justify-content: center;
  align-items: center;
  margin: ${scaleDpTheme(5)} 0;
`;

const Text = styled(AppText)`
  margin-left: ${(props) => props.theme.scale(3)}px;
  margin-bottom: ${(props) => props.theme.scale(1)}px;
`;
