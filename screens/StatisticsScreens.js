import {
  StyleSheet,
  ScrollView,
  Text,
  View,
  Image,
  TextInput,
  Button,
} from 'react-native';

export default function StatisticsScreen({navigation}) {
  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={styles.mainContainer}>
          <View style={styles.middleContainer}>
            <Text style={styles.headerText}>☀️하루통계</Text>
          </View>
          <View style={styles.middleContainer}>
            <Text style={styles.headerText}>📈주별통계</Text>
          </View>
          <View style={styles.middleContainer}>
            <Text style={styles.headerText}>🗓️월별 통계</Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    width: '100%',
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
  middleContainer: {
    alignSelf: 'center',
    width: '95%',
    borderRadius: 20,
    margin: 5,
    padding: 5,
    borderColor: 'gray',
    borderWidth: 2,
  },
});
