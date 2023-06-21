/* eslint-disable react/self-closing-comp */
import React, {useState, useRef} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StatusBar,
} from 'react-native';
import {RadioGroup} from 'react-native-radio-buttons-group';
import {RadioButton} from 'react-native-paper';
import DropDownPicker from 'react-native-dropdown-picker';
import {Alert} from 'react-native';
import {signUp, subscribeAuth} from '../lib/auth';
import {createUser, getUser} from '../lib/user';

export default function SignUpScreen({navigation}) {
  const inputEmailRef = useRef();
  const inputPasswordRef = useRef();
  const inputCheckPasswordRef = useRef();
  const inputDisplayNameRef = useRef();
  const inputHeightRef = useRef();
  const inputWeightRef = useRef();
  const inputAgeRef = useRef();
  const inputDailyIntakeRef = useRef();
  const inputUnitIntakeRef = useRef();
  const inputRefs = [
    inputEmailRef,
    inputPasswordRef,
    inputCheckPasswordRef,
    inputDisplayNameRef,
    inputHeightRef,
    inputWeightRef,
    inputAgeRef,
    inputDailyIntakeRef,
    inputUnitIntakeRef,
  ];
  const [inputEmail, setInputEmail] = useState('');
  const [inputPassword, setInputPassword] = useState('');
  const [inputCheckPassword, setInputCheckPassword] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [height, setHeight] = useState();
  const [weight, setWeight] = useState(60);
  const [age, setAge] = useState();
  const [gender, setGender] = useState('남성');
  const [daily_intake, setDailyIntake] = useState(weight * 30); //단위ml
  const [unit_intake, setUnitIntake] = useState(100); //단위ml
  const states = [
    inputEmail,
    inputPassword,
    inputCheckPassword,
    displayName,
    height,
    weight,
    age,
    gender,
    daily_intake,
    unit_intake,
  ];
  const signUpSubmit = async (email, password) => {
    let isAnyFieldEmpty = false;
    const checkPassword = inputPassword === inputCheckPassword;
    if (checkPassword === false) {
      inputCheckPasswordRef.current.focus();
      Alert.alert('경고', '비밀번호가 일치하지 않습니다.');
    }
    for (let i = 0; i < inputRefs.length; i++) {
      if (states[i] === '' || states[i] === null) {
        console.log(states[i]);
        inputRefs[i]?.current.focus();
        isAnyFieldEmpty = true;
        Alert.alert('경고', '기입하지 않은 항목이 있습니다.');
        break;
      }
    }

    if (!isAnyFieldEmpty && checkPassword) {
      try {
        const {user} = await signUp({email, password});
        createUser({
          id: user.uid,
          email: email,
          displayName,
          height,
          weight,
          age,
          gender,
          daily_intake,
          unit_intake,
        });
        navigation.navigate('홈');
      } catch (e) {
        const messages = {
          'auth/email-already-in-use': '이미 가입된 이메일입니다.',
          'auth/wrong-password': '잘못된 비밀번호입니다.',
          'auth/user-not-found': '존재하지 않는 계정입니다.',
          'auth/invalid-email': '유효하지 않은 이메일 주소입니다.',
        };
        const msg = messages[e.code] || '가입 실패';
        console.log(e);
        Alert.alert('실패', msg);
      }
    }
  };
  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={styles.mainContainer}>
          <View style={styles.middleContainer}>
            <Text style={styles.headerText}>🔒 계정</Text>
            <View style={styles.contentContainer}>
              <View
                style={{
                  flexDirection: 'row',
                }}>
                <Text style={styles.contentText}>이메일</Text>
              </View>
              <TextInput
                textContentType="emailAddress"
                placeholder="abc1234@gmail.com"
                style={styles.TextInput}
                onChange={value => setInputEmail(value.nativeEvent.text)}
                returnKeyType={'next'}
                autoComplete={'email'}
                ref={inputEmailRef}
              />
            </View>
            <Text
              style={{
                textAlign: 'center',
                fontFamily: 'BMJUA',
                fontSize: 10,
              }}></Text>
            <View style={styles.contentContainer}>
              <Text style={styles.contentText}>비밀번호</Text>
              <TextInput
                ref={inputPasswordRef}
                onSubmitEditing={() => {
                  inputCheckPasswordRef.current.focus();
                }}
                blurOnSubmit={false}
                placeholder="******"
                style={[styles.TextInput, {fontFamily: null}]}
                onChange={value => setInputPassword(value.nativeEvent.text)}
                autoComplete={'password'}
                secureTextEntry={true}
              />
            </View>
            <Text style={styles.WarningText}>
              {inputPassword.length > 0 && inputPassword.length < 6
                ? '비밀번호는 6자 이상이어야 합니다.'
                : ''}
            </Text>
            <View style={styles.contentContainer}>
              <Text style={styles.contentText}>비밀번호 확인</Text>
              <TextInput
                placeholder="******"
                style={[styles.TextInput, {fontFamily: null}]}
                onChange={value =>
                  setInputCheckPassword(value.nativeEvent.text)
                }
                onSubmitEditing={() => {
                  inputDisplayNameRef.current.focus();
                }}
                blurOnSubmit={false}
                returnKeyType={'next'}
                autoComplete={'password'}
                secureTextEntry={true}
                ref={inputCheckPasswordRef}
              />
            </View>
            <Text style={styles.WarningText}>
              {inputCheckPassword.length > 0 &&
              inputPassword !== inputCheckPassword
                ? '비밀번호가 다릅니다.'
                : ''}
            </Text>
            <View style={styles.contentContainer}>
              <Text style={styles.contentText}>닉네임</Text>
              <TextInput
                onSubmitEditing={() => {
                  inputHeightRef.current.focus();
                }}
                blurOnSubmit={false}
                ref={inputDisplayNameRef}
                placeholder="김소복"
                style={styles.TextInput}
                onChange={value => setDisplayName(value.nativeEvent.text)}
              />
            </View>
          </View>
          <View style={styles.middleContainer}>
            <Text style={styles.headerText}>🏃🏻‍♂️ 신체 정보</Text>
            <View style={styles.contentContainer}>
              <Text style={styles.contentText}>신장</Text>
              <View style={styles.contentContainer}>
                <TextInput
                  onSubmitEditing={() => {
                    inputWeightRef.current.focus();
                  }}
                  blurOnSubmit={false}
                  ref={inputHeightRef}
                  placeholder="160"
                  style={styles.TextInput}
                  keyboardType={'numeric'}
                  onChange={value => setHeight(value.nativeEvent.text)}
                />
                <Text style={styles.contentText}> cm</Text>
              </View>
            </View>
            <View style={styles.contentContainer}>
              <Text style={styles.contentText}>체중</Text>
              <View style={styles.contentContainer}>
                <TextInput
                  onSubmitEditing={() => {
                    inputAgeRef.current.focus();
                  }}
                  blurOnSubmit={false}
                  ref={inputWeightRef}
                  placeholder="50"
                  keyboardType={'numeric'}
                  style={styles.TextInput}
                  onChange={value => setWeight(value.nativeEvent.text)}
                />
                <Text style={styles.contentText}> kg</Text>
              </View>
            </View>
            <View style={styles.contentContainer}>
              <Text style={styles.contentText}>나이</Text>
              <View style={styles.contentContainer}>
                <Text style={styles.contentText}> 만 </Text>
                <TextInput
                  keyboardType={'numeric'}
                  onSubmitEditing={() => {
                    inputDailyIntakeRef.current.focus();
                  }}
                  blurOnSubmit={false}
                  ref={inputAgeRef}
                  placeholder="24"
                  style={styles.TextInput}
                  onChange={value => setAge(value.nativeEvent.text)}
                />
                <Text style={styles.contentText}> 세</Text>
              </View>
            </View>
            <View style={styles.contentContainer}>
              <Text style={styles.contentText}>성별</Text>
              <View style={styles.contentContainer}>
                <RadioGroup
                  radioButtons={[
                    {id: 0, label: '남성', value: '남'},
                    {id: 1, label: '여성', value: '여'},
                  ]}
                  onPress={value => setGender(value)}
                  selectedId={gender === '남성' ? 0 : 1}
                  layout="row"
                />
              </View>
            </View>
          </View>
          <View style={styles.middleContainer}>
            <Text style={styles.headerText}>💦 일일 섭취량</Text>
            <View style={styles.contentContainer}>
              <Text style={styles.contentText}>일일 목표 섭취량</Text>
              <View style={styles.contentContainer}>
                <TextInput
                  keyboardType={'numeric'}
                  onSubmitEditing={() => {
                    inputUnitIntakeRef.current.focus();
                  }}
                  blurOnSubmit={false}
                  ref={inputDailyIntakeRef}
                  placeholder={`(권장) ${weight * 30}`}
                  onChange={value => setDailyIntake(value.nativeEvent.text)}
                  style={styles.TextInput}
                />
                <Text style={styles.contentText}> ml</Text>
              </View>
            </View>
            <View style={styles.contentContainer}>
              <Text style={styles.contentText}>1회 섭취량</Text>
              <View style={styles.contentContainer}>
                <TextInput
                  keyboardType={'numeric'}
                  onSubmitEditing={() => {
                    signUpSubmit(inputEmail, inputPassword);
                  }}
                  blurOnSubmit={false}
                  ref={inputUnitIntakeRef}
                  placeholder="100"
                  style={styles.TextInput}
                  onChange={value => setUnitIntake(value.nativeEvent.text)}
                />
                <Text style={styles.contentText}> ml</Text>
              </View>
            </View>
          </View>
          <TouchableOpacity
            style={styles.completeButton}
            onPress={() => signUpSubmit(inputEmail, inputPassword)}>
            <Text style={styles.ButtonText}>회원가입완료</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: '100%',
    backgroundColor: 'white',
  },
  mainContainer: {
    justifyContent: 'space-around',
    width: '100%',
  },
  headerText: {
    color: 'black',
    padding: 10,
    margin: 5,
    fontSize: 20,
    fontFamily: 'BMJUA',
  },
  contentText: {
    fontSize: 15,
    fontFamily: 'BMJUA',
  },
  contentContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 3,
  },
  middleContainer: {
    alignSelf: 'center',
    width: '90%',
    borderRadius: 20,
    margin: 10,
    padding: 5,
    borderColor: 'gray',
    borderWidth: 2,
  },
  TextInput: {
    height: 35,
    width: 150,
    borderRadius: 10,
    borderColor: 'gray',
    borderWidth: 1,
    color: 'black',
    fontFamily: 'BMJUA',
    fontSize: 13,
  },
  WarningText: {
    textAlign: 'center',
    fontFamily: 'BMJUA',
    fontSize: 10,
    color: 'red',
  },
  ButtonText: {
    fontFamily: 'BMJUA',
    textAlign: 'center',
  },
  completeButton: {
    alignSelf: 'center',
    width: 200,
    padding: 15,
    margin: 20,
    borderRadius: 15,
    elevation: 10,
    backgroundColor: '#90D7FF',
  },
});
