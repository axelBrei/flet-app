import React from 'react';
import styled, {css} from 'styled-components';
import InputField from 'components/ui/InputField';
import {theme} from 'constants/theme';
import {IconButton} from 'components/ui/IconButton';
import {Platform} from 'react-native';
import {AppText} from 'components/ui/AppText';
import {Loader} from 'components/ui/Loader';

export const TelephoneItem = ({
  onPress,
  areaCode,
  countryCode,
  number,
  loading,
}) => {
  return (
    <Container>
      <NumberContainer>
        <AppText label="Cod. país">
          (+{countryCode?.replace('0', '')}) {areaCode}
          {number}
        </AppText>
      </NumberContainer>
      <ButtonLoader size="small" loading={loading} unmount>
        <IconButton
          icon="delete"
          size={20}
          onPress={onPress}
          inverted
          borderColor={theme.error}
          iconColor={theme.error}
        />
      </ButtonLoader>
    </Container>
  );
};

const Container = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin: 10px;
`;

const NumberContainer = styled.View`
  flex: 1;
  flex-direction: row;
  padding-right: 10px;
`;

const ButtonLoader = styled(Loader)`
  align-items: flex-end;
  height: 40px;
  margin-right: 10px;
`;
