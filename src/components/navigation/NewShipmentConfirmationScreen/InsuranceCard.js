import React, {useCallback} from 'react';
import styled, {css} from 'styled-components';
import {CardContainer} from 'components/ui/CardContainer';
import {theme} from 'constants/theme';
import {AppText} from 'components/ui/AppText';
import {Title} from 'components/ui/Title';
import {useModal} from 'components/Hooks/useModal';
import InsuranceModal from 'components/MobileFullScreenModals/InsuranceSelectionModalScreen';
import {AnimatedError} from 'components/ui/AnimatedError';

export const InsuranceCard = ({
  selectedInsurance,
  onChangeInsurance,
  error,
  onFocus,
}) => {
  const {Modal, toggle} = useModal(
    InsuranceModal,
    {
      onPressItem: onChangeInsurance,
      selectedInsurance,
    },
    {fullscreen: true, avoidKeyboard: false},
  );

  const renderUnselected = useCallback(
    () => (
      <UnselectedContainer>
        <UnselectedText>No se ha seleccionado ningun seguro</UnselectedText>
      </UnselectedContainer>
    ),
    [],
  );

  const onPressCard = useCallback(() => {
    onFocus();
    toggle();
  }, [onFocus]);

  return (
    <>
      <PressableCard onPress={onPressCard} error={error}>
        <Title>Seguro seleccionado</Title>
        <Divider />
        {selectedInsurance ? (
          <>
            <Row>
              <AppText bold>{selectedInsurance?.title}</AppText>
              <AppText textAlign="right">
                <AppText bold>Valor</AppText> +${selectedInsurance?.value}
              </AppText>
            </Row>
            <AppText>{selectedInsurance?.description}</AppText>
          </>
        ) : (
          renderUnselected()
        )}
        <AppText width="100%" textAlign="right" fontSize={12} italic>
          Haga click para cambiar
        </AppText>
        <AnimatedError error={error} errorFontSize={12} />
      </PressableCard>
      <Modal />
    </>
  );
};

const PressableCard = styled.TouchableOpacity`
  min-height: 120px;
  background-color: ${theme.grayBackground};
  padding: 5px 10px;
  border-radius: 20px;
  margin: 20px 0;
  width: 100%;
  border-width: 1px;
  border-color: ${(props) => (props.error ? theme.error : 'transparent')};

  ${({theme}) =>
    !theme.isMobile &&
    css`
      margin-top: 15px;
    `};
`;

const Divider = styled.View`
  width: 100%;
  height: 1px;
  background-color: ${theme.disabledFont};
`;

const Row = styled.View`
  flex-direction: row;
  justify-content: space-between;
  padding: 5px 0;
`;

const UnselectedContainer = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
`;

const UnselectedText = styled(AppText)`
  text-align: center;
  font-weight: bold;
`;
