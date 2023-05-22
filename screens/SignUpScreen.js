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
  const [significant, setSignificant] = useState('');
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
            <Text style={styles.headerText}>계정</Text>
            <View style={styles.contentContainer}>
              <Text style={styles.contentText}>이메일</Text>
              <Button title={'중복확인'}></Button>
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
              <TextInput placeholder="김소복" style={styles.TextInput} />
            </View>
          </View>
          <View style={styles.middleContainer}>
            <Text style={styles.headerText}>신체정보</Text>
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
            <View style={styles.contentContainer}>
              <Text style={styles.contentText}>나이</Text>
              <Text style={styles.contentText}>만</Text>
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
          <View style={styles.middleContainer}>
            <Text style={styles.headerText}>일일섭취량</Text>
            <View style={styles.contentContainer}>
              <Text style={styles.contentText}>특이사항</Text>
              <DropDownPicker
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
          <Button
            title={'회원가입완료'}
            onPress={() => signUpSubmit(inputEmail, inputPassword)}
          />
          <StatusBar style="auto" />
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    alignItems: 'flex-start',
  },
  mainContainer: {
    width: '100%',
    justifyContent: 'space-between',
  },
  headerText: {
    fontSize: 30,
  },
  contentText: {
    fontSize: 20,
  },
  contentContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
  },
  middleContainer: {
    borderRadius: 10,
    borderColor: 'gray',
    borderWidth: 1,
    margin: 10,
    padding: 10,
  },
  TextInput: {
    height: 40,
    width: 150,
    borderRadius: 10,
    borderColor: 'gray',
    borderWidth: 1,
  },
});
