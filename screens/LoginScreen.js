import {useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  Button,
  StatusBar,
  SafeAreaView,
  ScrollView,
} from 'react-native';
import logo from '../assets/logo.png';
import {signIn} from '../lib/auth';
import {Alert} from 'react-native';

export default function LoginScreen({navigation}) {
  // const isDarkMode = useColorScheme() === 'dark';

  // const backgroundStyle = {
  //   backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  // };

  const [inputEmail, setInputEmail] = useState(' ');
  const [inputPassword, setInputPassword] = useState(' ');

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
      <StatusBar />
      <View style={styles.mainContainer}>
        <Image source={logo} resizeMode={'center'} style={styles.imageStyle} />
        <View style={styles.bodyContainer}>
          <TextInput
            placeholder="이메일"
            style={styles.TextInput}
            onChange={value => setInputEmail(value.nativeEvent.text)}
            returnKeyType={'next'}
            autoComplete={'email'}
          />
          <TextInput
            placeholder="비밀번호"
            style={styles.TextInput}
            onChange={value => setInputPassword(value.nativeEvent.text)}
            returnKeyType={'next'}
            autoComplete={'password'}
            secureTextEntry={true}
          />
          <View style={styles.buttonContainer}>
            <Button
              title="로그인"
              // onPress={() => navigation.navigate('홈')}
              // onPress={signInSubmit({inputEmail, inputPassword})}
              onPress={() => signInSubmit(inputEmail, inputPassword)}
            />
            <Button
              title="회원가입"
              onPress={() => navigation.navigate('회원가입')}
            />
          </View>
        </View>
        <StatusBar style="auto" />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    // width: '90%',
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
  },
  mainContainer: {
    // width: '100%',
    justifyContent: 'center',
    alignSelf: 'center',
  },
  bodyContainer: {
    flex: 1,
    alignSelf: 'center',
    justifyContent: 'center',
  },
  imageStyle: {
    flex: 1,
  },
  TextInput: {
    height: 40,
    width: 150,
    borderRadius: 10,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 5,
  },
  buttonContainer: {
    padding: 10,
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
});
