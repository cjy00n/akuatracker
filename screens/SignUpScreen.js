import React, {useState} from 'react';
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
  const [inputEmail, setInputEmail] = useState(' ');
  const [inputPassword, setInputPassword] = useState(' ');
  const [displayName, setDisplayName] = useState(' ');
  const [height, setHeight] = useState(160);
  const [weight, setWeight] = useState(50);
  const [age, setAge] = useState(20);
  const [gender, setGender] = useState('남성');
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
        gender,
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
              <View
                style={{
                  flexDirection: 'row',
                }}>
                <Text style={styles.contentText}>이메일</Text>
                <TouchableOpacity style={styles.DoubleCheckButton}>
                  <Text style={styles.ButtonText}>중복확인</Text>
                </TouchableOpacity>
              </View>

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
                // secureTextEntry={true}
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
            <View style={styles.contentContainer}>
              <Text style={styles.contentText}>신장</Text>
              <View style={styles.contentContainer}>
                <TextInput
                  placeholder="160"
                  style={styles.TextInput}
                  onChange={value => setHeight(value.nativeEvent.text)}
                />
                <Text style={styles.contentText}> cm</Text>
              </View>
            </View>
            <View style={styles.contentContainer}>
              <Text style={styles.contentText}>체중</Text>
              <View style={styles.contentContainer}>
                <TextInput
                  placeholder="50"
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
                  placeholder="24"
                  style={styles.TextInput}
                  onChange={value => setAge(value.nativeEvent.text)}
                />
                <Text style={styles.contentText}> 세</Text>
              </View>
            </View>
            <View style={styles.contentContainer}>
              <Text style={styles.contentText}>성별</Text>
              {/* <View style={{flexDirection: 'row'}}>
                  <RadioButton.Group
                    style={{flexDirection: 'row'}}
                    onValueChange={setGender}
                    value={gender}>
                    <RadioButton.Item lavel="남성" value="남성" />\
                    <RadioButton.Item lavel="여성" value="여성" />
                  </RadioButton.Group>
                </View> */}
              <View style={styles.contentContainer}>
                <RadioGroup
                  radioButtons={[
                    {id: 0, label: '남성', value: '남'},
                    {id: 1, label: '여성', value: '여'},
                  ]}
                  onPress={value => setGender(value)}
                  selectedId={gender == '남성' ? 0 : 1}
                  layout="row"
                />
              </View>
            </View>
          </View>
          <View style={styles.middleContainer}>
            <Text style={styles.headerText}>💦 일일 섭취량</Text>
            {/* <View style={styles.contentContainer}>
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
            </View> */}
            <View style={styles.contentContainer}>
              <Text style={styles.contentText}>일일 목표 섭취량</Text>
              <View style={styles.contentContainer}>
                <TextInput
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
                  placeholder="100ml"
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
    fontFamily: 'BMJUA',
    fontSize: 13,
  },
  DoubleCheckButton: {
    marginLeft: 10,
    elevation: 10,
    width: 60,
    height: 25,
    borderRadius: 5,
    backgroundColor: 'white',
    justifyContent: 'center',
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
