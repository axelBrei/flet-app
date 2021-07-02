import React, {useCallback} from 'react';
import {routes} from 'constants/config/routes';
import styled, {css} from 'styled-components';
import Screen from 'components/ui/Screen';
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
import {ChangePasswordModal} from 'components/navigation/ProfileScreen/ModalContents/ChangePasswordModal';
import {MapPreferencesModalContent} from 'components/navigation/ProfileScreen/ModalContents/MapPreferencesModalContent';
import {useDispatch, useSelector} from 'react-redux';
import {fetchPhonesToRegisterCourrier} from 'redux-store/slices/loginSlice';
import {selectIsLoadingPersonalDataTelephones} from 'redux-store/slices/personalData/telephonesSlice';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

const data = [
  {
    name: 'Datos de contacto',
    data: [
      {
        name: 'Datos personales',
        modal: PersonalDataModal,
      },
      {
        name: 'Cambiar contraseña',
        modal: ChangePasswordModal,
      },
      {
        name: 'Teléfonos',
        modal: TelephoneModal,
      },
      // {
      //   name: 'Mis vehiculos',
      //   redirectTo: routes.profileVehicleStack,
      //   driverOnly: true,
      // },
      {
        name: 'Mis direcciones',
        redirectTo: routes.userAddressUpdateScreen,
      },
    ],
  },
  {
    name: 'Navegacion',
    driverOnly: true,
    data: [
      {name: 'Mapa predeterminado', modal: MapPreferencesModalContent},
      // {name: 'Horario predeterminado', redirectTo: null},
    ],
  },
];

export default () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const {isMobile} = useWindowDimension();
  const {isDriver} = useUserData();
  const isLoading = useSelector(selectIsLoadingPersonalDataTelephones);

  const onPressItem = useCallback(
    ({redirectTo}) => redirectTo && navigation.navigate(redirectTo),
    [navigation],
  );

  const onPressDriveWitUs = useCallback(async () => {
    await dispatch(fetchPhonesToRegisterCourrier());
    navigation.navigate(routes.registerStack, {
      screen: routes.registerPersonalData,
      driver: true,
    });
  }, [navigation]);

  const renderItem = item => <MenuItem {...item} onPressItem={onPressItem} />;
  const renderHeader = name => <SectionHeader>{name}</SectionHeader>;

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
    <ScreenComponent scrollable notchColor={theme.primaryColor}>
      <CenterContainer>
        <UserHeader />
        {!isDriver && (
          <MainButton
            onPress={onPressDriveWitUs}
            label="Maneja con nosotros"
            loading={isLoading}
            inverted
          />
        )}
      </CenterContainer>
      <ContentContainer>
        {filteredList.map((item, index) => (
          <React.Fragment key={index.toString()}>
            {renderHeader(item.name)}
            {item.data.map((subItem, subIndex) => (
              <React.Fragment key={subIndex.toString()}>
                {renderItem(subItem)}
                <SeparatorComponent />
              </React.Fragment>
            ))}
          </React.Fragment>
        ))}
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

const SectionHeader = styled(Title)`
  padding-top: 15px;
`;

const SeparatorComponent = styled.View`
  height: 1px;
  background-color: ${theme.lightGray};
  width: 100%;
`;
