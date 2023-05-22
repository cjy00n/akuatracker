import {StyleSheet, Text, View, Image, TextInput, Button} from 'react-native';

export default function UserSettingScreen({navigation}) {
  return (
    <View style={styles.container}>
      <View>
        <Text>사용자 정보 설정 </Text>
        <Text>사용자 정보 </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    width: '100%',
  },
});
