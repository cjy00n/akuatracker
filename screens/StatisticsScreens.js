import {
  StyleSheet,
  ScrollView,
  Text,
  View,
  Image,
  TextInput,
  Button,
} from 'react-native';
import {useState, useEffect} from 'react';
import {BarChart} from 'react-native-chart-kit';
import {Calendar} from 'react-native-calendars';
import {usersReference} from '../lib/user';
import {subscribeAuth} from '../lib/auth';
import * as Progress from 'react-native-progress';
const moment = require('moment');

export default function StatisticsScreen({navigation}) {
  const customStyles = {
    container: {
      backgroundColor: 'blue',
    },
    text: {
      color: 'white',
      fontWeight: 'bold',
    },
  };
  const [drinkRate, setDrinkRate] = useState(0);
  const [todayIntake, setTodayIntke] = useState(0);
  const [days, setDays] = useState([]);
  const koreanNow = moment().utcOffset(9); // 한국 시간으로 변환 (UTC +9:00)
  const formatToday = `${koreanNow.format('YYYY')}-${koreanNow.format(
    'MM',
  )}-${koreanNow.format('DD')}`;
  const todayData = {
    labels: ['0', '6', '12', '18', '24'],
    datasets: [
      {
        data: [20, 45, 28, 80, 99],
      },
    ],
  };
  const [weekData, setWeekData] = useState({
    labels: ['월', '화', '수', '목', '금', '토', '일'],
    datasets: [
      {
        data: [1000, 1200, 0, 0, 0, 0, 0],
      },
    ],
  });
  const [markedDates, setMarkedDates] = useState({
    '2023-06-01': {selected: true},
    '2023-06-02': {selected: true},
    '2023-06-05': {selected: true},
    '2023-06-07': {selected: true},
    '2023-06-09': {selected: true},
    '2023-06-13': {selected: true},
    '2023-06-15': {selected: true},
    '2023-06-18': {selected: true},
    '2023-06-21': {selected: true},
  });
  //최초 접속시 초기 DB설정
  useEffect(() => {
    let userDrinkReference;
    subscribeAuth(async user => {
      if (user) {
        userDrinkReference = usersReference
          .child(user.uid)
          .child('DrinkInfo')
          .child(formatToday);
        userDrinkReference.on('value', snapshot => {
          setDrinkRate(snapshot.val().today_percent);
          setTodayIntke(parseInt(snapshot.val().today_Intake));
          setWeekData({
            labels: ['월', '화', '수', '목', '금', '토', '일'],
            datasets: [
              {
                data: [1000, 1200, snapshot.val().today_Intake, 0, 0, 0, 0],
              },
            ],
          });
        });

        usersReference
          .child(user.uid)
          .child('DrinkInfo')
          .once('value', snapshot => {
            const data = snapshot.val();
            if (data !== null) {
              const keys = Object.keys(data);
              const values = Object.values(data);
              let tmp = [];
              for (let i = 0; i < keys.length; i++) {
                tmp.push({
                  date: keys[i],
                  fulfilled: values[i].fulfilled,
                  intake: values[i].today_Intake,
                });
              }
              setDays(tmp);
              let tmp2 = [];
              days.forEach(item => {
                if (item.fulfilled === true) {
                  tmp2.push({[item.date]: {selected: true}});
                }
              });
              // setMarkedDates(tmp2);
              // console.log('markedDates', markedDates);
              // console.log(markedDates);
            }
          });
      }
    });
  }, []);

  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={styles.mainContainer}>
          <View style={styles.middleContainer}>
            <Text style={styles.headerText}>☀️ 하루통계</Text>
            <View style={{flexDirection: 'row', justifyContent: 'center'}}>
              <Progress.Bar
                color="#90D7FF"
                style={{alignSelf: 'center'}}
                progress={drinkRate / 100}
                width={200}
                height={15}
              />
              <Text style={{fontFamily: 'BMJUA', marginLeft: 10}}>
                {drinkRate} / 100%
              </Text>
            </View>
            {/* <BarChart
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
            /> */}
          </View>
          <View style={styles.middleContainer}>
            <Text style={styles.headerText}>📈 주별통계</Text>
            <BarChart
              data={weekData}
              width={320}
              height={200}
              chartConfig={{
                backgroundColor: '#ffffff',
                backgroundGradientFrom: '#ffffff',
                backgroundGradientTo: '#ffffff',
                decimalPlaces: 0,
                color: (opacity = 1) => `rgba(54, 182, 255, ${opacity})`,
                style: {
                  borderRadius: 16,
                },
              }}
            />
          </View>
          <View style={styles.middleContainer}>
            <Text style={styles.headerText}>🗓️ 월별 통계</Text>
            <Calendar
              markedDates={markedDates}
              onDayPress={day => console.log(markedDates)}
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
    color: 'black',
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
    paddingTop: 15,
    paddingBottom: 20,
    elevation: 10,
  },
});