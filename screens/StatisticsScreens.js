import {StyleSheet, ScrollView, Text, View} from 'react-native';
import {useState, useEffect} from 'react';
import {BarChart} from 'react-native-chart-kit';
import {Calendar} from 'react-native-calendars';
import {usersReference} from '../lib/user';
import {subscribeAuth} from '../lib/auth';
import * as Progress from 'react-native-progress';
import moment from 'moment';

export default function StatisticsScreen({navigation}) {
  const [drinkRate, setDrinkRate] = useState(0);
  const [todayIntake, setTodayIntke] = useState(0);
  const [days, setDays] = useState([]);
  const [thisWeekIntake, setThisWeekIntake] = useState([]);
  const [formatToday, setFormatToday] = useState(
    moment().utcOffset(9).format('YYYY-MM-DD'),
  );

  const [weekData, setWeekData] = useState({
    labels: ['월', '화', '수', '목', '금', '토', '일'],
    datasets: [
      {
        data: [1000, 1200, 0, 0, 0, 0, 0],
      },
    ],
  });
  const [markedDates, setMarkedDates] = useState({});
  //최초 접속시 초기 DB설정
  useEffect(() => {
    let userDrinkReference;
    let startOfWeek = moment(formatToday).startOf('week').add(1, 'days');
    let tmp = [];
    subscribeAuth(async user => {
      if (user) {
        userDrinkReference = usersReference.child(user.uid).child('DrinkInfo');
        for (let i = 0; i <= 6; i++) {
          let date = startOfWeek.clone().add(i, 'days').format('YYYY-MM-DD');
          userDrinkReference.child(date).on('value', snapshot => {
            if (snapshot.val() !== null) {
              tmp[i] = snapshot.val().today_Intake;
            } else {
              tmp[i] = 0;
            }
          });
        }
        setWeekData({
          labels: ['월', '화', '수', '목', '금', '토', '일'],
          datasets: [
            {
              data: tmp,
            },
          ],
        });
        userDrinkReference.child(formatToday).on('value', snapshot => {
          if (snapshot.val() !== null) {
            setDrinkRate(snapshot.val().today_percent);
            setTodayIntke(parseInt(snapshot.val().today_Intake));
          }
        });
        userDrinkReference.once('value', snapshot => {
          const data = snapshot.val();
          if (data) {
            const keys = Object.keys(data);
            const values = Object.values(data);
            let tmp = [];
            for (let i = 0; i < keys.length; i++) {
              if (values[i].fulfilled === true) {
                tmp.push(keys[i]);
              }
            }
            let obj = tmp.reduce(
              (c, v) =>
                Object.assign(c, {
                  [v]: {selected: true},
                }),
              {},
            );
            setMarkedDates(obj);
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
          </View>
          <View style={styles.middleContainer}>
            <Text style={styles.headerText}>📈 주별통계</Text>
            <BarChart
              style={styles.weekChart}
              data={weekData}
              width={320}
              height={200}
              chartConfig={{
                barPercentage: 0.8,
                backgroundColor: '#ffffff',
                backgroundGradientFrom: '#ffffff',
                backgroundGradientTo: '#ffffff',
                decimalPlaces: 0,
                color: (opacity = 1) => `rgba(54, 182, 255, ${opacity})`,
                labelColor: (opacity = 1) => `rgba(0, 0, 0, 1)`,
                style: {
                  borderRadius: 16,
                },
                propsForLabels: {
                  fontFamily: 'BMJUA',
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
            <Text
              style={{fontSize: 13, fontFamily: 'BMJUA', alignSelf: 'center'}}>
              목표를 달성한 날은 파란색으로 칠해져요
            </Text>
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
