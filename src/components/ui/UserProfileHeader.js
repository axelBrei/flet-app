import React from 'react';
import styled from 'styled-components';
import {CustomImage} from 'components/ui/Image';
import {AppText} from 'components/ui/AppText';
import {Container} from 'components/ui/Container';
import {useSelector} from 'react-redux';
import {selectUserData} from 'redux-store/slices/loginSlice';
import {scaleDpTheme} from 'helpers/responsiveHelper';
import {useUserData} from 'components/Hooks/useUserData';

export const UserProfileHeader = () => {
  const {name, lastName, picture} = useUserData();
  return (
    <ComponentContainer
      dir="row"
      justifyContent="center"
      alignItems="center"
      width="100%">
      <RoundImage source={picture} defaultIcon="account" />
      <Container dir="column" width="100%">
        <AppText>{name}</AppText>
        <AppText>{lastName}</AppText>
      </Container>
    </ComponentContainer>
  );
};

const ComponentContainer = styled(Container)`
  margin-top: ${scaleDpTheme(5)};
  margin-left: ${scaleDpTheme(30)};
`;

const RoundImage = styled(CustomImage)`
  height: ${scaleDpTheme(50)};
  width: ${scaleDpTheme(50)};
  border-radius: ${scaleDpTheme(25)};
  margin-right: ${scaleDpTheme(10)};
`;
