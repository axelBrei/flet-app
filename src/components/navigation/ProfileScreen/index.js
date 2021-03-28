import React from 'react';
import styled, {css} from 'styled-components';
import {Screen} from 'components/ui/Screen';
import {LogoutButton} from 'components/ui/LogoutButton';
import {useWindowDimension} from 'components/Hooks/useWindowsDimensions';
import {Platform} from 'react-native';
import {useUserData} from 'components/Hooks/useUserData';
import {MainButton} from 'components/ui/MainButton';
import {UserHeader} from 'components/navigation/ProfileScreen/UserHeader';
import {MenuItem} from 'components/navigation/ProfileScreen/MenuItem';
import {Title} from 'components/ui/Title';
import {theme} from 'constants/theme';

const data = [
  {
    name: 'Datos de contacto',
    data: [
      {
        name: 'Datos personales',
        redirectTo: null,
      },
      {
        name: 'Teléfonos',
        redirectTo: null,
      },
      {
        name: 'Mis vehiculos',
        redirectTo: null,
      },
      {
        name: 'Mis direcciones',
        redirectTo: null,
      },
    ],
  },
  {
    name: 'Facturación',
    data: [
      {name: 'Mi balance', redirectTo: null},
      // {name: 'Horario predeterminado', redirectTo: null},
    ],
  },
  {
    name: 'Navegacion',
    data: [
      {name: 'Mapa predeterminado', redirectTo: null},
      // {name: 'Horario predeterminado', redirectTo: null},
    ],
  },
];

export default () => {
  const {isMobile} = useWindowDimension();
  const {isDriver} = useUserData();

  const renderItem = ({item, separators}) => <MenuItem {...item} />;
  const renderHeader = ({section}) => (
    <SectionHeader>{section.name}</SectionHeader>
  );

  return (
    <ScreenComponent scrollable>
      <CenterContainer>
        <UserHeader />
        {!isDriver && <MainButton label="Maneja con nosotros" inverted />}
      </CenterContainer>
      <ContentContainer>
        <SectionList
          keyExtractor={(_, i) => i.toString()}
          sections={data}
          renderItem={renderItem}
          renderSectionHeader={renderHeader}
          ItemSeparatorComponent={SeparatorComponent}
          stickySectionHeadersEnabled
        />
      </ContentContainer>
      {isMobile && <LogoutButton />}
    </ScreenComponent>
  );
};

const ScreenComponent = styled(Screen)`
  display: flex;
  height: 100%;
`;

const CenterContainer = styled.View`
  align-items: center;
  justify-content: center;
  width: 100%;
  align-self: flex-start;

  ${(props) =>
    Platform.OS === 'web' &&
    !props.theme.isMobile &&
    css`
      max-width: 50%;
    `}
`;

const ContentContainer = styled.View`
  padding: 20px;
`;

const SectionList = styled.SectionList`
  ${(props) =>
    Platform.OS === 'web' &&
    !props.theme.isMobile &&
    css`
      max-width: 50%;
    `}
`;

const SectionHeader = styled(Title)`
  padding-top: 15px;
`;

const SeparatorComponent = styled.View`
  height: 1px;
  background-color: ${theme.lightGray};
  width: 100%;
`;
