import React from 'react';
import {Animated} from 'react-native';
import {AppText} from 'components/ui/AppText';
import styled from 'styled-components';
import {useAnimatedOperationResult} from 'components/Hooks/useAnimatedSuccesContent';

export const ReportResult = ({onPressHide}) => {
  const {OperationResultContent} = useAnimatedOperationResult({
    icon: 'check-circle-outline',
    title: 'Error reportado',
    message: 'Sentimos que haya habido un problema',
    buttonText: 'Vovler',
    onHideOperationResult: onPressHide,
    successConditions: [true],
  });

  return (
    <Container>
      <OperationResultContent />
    </Container>
  );
};

const Container = styled.View`
  padding: 20px;
  display: flex;
  height: 250px;
`;
