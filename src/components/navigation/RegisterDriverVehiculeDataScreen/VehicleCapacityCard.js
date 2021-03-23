import React from 'react';
import styled from 'styled-components';
import {useModal, useModalContext} from 'components/Hooks/useModal';
import {theme} from 'constants/theme';
import {Title} from 'components/ui/Title';
import {AppText} from 'components/ui/AppText';
import {Row} from 'components/ui/Row';
import {RowWithBoldData} from 'components/ui/RowWithBoldData';
import {VehicleCapacityModalContent} from 'components/navigation/RegisterDriverVehiculeDataScreen/VehicleCapacityModalContent';
import {FIELDS} from 'components/navigation/RegisterDriverVehiculeDataScreen/vehiculeDataFormikConfig';
import validate from 'react-native-web/dist/exports/StyleSheet/validate';
import {AnimatedError} from 'components/ui/AnimatedError';

export const VehicleCapacityCard = ({...props}) => {
  const {Modal, open} = useModal(VehicleCapacityModalContent, props, {
    fullscreen: true,
    cancelable: true,
  });
  return (
    <>
      <Container onPress={open}>
        <Title padding={'10px 20'} color={theme.white}>
          Capacidad
        </Title>
        <Divider />
        <InfoContainer>
          {!props.values[FIELDS.HEIGHT] ||
          !props.values[FIELDS.WIDTH] ||
          !props.values[FIELDS.LENGTH] ||
          !props.values[FIELDS.WEIGHT] ? (
            <>
              <Title color={theme.white}>No se cargo información</Title>
            </>
          ) : (
            <InfoContainer>
              <Row>
                <RowWithBoldData
                  label={'Alto:'}
                  data={`${props.values[FIELDS.HEIGHT]} Mts.`}
                />
                <RowWithBoldData
                  label={'Ancho:'}
                  data={`${props.values[FIELDS.WIDTH]} Mts.`}
                />
              </Row>
              <Row>
                <RowWithBoldData
                  label={'Largo:'}
                  data={`${props.values[FIELDS.LENGTH]} Mts.`}
                />
                <RowWithBoldData
                  label={'Peso máximo:'}
                  data={`${props.values[FIELDS.WEIGHT]} Mts.`}
                />
              </Row>
            </InfoContainer>
          )}
          <AppText italic color={theme.white} width="100%" textAlign="right">
            Haga click para cambiar
          </AppText>
        </InfoContainer>
        <AnimatedError
          error={
            ((props.touched[FIELDS.HEIGHT] && props.errors[FIELDS.HEIGHT]) ||
              (props.touched[FIELDS.WIDTH] && props.errors[FIELDS.WIDTH]) ||
              (props.touched[FIELDS.LENGTH] && props.errors[FIELDS.LENGTH]) ||
              (props.touched[FIELDS.WEIGHT] && props.errors[FIELDS.WEIGHT])) &&
            'Debe completar los datos de capacidad'
          }
          errorFontSize={12}
        />
      </Container>
      <Modal {...props} />
    </>
  );
};

const Container = styled.TouchableOpacity`
  background-color: ${theme.primaryLightColor};
  width: 100%;
  border-radius: 20px;
  min-height: 120px;
  margin-bottom: 5px;
`;

const Divider = styled.View`
  width: 100%;
  height: 0.5px;
  background-color: ${theme.white};
  margin-bottom: 10px;
`;

const InfoContainer = styled.View`
  justify-content: center;
  padding: 0 20px;
`;

const InformationText = styled(AppText)`
  font-size: 12px;
  line-height: 14px;
`;
