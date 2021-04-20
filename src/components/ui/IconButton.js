import React, {useMemo} from 'react';
import styled from 'styled-components';
import {Icon} from 'components/ui/Icon';
import {TouchableOpacity} from 'react-native';
import {theme} from 'constants/theme';
import PropTypes from 'prop-types';

export const IconButton = ({
  classname,
  size,
  icon,
  onPress,
  color,
  alternative,
  inverted,
  ...props
}) => {
  const buttonStyle = useMemo(() => {
    if (inverted) {
      return {
        color: props.color || theme.primaryDarkColor,
        backgroundColor: 'transparent',
        borderWidth: 1,
        borderColor: props.borderColor || theme.primaryDarkColor,
      };
    }
    if (alternative) {
      return {
        color: theme.white,
        backgroundColor: theme.primaryDarkColor,
      };
    }
  }, [alternative, inverted]);
  return (
    <ButtonContainer
      onPress={onPress}
      classname={classname}
      borderWidth={buttonStyle?.borderWidth}
      style={buttonStyle}
      backgroundColor={props.backgroundColor || buttonStyle?.backgroundColor}
      borderColor={props.borderColor || buttonStyle?.borderColor}
      {...props}>
      <Icon
        name={icon}
        size={size}
        color={props.iconColor || buttonStyle?.color || theme.white}
      />
    </ButtonContainer>
  );
};

IconButton.defaultProps = {
  color: theme.primaryDarkColor,
  onPress: () => {},
  size: 18,
  alternative: false,
  inverted: false,
};
IconButton.propTypes = {
  color: PropTypes.string,
  size: PropTypes.number,
  onPress: PropTypes.func.isRequired,
  icon: PropTypes.string.isRequired,
  alternative: PropTypes.bool,
  inverted: PropTypes.bool,
};

const ButtonContainer = styled(TouchableOpacity)`
  padding: ${props => props.padding || 8}px;
  border-radius: ${props =>
    (typeof props.radius === 'string' ? `${props.radius}px` : props.radius) ||
    '10px'};
  background-color: ${props => props?.backgroundColor || theme.primaryColor};
  border-width: ${props => props?.borderWidth || 0}px;
  border-color: ${props => props.borderColor || theme.primaryColor};
`;
