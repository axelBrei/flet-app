import React, {useCallback} from 'react';
import styled from 'styled-components';
import {AppText} from 'components/ui/AppText';
import {theme} from 'constants/theme';
import dayjs from 'dayjs';
import {capitallize} from 'helpers/stringHelper';
import {Title} from 'components/ui/Title';
import {Row} from 'components/ui/Row';
import {ShipmentDestinationsSteps} from 'components/ui/ShipmentDestinationSteps';
import {useNavigation} from '@react-navigation/native';
import {routes} from 'constants/config/routes';
import {applyShadow} from 'helpers/uiHelper';

export const LastShipmentItem = ({
  date,
  price,
  destinations,
  onPressViewMore,
}) => {
  const navigation = useNavigation();
  const shipmentDate = dayjs(date).format('ddd DD MMM YYYY - HH:MM[hs]');

  return (
    <Container destinationsAmount={destinations.length}>
      <DataContainer>
        <Row>
          <AppText fontSize={14} bold>
            {capitallize(shipmentDate)}
          </AppText>
          <Title color={theme.primaryColor}>${price}</Title>
        </Row>
        <ShipmentDestinationsSteps destinations={destinations} />
      </DataContainer>
      <ViewMoreButton onPress={onPressViewMore}>
        <AppText color="white" bold>
          Ver más
        </AppText>
      </ViewMoreButton>
    </Container>
  );
};

const Container = styled.View`
  padding: 20px 0 0;
  box-shadow: 1px 5px 3px ${theme.shadowColor};
  background-color: white;
  margin: 9px 20px;
  elevation: 4;
  background-color: ${theme.backgroundColor};
  border-radius: 20px;
  min-height: ${({destinationsAmount}) =>
    destinationsAmount === 3 ? 228 : 193}px;
`;
Container.defaultProps = applyShadow();

const DataContainer = styled.View`
  padding: 20px 20px 0;
`;

const ViewMoreButton = styled.TouchableOpacity`
  flex: 1;
  height: 30px;
  min-height: 30px;
  background-color: ${theme.primaryDarkColor};
  border-bottom-left-radius: 20px;
  border-bottom-right-radius: 20px;
  align-items: center;
  justify-content: center;
`;
