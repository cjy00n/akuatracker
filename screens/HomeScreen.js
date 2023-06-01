import {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  Button,
  TouchableOpacity,
} from 'react-native';
import {getUser} from '../lib/user';
import {subscribeAuth} from '../lib/auth';
import logo from '../assets/logo.png';
import chart from '../assets/icon/icon_chart.png';
import setting from '../assets/icon/icon-setting.png';
import CustomButton from '../components/CustomButton';
import waterImg from '../assets/water.png';
// import {CircularProgressbar} from 'react-circular-progressbar';
// import "react-circular-progressbar/dist/styles.css"

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
        console.log('유저 정보가 없습니다.');
        navigation.navigate('로그인');
      }
    });
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.topContainer}>
        <View style={{}}>
          <Image source={logo} resizeMode={'cover'} style={styles.imageStyle} />
        </View>
        <View style={{}}>
          <TouchableOpacity
            style={styles.settingButton}
            onPress={() => navigation.navigate('설정')}>
            <Image style={styles.settingImg} source={setting} />
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.middleContainer}>
        <Text style={styles.middleText}>
          오늘의 목표량을{'\n'}
          {Math.ceil((currentIntake / userInfo.daily_intake) * 100)}%
          달성했어요💦
        </Text>
        <Image source={waterImg} />
        <TouchableOpacity
          onPress={() => setCurrentIntake(currentIntake + 100)}
          style={styles.drinkButton}>
          <Text>💧 마셨어요</Text>
        </TouchableOpacity>
        <Text>
          {currentIntake}ml / {userInfo.daily_intake}ml
        </Text>
      </View>
      <CustomButton
        icon={chart}
        text={'나의 통계 확인하기'}
        onPress={() => navigation.navigate('통계')}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: '100%',
    backgroundColor: '#90D7FF',
  },
  topContainer: {
    flexDirection: 'row',
    // justifyContent: 'flex-end',
    // alignItems: 'center',
  },
  imageStyle: {
    alignSelf: 'center',
    // position: 'absolute',
    zIndex: 1,
    height: 50,
    width: 150,
  },
  settingButton: {
    justifyContent: 'flex-end',
    // alignContent: 'center',
    // alignItems: 'center',
  },
  settingImg: {
    width: 48,
    height: 48,
  },
  middleContainer: {
    margin: 20,
    padding: 20,
    borderRadius: 20,
    backgroundColor: 'white',
    alignItems: 'center',
  },
  middleText: {
    fontSize: 30,
    justifyContent: 'flex-start',
    fontFamily: 'BMJUA',
    margin: 10,
  },
  drinkButton: {
    position: 'absolute',
    top: 210,
    left: 115,
    right: 115,
    bottom: 110,
    padding: 10,
    margin: 10,
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 15,
    elevation: 10,
  },
});
