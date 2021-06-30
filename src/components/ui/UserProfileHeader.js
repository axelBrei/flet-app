import React from 'react';
import styled, {css} from 'styled-components';
import {CustomImage} from 'components/ui/Image';
import {AppText} from 'components/ui/AppText';
import {useSelector} from 'react-redux';
import {selectUserData} from 'redux-store/slices/loginSlice';
import {scaleDpTheme} from 'helpers/responsiveHelper';
import {useUserData} from 'components/Hooks/useUserData';
import {theme} from 'constants/theme';

export const UserProfileHeader = ({style}) => {
  const {name, lastName, picture} = useUserData();
  return (
    <ComponentContainer style={style}>
      <RoundImage source={picture} defaultIcon="account" />
      <Container>
        <UserName>
          {name} {lastName}
        </UserName>
        <Disclaimer>Gracias por elegirnos</Disclaimer>
      </Container>
    </ComponentContainer>
  );
};

const ComponentContainer = styled.View`
  padding: 30px 25px;
  flex-direction: row;
  background-color: ${theme.primaryColor};
`;

const Container = styled.View``;

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

  ${props =>
    !props.theme.isMobile &&
    css`
      font-size: 20px;
    `};
`;

const Disclaimer = styled(AppText)`
  font-size: 14px;
  color: ${theme.white};
`;
