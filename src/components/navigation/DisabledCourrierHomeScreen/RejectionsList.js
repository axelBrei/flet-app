import React, {useCallback} from 'react';
import {CommonList} from 'components/ui/CommonList';
import styled from 'styled-components';
import {useSelector} from 'react-redux';
import {
  selectCourrierRejections,
  selectIsLoadingCourrierRejections,
} from 'redux-store/slices/driverSlice';
import {AppText} from 'components/ui/AppText';
import {RejectionItem} from 'components/navigation/DisabledCourrierHomeScreen/RejectionItem';
import {EmptyListComponent} from 'components/navigation/DisabledCourrierHomeScreen/EmptyListComponent';
import {useNavigation} from '@react-navigation/native';
import {routes} from 'constants/config/routes';

export const RejectionsList = ({refreshing}) => {
  const navigation = useNavigation();
  const isLoading = useSelector(selectIsLoadingCourrierRejections);
  const rejections = useSelector(selectCourrierRejections);

  const onPressItem = useCallback(
    rejection => {
      navigation.navigate(routes.disabledCourrierSolveRejectionScreen, {
        rejection,
      });
    },
    [navigation],
  );

  return (
    <Container>
      {rejections?.length > 0 && (
        <AppText>
          Detectamos algunos errores en la informacion que subiste
        </AppText>
      )}

      <CommonList
        data={rejections}
        contentContainerStyle={
          (rejections?.length === 0 || isLoading) && {
            flex: 1,
            height: '100%',
            alignItems: 'center',
            justifyContent: 'center',
          }
        }
        renderItem={({item}) => (
          <RejectionItem item={item} onPress={() => onPressItem(item)} />
        )}
        ListEmptyComponent={EmptyListComponent}
      />
    </Container>
  );
};

const Container = styled.View`
  padding: 20px 0;
  flex: 1;
`;
