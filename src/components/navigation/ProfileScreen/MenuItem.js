import React, {useCallback} from 'react';
import styled from 'styled-components';
import {AppText} from 'components/ui/AppText';
import {theme} from 'constants/theme';
import {Icon} from 'components/ui/Icon';
import {useModal} from 'components/Hooks/useModal';
import {useWindowDimension} from 'components/Hooks/useWindowsDimensions';

export const MenuItem = ({name, onPressItem, ...props}) => {
  const {isMobile, widthWithPadding} = useWindowDimension();
  const {Modal, open} = useModal(
    props.modal,
    {
      contentStyle: {
        borderRadius: 20,
        width: isMobile ? widthWithPadding : '50%',
        maxWidth: isMobile ? '100%' : 500,
      },
    },
    {
      fullscreen: false,
      cancelable: true,
      avoidKeyboard: true,
      style: {borderRadius: 20},
    },
  );

  const onPress = useCallback(() => {
    onPressItem?.({name, ...props});
    open();
  }, [open]);

  return (
    <>
      <Container onPress={onPress}>
        <AppText padding="0 10" fontSize={16}>
          {name}
        </AppText>
        <Icon name="chevron-right" size={20} color={theme.fontColor} />
      </Container>
      {props.modal && <Modal />}
    </>
  );
};

const Container = styled.TouchableOpacity`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 15px 10px;
  width: 100%;
`;
