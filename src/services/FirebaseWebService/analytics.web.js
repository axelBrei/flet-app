import firebase from './index';
import 'firebase/analytics';

const logScreenView = async (currentScreen, prevScreen) => {
  await firebase.analytics().logEvent('screen_view', {
    firebase_screen: currentScreen.screen_name,
    firebase_screen_class: currentScreen.screen_name,
    previous_firebase_screen: prevScreen.screen_name,
    previous_screen_class: prevScreen.screen_name,
  });
};

const logEvent = async (eventName, data) => {
  await firebase.analytics().logEvent(eventName, data);
};

export default () => ({
  logEvent,
  logScreenView,
});
