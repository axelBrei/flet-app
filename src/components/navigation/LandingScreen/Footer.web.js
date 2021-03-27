import React, {useCallback} from 'react';
import styled from 'styled-components';
import {AppLogo} from 'components/ui/AppLogo';
import {AppText} from 'components/ui/AppText';
import {Container} from 'components/ui/Container';
import {theme} from 'constants/theme';
import {scaleDp, scaleDpTheme} from 'helpers/responsiveHelper';
import {IconButton} from 'components/ui/IconButton';
import {Icon} from 'components/ui/Icon';

const mail = 'fletapp@gmail.com';
const socialMedias = [
  {name: 'facebook', url: 'https://facebook.com'},
  {name: 'instagram', url: 'https://instagram.com'},
  {name: 'android', url: 'https://android.com'},
  {name: 'apple', url: 'https://apple.com'},
  {name: 'twitter', url: 'https://twitter.com'},
];
export const Footer = () => {
  const onPressMail = useCallback(
    () => window.open(`mailto:${mail}`, '_blank'),
    [],
  );

  const openUrl = useCallback((url) => () => window.open(url, '_blank'), []);
  return (
    <ComponentContainer>
      <AppLogo size={12} color={theme.white} />
      <Container dir="row" alignItems="center">
        <Icon name="email-outline" size={20} color={theme.white} />
        <AppText
          onPress={onPressMail}
          fontSize={14}
          padding=" 1px 5"
          color={theme.white}>
          {mail}
        </AppText>
      </Container>
      <Container
        width="100%"
        dir="row"
        justifyContent="space-between"
        alignItems="flex-end">
        <Container dir="row">
          {socialMedias.map(({name, url}) => (
            <IconButton
              onPress={openUrl(url)}
              icon={name}
              size={20}
              iconColor={theme.white}
              style={{
                padding: 0,
                marginTop: scaleDp(15),
                marginRight: scaleDp(10),
              }}
              backgroundColor={theme.primaryLightColor}
            />
          ))}
        </Container>
        <AppText fontSize={10} color={theme.white}>
          ©2021 - Todos los derechos reservados
        </AppText>
      </Container>
    </ComponentContainer>
  );
};

const ComponentContainer = styled(Container)`
  background-color: ${theme.primaryLightColor};
  width: 100%;
  padding: ${scaleDpTheme(15)};
`;
