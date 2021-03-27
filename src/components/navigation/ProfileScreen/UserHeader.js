import React from 'react';
import styled, {css} from 'styled-components';
import {AppText} from 'components/ui/AppText';
import {CustomImage} from 'components/ui/Image';
import {Platform} from 'react-native-web';
import {useUserData} from 'components/Hooks/useUserData';
import {Title} from 'components/ui/Title';
import {theme} from 'constants/theme';

export const UserHeader = () => {
  const {name, lastName, email, picture} = useUserData();
  return (
    <Container>
      <Image defaultIcon="account" iconSize={60} source={picture} prefetch />
      <Title color={theme.white}>
        {name} {lastName}
      </Title>
      <AppText color={theme.white}>{email}</AppText>
    </Container>
  );
};

const Container = styled.View`
  width: 100%;
  align-items: center;
  background-color: ${theme.primaryColor};
  padding: 20px;
  ${(props) =>
    Platform.OS === 'web' &&
    !props.theme.isMobile &&
    css`
      border-radius: 20px;
      margin: 10px;
      max-width: 414px;
      margin-top: 45px;
      margin-bottom: 20px;
    `}
`;

const Image = styled(CustomImage)`
  height: 130px;
  width: 130px;
  border-radius: 75px;
  margin: 10px 0 20px;
`;
