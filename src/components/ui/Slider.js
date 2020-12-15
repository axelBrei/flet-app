import React, {useState, useCallback, useMemo, useEffect} from 'react';
import {View} from 'react-native';
import {Slider as RNSlider} from '@miblanchard/react-native-slider';
import styled from 'styled-components';
import {AppText} from 'components/ui/AppText';
import {scaleDp, scaleDpTheme} from 'helpers/responsiveHelper';
import {theme} from 'constants/theme';
import {Container} from 'components/ui/Container';
import {useWindowDimension} from 'components/Hooks/useWindowsDimensions';
import {AnimatedError} from 'components/ui/AnimatedError';

export const Slider = ({
  label,
  value,
  onValueChange,
  minValue,
  maxValue,
  showValue,
  valueSign,
  stepsEnabled,
  error,
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

  const onSlidingComplete = useCallback(
    (v) => {
      setFocused(false);
      if (stepsEnabled) {
        setValue(Math.round(v));
      }
      onValueChange(Math.round(v));
    },
    [setFocused, _value, stepsEnabled, onValueChange],
  );

  const renderCurrentValue = useCallback(
    () =>
      showValue &&
      focused && (
        <AboveThumbComponent>
          {valueSign}
          {Math.round(_value)}
        </AboveThumbComponent>
      ),
    [showValue, focused, _value],
  );

  const trackMarks = useMemo(
    () =>
      options.length > 0 ? options.map((_, idx) => idx) : [minValue, maxValue],
    [options, minValue, maxValue],
  );

  const renderTrackMarcks = useCallback(
    (i) => (
      <TrackContainer hidden={options.length === 0}>
        <OptionText
          hidden={options.length === 0}
          textAlign={i === options.length - 1 || i === 0 ? 'left' : 'center'}
          left={i === options.length - 1 ? -80 : i === 0 ? 2 : 0}>
          {options[i]?.label}
        </OptionText>
        <TrackMark selected={options.length !== 0 && i <= _value} />
      </TrackContainer>
    ),
    [options, _value],
  );

  return (
    <>
      <Label>{label}</Label>
      <ComponentContainer>
        <RNSlider
          value={_value}
          onValueChange={setValue}
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
            zIndex: 1,
            height: scaleDp(15),
            marginTop: scaleDp(options.length > 0 ? 15 : 5),
          }}
          thumbTintColor={theme.primaryDarkColor}
          minimumTrackTintColor={theme.primaryDarkColor}
        />
        {options.length === 0 && (
          <Container width="100%" dir="row" justifyContent="space-between">
            <AppText fontSize={10} color={theme.disabled}>
              {`Min\n${valueSign}${minValue}`}
            </AppText>
            <AppText textAlign="right" fontSize={10} color={theme.disabled}>
              {`Máx\n${valueSign}${maxValue}`}
            </AppText>
          </Container>
        )}
        <AnimatedError error={error} />
      </ComponentContainer>
    </>
  );
};

Slider.defaultProps = {
  values: null,
  minValue: 0,
  maxValue: 100,
  valueSign: '',
  stepsEnabled: false,
  options: [],
  onValueChange: () => {},
  error: null,
};

const ComponentContainer = styled(View)`
  width: 95%;
  align-self: center;
  align-items: stretch;
  justify-content: center;
  margin-bottom: ${scaleDpTheme(5)};
`;

const Label = styled(AppText)`
  width: 98%;
  text-align: left;
  font-size: ${scaleDpTheme(13)};
  padding-top: ${scaleDpTheme(5)};
  padding-bottom: ${scaleDpTheme(5)};
`;

const TrackContainer = styled(Container)`
  bottom: ${(props) => scaleDpTheme(props.hidden ? 1.4 : 7.9)};
`;

const OptionText = styled(AppText)`
  color: ${theme.disabled};
  padding-bottom: 0;
  position: relative;
  left: ${(props) => props.left || -40}%;
  display: ${(props) => (props.hidden ? 'none' : 'unset')};
  max-width: ${scaleDpTheme(85)};
  font-size: ${scaleDpTheme(11)};
  width: ${(props) => (props.width ? `${props.width}px` : 'auto')};
`;

const TrackMark = styled(View)`
  width: ${scaleDpTheme(1)};
  height: ${scaleDpTheme(10)};
  border-radius: ${scaleDpTheme(7)};
  background-color: ${(props) =>
    props.selected ? theme.primaryDarkColor : '#b3b3b3'};
  margin-left: ${scaleDpTheme(5)};
  margin-top: 4px;
  z-index: 0;
`;

const AboveThumbComponent = styled(AppText)`
  position: relative;
  left: -40%;
  bottom: ${scaleDpTheme(-7)};
  font-size: ${scaleDpTheme(10)};
  color: ${theme.disabled};
  text-align: center;
  width: ${scaleDpTheme(70)};
  background-color: white;
  box-shadow: 0.5px -1px 3px ${theme.disabled};
  elevation: 3grad;
  padding: ${scaleDpTheme(5)};
  border-radius: ${scaleDpTheme(8)};
`;
