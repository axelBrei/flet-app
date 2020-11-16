import React, {useCallback, useState} from 'react';
import {Checkbox} from 'components/ui/Checkbox';
import {View} from 'react-native';
import styled from 'styled-components';

export const CheckboxGroup = ({options, onPressItem}) => {
  const [selectedItems, setSelectedItems] = useState([]);
  const onPress = useCallback(
    (item, index) => () => {
      onPressItem(item, index);
      if (selectedItems.includes(index)) {
        setSelectedItems(selectedItems.filter((i) => i !== index));
      } else {
        setSelectedItems([...selectedItems, index]);
      }
    },
    [selectedItems, setSelectedItems, onPressItem],
  );

  return (
    <Container>
      {options.map((item, index) => (
        <Checkbox
          {...item}
          key={index.toString()}
          isChecked={selectedItems.includes(index)}
          onPress={onPress(item, index)}
        />
      ))}
    </Container>
  );
};

CheckboxGroup.defaultProps = {
  options: [],
  onPressItem: () => {},
};

const Container = styled(View)`
  flex-direction: column;
`;
