import {
  StyleSheet,
  ScrollView,
  Text,
  View,
  Image,
  TextInput,
  Button,
} from 'react-native';
import {useState} from 'react';
import {BarChart} from 'react-native-chart-kit';
import {Calendar} from 'react-native-calendars';
export default function StatisticsScreen({navigation}) {
  const todayData = {
    labels: ['0', '6', '12', '18', '24'],
    datasets: [
      {
        data: [20, 45, 28, 80, 99],
      },
    ],
  };
  const weekData = {
    labels: ['월', '화', '수', '목', '금', '토', '일'],
    datasets: [
      {
        data: [20, 45, 28, 80, 99, 0, 0],
      },
    ],
  };
  const [markedDates, setMarkedDates] = useState({
    '2023-06-05': {selected: true},
  });
  const customStyles = {
    container: {
      backgroundColor: 'blue',
    },
    text: {
      color: 'white',
      fontWeight: 'bold',
    },
  };
  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={styles.mainContainer}>
          <View style={styles.middleContainer}>
            <Text style={styles.headerText}>☀️하루통계</Text>
            <BarChart
              data={todayData}
              width={300}
              height={200}
              chartConfig={{
                backgroundColor: '#ffffff',
                backgroundGradientFrom: '#ffffff',
                backgroundGradientTo: '#ffffff',
                decimalPlaces: 0,
                color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                style: {
                  borderRadius: 16,
                },
              }}
            />
          </View>
          <View style={styles.middleContainer}>
            <Text style={styles.headerText}>📈주별통계</Text>
            <BarChart
              data={weekData}
              width={300}
              height={200}
              chartConfig={{
                backgroundColor: '#ffffff',
                backgroundGradientFrom: '#ffffff',
                backgroundGradientTo: '#ffffff',
                decimalPlaces: 0,
                color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                style: {
                  borderRadius: 16,
                },
              }}
            />
          </View>
          <View style={styles.middleContainer}>
            <Text style={styles.headerText}>🗓️월별 통계</Text>
            <Calendar
              markedDates={markedDates}
              onDayPress={day => console.log('selected day', day)}
              onMonthChange={month => console.log('month changed', month)}
            />
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    backgroundColor: '#90D7FF',
  },
  mainContainer: {
    width: '100%',
  },
  headerText: {
    padding: 5,
    margin: 5,
    marginBottom: 15,
    fontSize: 20,
    fontFamily: 'BMJUA',
  },
  middleContainer: {
    alignSelf: 'center',
    width: '95%',
    margin: 10,
    borderRadius: 15,
    backgroundColor: '#FFFFFF',
    padding: 10,
    elevation: 10,
  },
});
