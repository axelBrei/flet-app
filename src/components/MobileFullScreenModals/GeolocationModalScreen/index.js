import React, {useState, useCallback, useRef, useEffect} from 'react';
import styled from 'styled-components';
import {FlatList, View, Platform} from 'react-native';
import {useRouteParams} from 'components/Hooks/useRouteParams';
import InputField from 'components/ui/InputField';
import {useDebouncedGeocoding} from 'components/Hooks/useDebouncedGeocoding';
import {AppText} from 'components/ui/AppText';
import {PlaceItem} from 'components/MobileFullScreenModals/GeolocationModalScreen/PlaceItem';
import {Title} from 'components/ui/Title';
import {Icon} from 'components/ui/Icon';
import {theme} from 'constants/theme';
import {FullScreenModalContainer} from 'components/MobileFullScreenModals/FullScreenModalContainer';
import {useModalContext} from 'components/Hooks/useModal';

export default ({field, values, onPressItem}) => {
  const {closeModal} = useModalContext();
  const inputRef = useRef(null);
  const [inputValue, setInputValue] = useState('');
  const {loading, error, results} = useDebouncedGeocoding(inputValue);

  useEffect(() => {
    inputRef.current?.focus?.();
  }, [inputRef]);

  const _onPressItem = useCallback(
    (item) => () => {
      if (field) {
        onPressItem(field, item);
        closeModal();
      }
    },
    [field],
  );

  return (
    <FullScreenModalContainer title="Ingresá una direccion">
      <InputField
        externalRef={inputRef}
        label="Direccion"
        icon="map-marker"
        onChangeText={setInputValue}
        value={values?.[field]?.name || inputValue}
        loading={loading}
        error={error}
      />
      <FlatList
        data={results}
        contentContainerStyle={{width: '100%'}}
        keyExtractor={(_, i) => i.toString()}
        renderItem={({item}) => (
          <PlaceItem onPress={_onPressItem(item)} {...item} />
        )}
      />
    </FullScreenModalContainer>
  );
};
