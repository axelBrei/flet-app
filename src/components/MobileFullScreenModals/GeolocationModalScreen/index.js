import React, {useState, useCallback, useEffect} from 'react';
import {SectionList} from 'react-native';
import InputField from 'components/ui/InputField';
import {useDebouncedGeocoding} from 'components/Hooks/useDebouncedGeocoding';
import {PlaceItem} from 'components/MobileFullScreenModals/GeolocationModalScreen/PlaceItem';
import {FullScreenModalContainer} from 'components/MobileFullScreenModals/FullScreenModalContainer';
import {useModalContext} from 'components/Hooks/useModal';
import {useDispatch, useSelector} from 'react-redux';
import {selectUserAddresses} from 'redux-store/slices/personalData/addressSlice';
import {
  addLastAddresses,
  selectLastAddresses,
} from 'redux-store/slices/geolocationSlice';
import styled, {css} from 'styled-components';
import {MainButton} from 'components/ui/MainButton';
import {LayoutAnimation} from 'react-native-web';
import {PlaceItemHeader} from 'components/MobileFullScreenModals/GeolocationModalScreen/PlaceItemHeader';
import {useWindowDimension} from 'components/Hooks/useWindowsDimensions';

const Modal = ({
  field,
  values,
  onPressItem,
  allowComments,
  commentsText,
  allowRecent,
  inverted,
  allowFavorites,
  initialOpen,
}) => {
  const dispatch = useDispatch();
  const {isMobile} = useWindowDimension();
  const {closeModal} = useModalContext();
  const [addressValue, setAddressValue] = useState('');
  const [type, setType] = useState('');
  const [comments, setComments] = useState('');
  const [selectedAddress, setSelectedAddress] = useState(null);
  const favoriteAddress = useSelector(selectUserAddresses);
  const recentAddresses = useSelector(selectLastAddresses);
  const [expandedItems, setExpandedItems] = useState({});

  const {loading, error, results} = useDebouncedGeocoding(
    addressValue,
    !selectedAddress,
    list => {
      if (
        list?.length > 0 &&
        (expandedItems['Mis direcciones'] || expandedItems.Recientes)
      ) {
        setExpandedItems({
          ...expandedItems,
          'Mis direcciones': false,
          Recientes: false,
        });
      }
    },
  );

  useEffect(() => {
    setExpandedItems({
      'Mis direcciones': allowFavorites && results.length === 0,
      Resultados: true,
      Recientes: !allowFavorites && results.length === 0,
      ...initialOpen,
    });
  }, []);

  let list = [
    {title: 'Resultados', icon: 'magnify', data: results},
    ...(allowFavorites
      ? [
          {
            title: 'Mis direcciones',
            icon: 'star-outline',
            data: favoriteAddress || [],
          },
        ]
      : []),
    ...(allowRecent
      ? [
          {
            title: 'Recientes',
            icon: 'clock-outline',
            data: recentAddresses || [],
          },
        ]
      : []),
  ];

  const onPressExpand = useCallback(
    title => {
      setExpandedItems({
        ...expandedItems,
        [title]: !expandedItems[title],
      });
    },
    [expandedItems],
  );

  const onPressConfirm = useCallback(() => {
    onPressItem(field, {
      ...selectedAddress,
      comments: comments || selectedAddress.comments,
      type,
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
    <FullScreenModalContainer title="Ingresá una direccion">
      <InputsContainer inverted={inverted}>
        {allowComments && (
          <InputField
            onChangeText={setType}
            value={type}
            label={commentsText || 'Nombre de la dirección'}
          />
        )}
        <InputField
          label="Direccion"
          icon="map-marker"
          onClear={() => {
            setSelectedAddress(null);
            setAddressValue('');
          }}
          onChangeText={setAddressValue}
          value={values?.[field]?.name || addressValue}
          loading={loading}
          clearable
          error={error}
        />
      </InputsContainer>
      {selectedAddress && addressValue.length > 0 ? (
        <>
          <InputField
            label="Departamento, piso y/o referencia"
            value={selectedAddress?.comments || comments}
            onChangeText={setComments}
          />
          <ButtonContainer>
            <MainButton
              style={!isMobile && {width: '85%'}}
              label="Confirmar"
              onPress={onPressConfirm}
            />
          </ButtonContainer>
        </>
      ) : (
        <SectionList
          sections={list}
          renderSectionHeader={({section}) =>
            section?.data?.length > 0 && (
              <PlaceItemHeader
                expanded={expandedItems[section.title]}
                onPress={() => onPressExpand(section.title)}
                {...section}
              />
            )
          }
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{width: '100%'}}
          style={{flex: 1}}
          keyExtractor={(_, i) => i.toString()}
          renderItem={({item, section}) => (
            <PlaceItem
              expanded={expandedItems[section.title]}
              onPress={_onPressItem(item)}
              {...item}
            />
          )}
        />
      )}
    </FullScreenModalContainer>
  );
};

Modal.defaultProps = {
  field: null,
  values: null,
  onPressItem: () => {},
  allowComments: false,
  allowFavorites: true,
  allowRecent: true,
  inverted: false,
  initialOpen: {},
};

export default Modal;

const InputsContainer = styled.View`
  width: 100%;
  flex-direction: ${({inverted}) => (inverted ? 'column-reverse' : 'column')};
`;

const ButtonContainer = styled.View`
  flex: 1;
  display: flex;
  justify-content: flex-end;
  width: 100%;
  ${({theme}) =>
    !theme.isMObile &&
    css`
      align-items: center;
    `}
`;
