import React from 'react';
import {View} from 'react-native';
import {Svg, Circle, Text as SVGText} from 'react-native-svg';
import {useDebounce} from 'components/Hooks/useDebounce';
import {theme as colors} from 'constants/theme';

export const CircularProgress = ({
  progressPercent,
  size,
  strokeWidth,
  text,
  textSize,
  theme,
}) => {
  const {bgColor, pgColor, textColor} = theme;
  const radius = (size - strokeWidth) / 2;
  const circum = radius * 2 * Math.PI;
  const svgProgress = 100 - progressPercent;
  const progress = useDebounce(svgProgress);

  return (
    <View style={{margin: 10}}>
      <Svg width={size} height={size}>
        {/* Background Circle */}
        <Circle
          stroke={bgColor || colors.lightGray}
          fill="none"
          cx={size / 2}
          cy={size / 2}
          r={radius}
          {...{strokeWidth}}
        />

        {/* Progress Circle */}
        <Circle
          stroke={pgColor || '#3b5998'}
          fill="none"
          cx={size / 2}
          cy={size / 2}
          r={radius}
          strokeDasharray={`${circum} ${circum}`}
          strokeDashoffset={radius * Math.PI * 2 * (progress / 100)}
          strokeLinecap="round"
          transform={`rotate(-90, ${size / 2}, ${size / 2})`}
          {...{strokeWidth}}
        />

        {/* Text */}
        <SVGText
          fontSize={textSize}
          x={size / 2}
          y={size / 2 + (textSize ? textSize / 2 - 1 : 5)}
          textAnchor="middle"
          fill={textColor ? textColor : colors.primaryColor}>
          {text}
        </SVGText>
      </Svg>
    </View>
  );
};
CircularProgress.defaultProps = {
  size: 60,
  textSize: 20,
  strokeWidth: 5,
  progressPercent: 0,
  text: '',
  theme: {
    bgColor: null,
    pgColor: null,
    textColor: null,
  },
};
