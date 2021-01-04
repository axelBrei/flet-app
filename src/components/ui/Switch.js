import React, {useState, useEffect, useCallback} from 'react';
import {Switch as RNSwitch} from 'react-native';
import {theme} from 'constants/theme';

export const Switch = ({value, onChange}) => {
  const [enabled, setEnabled] = useState(value || false);

  useEffect(() => {
    setEnabled(value);
  }, [value]);

  const _onChange = useCallback(
    (val) => {
      setEnabled(val);
      onChange(val);
    },
    [setEnabled, onChange],
  );

  return (
    <RNSwitch
      value={enabled}
      onValueChange={_onChange}
      trackColor={{false: theme.disabled, true: theme.primaryDarkColor}}
      thumbColor={enabled ? theme.primaryColor : theme.gray}
      ios_backgroundColor="#3e3e3e"
    />
  );
};

Switch.defaultProps = {
  onChange: () => {},
  value: null,
};
