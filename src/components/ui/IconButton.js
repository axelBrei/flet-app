import React, {useMemo} from 'react';
import styled from 'styled-components';
import {Icon} from 'components/ui/Icon';
import {TouchableOpacity} from 'react-native';
import {theme} from 'constants/theme';
import {scaleDp, scaleDpTheme} from 'helpers/responsiveHelper';
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
        color: theme.accentColor,
        backgroundColor: 'transparent',
        borderWidth: 1,
        borderColor: theme.accentColor,
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
      backgroundColor={props.backgroundColor || buttonStyle?.backgroundColor}
      style={buttonStyle}
      {...props}>
      <Icon
        name={icon}
        size={scaleDp(size)}
        color={buttonStyle?.color || props.iconColor || theme.white}
      />
    </ButtonContainer>
  );
};

IconButton.defaultProps = {
  color: theme.accentColor,
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
  padding: ${(props) => props.padding || scaleDpTheme(8)};
  border-radius: ${(props) => props.radius || scaleDpTheme(10)};
  background-color: ${(props) => props?.backgroundColor || theme.accentColor};
  border-width: ${(props) => scaleDp(props?.borderWidth || 0)}px;
  border-color: ${theme.accentColor};
`;
