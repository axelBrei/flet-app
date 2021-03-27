import React from 'react';
import styled from 'styled-components';
import {AppText} from 'components/ui/AppText';
import {theme} from 'constants/theme';
import {Icon} from 'components/ui/Icon';

export const MenuItem = ({name, ...props}) => {
  return (
    <Container>
      <AppText padding="0 10" fontSize={16}>
        {name}
      </AppText>
      <Icon name="chevron-right" size={20} color={theme.fontColor} />
    </Container>
  );
};

const Container = styled.TouchableOpacity`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 15px 10px;
  width: 100%;
`;
