import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  LogBox,
  ScrollView,
  StatusBar,
  Button,
} from 'react-native';
import {RadioGroup} from 'react-native-radio-buttons-group';
import DropDownPicker from 'react-native-dropdown-picker';
import {Alert} from 'react-native';
import {signUp, subscribeAuth} from '../lib/auth';
import {createUser, getUser} from '../lib/user';
export default function SignUpScreen({navigation}) {
  const [inputEmail, setInputEmail] = useState(' ');
  const [inputPassword, setInputPassword] = useState(' ');
  const [displayName, setDisplayName] = useState(' ');
  const [height, setHeight] = useState(160);
  const [weight, setWeight] = useState(50);
  const [age, setage] = useState(20);
  const [genderId, setGenderId] = useState(0);
  const [significant, setSignificant] = useState('없음');
  const [daily_intake, setDailyIntake] = useState(weight * 30); //단위ml
  const [unit_intake, setUnitIntake] = useState(100); //단위ml
  const [open, setOpen] = useState(false);
  // const [form, setForm] = useState({
  //   email: 'abc1234@naver.com',
  //   password: '123456',
  //   confirmPassword: '',
  // });
  const signUpSubmit = async (email, password) => {
    try {
      console.log({email, password});
      const {user} = await signUp({email, password});
      createUser({
        id: user.uid,
        displayName,
        height,
        weight,
        age,
        gender: genderId == 0 ? '남' : '여',
        significant,
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
      const msg = `가입실패`;
      console.log(e);
      Alert.alert('실패', msg);
    }
    //  finally {
    //   // setLoading(false);
    // }
  };

  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={styles.mainContainer}>
          <View style={styles.middleContainer}>
            <Text style={styles.headerText}>🔒 계정</Text>
            <View style={styles.contentContainer}>
              <Text style={styles.contentText}>이메일</Text>
              <TouchableOpacity>
                <Text
                  style={{
                    fontFamily: 'BMJUA',
                  }}>
                  중복확인
                </Text>
              </TouchableOpacity>
              <TextInput
                textContentType="emailAddress"
                placeholder="sobok_kim00@gmail.com"
                style={styles.TextInput}
                onChange={value => setInputEmail(value.nativeEvent.text)}
                returnKeyType={'next'}
                autoComplete={'email'}
              />
            </View>
            <View style={styles.contentContainer}>
              <Text style={styles.contentText}>비밀번호</Text>
              <TextInput
                placeholder="********"
                style={styles.TextInput}
                onChange={value => setInputPassword(value.nativeEvent.text)}
                returnKeyType={'next'}
                autoComplete={'password'}
                secureTextEntry={true}
              />
            </View>
            <View style={styles.contentContainer}>
              <Text style={styles.contentText}>비밀번호 확인</Text>
              <TextInput placeholder="********" style={styles.TextInput} />
            </View>
            <View style={styles.contentContainer}>
              <Text style={styles.contentText}>닉네임</Text>
              <TextInput
                placeholder="김소복"
                style={styles.TextInput}
                onChange={value => setDisplayName(value.nativeEvent.text)}
              />
            </View>
          </View>
          <View style={styles.middleContainer}>
            <Text style={styles.headerText}>🏃🏻‍♂️ 신체 정보</Text>
            <View style={{flexDirection: 'row'}}>
              <View style={styles.contentContainer}>
                <Text style={styles.contentText}>신장</Text>
                <TextInput placeholder="160" style={styles.TextInput} />
                <Text style={styles.contentText}>cm</Text>
              </View>
              <View style={styles.contentContainer}>
                <Text style={styles.contentText}>체중</Text>
                <TextInput placeholder="50" style={styles.TextInput} />
                <Text style={styles.contentText}>kg</Text>
              </View>
            </View>
            <View style={{flexDirection: 'row'}}>
              <View style={styles.contentContainer}>
                <Text style={styles.contentText}>나이</Text>
                <Text style={styles.contentText}> 만</Text>
                <TextInput placeholder="24" style={styles.TextInput} />
                <Text style={styles.contentText}>세</Text>
              </View>
              <View style={styles.contentContainer}>
                <Text style={styles.contentText}>성별</Text>
                <RadioGroup
                  radioButtons={[
                    {id: 0, label: '남성', value: '남'},
                    {id: 1, label: '여성', value: '여'},
                  ]}
                  onPress={id => setGenderId(id)}
                  selectedId={genderId}
                  layout="row"
                />
              </View>
            </View>
          </View>
          <View style={styles.middleContainer}>
            <Text style={styles.headerText}>💦 일일 섭취량</Text>
            <View style={styles.contentContainer}>
              <Text style={styles.contentText}>특이사항</Text>
              <DropDownPicker
                value={significant}
                style={{width: 90, height: 35}}
                items={[
                  {label: '없음', value: '없음'},
                  {label: '임산부', value: '임산부'},
                  {label: '다이어터', value: '다이어터'},
                  {label: '운동마니아', value: '운동마니아'},
                ]}
              />
            </View>
            <Text style={styles.contentText}>일일섭취량</Text>
          </View>
          <TouchableOpacity
            onPress={() => signUpSubmit(inputEmail, inputPassword)}>
            <Text style={styles.completeButton}>회원가입완료</Text>
          </TouchableOpacity>
          <StatusBar style="auto" />
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
    padding: 5,
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
    justifyContent: 'space-between',
    padding: 5,
  },
  middleContainer: {
    alignSelf: 'center',
    width: '95%',
    borderRadius: 20,
    margin: 5,
    padding: 5,
    borderColor: 'gray',
    borderWidth: 2,
  },
  TextInput: {
    height: 35,
    width: 90,
    borderRadius: 10,
    borderColor: 'gray',
    borderWidth: 1,
    fontFamily: 'BMJUA',
    fontSize: 13,
  },
  completeButton: {
    fontFamily: 'BMJUA',
    fontSize: 20,
    textAlign: 'center',
    alignSelf: 'center',
    width: 200,
    padding: 10,
    margin: 20,
    borderRadius: 15,
    elevation: 10,
    backgroundColor: '#90D7FF',
  },
});
