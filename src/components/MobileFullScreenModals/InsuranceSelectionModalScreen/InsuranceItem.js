import React, {useMemo} from 'react';
import styled, {css} from 'styled-components';
import {AppText} from 'components/ui/AppText';
import {theme} from 'constants/theme';
import {Title} from 'components/ui/Title';
import {useSelector} from 'react-redux';
import {selectNewShipmentData} from 'redux-store/slices/newShipmentSlice';

export const InsuranceItem = ({
  title,
  description,
  valueModificator,
  index,
  onPress,
  selected,
}) => {
  const packageValue = parseInt(
    useSelector(selectNewShipmentData)?.shipmentDescription?.package?.value,
  );

  const value = useMemo(
    () => Math.round(packageValue * valueModificator),
    [valueModificator, packageValue],
  );

  const fontColor = useMemo(
    () => (index % 2 === 0 ? theme.fontColor : theme.white),
    [index],
  );

  return (
    <>
      {selected && (
        <SelectedTextContainer selected={selected}>
          <AppText color={theme.white}>Seleccionado</AppText>
        </SelectedTextContainer>
      )}
      <Container index={index} onPress={onPress(value)} selected={selected}>
        <Row>
          <Title color={fontColor}>{title}</Title>
          <AppText color={fontColor}>
            <AppText bold color={fontColor}>
              Valor:
            </AppText>{' '}
            +${value}
          </AppText>
        </Row>
        <Row>
          <Description color={fontColor}>{description}</Description>
        </Row>
      </Container>
    </>
  );
};

const Container = styled.TouchableOpacity`
  background-color: ${props =>
    props.index % 2 === 0 ? theme.grayBackground : theme.primaryColor};
  padding: 20px;
  border-radius: 20px;
  margin: 0 0 20px;
  ${({selected}) =>
    selected &&
    css`
      border-width: 2px;
      border-top-left-radius: 0;
      border-color: ${theme.fontColor};
    `}
`;

const Row = styled.View`
  width: 100%;
  justify-content: space-between;
  align-items: center;
  flex-direction: row;
`;

const Description = styled(AppText)`
  font-size: 15px;
`;

const SelectedTextContainer = styled.View`
  background-color: ${theme.fontColor};
  border-color: ${theme.fontColor};
  border-width: 2px;
  color: ${theme.white};
  width: 150px;
  border-top-left-radius: 12px;
  border-top-right-radius: 12px;
  align-items: center;
  justify-content: center;
`;
