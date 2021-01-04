import React from 'react';
import styled from 'styled-components';
import {Image} from 'react-native';
import {AppText} from 'components/ui/AppText';
import {Container} from 'components/ui/Container';
import {useSelector} from 'react-redux';
import {selectUserData} from 'redux-store/slices/loginSlice';
import {scaleDpTheme} from 'helpers/responsiveHelper';

export const UserProfileHeader = () => {
  const {name, picture} = useSelector(selectUserData) || {};
  return (
    <ComponentContainer
      dir="row"
      justifyContent="center"
      alignItems="center"
      width="100%">
      <RoundImage source={{uri: picture?.medium}} />
      <Container dir="column" width="100%">
        <AppText>{name?.first}</AppText>
        <AppText>{name?.last}</AppText>
      </Container>
    </ComponentContainer>
  );
};

const ComponentContainer = styled(Container)`
  margin-top: ${scaleDpTheme(5)};
  margin-left: ${scaleDpTheme(30)};
`;

const RoundImage = styled(Image)`
  height: ${scaleDpTheme(50)};
  width: ${scaleDpTheme(50)};
  border-radius: ${scaleDpTheme(25)};
  margin-right: ${scaleDpTheme(10)};
  background-color: red;
`;
