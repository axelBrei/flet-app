import React, {useState, useEffect} from 'react';
import styled, {css} from 'styled-components';
import {Row} from 'components/ui/Row';
import {theme} from 'constants/theme';
import {LayoutAnimation} from 'react-native';
import {SelectorItem} from 'components/navigation/RegisterStack/SelectorItem';
import {useWindowDimension} from 'components/Hooks/useWindowsDimensions';

export const StepSelector = ({currentIndex, reduced}) => {
  const {widthWithPadding} = useWindowDimension();

  useEffect(() => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
  }, [currentIndex]);

  return (
    <StyledRow reduced={reduced}>
      <SelectorItem
        reduced={reduced}
        selected={currentIndex === 0}
        previous={currentIndex > 0}
        item={'Datos de\ncuenta'}
      />
      <SelectorItem
        reduced={reduced}
        selected={currentIndex === 1}
        previous={currentIndex > 1}
        item={'Datos\npersonales'}
      />
      {!reduced && (
        <>
          <SelectorItem
            selected={currentIndex === 2}
            previous={currentIndex > 2}
            item={'Datos de\nvehiculo'}
          />
          <SelectorItem
            selected={currentIndex === 3}
            previous={currentIndex > 3}
            item={'Datos\nlegales'}
          />
        </>
      )}
    </StyledRow>
  );
};

const StyledRow = styled(Row)`
  background-color: ${theme.grayBackground};
  border-radius: 20px;
  box-shadow: 1px 1px 6px ${theme.shadowColor};
  margin: 10px 20px 20px;
  width: ${({theme}) => theme.screenWidth - 40}px;
  padding-bottom: 0;
  align-self: center;
  justify-content: ${(props) => (props.reduced ? 'space-evenly' : 'center')};
  overflow: hidden;
  height: 55px;

  ${({theme}) =>
    !theme.isMobile &&
    css`
      max-width: 414px;
      elevation: 0;
    `}
`;
