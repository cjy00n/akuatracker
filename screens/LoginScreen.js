import {useState} from 'react';
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
  const [inputPassword, setInputPassword] = useState(' ');
  const [inputEmail, setInputEmail] = useState('');
  const signInSubmit = async (email, password) => {
    try {
      if (email !== null && password !== null) {
        console.log({email, password});
        await signIn({email, password});
        navigation.navigate('홈');
      }
    } catch (e) {
      const messages = {
        'auth/email-already-in-use': '이미 가입된 이메일입니다.',
        'auth/wrong-password': '잘못된 비밀번호입니다.',
        'auth/user-not-found': '존재하지 않는 계정입니다.',
        'auth/invalid-email': '유효하지 않은 이메일 주소입니다.',
      };
      const msg = `로그인실패`;
      console.log(e);
      Alert.alert('실패', msg);
    }
    //  finally {
    //   // setLoading(false);
    // }
  };

  return (
    <View style={styles.container}>
      <View style={styles.mainContainer}>
        <Image source={logo} resizeMode={'center'} style={styles.logo} />
        <View style={styles.bodyContainer}>
          <TextInput
            placeholder="  이메일"
            style={styles.TextInput}
            onChange={value => setInputEmail(value.nativeEvent.text)}
            returnKeyType={'next'}
            autoComplete={'email'}
          />
          <TextInput
            placeholder="  비밀번호"
            style={styles.TextInput}
            onChange={value => setInputPassword(value.nativeEvent.text)}
            returnKeyType={'next'}
            autoComplete={'password'}
            secureTextEntry={true}
          />
          <View style={styles.buttonContainer}>
            <TouchableOpacity
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
