// import firebase from 'firebase';
import Config from 'react-native-config';

firebase.initializeApp({
  apiKey: Config.REACT_APP_API_KEY,
  appId: Config.REACT_APP_APP_ID,
  projectId: Config.REACT_APP_PROJECT_ID,
  messagingSenderId: Config.REACT_APP_MESSAGING_ID,
  measurementId: Config.REACT_APP_MEASUREMENT_ID,
});

export default firebase;
