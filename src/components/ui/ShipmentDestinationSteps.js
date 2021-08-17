import React from 'react';
import styled, {css} from 'styled-components';
import {Icon} from 'components/ui/Icon';
import {AppText} from 'components/ui/AppText';
import {theme} from 'constants/theme';

export const ShipmentDestinationsSteps = ({destinations}) => {
  const renderDestination = (item, index, array) => {
    const address = item.address.name.split(',')[0];
    const isLastDestination = index === array?.length - 1;
    return (
      <React.Fragment key={index.toString()}>
        <DestinationContainer isLastDestination={isLastDestination}>
          {isLastDestination ? (
            <Icon
              name={isLastDestination ? 'map-marker' : 'circle-outline'}
              size={25}
              color={theme.primaryDarkColor}
            />
          ) : (
            <IntermediateCircle />
          )}
          <Address>{address}</Address>
        </DestinationContainer>
        {!isLastDestination && <VerticalLine />}
      </React.Fragment>
    );
  };

  return destinations.map(renderDestination);
};

const DestinationContainer = styled.View`
  flex-direction: row;
  align-items: center;
  ${({isLastDestination}) =>
    isLastDestination &&
    css`
      margin-bottom: 20px;
    `};
`;

const VerticalLine = styled.View`
  border-left-width: 1px;
  height: 15px;
  margin-left: 12px;
  border-color: ${theme.primaryDarkColor};
`;

const Address = styled(AppText)`
  margin-left: 10px;
`;

const IntermediateCircle = styled.View`
  height: 15px;
  width: 15px;
  border-color: ${theme.primaryDarkColor};
  border-width: 2px;
  border-radius: 8px;
  margin-left: 5px;
`;
