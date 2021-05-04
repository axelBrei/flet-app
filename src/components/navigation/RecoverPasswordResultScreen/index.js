import React from 'react';
import {Screen} from 'components/ui/Screen';
import styled, {css} from 'styled-components';
import EmailSuccess from 'resources/images/mail_sent.svg';
import EmailError from 'resources/images/mail_error.svg';
import {useWindowDimension} from 'components/Hooks/useWindowsDimensions';
import {Title} from 'components/ui/Title';
import {AppText} from 'components/ui/AppText';
import {MainButton} from 'components/ui/MainButton';
import {routes} from 'constants/config/routes';
import {useSelector} from 'react-redux';
import {selectRecoverPassowrdError} from 'redux-store/slices/loginSlice';

export default ({navigation}) => {
  const {isMobile, width} = useWindowDimension();
  const error = useSelector(selectRecoverPassowrdError);

  const ImageComponent = error ? EmailError : EmailSuccess;
  return (
    <Screen>
      <Container>
        <ImageComponent
          height={isMobile ? width * 0.7 : Math.min(414, width * 0.5)}
          width={isMobile ? width * 0.7 : Math.min(414, width * 0.5)}
        />
        <TextContainer>
          <Title textAlign="center">
            {error
              ? 'Ha ocurrido un error al verificar\nlos datos de la cuenta'
              : 'Te hemos envíado un mail con tu nueva contraseña'}
          </Title>
          <AppText>
            {error
              ? 'Verificá que hayas ingresado los datos correctos.'
              : 'Recordá cambiarla una vez que ingreses.'}
          </AppText>
        </TextContainer>
        <Button
          onPress={() =>
            error
              ? navigation.goBack()
              : navigation.navigate(routes.loginScreen)
          }>
          Volver
        </Button>
      </Container>
    </Screen>
  );
};

const Container = styled.View`
  flex: 1;
  width: 100%;
  align-items: center;
  padding: 20px;

  ${props =>
    !props.theme.isMobile &&
    css`
      align-self: center;
      max-width: 550px;
    `}
`;

const TextContainer = styled.View`
  padding: 20px 0;
  align-items: center;

  ${props =>
    props.theme.isMobile &&
    css`
      flex: 1;
    `}
`;

const Button = styled(MainButton)`
  width: 100%;
`;
