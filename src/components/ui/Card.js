import React from 'react';
import styled, {css} from 'styled-components';
import {View, Platform} from 'react-native';

export const Card = ({
  children,
  onlyWeb,
  onlyMobile,
  backgroundColor,
  ...props
}) => {
  const visible =
    (Platform.OS === 'web' && onlyWeb) ||
    (['android', 'ios'].includes(Platform.OS) && onlyMobile);

  return (
    <CardComponent
      backgroundColor={backgroundColor}
      visible={visible}
      {...props}>
      {children}
    </CardComponent>
  );
};
Card.defaultProps = {
  onlyWeb: true,
  onlyMobile: false,
};

const CardComponent = styled(View)`
  padding: ${(props) => props.theme.scale(8)}px;
  ${(props) =>
    props.visible &&
    css`
      background-color: ${(props) =>
        props.backgroundColor || props.theme.colors.white};
      box-shadow: 1px 1px 8px ${(props) => props.theme.colors.backdropColor};
      border-radius: 7px;
    `}
`;
