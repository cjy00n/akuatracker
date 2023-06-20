import {useState, useRef} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  StatusBar,
  TouchableOpacity,
  KeyboardAvoidingView,
} from 'react-native';
import logo from '../assets/logo.png';
import {signIn} from '../lib/auth';
import {Alert} from 'react-native';

export default function LoginScreen({navigation}) {
  const inputEmailRef = useRef();
  const inputPasswordRef = useRef();
  const loginButtonRef = useRef();
  const [inputPassword, setInputPassword] = useState('');
  const [inputEmail, setInputEmail] = useState('');
  const signInSubmit = async (email, password) => {
    console.log(email, password);
    try {
      if (email === '') {
        inputEmailRef.current.focus();
        Alert.alert('경고', '이메일을 입력해주세요.');
      } else if (password === '') {
        inputPasswordRef.current.focus();
        Alert.alert('경고', '비밀번호를 입력해주세요.');
      } else if (email !== '' && password !== '') {
        console.log({email, password});
        await signIn({email, password});
        navigation.navigate('홈');
      }
    } catch (e) {
      const messages = {
        'auth/wrong-password': '잘못된 비밀번호입니다.',
        'auth/user-not-found': '존재하지 않는 계정입니다.',
        'auth/invalid-email': '유효하지 않은 이메일 주소입니다.',
      };
      const msg = messages[e.code] || '로그인실패';
      console.log(e);
      Alert.alert('실패', msg);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.mainContainer}>
        <Image source={logo} resizeMode={'center'} style={styles.logo} />
        <View style={styles.bodyContainer}>
          <TextInput
            ref={inputEmailRef}
            placeholder="  이메일"
            style={styles.TextInput}
            onChange={value => setInputEmail(value.nativeEvent.text)}
            returnKeyType={'next'}
            autoComplete={'email'}
            onSubmitEditing={() => {
              inputPasswordRef.current.focus();
            }}
            blurOnSubmit={false}
          />
          <TextInput
            placeholder="  비밀번호"
            style={styles.TextInput}
            onChange={value => setInputPassword(value.nativeEvent.text)}
            returnKeyType={'done'}
            autoComplete={'password'}
            secureTextEntry={true}
            ref={inputPasswordRef}
            onSubmitEditing={() => signInSubmit(inputEmail, inputPassword)}
            blurOnSubmit={false}
          />
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              ref={loginButtonRef}
              style={[styles.signButton, {backgroundColor: '#90D7FF'}]}
              onPress={() => signInSubmit(inputEmail, inputPassword)}>
              <Text style={styles.textInButton}>로그인</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.signButton, {backgroundColor: 'white'}]}
              onPress={() => navigation.navigate('회원가입')}>
              <Text style={styles.textInButton}>회원가입</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: '100%',
    backgroundColor: '#fff',
    justifyContent: 'space-around',
  },
  mainContainer: {
    alignSelf: 'center',
  },
  bodyContainer: {
    alignSelf: 'center',
  },
  TextInput: {
    height: 40,
    width: 200,
    borderRadius: 15,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 5,
    fontSize: 18,
    fontFamily: 'BMJUA',
  },
  buttonContainer: {
    width: 200,
    marginTop: 10,
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  signButton: {
    width: 95,
    padding: 10,
    borderRadius: 15,
    elevation: 5,
  },
  textInButton: {
    fontFamily: 'BMJUA',
    textAlign: 'center',
  },
});
