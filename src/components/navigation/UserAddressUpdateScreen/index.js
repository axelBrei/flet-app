import React, {useCallback, useEffect} from 'react';
import Screen from 'components/ui/Screen';
import {Title} from 'components/ui/Title';
import {CommonList} from 'components/ui/CommonList';
import styled, {css} from 'styled-components';
import {useDispatch, useSelector} from 'react-redux';
import {useWindowDimension} from 'components/Hooks/useWindowsDimensions';
import {
  fetchUserAddresses,
  selectIsLoadingNewAddress,
  selectIsLoadingUserAddress,
  selectNewAddressError,
  selectUserAddressError,
  selectUserAddresses,
  deleteAddress,
  submitNewAddres,
} from 'redux-store/slices/personalData/addressSlice';
import {MainButton} from 'components/ui/MainButton';
import {AddressItem} from 'components/navigation/UserAddressUpdateScreen/AddressItem';
import {Loader} from 'components/ui/Loader';
import {useModal} from 'components/Hooks/useModal';
import GeolocationModal from 'components/MobileFullScreenModals/GeolocationModalScreen';
import {CenteredRow, Row} from 'components/ui/Row';
import {TextLink} from 'components/ui/TextLink';
import {theme} from 'constants/theme';
import {Icon} from 'components/ui/Icon';

export default ({navigation}) => {
  const dispatch = useDispatch();
  const {isMobile} = useWindowDimension();
  const isLoading = useSelector(selectIsLoadingUserAddress);
  const error = useSelector(selectUserAddressError);
  const addresses = useSelector(selectUserAddresses);
  const isLoadingNewAddres = useSelector(selectIsLoadingNewAddress);
  const newAddressError = useSelector(selectNewAddressError);

  useEffect(() => {
    dispatch(fetchUserAddresses());
  }, []);

  const onSelectAddress = useCallback((_, {id, ...adddress}, comments) => {
    dispatch(submitNewAddres(adddress));
  }, []);

  const {Modal, open} = useModal(
    GeolocationModal,
    {
      allowRecents: true,
      allowFavorites: false,
      initialOpen: {
        Recientes: true,
      },
    },
    {fullscreen: true, cancellable: true},
  );

  const onPressAddAddress = useCallback(() => {
    open({allowComments: true});
  }, [open]);

  const onPressDelete = useCallback(
    ({id}) =>
      () => {
        dispatch(deleteAddress(id));
      },
    [],
  );

  const loading = isLoading || isLoadingNewAddres;
  return (
    <ScreenComponent>
      {!isMobile && (
        <TitleContainer>
          <Title textAlign="left">Mis direcciones</Title>
          <TextLink onPress={onPressAddAddress} color={theme.primaryColor}>
            Agregar dirección
          </TextLink>
        </TitleContainer>
      )}
      <CommonList
        data={loading ? [] : addresses}
        contentContainerStyle={(loading || addresses.length === 0) && {flex: 1}}
        ListEmptyComponent={
          addresses.length === 0 ? (
            <EmptyListContainer>
              <Icon name="playlist-remove" size={60} color={theme.fontColor} />
              <Title>No tenes direcciones cargadas todavía</Title>
            </EmptyListContainer>
          ) : (
            <FullScreenLoader
              size="large"
              loading
              message="Cargando direcciones"
              children={<></>}
            />
          )
        }
        renderItem={({item, index}) => (
          <AddressItem onPressDelete={onPressDelete(item)} {...item} />
        )}
      />
      {isMobile && (
        <MainButton
          disabled={isLoading}
          loading={isLoadingNewAddres}
          onPress={onPressAddAddress}>
          Agregar dirección
        </MainButton>
      )}
      <Modal allowComments onPressItem={onSelectAddress} />
    </ScreenComponent>
  );
};

const ScreenComponent = styled(Screen)`
  padding: ${({theme}) => (theme.isMobile ? 20 : 50)}px 20px 10px;
`;

const EmptyListContainer = styled.View`
  flex: 1;
  align-items: center;
  padding: 40px 0;
  ${props =>
    !props.theme.isMobile &&
    css`
      max-width: 550px;
    `}
`;

const FullScreenLoader = styled(Loader)`
  align-self: center;
`;

const TitleContainer = styled(Row)`
  ${props =>
    !props.theme.isMobile &&
    css`
      max-width: 550px;
    `}
`;
