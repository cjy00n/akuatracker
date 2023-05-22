import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  Text,
  useColorScheme,
} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import HomeScreen from './screens/HomeScreen';
import SignUpScreen from './screens/SignUpScreen';
import LoginScreen from './screens/LoginScreen';
import SettingScreen from './screens/SettingScreen';
import UserSettingScreen from './screens/UserSettingScreen';
import AppSettingScreen from './screens/AppSettingScreen';
import StatisticsScreen from './screens/StatisticsScreens';

const Stack = createNativeStackNavigator();

const App = () => {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="로그인">
        <Stack.Screen name="로그인" component={LoginScreen} />
        <Stack.Screen name="회원가입" component={SignUpScreen} />
        <Stack.Screen name="홈" component={HomeScreen} />
        <Stack.Screen name="설정" component={SettingScreen} />
        <Stack.Screen name="통계" component={StatisticsScreen} />
        <Stack.Screen name="앱 설정" component={AppSettingScreen} />
        <Stack.Screen name="사용자 정보 설정" component={UserSettingScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
