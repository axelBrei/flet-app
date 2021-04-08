import React, {createContext, useState, useContext, useCallback} from 'react';
import {theme} from 'constants/theme';
import {Modal} from 'components/ui/Modal';
import {Platform} from 'react-native';

const ModalContext = createContext({});
export const useModal = (Content, contentProps, modalProps) => {
  const [extraParams, setExtraParams] = useState(null);
  const [isVisible, setIsVisible] = useState(false);

  const toggleModal = useCallback(
    (params = null) => {
      setExtraParams(isVisible ? null : params);
      setIsVisible(!isVisible);
    },
    [setIsVisible, isVisible],
  );

  const closeModal = useCallback(() => {
    setIsVisible(false);
    setExtraParams(null);
  }, [setIsVisible]);

  const openModal = useCallback(
    (newParams = {}) => {
      setIsVisible(true);
      setExtraParams(newParams);
    },
    [setIsVisible],
  );

  const renderModal = useCallback(
    ({...props}) => {
      return (
        <Modal
          isVisible={isVisible}
          onBackdropPress={!modalProps?.cancelable ? () => {} : closeModal}
          closeModal={closeModal}
          style={[
            Platform.OS === 'web' && {backgroundColor: theme.white},
            modalProps?.fullscreen && {
              marginHorizontal: 0,
              marginTop: 35,
              marginBottom: 0,
              justifyContent: 'flex-end',
            },
          ]}
          {...modalProps}>
          <ModalContext.Provider
            value={{
              closeModal,
              openModal,
              toggleModal,
              isVisible,
            }}>
            <Content
              isModalVisible={isVisible}
              toggleModal={toggleModal}
              closeModal={closeModal}
              openModal={openModal}
              {...contentProps}
              {...extraParams}
              {...props}
            />
          </ModalContext.Provider>
        </Modal>
      );
    },
    [openModal, closeModal, toggleModal, isVisible],
  );

  return {
    Modal: renderModal,
    isModalVisible: isVisible,
    toggle: toggleModal,
    open: openModal,
    close: closeModal,
  };
};

export const useModalContext = () => useContext(ModalContext);
