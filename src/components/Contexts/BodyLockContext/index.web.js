import React, {
  useRef,
  createContext,
  useContext,
  useState,
  useEffect,
} from 'react';
import styled from 'styled-components';
import {
  disableBodyScroll,
  enableBodyScroll,
  clearAllBodyScrollLocks,
} from 'body-scroll-lock';
import {getPathFromState} from '@react-navigation/native';
import {useSelector} from 'react-redux';
import {selectSavedNavigationState} from 'redux-store/slices/navigationSlice';

const Context = createContext({});

export default ({children}) => {
  const ref = useRef();
  const [locked, setLocked] = useState(false);
  const navigationState = useSelector(selectSavedNavigationState);

  useEffect(() => {
    ref.current?.scrollTo(0, 0);
  }, [navigationState, ref]);

  const lockBody = (elem) => {
    const screenElement = document.getElementById(elem);
    const element = document.getElementById('lock-view');
    if (!locked) {
      ref.current?.scrollTo(0, 0);
      disableBodyScroll(element);
      disableBodyScroll(screenElement);
      setLocked(true);
    }
  };

  const unlockBody = (elem) => {
    const element = document.getElementById('lock-view');
    const screenElement = document.getElementById(elem);
    if (locked) {
      enableBodyScroll(element);
      enableBodyScroll(screenElement);
      setLocked(false);
    }
  };

  return (
    <Context.Provider value={{lockBody, unlockBody}}>
      <BodyLockView
        ref={ref}
        contentContainerStyle={{
          height: '100%',
          width: '100%',
        }}
        nativeID="lock-view">
        {children}
      </BodyLockView>
    </Context.Provider>
  );
};

export const useBodyLock = () => useContext(Context);

const BodyLockView = styled.ScrollView`
  height: 100%;
  width: 100%;
`;
