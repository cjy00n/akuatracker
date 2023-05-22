import {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  TouchableOpacity,
  Button,
} from 'react-native';
import {getUser} from '../lib/user';
import {subscribeAuth} from '../lib/auth';
import logo from '../assets/logo.png';

export default function HomeScreen({navigation}) {
  const [percent, setPercent] = useState(60);
  const [userInfo, setUserInfo] = useState({
    age: 0,
    daily_intake: 0,
    unit_intake: 0,
    displayName: '',
    gender: '',
    heignt: 0,
    significant: '',
    weight: 0,
  });
  const [currentIntake, setCurrentIntake] = useState(0);
  useEffect(() => {
    subscribeAuth(async user => {
      if (user) {
        const info = await getUser(user.uid);
        setUserInfo(info);
      } else {
      }
    });
  }, []);

  return (
    <View style={styles.container}>
      {/* <View
        style={{
          backgroundColor: "#FFFFFF",
          zIndex: 1,
          position: "absolute",
        }}
      >
        <Text></Text>
      </View>
      <View
        style={{
          backgroundColor: "#90D7FF",
          zIndex: 1,
          position: "absolute",
        }}
      >
        <Text></Text>
      </View> */}
      <View style={{width: '100%'}}>
        <View style={styles.topContainer}>
          <Image source={logo} resizeMode={'cover'} style={styles.imageStyle} />
          <Button
            title="설정"
            style={styles.settingButton}
            onPress={() => navigation.navigate('설정')}
          />
        </View>
        <View style={styles.middleContainer}>
          <Text>오늘의 목표량을</Text>
          <Text>
            {Math.ceil((currentIntake / userInfo.daily_intake) * 100)}%
            달성했어요
          </Text>
          <Button
            title="마셨어요"
            onPress={() => setCurrentIntake(currentIntake + 100)}
          />
          <Text>
            {currentIntake}ml / {userInfo.daily_intake}ml
          </Text>
        </View>
        <Button
          title="나의 통계"
          style={styles.buttonContainer}
          onPress={() => navigation.navigate('통계')}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF',
    width: '100%',
  },
  topContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  imageStyle: {
    height: 50,
    width: 150,
  },
  settingButton: {
    alignContent: 'center',
    alignItems: 'center',
  },
  buttonContainer: {
    margin: 10,
    padding: 5,
    borderRadius: 2,
    borderColor: 'gray',
    borderWidth: 1,
    alignItems: 'center',
  },
  middleContainer: {
    margin: 10,
    padding: 5,
    borderRadius: 2,
    borderColor: 'gray',
    borderWidth: 1,
    alignItems: 'center',
  },
});
