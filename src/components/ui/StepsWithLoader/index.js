import React, {useCallback, useState} from 'react';
import styled from 'styled-components';
import {LoadingStep} from 'components/ui/StepsWithLoader/LoadingStep';
import {theme} from 'constants/theme';
import {useWindowDimension} from 'components/Hooks/useWindowsDimensions';

interface StepItem {
  id: Number;
  title: String;
}

interface StepsWithLoaderProps {
  steps: Array<Step>;
  currentStep: Number;
}

const StepsWithLoader = ({steps, currentStep}: StepsWithLoaderProps) => {
  const [containerWidth, setContainerWidth] = useState(-1);
  const currentStepIndex = steps.findIndex(s => s.id === currentStep);
  const stepWidth = containerWidth / steps.length - 10;

  const handleLayout = useCallback(({nativeEvent: {layout}}) => {
    setContainerWidth(layout.width);
  }, []);

  return (
    <Container onLayout={handleLayout}>
      {steps.map((step: StepItem, index) => {
        return index === currentStepIndex + 1 ? (
          <LoadingStep key={index.toString()} width={stepWidth} />
        ) : (
          <Step
            key={index.toString()}
            color={
              index <= currentStepIndex ? theme.primaryColor : theme.lightGray
            }
            width={stepWidth}
          />
        );
      })}
    </Container>
  );
};
export default StepsWithLoader;

const Container = styled.View`
  width: 100%;
  padding: 10px 0;
  flex-direction: row;
  justify-content: space-between;
`;

const Step = styled.View`
  border-radius: 20px;
  width: ${props => props.width}px;
  background-color: ${props => props.color};
  height: 10px;
`;
