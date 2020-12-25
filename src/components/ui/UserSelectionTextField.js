import React from 'react';
import styled from 'styled-components';
import {View} from 'react-native';
import {AppText} from 'components/ui/AppText';
import {Icon} from 'components/ui/Icon';
import {theme} from 'constants/theme';
import {Container} from 'components/ui/Container';
import {scaleDp, scaleDpTheme} from 'helpers/responsiveHelper';

export const UserSelectionTextField = ({label, value, icon}) => {
  return (
    <RowContainer>
      <Icon size={scaleDp(25)} color={theme.primaryColor} name={icon} />
      <Divider />
      <Container width="89%">
        <AppText fontSize={12} color={theme.disabled}>
          {label}
        </AppText>
        <AppText ellipsizeMode="tail" numberOfLines={1}>
          {value}
        </AppText>
      </Container>
    </RowContainer>
  );
};

const RowContainer = styled(Container)`
  margin: ${scaleDpTheme(5)} 0;
  flex-direction: row;
  padding: ${scaleDpTheme(5)} ${scaleDpTheme(10)};
  align-items: center;
  background-color: ${theme.white};
  width: 100%;
  border-radius: ${scaleDpTheme(8)};
  box-shadow: 0px 3px 6px ${theme.shadowColor};
`;
const Divider = styled(View)`
  width: 0.5px;
  background-color: ${theme.backdropColor};
  opacity: 0.4;
  height: ${scaleDpTheme(30)};
  margin-left: ${scaleDpTheme(5)};
  margin-right: ${scaleDpTheme(10)};
`;
