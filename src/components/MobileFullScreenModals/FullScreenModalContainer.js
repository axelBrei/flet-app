import styled from 'styled-components';
import {Platform, View} from 'react-native';
import {Title} from 'components/ui/Title';
import {Icon} from 'components/ui/Icon';
import {theme} from 'constants/theme';
import React from 'react';
import {useModalContext} from 'components/Hooks/useModal';

export const FullScreenModalContainer = ({title, children}) => {
  const {closeModal} = useModalContext() || {};
  return (
    <Screen>
      <TitleContainer>
        <Title>{title}</Title>
        <Icon
          name="close"
          onPress={closeModal || (() => {})}
          size={30}
          color={theme.fontColor}
        />
      </TitleContainer>
      {children}
    </Screen>
  );
};

const Screen = styled.View`
  min-width: ${(props) =>
    Platform.select({
      web: () =>
        props.theme.isMobile ? `${props.theme.screenWidth}px` : '550px',
      native: () => '150px',
    })()};
  width: ${(props) => (props.theme.isMobile ? '100%' : '450px')};
  height: ${(props) =>
    Platform.select({
      native: '100%',
      web: (props.theme.isMobile ? props.theme.screenHeight - 104 : 550) + 'px',
    })};
  padding: 20px;
`;

const TitleContainer = styled(View)`
  flex-direction: row;
  width: 100%;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
`;
