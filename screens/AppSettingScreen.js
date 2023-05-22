import {StyleSheet, Text, View, Image, TextInput, Button} from 'react-native';

export default function AppSettingScreen({navigation}) {
  return (
    <View style={styles.container}>
      <View>
        <Text>앱 설정 </Text>
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
