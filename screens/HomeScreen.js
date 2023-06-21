import {useState, useEffect, useRef} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  Button,
  Modal,
  TouchableOpacity,
  ImageBackground,
} from 'react-native';
import {usersReference} from '../lib/user';
import {subscribeAuth} from '../lib/auth';
import chart from '../assets/icon/icon_chart.png';
import setting from '../assets/icon/icon-setting.png';
import waterback from '../assets/waterback.png';
import CustomButton from '../components/CustomButton';
import waterImg from '../assets/water.png';
import {TextInput} from 'react-native-paper';
const moment = require('moment');

export default function HomeScreen({navigation}) {
  const [userID, setUserId] = useState('');
  const [userInfo, setUserInfo] = useState({
    dailyIntake: 1500,
    unitIntake: 120,
    displayName: '',
  });
  const [currentIntake, setCurrentIntake] = useState(0);
  const [currentUnitIntake, setCurrentUnitIntake] = useState(100);
  const [drinkRate, setDrinkRate] = useState(0);
  const [visible, setVisible] = useState(false);
  const [visible2, setVisible2] = useState(false);

  const showDrinkDialog = () => {
    setVisible(true);
  };

  const hideDrinkDialog = () => {
    setVisible(false);
  };
  const showFulfilledDialog = () => {
    setVisible2(true);
  };

  const hideFulfilledDialog = () => {
    setVisible2(false);
  };

  const koreanNow = moment().utcOffset(9); // 한국 시간으로 변환 (UTC +9:00)
  const formatToday = `${koreanNow.format('YYYY')}-${koreanNow.format(
    'MM',
  )}-${koreanNow.format('DD')}`;
  const formatHour = koreanNow.format('HH').toString();
  const formatMin = koreanNow.format('mm').toString();

  //최초 접속시 초기 DB설정
  useEffect(() => {
    let userDrinkReference;
    subscribeAuth(async user => {
      if (user) {
        setUserId(user.uid.toString());
        userDrinkReference = usersReference
          .child(user.uid)
          .child('DrinkInfo')
          .child(formatToday);
        const dailyInfo = await userDrinkReference.once('value');
        if (!dailyInfo.val()) {
          userDrinkReference.set({
            today_Intake: 0,
            today_percent: 0,
            fulfilled: false,
          });
          setCurrentIntake(0);
        } else {
          const data = dailyInfo.val();
          setCurrentIntake(data.today_Intake);
          setDrinkRate(data.today_percent);
        }
        usersReference
          .child(user.uid)
          .child('UserInfo')
          .once('value', snapshot => {
            const data = snapshot.val();
            if (data !== null) {
              setUserInfo({
                dailyIntake: data.daily_intake,
                unitIntake: data.unit_intake,
                displayName: data.displayName,
              });
              setCurrentUnitIntake(data.unit_intake);
            }
          });
      } else {
        navigation.navigate('로그인');
      }
    });
  }, []);

  useEffect(() => {
    if (userID !== '' && currentIntake !== 0) {
      setDrinkRate(Math.ceil((currentIntake / userInfo.dailyIntake) * 100));
      console.log('drinkRate', drinkRate);
      usersReference
        .child(userID)
        .child('DrinkInfo')
        .child(formatToday)
        .set({
          today_Intake: currentIntake,
          today_percent: drinkRate,
          fulfilled: userInfo.dailyIntake <= currentIntake,
        });
    }
  }, [currentIntake]);

  const returnMainText = () => {
    return drinkRate < 100
      ? `\n오늘의 목표량을\n${drinkRate}% 달성했어요💦`
      : '\n오늘의 목표량을\n100% 달성했어요👍🏻';
  };
  // const addHourDrink = () => {
  //   let hourReference = usersReference
  //     .child(userID)
  //     .child('DrinkInfo')
  //     .child(formatToday)
  //     .child('HourInfo');
  //   if (hourReference) {
  //     hourReference.push({formatMin: userInfo.unitIntake});
  //   }
  // };
  return (
    <View style={styles.container}>
      <View style={styles.topContainer}>
        {drinkRate >= 100 ? (
          <TouchableOpacity
            style={styles.settingButton}
            onPress={showFulfilledDialog}>
            <Image
              style={styles.settingImg}
              source={require('../assets/icon/icon-party.png')}
            />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity>
            <Image
              style={styles.settingImg}
              source={require('../assets/icon/icon-null.png')}
            />
          </TouchableOpacity>
        )}
        <TouchableOpacity>
          <Image
            style={{width: 150, height: 70}}
            source={require('../assets/logo.png')}
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.settingButton}
          onPress={() => navigation.navigate('설정')}>
          <Image style={styles.settingImg} source={setting} />
        </TouchableOpacity>
      </View>
      <View style={styles.middleContainer}>
        <Text style={styles.middleText}>{`${
          userInfo.displayName
        } 님,${returnMainText()}`}</Text>
        <Image source={waterImg} />
        <TouchableOpacity onPress={showDrinkDialog} style={styles.drinkButton}>
          <Text style={styles.drinkText}>💧마셨어요</Text>
        </TouchableOpacity>
        <Text style={styles.showIntake}>
          {currentIntake}ml /{userInfo.dailyIntake}ml
        </Text>
      </View>
      <Modal visible={visible2} animationType="slide" transparent>
        <View
          style={{
            flex: 1,
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
          }}>
          <ImageBackground
            source={waterback}
            style={{
              borderRadius: 10,
              resizeMode: 'center',
              justifyContent: 'center',
            }}>
            <View
              style={{
                justifyContent: 'center',
                backgroundColor: null,
                borderRadius: 20,
                width: '100%',
                height: '100%',
              }}>
              <View style={styles.fulfilledContainer}>
                <Text
                  style={[
                    styles.fulfilledText,
                    {
                      fontSize: 30,
                    },
                  ]}>
                  💕🌈🐋💞✨
                </Text>
                <Text
                  style={[
                    styles.fulfilledText,
                    {
                      fontSize: 25,
                    },
                  ]}>
                  🎉촉촉해졌어요💦
                </Text>
                <Text style={[styles.fulfilledText, {margin: 10}]}>
                  {userInfo.displayName}님,{'\n'}오늘은 물을 충분히 마셨어요!
                </Text>
              </View>
              <TouchableOpacity
                style={[styles.Button, {backgroundColor: '#c7ebff'}]}
                onPress={hideFulfilledDialog}>
                <Text style={styles.ButtonText}>알겠어요</Text>
              </TouchableOpacity>
              <View style={{flexDirection: 'row', justifyContent: 'center'}}>
                <TouchableOpacity style={styles.saveButton} onPress={() => {}}>
                  <Image
                    style={styles.saveImg}
                    source={require('../assets/icon/icon-instagram.png')}
                  />
                </TouchableOpacity>
                <TouchableOpacity style={styles.saveButton} onPress={() => {}}>
                  <Image
                    style={styles.saveImg}
                    source={require('../assets/icon/icon-facebook.png')}
                  />
                </TouchableOpacity>
                <TouchableOpacity style={styles.saveButton} onPress={() => {}}>
                  <Image
                    style={styles.saveImg}
                    source={require('../assets/icon/icon-save.png')}
                  />
                </TouchableOpacity>
              </View>
            </View>
          </ImageBackground>
        </View>
      </Modal>
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
                <TextInput
                  style={styles.TextInput}
                  keyboardType={'numeric'}
                  value={currentUnitIntake}
                  onChange={value =>
                    setCurrentUnitIntake(value.nativeEvent.text)
                  }
                />
              </TouchableOpacity>
              <Text
                style={[
                  styles.ButtonText,
                  {
                    margin: 10,
                    alignSelf: 'center',
                  },
                ]}>
                ml 를 기록할까요?
              </Text>
            </View>
            <View style={{flexDirection: 'row'}}>
              <TouchableOpacity
                style={styles.Button}
                onPress={() => {
                  hideDrinkDialog();
                  setCurrentIntake(
                    parseInt(currentIntake) + parseInt(currentUnitIntake),
                  );
                  setDrinkRate(
                    Math.ceil((currentIntake / userInfo.dailyIntake) * 100),
                  );

                  if (drinkRate >= 100) {
                    showFulfilledDialog();
                  }
                  // addHourDrink();
                }}>
                <Text style={styles.ButtonText}>맞아요</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.Button, {backgroundColor: 'white'}]}
                onPress={hideDrinkDialog}>
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
    justifyContent: 'space-between',
    marginBottom: 30,
    elevation: 10,
    backgroundColor: '#FFFFFF',
  },
  imageStyle: {
    alignSelf: 'center',
    height: 50,
    width: 150,
  },
  settingButton: {
    margin: 10,
  },
  settingImg: {
    width: 45,
    height: 45,
  },
  fulfilledContainer: {
    height: 180,
    margin: 15,
    marginTop: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
    backgroundColor: 'white',
    padding: 10,
    elevation: 10,
  },
  fulfilledText: {
    textAlign: 'center',
    fontFamily: 'BMJUA',
    fontSize: 15,
    color: 'black',
  },
  saveButton: {
    alignSelf: 'center',
    width: 50,
    height: 50,
    margin: 10,
    borderRadius: 30,
    elevation: 10,
    backgroundColor: 'white',
    justifyContent: 'center',
  },
  saveImg: {
    width: 32,
    height: 32,
    alignSelf: 'center',
  },
  middleContainer: {
    marginRight: 20,
    marginLeft: 20,
    marginBottom: 10,
    padding: 20,
    borderRadius: 20,
    backgroundColor: 'white',
    alignItems: 'center',
    elevation: 10,
  },
  middleText: {
    color: 'black',
    fontSize: 30,
    justifyContent: 'flex-start',
    fontFamily: 'BMJUA',
    margin: 15,
  },
  drinkButton: {
    position: 'absolute',
    top: 240,
    left: 110,
    right: 110,
    bottom: 165,
    margin: 10,
    width: 110,
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 20,
    elevation: 10,
  },
  drinkText: {
    color: 'black',
    position: 'absolute',
    fontSize: 17,
    justifyContent: 'center',
    fontFamily: 'BMJUA',
    margin: 10,
  },
  showIntake: {
    color: 'black',
    margin: 20,
    fontSize: 20,
    fontFamily: 'BMJUA',
  },
  setIntakeButton: {
    alignSelf: 'center',
    width: 80,
    padding: 5,
    borderRadius: 10,
    elevation: 5,
    backgroundColor: '#90D7FF',
  },
  TextInput: {
    textAlign: 'center',
    alignSelf: 'center',
    height: 30,
    width: 70,
    borderColor: null,
    backgroundColor: null,
    fontSize: 15,
    fontFamily: 'BMJUA',
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
    color: 'black',
    fontSize: 15,
    textAlign: 'center',
    fontFamily: 'BMJUA',
  },
});
