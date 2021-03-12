import React, {useState, useEffect, useCallback} from 'react';
import {Switch as RNSwitch} from 'react-native';
import {theme} from 'constants/theme';

export const Switch = ({value, onChange}) => (
  <RNSwitch
    value={value}
    onValueChange={onChange}
    trackColor={{false: theme.disabled, true: theme.primaryDarkColor}}
    thumbColor={value ? theme.primaryColor : theme.gray}
    ios_backgroundColor="#3e3e3e"
  />
);

Switch.defaultProps = {
  onChange: () => {},
  value: null,
};
