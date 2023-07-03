import React from 'react';
import {useEffect} from 'react';
import {Alert} from 'react-native';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  Text,
  useColorScheme,
} from 'react-native';

import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import HomeScreen from './screens/HomeScreen';
import SignUpScreen from './screens/SignUpScreen';
import LoginScreen from './screens/LoginScreen';
import SettingScreen from './screens/SettingScreen';
import UserSettingScreen from './screens/UserSettingScreen';
import AppSettingScreen from './screens/AppSettingScreen';
import StatisticsScreen from './screens/StatisticsScreens';
import messaging from '@react-native-firebase/messaging';
 
messaging().setBackgroundMessageHandler(async remoteMessage => {
  console.log(remoteMessage.ttl, remoteMessage);
});

const Stack = createNativeStackNavigator();

const App = () => {

  const getFcmToken = async () => {
    const fcmToken = await messaging().getToken();
    console.log('[FCM Token] ', fcmToken);
  };
 
  useEffect(() => {
    getFcmToken();
    const unsubscribe = messaging().onMessage(async remoteMessage => {
      Alert.alert(remoteMessage.notification.title, remoteMessage.notification.body);
    });
    return unsubscribe;
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="로그인">
        <Stack.Screen
          name="로그인"
          component={LoginScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen name="회원가입" component={SignUpScreen} />
        <Stack.Screen
          name="홈"
          component={HomeScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen name="설정" component={SettingScreen} />
        <Stack.Screen name="통계" component={StatisticsScreen} />
        <Stack.Screen name="앱 설정" component={AppSettingScreen} />
        <Stack.Screen name="사용자 정보 설정" component={UserSettingScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
