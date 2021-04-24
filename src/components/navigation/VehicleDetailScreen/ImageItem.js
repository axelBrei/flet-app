import React, {useCallback, useState} from 'react';
import styled from 'styled-components';
import {Image} from 'react-native';
import {useWindowDimension} from 'components/Hooks/useWindowsDimensions';
import {theme} from 'constants/theme';
import {IconButton} from 'components/ui/IconButton';
import {Loader} from 'components/ui/Loader';

const ITEM_HEIGHT = 200;
export const ImageItem = ({uri}) => {
  const {widthWithPadding, isMobile} = useWindowDimension();
  const [loading, setLoading] = useState(true);

  const onPressEdit = useCallback(() => {}, []);

  return (
    <Container>
      <Loader unmount={false} loading={isMobile && loading} size="large">
        <Image
          height={ITEM_HEIGHT - 10}
          width={isMobile ? widthWithPadding - 10 : 300}
          resizeMethod="scale"
          resizeMode="contain"
          source={{
            height: ITEM_HEIGHT - 10,
            width: isMobile ? widthWithPadding - 10 : 300,
            uri,
            cache: 'force-cache',
          }}
          onLoadEnd={() => setLoading(false)}
        />
        <ButtonContainer>
          <IconButton
            alternative
            onPress={onPressEdit}
            icon="pencil"
            size={32}
          />
        </ButtonContainer>
      </Loader>
    </Container>
  );
};

const Container = styled.View`
  width: ${({theme}) => (theme.isMobile ? theme.screenWidth - 40 : 300)}px;
  height: ${ITEM_HEIGHT}px;
  align-items: center;
  justify-content: center;
  margin: 5px 20px;
  padding: 5px;
  box-shadow: 1px 1px 5px ${theme.shadowColor};
  border-radius: 20px;
  background-color: ${theme.backgroundColor};
`;

const ButtonContainer = styled.View`
  position: absolute;
  right: 0;
  top: 0;
`;
