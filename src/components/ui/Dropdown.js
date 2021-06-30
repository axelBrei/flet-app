import React, {useCallback, useEffect, useState} from 'react';
import {StyleSheet, FlatList, TouchableOpacity} from 'react-native';
import InputField from 'components/ui/InputField';
import {scaleDp} from 'helpers/responsiveHelper';
import {AppText} from 'components/ui/AppText';
import {theme} from 'constants/theme';
import PropTypes from 'prop-types';
import {Loader} from 'components/ui/Loader';
import {Icon} from 'components/ui/Icon';

export const Dropdown = ({visible, data, ...props}) => {
  const [value, setValue] = useState(props.value?.name ?? props.value);
  const [dropdownOpen, setDropdownOpen] = useState(visible);
  const [inputMeasures, setInputMeasures] = useState({});

  const measureInput = useCallback(
    ({nativeEvent: {layout}}) => {
      setInputMeasures({
        top: layout.y + layout.height - 18,
        left: layout.x,
        width: layout.width,
      });
    },
    [setInputMeasures],
  );

  const onPressItem = useCallback(
    item => {
      setDropdownOpen(false);
      props.onItemPress(item);
      setValue(item);
    },
    [setDropdownOpen],
  );

  const onChangeText = useCallback(
    v => {
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
        error={props.error}
        renderAccesory={() => (
          <TouchableOpacity
            onPress={() => {
              setDropdownOpen(!dropdownOpen);
              props.onBlur?.();
            }}>
            <Icon
              name={dropdownOpen ? 'chevron-up' : 'chevron-down'}
              size={22}
            />
          </TouchableOpacity>
        )}
        onFocus={() => {
          setDropdownOpen(true);
          // props.onFocus?.();
          return true;
        }}
      />
      {dropdownOpen && (
        <FlatList
          data={data}
          onBlur={() => setDropdownOpen(false)}
          style={[
            styles.listContainer,
            {
              top: inputMeasures.top,
              width: inputMeasures.width,
              left: inputMeasures.left,
            },
          ]}
          nestedScrollEnabled
          removeClippedSubviews={false}
          keyExtractor={(_, i) => i.toString()}
          initialNumToRender={2}
          contentContainerStyle={styles.list}
          renderItem={({item}) => (
            <TouchableOpacity
              style={styles.item}
              onPress={() => onPressItem(item)}>
              <AppText style={styles.itemText} numberOfLines={1}>
                {item.name}
              </AppText>
            </TouchableOpacity>
          )}
        />
      )}
    </>
  );
};

Dropdown.defaultProps = {
  visible: false,
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
    maxHeight: 250,
    borderBottomLeftRadius: scaleDp(8),
    borderBottomRightRadius: scaleDp(8),
    zIndex: 999,
  },
  list: {
    paddingTop: 5,
  },
  item: {
    minHeight: 35,
    marginTop: 5,
    marginHorizontal: 20,
  },
  itemText: {
    fontWeight: 'bold',
  },
});
