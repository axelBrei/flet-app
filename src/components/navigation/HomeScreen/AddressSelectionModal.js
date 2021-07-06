import React, {useCallback, useState} from 'react';
import {FullScreenModalContainer} from 'components/MobileFullScreenModals/FullScreenModalContainer';
import InputField from 'components/ui/InputField';
import {Dropdown} from 'components/ui/Dropdown';
import {useDispatch, useSelector} from 'react-redux';
import {selectUserAddresses} from 'redux-store/slices/personalData/addressSlice';
import {
  addLastAddresses,
  selectLastAddresses,
} from 'redux-store/slices/geolocationSlice';
import {useDebouncedGeocoding} from 'components/Hooks/useDebouncedGeocoding';
import {useModalContext} from 'components/Hooks/useModal';
import {SectionList} from 'react-native';
import {CenteredRow, Row} from 'components/ui/Row';
import {Icon} from 'components/ui/Icon';
import {Title} from 'components/ui/Title';
import {MainButton} from 'components/ui/MainButton';
import {LayoutAnimation, TouchableOpacity, Keyboard} from 'react-native';
import styled from 'styled-components';
import {AppText} from 'components/ui/AppText';
import {IconButton} from 'components/ui/IconButton';

export const AddressSelectionModal = ({field, onPressItem}) => {
  const dispatch = useDispatch();
  const {closeModal} = useModalContext();
  const favoriteAddress = useSelector(selectUserAddresses)?.slice(0, 3);
  const recentAddresses = useSelector(selectLastAddresses);

  const [addressValue, setAddressValue] = useState('');
  const [comments, setComments] = useState('');
  const [selectedAddress, setSelectedAddress] = useState(null);
  const {loading, error, results} = useDebouncedGeocoding(addressValue);

  const list = [
    {title: 'Resultados', icon: 'magnify', data: results},
    {
      title: 'Mis direcciones',
      icon: 'star-outline',
      data: favoriteAddress || [],
    },
    {
      title: 'Recientes',
      icon: 'clock-outline',
      data: recentAddresses || [],
    },
  ];

  const onPressConfirm = useCallback(() => {
    onPressItem(field, {
      ...selectedAddress,
      comments: comments || selectedAddress.comments,
    });
    closeModal?.();
  }, [field, comments, selectedAddress, onPressItem, closeModal]);

  const _onPressItem = useCallback(
    item => () => {
      LayoutAnimation.configureNext(LayoutAnimation.Presets.spring);
      dispatch(addLastAddresses(item));
      setAddressValue(item.name);
      setSelectedAddress(item);
    },
    [field],
  );

  return (
    <TouchableOpacity
      onPress={Keyboard.dismiss}
      disabled={!(selectedAddress && addressValue.length > 0)}
      activeOpacity={1}>
      <FullScreenModalContainer title="Ingresá una dirección">
        <InputField
          onClear={() => setSelectedAddress(null)}
          label="Dirección"
          clearable
          loading={loading}
          error={error && 'No se encontró la dirección'}
          value={addressValue}
          onChangeText={setAddressValue}
        />
        {selectedAddress && addressValue.length > 0 ? (
          <>
            <InputField
              label="Departamento/Piso"
              value={comments}
              onChangeText={setComments}
            />
            <ButtonContainer>
              <MainButton label="Confirmar" onPress={onPressConfirm} />
            </ButtonContainer>
          </>
        ) : (
          <SectionList
            sections={list}
            renderSectionHeader={({section: {data, icon, title}}) =>
              data.length > 0 && (
                <Row>
                  <CenteredRow
                    style={{
                      justifyContent: 'flex-start',
                      alignItems: 'center',
                      marginTop: 10,
                    }}>
                    <Icon name={icon} size={24} />
                    <Title style={{marginBottom: 0, marginLeft: 5}}>
                      {title}
                    </Title>
                  </CenteredRow>
                  <IconButton icon={'chevron-down'} size={20} />
                </Row>
              )
            }
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{width: '100%'}}
            style={{flex: 1}}
            keyExtractor={(_, i) => i.toString()}
            renderItem={({item}) => (
              <PlaceItemContainer onPress={_onPressItem(item)}>
                <AppText fontSize={10} color={'gray'}>
                  {item?.type}
                </AppText>
                <AppText numberOfLines={1} ellipsizeMode="tail">
                  {item.name}
                </AppText>
              </PlaceItemContainer>
            )}
          />
        )}
      </FullScreenModalContainer>
    </TouchableOpacity>
  );
};

const ButtonContainer = styled.View`
  flex: 1;
  justify-content: flex-end;
  width: 100%;
`;

const PlaceItemContainer = styled.TouchableOpacity`
  width: 100%;
  flex: 1;
  padding: 6px 20px;
`;
