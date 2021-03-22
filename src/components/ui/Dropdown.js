import React, {useCallback, useEffect, useState} from 'react';
import {StyleSheet, FlatList, TouchableOpacity} from 'react-native';
import InputField from 'components/ui/InputField';
import {scaleDp} from 'helpers/responsiveHelper';
import {AppText} from 'components/ui/AppText';
import {theme} from 'constants/theme';
import PropTypes from 'prop-types';

export const Dropdown = ({visible, ...props}) => {
  const [value, setValue] = useState(props.value?.name ?? props.value);
  const [dropdownOpen, setDropdownOpen] = useState(visible);
  const [inputMeasures, setInputMeasures] = useState({});

  const measureInput = useCallback(
    ({nativeEvent: {layout}}) => {
      setInputMeasures({
        top: layout.y + layout.height - 15,
        width: layout.width,
      });
    },
    [setInputMeasures],
  );

  const onPressItem = useCallback(
    (item) => {
      setDropdownOpen(false);
      props.onItemPress(item);
      setValue(item);
    },
    [setDropdownOpen],
  );

  const onChangeText = useCallback(
    (v) => {
      props.onChangeText(v);
      setValue({
        name: v,
      });
    },
    [props.onChangeText, setValue],
  );

  return (
    <>
      <InputField
        {...props}
        onChangeText={onChangeText}
        value={value?.name ?? value}
        onLayout={measureInput}
        onFocus={() => {
          setDropdownOpen(true);
          props.onFocus();
        }}
      />
      {dropdownOpen && (
        <FlatList
          onBlur={() => setDropdownOpen(false)}
          style={[
            styles.listContainer,
            {top: inputMeasures.top, width: inputMeasures.width - 40},
          ]}
          nestedScrollEnabled
          removeClippedSubviews={false}
          keyExtractor={(_, i) => i.toString()}
          initialNumToRender={2}
          renderItem={({item}) => (
            <TouchableOpacity
              style={styles.item}
              onPress={() => onPressItem(item)}>
              <AppText numberOfLines={1}>{item.name}</AppText>
            </TouchableOpacity>
          )}
          data={props.data}
        />
      )}
    </>
  );
};

Dropdown.defaultProps = {
  data: [],
  onItemPress: () => {},
  value: null,
};

Dropdown.propTypes = {
  data: PropTypes.array,
  value: PropTypes.object,
  onItemPress: PropTypes.func.isRequired,
};
const styles = StyleSheet.create({
  container: {
    position: 'relative',
    width: '100%',
    alignItems: 'center',
  },
  listContainer: {
    width: '100%',
    position: 'absolute',
    backgroundColor: theme.grayBackground,
    maxHeight: scaleDp(250),
    borderWidth: 0,
    borderBottomLeftRadius: scaleDp(8),
    borderBottomRightRadius: scaleDp(8),
    paddingHorizontal: scaleDp(10),
    shadowColor: theme.shadowColor,
    shadowOffset: {width: 0, height: 13},
    shadowRadius: 6,
    zIndex: 100,
    elevation: 6,
  },
  list: {
    width: '100%',
  },
  listContent: {width: '100%', height: scaleDp(50)},
  item: {
    height: scaleDp(35),
    paddingVertical: scaleDp(5),
  },
});
