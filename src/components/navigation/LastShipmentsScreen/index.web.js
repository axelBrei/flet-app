import React, {useCallback, useEffect, useState} from 'react';
import styled, {css} from 'styled-components';
import {Platform} from 'react-native';
import Screen from 'components/ui/Screen';
import {useDispatch, useSelector} from 'react-redux';
import {
  fetchLastShipments,
  selectIsLoadingLastShipments,
  selectLastShipments,
  selectLastShipmentsError,
  selectLastShipmentsPagination,
} from 'redux-store/slices/shipmentSlice';
import {Loader} from 'components/ui/Loader';
import {PaginatedList} from 'components/ui/PaginatedList';
import {Title} from 'components/ui/Title';
import {theme} from 'constants/theme';
import {LastShipmentItem} from 'components/navigation/LastShipmentsScreen/LastShipmentItem';
import {useWindowDimension} from 'components/Hooks/useWindowsDimensions';
import {Row, StartRow} from 'components/ui/Row';
import LastShipmentDetailScreen from 'components/navigation/LastShipmentDetailScreen';
import {CommonList} from 'components/ui/CommonList';
import {Modal} from 'components/ui/Modal';
import {AppText} from 'components/ui/AppText';
import {IconButton} from 'components/ui/IconButton';
import dayjs from 'dayjs';
import {capitallize} from 'helpers/stringHelper';

const LastShipmentsScreen = () => {
  const {isMobile, width} = useWindowDimension();
  const [refreshing, setRefreshing] = useState(false);
  const dispatch = useDispatch();
  const isLoading = true; // useSelector(selectIsLoadingLastShipments);
  const error = useSelector(selectLastShipmentsError);
  const lastShipmentList = useSelector(selectLastShipments);
  const pagination = useSelector(selectLastShipmentsPagination);
  const [selectedShipment, setSelectedShipment] = useState(null);

  useEffect(() => {
    dispatch(fetchLastShipments(1, 30));
  }, []);

  useEffect(() => {
    if (lastShipmentList?.length > 0) {
      setSelectedShipment(lastShipmentList[0]);
    }
  }, [lastShipmentList]);

  useEffect(() => {
    if (refreshing && !isLoading) {
      setRefreshing(false);
    }
  }, [isLoading, refreshing]);

  const renderItem = useCallback((item, index) => {
    return (
      <LastShipmentItem
        key={index.toString()}
        {...item}
        onPressViewMore={() => setSelectedShipment(item)}
      />
    );
  }, []);

  return (
    <div
      style={{
        display: 'flex',
        flex: 1,
        flexDirection: 'row',
        overflow: 'auto',
        height: '100%',
        width: '100%',
        alignItems: 'stretch',
      }}>
      <Screen scrollable style={{position: 'relative'}}>
        <Title padding={20}>Mis ultimos pedidos</Title>
        {lastShipmentList?.length === 0 && isLoading ? (
          <LoaderContainer>
            <Loader loading message="Cargando últimos envíos" size={40} />
          </LoaderContainer>
        ) : (
          <>
            <List>{lastShipmentList.map(renderItem)}</List>
            {width < 1000 && (
              <Modal visible={!!selectedShipment}>
                <ModalContainer>
                  <ModalHeader>
                    <AppText bold color={theme.white}>
                      {selectedShipment
                        ? capitallize(
                            dayjs(selectedShipment.date).format(
                              'ddd DD MMM YYYY - HH:MM[hs]',
                            ),
                          )
                        : ''}
                    </AppText>
                    <IconButton
                      backgroundColor={theme.primaryDarkColor}
                      onPress={() => setSelectedShipment(null)}
                      icon="close"
                      color={theme.white}
                    />
                  </ModalHeader>
                  {selectedShipment && (
                    <LastShipmentDetailScreen
                      route={{params: {shipment: selectedShipment}}}
                    />
                  )}
                </ModalContainer>
              </Modal>
            )}
          </>
        )}
      </Screen>
      {width > 1000 && lastShipmentList?.length !== 0 && !isLoading && (
        <DetailContainer>
          {!!selectedShipment && (
            <LastShipmentDetailScreen
              route={{params: {shipment: selectedShipment}}}
            />
          )}
        </DetailContainer>
      )}
    </div>
  );
};
export default LastShipmentsScreen;

const List = styled.ScrollView`
  flex: 1;
  flex-direction: column;
  width: 100%;
  min-height: ${props => props.theme.screenHeight - 100}px;
  max-width: ${props => (props.theme.screenWidth > 1000 ? '54%' : '960px')};
  overflow-y: auto;
`;

const DetailContainer = styled.View`
  height: 100%;
  min-width: 45%;
  flex: 1;
  overflow: initial; !important;
  position: -webkit-sticky; /* Safari */
  position: sticky;
  top: 0;
  right: 0;
  align-items: center;
  justify-content: flex-start;
  padding-right: 20px;
  padding-top: 60px;
`;

const ModalContainer = styled.View`
  width: ${({theme}) => theme.screenWidth * 0.8}px;
`;

const ModalHeader = styled.View`
  flex-direction: row;
  align-items: flex-end;
  justify-content: space-between;
  top: 40px;
  padding: 0 20px;
  width: 100%;
  overflow: visible;
  height: 0px;
  background-color: ${theme.primaryColor};
  border-color: ${theme.primaryColor};
  z-index: 2;
`;

const LoaderContainer = styled.View`
  height: 100vh;
  width: 100%;
  align-items: center;
  justify-content: center;
`;
