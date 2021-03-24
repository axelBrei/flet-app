import React from 'react';
import styled from 'styled-components';
import {CustomImage} from 'components/ui/Image';
import {AppText} from 'components/ui/AppText';
import {Container} from 'components/ui/Container';
import {useSelector} from 'react-redux';
import {selectUserData} from 'redux-store/slices/loginSlice';
import {scaleDpTheme} from 'helpers/responsiveHelper';
import {useUserData} from 'components/Hooks/useUserData';
import {theme} from 'constants/theme';

export const UserProfileHeader = () => {
  const {name, lastName, picture} = useUserData();
  return (
    <ComponentContainer dir="row">
      <RoundImage source={picture} defaultIcon="account" />
      <Container dir="column" width="100%">
        <UserName>
          {name} {lastName}
        </UserName>
        <Disclaimer>Gracias por elegirnos</Disclaimer>
      </Container>
    </ComponentContainer>
  );
};

const ComponentContainer = styled(Container)`
  padding: 30px 25px;
`;

const RoundImage = styled(CustomImage)`
  height: 65px;
  width: 65px;
  border-radius: 35px;
  margin-right: 15px;
`;

const UserName = styled(AppText)`
  color: ${theme.white};
  font-size: 24px;
  font-weight: bold;
`;

const Disclaimer = styled(AppText)`
  font-size: 14px;
  color: ${theme.white};
`;
