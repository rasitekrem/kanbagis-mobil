import { Navigation } from 'react-native-navigation';
import firebase from 'firebase';
import { registerScreens } from './screen';

registerScreens();

const firebaseConfig = {
  apiKey: '<API_KEY>',
  authDomain: '<AUTH_DOMAIN>',
  databaseURL: '<DB_URL>',
  projectId: '<PROJECT_ID>',
  storageBucket: '',
  messagingSenderId: ''
};

firebase.initializeApp(firebaseConfig);
Navigation.startSingleScreenApp({
            screen: {
              screen: 'Login',
              title: 'Kan Bağış Uygulaması',
            },
            appStyle: {
              navBarBackgroundColor: '#D9534F',
              navBarTextColor: 'white',
              navBarButtonColor: '#ffffff'
            }
          });
