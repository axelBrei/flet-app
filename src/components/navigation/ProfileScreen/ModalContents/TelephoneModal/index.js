import React, {useCallback, useEffect, useState} from 'react';
import styled from 'styled-components';
import {CommonList} from 'components/ui/CommonList';
import {MainButton} from 'components/ui/MainButton';
import {useDispatch, useSelector} from 'react-redux';
import {
  fetchDeleteTelephone,
  fetchTelephones,
  selectDeletingTelephoneId,
  selectIsLoadingPersonalDataTelephones,
  selectPersonalDataTelephonesError,
  selectUserTelephons,
} from 'redux-store/slices/personalData/telephonesSlice';
import {Loader} from 'components/ui/Loader';
import {TelephoneItem} from 'components/navigation/ProfileScreen/ModalContents/TelephoneModal/TelephoneItem';
import {Title} from 'components/ui/Title';
import {NewPhoneForm} from 'components/navigation/ProfileScreen/ModalContents/TelephoneModal/NewPhoneForm';

export default ({closeModal}) => {
  const dispatch = useDispatch();
  const isLoading = useSelector(selectIsLoadingPersonalDataTelephones);
  const deletingPhoneId = useSelector(selectDeletingTelephoneId);
  const error = useSelector(selectPersonalDataTelephonesError);
  const telephones = useSelector(selectUserTelephons);
  const [newPhoneMode, setNewPhoneMode] = useState(false);

  useEffect(() => {
    dispatch(fetchTelephones());
  }, []);

  const onPressDelete = useCallback(
    ({id}) => {
      dispatch(fetchDeleteTelephone(id));
    },
    [dispatch],
  );

  const renderItem = useCallback(
    ({item}) => (
      <TelephoneItem
        loading={deletingPhoneId === item.id}
        onPress={() => onPressDelete(item)}
        {...item}
      />
    ),
    [deletingPhoneId],
  );

  return (
    <Container newPhoneMode={newPhoneMode}>
      <Title width="100%" textAlign="left">
        Mis Teléfonos
      </Title>
      {newPhoneMode ? (
        <NewPhoneForm onSubmit={() => setNewPhoneMode(false)} />
      ) : (
        <Loader loading={isLoading}>
          <List data={telephones} renderItem={renderItem} />
          <MainButton onPress={() => setNewPhoneMode(true)}>
            Nuevo telefono
          </MainButton>
        </Loader>
      )}
    </Container>
  );
};

const Container = styled.View`
  background-color: white;
  align-items: center;
  width: 100%;
  height: ${({newPhoneMode}) => (newPhoneMode ? 300 : 450)}px;
  padding: 20px;
  border-radius: 10px;
`;

const List = styled(CommonList)`
  width: 100%;
  flex: 1;
`;
