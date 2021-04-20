import React, {useState, useCallback, useRef, useEffect} from 'react';
import {SectionList} from 'react-native';
import InputField from 'components/ui/InputField';
import {useDebouncedGeocoding} from 'components/Hooks/useDebouncedGeocoding';
import {PlaceItem} from 'components/MobileFullScreenModals/GeolocationModalScreen/PlaceItem';
import {FullScreenModalContainer} from 'components/MobileFullScreenModals/FullScreenModalContainer';
import {useModalContext} from 'components/Hooks/useModal';
import {Title} from 'components/ui/Title';
import {useDispatch, useSelector} from 'react-redux';
import {selectUserAddresses} from 'redux-store/slices/personalData/addressSlice';
import {CenteredRow} from 'components/ui/Row';
import {Icon} from 'components/ui/Icon';
import {
  addLastAddresses,
  selectLastAddresses,
} from 'redux-store/slices/geolocationSlice';

const Modal = ({
  field,
  values,
  onPressItem,
  allowComments,
  allowRecent,
  allowFavorites,
}) => {
  const dispatch = useDispatch();
  const {closeModal} = useModalContext();
  const inputRef = useRef(null);
  const [inputValue, setInputValue] = useState('');
  const [comments, setComments] = useState('');
  const {loading, error, results} = useDebouncedGeocoding(inputValue);
  const favoriteAddress = useSelector(selectUserAddresses)?.slice(0, 3);
  const recentAddresses = useSelector(selectLastAddresses);

  useEffect(() => {
    inputRef.current?.focus?.();
  }, [inputRef]);

  const _onPressItem = useCallback(
    item => () => {
      onPressItem(field, item, comments);
      dispatch(addLastAddresses(item));
      closeModal();
    },
    [field, comments],
  );

  const list = [
    ...(allowFavorites
      ? [
          {
            title: 'Mis direcciones',
            icon: 'star-outline',
            data: favoriteAddress || [],
          },
        ]
      : []),
    // ...(allowRecent ?
    // [
    {
      title: 'Recientes',
      icon: 'clock-outline',
      data: recentAddresses || [],
    },
    // ],
    // : [])
    {title: 'Resultados', icon: 'magnify', data: results},
  ];

  return (
    <FullScreenModalContainer title="Ingresá una direccion">
      {allowComments && (
        <InputField
          onChangeText={setComments}
          value={comments}
          label="Descripcion de la dirección"
        />
      )}
      <InputField
        {...(!allowComments && {externalRef: inputRef})}
        label="Direccion"
        icon="map-marker"
        onChangeText={setInputValue}
        value={values?.[field]?.name || inputValue}
        loading={loading}
        clearable
        error={error}
      />
      <SectionList
        sections={list}
        renderSectionHeader={({section: {data, icon, title}}) =>
          data.length > 0 && (
            <CenteredRow
              style={{justifyContent: 'flex-start', alignItems: 'center'}}>
              <Icon name={icon} size={24} />
              <Title style={{marginBottom: 0, marginLeft: 5}}>{title}</Title>
            </CenteredRow>
          )
        }
        contentContainerStyle={{width: '100%'}}
        style={{flex: 1}}
        keyExtractor={(_, i) => i.toString()}
        renderItem={({item}) => (
          <PlaceItem onPress={_onPressItem(item)} {...item} />
        )}
      />
    </FullScreenModalContainer>
  );
};

Modal.defaultProps = {
  field: null,
  values: null,
  onPressItem: () => {},
  allowComments: false,
  allowFavorites: true,
};

export default Modal;
