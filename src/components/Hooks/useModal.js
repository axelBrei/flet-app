import React, {useState, useEffect, useCallback, useRef} from 'react';
import {Modal} from 'components/ui/Modal/index';
import {scaleDp} from 'helpers/responsiveHelper';
import {Calendar as WixCalendar} from 'react-native-calendars';
import {theme} from 'constants/theme';
import {useWindowDimension} from 'components/Hooks/useWindowsDimensions';

export const useModal = (Content, contentProps) => {
  const [isVisible, setIsVisible] = useState(false);

  const toggleModal = useCallback(() => setIsVisible(!isVisible), [
    setIsVisible,
    isVisible,
  ]);
  const closeModal = useCallback(() => setIsVisible(false), [setIsVisible]);
  const openModal = useCallback(() => setIsVisible(true), [setIsVisible]);

  const renderModal = useCallback(() => {
    return (
      <Modal isVisible={isVisible} onBackdropPress={closeModal}>
        <Content
          isModalVisible={isVisible}
          toggleModal={toggleModal}
          closeModal={closeModal}
          openModal={openModal}
          {...contentProps}
        />
      </Modal>
    );
  }, [openModal, closeModal, toggleModal, isVisible]);

  return {
    Modal: renderModal,
    isModalVisible: isVisible,
    toggle: toggleModal,
    open: openModal,
    close: closeModal,
  };
};
