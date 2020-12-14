import React, {useState, useCallback, useMemo, useEffect} from 'react';
import {View} from 'react-native';
import {Slider as RNSlider} from '@miblanchard/react-native-slider';
import styled from 'styled-components';
import {AppText} from 'components/ui/AppText';
import {scaleDp, scaleDpTheme} from 'helpers/responsiveHelper';
import {theme} from 'constants/theme';
import {Container} from 'components/ui/Container';
import {useWindowDimension} from 'components/Hooks/useWindowsDimensions';

export const Slider = ({
  label,
  value,
  onValueChange,
  minValue,
  maxValue,
  showValue,
  stepsEnabled,
  options,
}) => {
  const {width} = useWindowDimension();
  const [_value, setValue] = useState(minValue);
  const [focused, setFocused] = useState(false);
  const values = useMemo(
    () => ({
      maxValue: options.length > 0 ? options.length - 1 : maxValue,
      minValue: options.length > 0 ? 0 : minValue,
    }),
    [maxValue, minValue, options],
  );

  useEffect(() => {
    if (value && value !== _value) {
      setValue(value);
    }
  }, [value, _value, setValue]);

  const _onValueChange = useCallback(
    (v) => {
      onValueChange(v);
      setValue(v);
    },
    [setValue, onValueChange],
  );

  const onSlidingComplete = useCallback(
    (v) => {
      setFocused(false);
      if (stepsEnabled) {
        setValue(Math.round(v));
      }
    },
    [setFocused, _value, stepsEnabled],
  );

  const renderCurrentValue = useCallback(
    () =>
      showValue &&
      focused && (
        <AboveThumbComponent>${Math.round(_value)}</AboveThumbComponent>
      ),
    [showValue, focused, _value],
  );

  const trackMarks = useMemo(
    () =>
      options.length > 0
        ? options.map((o, idx, arr) => idx)
        : [minValue, maxValue],
    [options, minValue, maxValue],
  );

  const renderTrackMarcks = useCallback(
    (i) =>
      console.log('index', i) || (
        <TrackContainer>
          <OptionText
            textAlign={
              i === trackMarks.length - 1 || i === 0 ? 'left' : 'center'
            }
            left={i === trackMarks.length - 1 ? -80 : i === 0 ? 2 : null}>
            {options[i]?.label ?? (i === 0 ? minValue : maxValue)}
          </OptionText>
          <TrackMark />
        </TrackContainer>
      ),
    [options, minValue, maxValue],
  );

  return (
    <ComponentContainer>
      <Label>{label}</Label>
      <RNSlider
        value={_value}
        onValueChange={_onValueChange}
        maximumValue={values.maxValue}
        minimumValue={values.minValue}
        trackMarks={trackMarks}
        animateTransitions
        animationType="timing"
        onSlidingStart={() => setFocused(true)}
        onSlidingComplete={onSlidingComplete}
        renderAboveThumbComponent={renderCurrentValue}
        renderTrackMarkComponent={renderTrackMarcks}
        containerStyle={{
          marginTop: scaleDp(10),
          marginBottom: scaleDpTheme(showValue ? 5 : 5),
          // marginHorizontal: scaleDp(15),
        }}
        thumbTintColor={theme.primaryDarkColor}
        minimumTrackTintColor={theme.primaryDarkColor}
      />
    </ComponentContainer>
  );
};

Slider.defaultProps = {
  values: null,
  minValue: 0,
  maxValue: 100,
  stepsEnabled: false,
  options: [],
  onValueChange: () => {},
};

const ComponentContainer = styled(View)`
  width: 100%;
  align-items: stretch;
  justify-content: center;
  margin-bottom: ${scaleDpTheme(20)};
`;

const Label = styled(AppText)`
  font-size: ${scaleDpTheme(16)};
  padding-top: ${scaleDpTheme(5)};
  padding-bottom: ${scaleDpTheme(5)};
`;

const TrackContainer = styled(Container)`
  bottom: ${scaleDpTheme(10)};
`;

const OptionText = styled(AppText)`
  padding-bottom: 0;
  position: relative;
  left: ${(props) => props.left || -40}%;

  max-width: ${scaleDpTheme(85)};
  font-size: ${scaleDpTheme(14)};
  width: ${(props) => (props.width ? `${props.width}px` : 'auto')};
`;

const TrackMark = styled(View)`
  width: ${scaleDpTheme(2)};
  height: ${scaleDpTheme(10)};
  border-radius: ${scaleDpTheme(7)};
  background-color: ${theme.disabled};
  margin-left: ${scaleDpTheme(5)};
`;

const AboveThumbComponent = styled(AppText)`
  position: relative;
  color: ${theme.disabled};
  bottom: ${scaleDpTheme(-60)};
  text-align: center;
  width: ${scaleDpTheme(70)};
  left: -40%;
  background-color: white;
  box-shadow: 0.5px -1px 3px ${theme.disabled};
  elevation: 3grad;
  padding: ${scaleDpTheme(5)};
  border-radius: ${scaleDpTheme(8)};
`;
