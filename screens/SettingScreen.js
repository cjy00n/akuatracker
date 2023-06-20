import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import CustomButton from '../components/CustomButton';
import setting from '../assets/icon/icon-setting.png';
import usersetting from '../assets/icon/icon-usersetting.png';

export default function Setting({navigation}) {
  return (
    <View style={styles.container}>
      <CustomButton
        icon={usersetting}
        text={'사용자 정보 설정'}
        description={'신체정보, 목표섭취량 설정'}
        onPress={() => navigation.navigate('사용자 정보 설정')}
      />
      <CustomButton
        icon={setting}
        text={'앱 설정'}
        description={'알림 설정'}
        onPress={() => navigation.navigate('앱 설정')}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#90D7FF',
    width: '100%',
  },
  buttonContainer: {
    margin: 10,
    padding: 5,
    borderRadius: 2,
    borderColor: 'gray',
    borderWidth: 1,
  },
});
