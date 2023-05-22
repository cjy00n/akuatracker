import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  TouchableOpacity,
} from 'react-native';

export default function Setting({navigation}) {
  return (
    <View style={styles.container}>
      <View>
        <Text>설정 </Text>
      </View>
      <TouchableOpacity
        style={styles.buttonContainer}
        onPress={() => navigation.navigate('앱 설정')}>
        <Text>앱 설정</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.buttonContainer}
        onPress={() => navigation.navigate('사용자 정보 설정')}>
        <Text>사용자 정보 설정</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
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
