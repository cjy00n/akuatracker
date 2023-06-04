import {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  Button,
  Modal,
  TouchableOpacity,
} from 'react-native';
import {getUser} from '../lib/user';
import {subscribeAuth} from '../lib/auth';
import logo from '../assets/logo.png';
import chart from '../assets/icon/icon_chart.png';
import setting from '../assets/icon/icon-setting.png';
import CustomButton from '../components/CustomButton';
import waterImg from '../assets/water.png';
import DropDownPicker from 'react-native-dropdown-picker';
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
  const [visible, setVisible] = useState(false);

  const showDialog = () => {
    setVisible(true);
  };

  const hideDialog = () => {
    setVisible(false);
  };
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
      <View style={[styles.topContainer, {justifyContent: 'flex-end'}]}>
        {/* <View style={{}}>
          <Image source={logo} resizeMode={'cover'} style={styles.imageStyle} />
        </View> */}
        <View>
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
          // onPress={() => setCurrentIntake(currentIntake + 100)}
          onPress={showDialog}
          style={styles.drinkButton}>
          <Text style={styles.drinkText}>💧 마셨어요</Text>
        </TouchableOpacity>
        <Text>
          {currentIntake}ml / {userInfo.daily_intake}ml
        </Text>
      </View>
      <Modal visible={visible} animationType="slide" transparent>
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
          }}>
          <View
            style={{backgroundColor: 'white', padding: 16, borderRadius: 20}}>
            <Text
              style={[
                styles.ButtonText,
                {fontSize: 30, margin: 10, padding: 10},
              ]}>
              💙
            </Text>
            <View style={{flexDirection: 'row', justifyContent: 'center'}}>
              <TouchableOpacity
                style={[styles.setIntakeButton, {backgroundColor: 'white'}]}>
                <Text style={styles.ButtonText}>100ml ▼</Text>
              </TouchableOpacity>
              <Text
                style={[
                  styles.ButtonText,
                  {
                    margin: 5,
                    alignSelf: 'center',
                  },
                ]}>
                를 기록할까요?
              </Text>
            </View>
            <View style={{flexDirection: 'row'}}>
              <TouchableOpacity
                style={styles.Button}
                // onPress={[{hideDialog}, setCurrentIntake(currentIntake + 100)]}
              >
                <Text style={styles.ButtonText}>맞아요</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.Button, {backgroundColor: 'white'}]}
                onPress={hideDialog}>
                <Text style={[styles.ButtonText, {color: 'gray'}]}>
                  아니에요
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
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
    margin: 10,
  },
  settingImg: {
    width: 48,
    height: 48,
  },
  middleContainer: {
    marginRight: 20,
    marginLeft: 20,
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
    left: 105,
    right: 115,
    bottom: 110,
    margin: 10,
    width: 100,
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 15,
    elevation: 10,
  },
  drinkText: {
    position: 'absolute',
    fontSize: 17,
    justifyContent: 'flex-start',
    fontFamily: 'BMJUA',
    margin: 10,
  },
  setIntakeButton: {
    alignSelf: 'center',
    width: 80,
    padding: 10,
    borderRadius: 15,
    elevation: 10,
    backgroundColor: '#90D7FF',
  },
  Button: {
    alignSelf: 'center',
    width: 80,
    padding: 10,
    margin: 20,
    borderRadius: 15,
    elevation: 10,
    backgroundColor: '#90D7FF',
  },
  ButtonText: {
    fontSize: 15,
    textAlign: 'center',
    fontFamily: 'BMJUA',
  },
});
