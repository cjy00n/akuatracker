/**
 * @format
 */
import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import {Alert} from 'react-native';

import messaging from '@react-native-firebase/messaging';
// Register background handler
messaging().setBackgroundMessageHandler(async remoteMessage => {
  
  Alert.alert(remoteMessage.notification.title, remoteMessage.notification.body);
  });
AppRegistry.registerComponent(appName, () => App);
