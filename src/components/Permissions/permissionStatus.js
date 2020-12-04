import {Platform} from 'react-native';

export const permissionStatus = {
  GRANTED: 'granted',
  UNAVAILABLE: 'unavailable',
  BLOCKED: 'blocked',
  DENIED: 'denied',
  LIMITED: 'limited',
  PROMPT: Platform.select({
    web: 'prompt',
    native: '',
  }),
};
