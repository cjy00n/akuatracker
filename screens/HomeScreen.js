import {useRef, useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  Modal,
  TouchableOpacity,
  ImageBackground,
  Alert,
} from 'react-native';
import {usersReference} from '../lib/user';
import {subscribeAuth} from '../lib/auth';
import waterback from '../assets/waterback.png';
import waterImg from '../assets/water.png';
import CustomButton from '../components/CustomButton';
import {TextInput} from 'react-native-paper';
import * as Progress from 'react-native-progress';
import ViewShot from 'react-native-view-shot';
import CameraRoll from '@react-native-community/cameraroll';
import Permissions from 'react-native-permissions';
import moment from 'moment';

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
  const viewShotRef = useRef(null);
  let formatToday = moment().utcOffset(9).format('YYYY-MM-DD');

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

  //최초 접속시 초기 DB설정
  useEffect(() => {
    console.log('format', formatToday);
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
  }, [currentIntake, drinkRate]);

  const returnMainText = () => {
    return drinkRate < 100
      ? `\n오늘의 목표량을\n${drinkRate}% 달성했어요💦`
      : '\n오늘의 목표량을\n100% 달성했어요👍🏻';
  };

  const handleCapture = async () => {
    try {
      const permissionStatus = await Permissions.request('photo');

      if (permissionStatus !== 'authorized') {
        throw new Error('Permission not granted');
      }

      const result = await viewShotRef.current.capture();

      await CameraRoll.save(result, {type: 'photo', album: 'MyAlbumName'});

      Alert.alert('Success', 'Image saved to album.');
    } catch (error) {
      Alert.alert('Error', 'Failed to save image.');
    }
  };

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
          <Image
            style={styles.settingImg}
            source={require('../assets/icon/icon-setting.png')}
          />
        </TouchableOpacity>
      </View>
      <View style={styles.middleContainer}>
        <Text style={styles.middleText}>{`${
          userInfo.displayName
        } 님,${returnMainText()}`}</Text>
        <Progress.Bar
          color="#90D7FF"
          style={styles.drinkProgressBar}
          progress={drinkRate / 100}
          width={220}
          height={180}
        />
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
              <ViewShot
                ref={viewShotRef}
                options={{format: 'jpg', quality: 0.9}}>
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
                        fontSize: 27,
                      },
                    ]}>
                    🎉촉촉해졌어요💦
                  </Text>
                  <Text style={[styles.fulfilledText, {margin: 10}]}>
                    {userInfo.displayName}님,{'\n'}오늘은 물을 충분히 마셨어요!
                  </Text>
                </View>
              </ViewShot>
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
                <TouchableOpacity
                  style={styles.saveButton}
                  onPress={handleCapture}>
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
                  value={currentUnitIntake.toString()}
                  onChange={value =>
                    setCurrentUnitIntake(parseInt(value.nativeEvent.text))
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
        icon={require('../assets/icon/icon-chart.png')}
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
    height: 200,
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
    fontSize: 18,
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
  drinkProgressBar: {
    alignSelf: 'center',
    transform: [{rotate: '-90deg'}],
    top: 175,
    position: 'absolute',
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
