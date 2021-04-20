import React, {useCallback} from 'react';
import styled from 'styled-components';
import {AppText} from 'components/ui/AppText';
import {theme} from 'constants/theme';
import {Icon} from 'components/ui/Icon';
import {useModal} from 'components/Hooks/useModal';
import {useWindowDimension} from 'components/Hooks/useWindowsDimensions';

export const MenuItem = ({name, onPressItem, ...props}) => {
  const {isMobile} = useWindowDimension();
  const {Modal, open} = useModal(
    props.modal,
    {},
    {fullscreen: false, cancelable: true, style: {borderRadius: 20}},
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
      {props.modal && (
        <Modal
          contentStyle={{
            borderRadius: 20,
            width: isMobile ? '100%' : '50%',
            maxWidth: 500,
          }}
        />
      )}
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
