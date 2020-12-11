import React from 'react';
import {Container} from 'components/ui/Container';
import {Icon} from 'components/ui/Icon';
import {AppText} from 'components/ui/AppText';
import {scaleDp, scaleDpTheme} from 'helpers/responsiveHelper';
import {theme} from 'constants/theme';
import styled from 'styled-components';

export const AppLogo = ({color, size}) => {
  return (
    <Container dir="row" alignItems="center">
      <StyledIcon
        name="truck-fast-outline"
        size={scaleDp(size + 30)}
        color={color}
      />
      <AppText bold fontSize={size} color={color}>
        FletApp
      </AppText>
    </Container>
  );
};

AppLogo.defaultProps = {
  size: 25,
  color: theme.fontColor,
};

const StyledIcon = styled(Icon)`
  margin-right: ${scaleDpTheme(5)};
`;
