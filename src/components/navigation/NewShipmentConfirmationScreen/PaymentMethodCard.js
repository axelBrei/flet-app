import React, {useCallback} from 'react';
import styled, {css} from 'styled-components';
import {IconCard} from 'components/ui/IconCard';
import {useModal} from 'components/Hooks/useModal';
import {AppText} from 'components/ui/AppText';
import PaymentMethodImage from 'resources/images/debit-card.svg';
import {Title} from 'components/ui/Title';
import {theme} from 'constants/theme';
import PaymentMethodsModalScreen from 'components/MobileFullScreenModals/PaymentMethodsModalScreen';
import {AnimatedError} from 'components/ui/AnimatedError';

export const PaymentMethodCard = ({
  selectedMethod,
  onChangeSelectedMethod,
  error,
  onFocus,
}) => {
  const {Modal, open} = useModal(
    PaymentMethodsModalScreen,
    {
      onChangeSelectedMethod,
      selectedMethod,
    },
    {avoidKeyboard: false, fullscreen: true},
  );

  const onPressCard = useCallback(() => {
    onFocus();
    open();
  }, [onFocus]);

  return (
    <>
      <PressableContainer onPress={onPressCard}>
        <IconCard
          reduced
          reverse
          error={error}
          renderImage={(size) =>
            selectedMethod ? (
              <MethodImage
                size={size}
                source={{uri: selectedMethod?.imageUrl}}
              />
            ) : (
              <PaymentMethodImage height={size - 30} width={size - 30} />
            )
          }>
          <Title color={theme.white}>Forma de pago</Title>
          <PaymentMethodText>
            {selectedMethod?.title || 'Sin seleccionar'}
          </PaymentMethodText>
          <AppText
            width="100%"
            textAlign="right"
            fontSize={12}
            italic
            color={theme.white}>
            Haga click para cambiar
          </AppText>
        </IconCard>
        <AnimatedError error={error} errorFontSize={12} />
      </PressableContainer>
      <Modal />
    </>
  );
};

const PressableContainer = styled.TouchableOpacity`
  width: 100%;
  align-items: center;
  justify-content: center;
  margin-bottom: 20px;
`;

const PaymentMethodText = styled(AppText)`
  color: ${theme.white};
  background-color: ${theme.primaryColor};
  border-radius: 15px;
  padding: 5px 10px;
  overflow: hidden;
  width: 100%;
  margin: 5px 0 10px;

  ${({theme}) =>
    !theme.isMobile &&
    css`
      cursor: pointer;
      pointer-events: initial;
    `}
`;

const MethodImage = styled.Image`
  height: ${(props) => props.size - 30}px;
  width: ${(props) => props.size - 30}px;
`;
