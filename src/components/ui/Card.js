import React from 'react';
import styled, {css} from 'styled-components';
import {View, Platform} from 'react-native';
import {useWindowDimension} from 'components/Hooks/useWindowsDimensions';

export const Card = ({
  children,
  onlyWeb,
  onlyMobile,
  backgroundColor,
  ...props
}) => {
  const {isMobile} = useWindowDimension();
  const visible = isMobile ? !!onlyMobile : !!onlyWeb;

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
      box-shadow: 0px 3px 6px ${(props) => props.theme.colors.shadowColor};
      border-radius: 7px;
    `}
`;
