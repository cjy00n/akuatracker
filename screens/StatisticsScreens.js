import {StatusBar} from 'expo-status-bar';
import {StyleSheet, Text, View, Image, TextInput, Button} from 'react-native';

export default function StatisticsScreen({navigation}) {
  return (
    <View style={styles.container}>
      <View>
        <Text>나의 통계 </Text>
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
