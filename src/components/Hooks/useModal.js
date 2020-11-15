import React, {useState, useEffect, useCallback, useRef} from 'react';
import {Modalize} from 'react-native-modalize';
import {scaleDp} from 'helpers/responsiveHelper';
import {Calendar as WixCalendar} from 'react-native-calendars';
import {theme} from 'constants/theme';
import {useWindowDimension} from 'components/Hooks/useWindowsDimensions';

export const useModal = (Content, config) => {
  const [isVisible, setIsVisible] = useState(false);
  const modalRef = useRef(null);

  const toggleModal = useCallback(() => {
    if (isVisible) modalRef.current?.close();
    else modalRef.current?.open();
    setIsVisible(!isVisible);
  }, [setIsVisible, isVisible, modalRef]);

  const renderModal = useCallback(
    ({height = scaleDp(400)}) => {
      const {height: screenHeight} = useWindowDimension();
      return (
        <Modalize
          onClosed={modalRef.current?.close}
          ref={modalRef}
          modalHeight={height}
          rootStyle={{
            zIndex: 200,
            // height: screenHeight,
            // height,
          }}
          modalStyle={{
            // height: height,
            zIndex: 201,
          }}
          contentStyle={{
            zIndex: 201,
            height: screenHeight,
          }}>
          <Content isModalVisible={isVisible} toggleModal={toggleModal} />
        </Modalize>
      );
    },
    [modalRef, Content],
  );

  return {
    Modal: renderModal,
    toggle: toggleModal,
  };
};
