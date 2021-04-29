import React from 'react';
import styled from 'styled-components';
import {Icon} from 'components/ui/Icon';
import {AppText} from 'components/ui/AppText';
import {theme} from 'constants/theme';

export const LabelIconButton = ({
  label,
  icon,
  backgroundColor,
  fontColor,
  onPress,
  loading,
}) => {
  return (
    <Container backgroundColor={backgroundColor} onPress={onPress}>
      <Icon name={icon} size={22} color={fontColor || theme.fontColor} />
      <Label color={fontColor || theme.fontColor}>{label}</Label>
      {loading && (
        <Loader
          backgroundColor={backgroundColor}
          color={fontColor}
          size="small"
        />
      )}
    </Container>
  );
};

const Container = styled.TouchableOpacity`
  max-width: 150px;
  height: 60px;
  flex-direction: row;
  border-radius: 20px;
  padding: 0 20px;
  align-items: center;
  justify-content: center;
  background-color: ${props => props.backgroundColor || theme.grayBackground};
`;

const Label = styled(AppText)`
  margin-left: 10px;
  font-weight: bold;
  text-align: center;
  font-size: 14px;
`;

const Loader = styled.ActivityIndicator`
  position: absolute;
  width: 100%;
  background-color: ${props => props.backgroundColor || theme.grayBackground};
`;
