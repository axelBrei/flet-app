import React, {useCallback, useMemo, useState} from 'react';
import {routes} from 'constants/config/routes';
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
import TelephoneModal from 'components/navigation/ProfileScreen/ModalContents/TelephoneModal';
import {PersonalDataModal} from 'components/navigation/ProfileScreen/ModalContents/PersonalDataModal';
import {useNavigation} from '@react-navigation/native';

const data = [
  {
    name: 'Datos de contacto',
    data: [
      {
        name: 'Datos personales',
        modal: PersonalDataModal,
      },
      {
        name: 'Teléfonos',
        modal: TelephoneModal,
      },
      {
        name: 'Mis vehiculos',
        redirectTo: null,
        driverOnly: true,
      },
      {
        name: 'Mis direcciones',
        redirectTo: routes.userAddressUpdateScreen,
      },
    ],
  },
  {
    name: 'Facturación',
    driverOnly: true,
    data: [
      {name: 'Mi balance', redirectTo: null},
      // {name: 'Horario predeterminado', redirectTo: null},
    ],
  },
  {
    name: 'Navegacion',
    driverOnly: true,
    data: [
      {name: 'Mapa predeterminado', redirectTo: null},
      // {name: 'Horario predeterminado', redirectTo: null},
    ],
  },
];

export default () => {
  const navigation = useNavigation();
  const {isMobile} = useWindowDimension();
  const {isDriver} = useUserData();

  const onPressItem = useCallback(
    ({redirectTo}) => redirectTo && navigation.navigate(redirectTo),
    [navigation],
  );

  const renderItem = ({item}) => (
    <MenuItem {...item} onPressItem={onPressItem} />
  );
  const renderHeader = ({section}) => (
    <SectionHeader>{section.name}</SectionHeader>
  );

  const filteredList = data.reduce(
    (acc, curr) => [
      ...acc,
      ...(!isDriver && curr.driverOnly
        ? []
        : [
            {
              ...curr,
              data: curr.data.filter(i => isDriver || !i.driverOnly),
            },
          ]),
    ],
    [],
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
          sections={filteredList}
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

  ${props =>
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
  ${props =>
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
