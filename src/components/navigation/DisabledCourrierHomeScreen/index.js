import React, {useEffect} from 'react';
import {Screen} from 'components/ui/Screen';
import {Title} from 'components/ui/Title';
import styled from 'styled-components';
import {AppText} from 'components/ui/AppText';
import {useDispatch, useSelector} from 'react-redux';
import {
  fetchCourrierRejectionsList,
  selectCourrierRejections,
  selectCourrierRejectionsError,
  selectIsLoadingCourrierRejections,
} from 'redux-store/slices/driverSlice';
import {RejectionsList} from 'components/navigation/DisabledCourrierHomeScreen/RejectionsList';

export default () => {
  const dispatch = useDispatch();
  const isLoading = useSelector(selectIsLoadingCourrierRejections);
  const error = useSelector(selectCourrierRejectionsError);

  useEffect(() => {
    dispatch(fetchCourrierRejectionsList());
  }, [dispatch]);

  return (
    <ScreenComponent>
      <Title>Todavía no estas habilitado</Title>
      <AppText>Acá vas a poder ver las actualizaciones de tu perfil</AppText>
      <RejectionsList />
    </ScreenComponent>
  );
};

const ScreenComponent = styled(Screen)`
  padding: 20px 20px;
`;
