import 'react-native-gesture-handler';
import React from 'react';
import MyRouter from './src/MyRouter';
import SplashScreen from 'react-native-splash-screen';
import reducers from './src/redux/reducers';
import {Provider} from 'react-redux';
import {createStore, applyMiddleware} from 'redux';
import ReduxThunk from 'redux-thunk';
import 'react-native-gesture-handler';
// import firebase from 'firebase/compat/app';
// import 'firebase/compat/auth';
// import 'firebase/compat/firestore';
import { initializeApp } from "firebase/app";
export default class App extends React.Component {
  constructor(props) {
    super(props);
    // const auth = firebase.auth();
    // auth.onAuthStateChanged(user => {
    //   // Check for user status
    // });
    //Set the configuration for your app
    const firebaseConfig = {
      apiKey: 'AIzaSyAM99LDLXNDa_Y0kTcV7mtNDfkXqU_M-QY',
      authDomain: 'react-firebase-auth-b90e9.firebaseapp.com',
      databaseURL:
        'https://react-firebase-auth-b90e9-default-rtdb.firebaseio.com',
      projectId: 'react-firebase-auth-b90e9',
      storageBucket: 'react-firebase-auth-b90e9.appspot.com',
      messagingSenderId: '628906256762',
      appId: '1:628906256762:web:c00a9f85ce8856941b8ec3',
    };
    
    // Initialize Firebase
    const app = initializeApp(firebaseConfig);
  }
  componentDidMount() {
    setTimeout(() => {
      SplashScreen.hide();
    }, 300);
  }
  render() {
    console.disableYellowBox = true;
    const store = createStore(reducers, {}, applyMiddleware(ReduxThunk));
    return (
      <Provider store={store}>
        <MyRouter />
      </Provider>
    );
  }
}
