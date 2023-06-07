import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  Button,
  Switch,
  TouchableOpacity,
} from 'react-native';
import {useState, useEffect} from 'react';
import {getUser} from '../lib/user';
import {BorderShadow} from 'react-native-shadow';
import DropDownPicker from 'react-native-dropdown-picker';
import {Picker} from '@react-native-picker/picker';

export default function AppSettingScreen({navigation}) {
  const [isEnabled, setIsEnabled] = useState(false); // useState를 통해 컴포너트 값 변경
  const toggleSwitch = () => setIsEnabled(previousState => !previousState); // 스위치가 동작할 수 있는 함수

  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState([
    {label: '30분', value: '0.5'},
    {label: '1시간', value: '1'},
    {label: '2시간', value: '2'},
    {label: '3시간', value: '3'},
    {label: '4시간', value: '4'},
  ]);

  const [pickerValue, setPickerValue] = useState('1');

  return (
    <View style={styles.container}>
      <View style={styles.top}>
        <Text style={styles.text}>🔔 알림 설정</Text>
        <View style={styles.setting}>
          <Text style={styles.text}>알림 on/off</Text>
          <Switch
            trackColor={{false: '#767577', true: '#81b0ff'}}
            thumbColor={isEnabled ? '#f5dd4b' : '#f4f3f4'}
            ios_backgroundColor="#3e3e3e"
            onValueChange={toggleSwitch}
            value={isEnabled}
          />
        </View>

        <View style={styles.setting}>
          <Text style={styles.text}>알림 주기</Text>
          <DropDownPicker
            style={styles.picker}
            open={open}
            value={value}
            items={items}
            setOpen={setOpen}
            setValue={setValue}
            setItems={setItems}
            placeholder="시간 설정"
            listMode="MODAL"
            modalProps={{
              animationType: 'fade',
            }}
            modalTitle="알림 주기를 선택해주세요."
          />
          <View></View>
        </View>
        <View style={{flexDirection: 'row'}}>
          <Text style={styles.text}>방해 금지 시간</Text>
        </View>
        <View
          style={{
            flexDirection: 'row',
            marginLeft: 130,
            marginTop: -20,
          }}>
          <TextInput style={styles.TextInput}></TextInput>
          <Text style={styles.text2}>시 부터</Text>
          <TextInput style={styles.TextInput}></TextInput>
          <Text style={styles.text2}>시 까지</Text>
        </View>
      </View>
      <View style={styles.top}>
        <TouchableOpacity
        //onPress={() => setCurrentIntake(currentIntake + 100)}
        >
          <Text style={styles.store}>저장</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  text: {
    fontFamily: 'BMJUA',
    fontSize: 22,
    margin: 15,
    color: '#000000',
  },
  text2: {
    fontFamily: 'BMJUA',
    fontSize: 18,
    marginTop: 22,
    marginBottom: 15,
    marginLeft: 8,
    marginRight: 8,
    color: '#000000',
  },
  container: {
    flex: 1,
    backgroundColor: '#90D7FF',
    width: '100%',
  },
  top: {
    margin: 20,
    borderRadius: 20,
    backgroundColor: '#FFFFFF',
    borderColor: '#000000',
    shadowColor: '#000000',
    shadowOpacity: 0.27,
    shadowRadius: 4.65,
    shadowOffset: {
      width: 0,
      height: 3,
    },
    elevation: 3,
  },
  setting: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  picker: {
    width: 110,
    height: 20,
    marginLeft: 130,
  },
  TextInput: {
    height: 40,
    width: 50,
    marginTop: 15,
    marginBottom: 15,
    borderRadius: 10,
    borderColor: 'gray',
    borderWidth: 1,
    fontFamily: 'BMJUA',
    fontSize: 15,
    fontWeight: 'normal',
  },
  store: {
    textAlign: 'center',
    textAlignVertical: 'center',
    color: 'black',
    fontFamily: 'BMJUA',
    fontSize: 22,
    marginBottom: 10,
    marginTop: 10,
  },
});
