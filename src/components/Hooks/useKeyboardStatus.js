import React, {useState, useRef, useEffect} from 'react';
import {Keyboard, Platform} from 'react-native';

const KEYBOARD_EVENT = Platform.select({
  android: {
    show: 'keyboardDidShow',
    hide: 'keyboardDidHide',
  },
  ios: {
    show: 'keyboardWillShow',
    hide: 'keyboardWillHide',
  },
});

export function useKeyboardStatus(handleChange = () => {}) {
  const [isKeyboardOpen, setIsKeyboardOpen] = useState(false);
  const keyboardShowListener = useRef(null);
  const keyboardHideListener = useRef(null);

  useEffect(() => {
    keyboardShowListener.current = Keyboard.addListener(
      KEYBOARD_EVENT.show,
      e => {
        setIsKeyboardOpen(true);
        handleChange(true, e);
      }
    );
    keyboardHideListener.current = Keyboard.addListener(
      KEYBOARD_EVENT.hide,
      e => {
        setIsKeyboardOpen(false);
        handleChange(false, e);
      }
    );

    return () => {
      keyboardShowListener.current.remove();
      keyboardHideListener.current.remove();
    };
  });

  return isKeyboardOpen;
}
