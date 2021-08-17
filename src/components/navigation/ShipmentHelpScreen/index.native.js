import React, {useCallback, useEffect, useState} from 'react';
import Screen from 'components/ui/Screen';
import styled from 'styled-components';
import {CommonList} from 'components/ui/CommonList';
import {AppText} from 'components/ui/AppText';
import {Icon} from 'components/ui/Icon';
import {theme} from 'constants/theme';
import {useDispatch, useSelector} from 'react-redux';
import {
  fetchReportAProblem,
  selectDriverShipmentData,
  selectIsLoadingReportACourrierProblem,
  selectReportACourrierProblemError,
} from 'redux-store/slices/driverShipmentSlice';
import {selectCurrentShipmentStatus} from 'redux-store/slices/shipmentSlice';
import {SHIPMENT_STATE} from 'constants/shipmentStates';
import {usePrevious} from 'components/Hooks/usePrevious';
import {Loader} from 'components/ui/Loader';
import {Modal} from 'components/ui/Modal';
import {ReportResult} from 'components/navigation/ShipmentHelpScreen/ReportResult';

const ShipmentHelpScreen = ({navigation, route}) => {
  const {driver = false} = route.params;
  const dispatch = useDispatch();
  const shipments = useSelector(selectDriverShipmentData);
  const userShipment = useSelector(selectCurrentShipmentStatus);
  const isLoading = useSelector(
    driver ? selectIsLoadingReportACourrierProblem : state => false,
  );
  const error = useSelector(
    driver ? selectReportACourrierProblemError : state => null,
  );
  const wasLoading = usePrevious(isLoading);
  const [modalVisible, setModalVisible] = useState(false);

  const shipment = driver ? shipments?.[0] : userShipment;
  const {status, id} = shipment || {};

  useEffect(() => {
    if (wasLoading && !isLoading && !error) {
      setModalVisible(true);
    }
  }, [isLoading, wasLoading, error]);

  const list = [
    driver && {
      title: 'Tengo un problema con mi vehiculo',
      icon: 'alert',
      code: 'vehicle-problem',
    },
    driver &&
      [SHIPMENT_STATE.WAITING_PACKAGE, SHIPMENT_STATE.WAITING_ORIGIN].includes(
        status,
      ) && {
        title: 'No hay nadie en la dirección',
        icon: 'account-off',
        code: 'nobody-address',
      },
    driver &&
      [SHIPMENT_STATE.WAITING_PACKAGE, SHIPMENT_STATE.WAITING_ORIGIN].includes(
        status,
      ) && {
        title: 'El paquete es demasiado grande',
        icon: 'package-variant-closed',
        code: 'oversized-package',
      },
    driver && {
      title: 'La dirección no existe',
      icon: 'map-marker-remove',
      code: 'address-unknown',
    },
  ].filter(i => i);

  const onPressItem = useCallback(
    ({code, ...item}) =>
      () => {
        if (driver) {
          dispatch(fetchReportAProblem(id, code));
        } else {
          // Call customer report a problem
        }
      },
    [],
  );

  const toggleModal = useCallback(
    () => setModalVisible(!modalVisible),
    [modalVisible],
  );

  return (
    <Loader loading={isLoading} size="large" message="Reportando problema...">
      <ScreenComponent>
        <CommonList
          data={list}
          renderItem={({item}) => (
            <ItemContainer onPress={onPressItem(item)}>
              <Icon
                style={{marginRight: 15}}
                size={26}
                color={theme.gray}
                name={item.icon}
              />
              <AppText>{item.title}</AppText>
            </ItemContainer>
          )}
        />
        <Modal
          visible={modalVisible}
          onBackdropPress={toggleModal}
          onCloseModal={toggleModal}>
          <ReportResult
            onPressHide={() => {
              toggleModal();
              navigation.goBack();
            }}
          />
        </Modal>
      </ScreenComponent>
    </Loader>
  );
};
export default ShipmentHelpScreen;

const ScreenComponent = styled(Screen)`
  padding: 20px;
`;

const Title = styled(AppText)`
  font-size: 18px;
  margin-bottom: 15px;
  font-family: Poppins-Medium;
`;

const ItemContainer = styled.TouchableOpacity`
  flex-direction: row;
  width: 100%;
  align-items: center;
  justify-content: flex-start;
  border-bottom-width: 0.5px;
  padding: 15px 0;
  border-color: ${theme.lightGray};
`;
