import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  Button,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import DropDownPicker from 'react-native-dropdown-picker';
import { signOutAuth } from '../lib/auth';
import { useNavigation } from '@react-navigation/native';
import database from '@react-native-firebase/app';


export default function UserSettingScreen({navigation}) {
  const [selectedValue1, setSelectedValue1] = useState(null);
  const [selectedValue2, setSelectedValue2] = useState(null);

  const [isOpen1, setIsOpen1] = useState(false);
  const [isOpen2, setIsOpen2] = useState(false);

  const items1 = [
<<<<<<< HEAD
    { label: '남성', value: '남성' },
    { label: '여성', value: '여성' },
=======
    {label: '남성', value: '남'},
    {label: '여성', value: '여'},
>>>>>>> f21b583dd77e990ab3cc82fb5584a5ccc1ac8133
  ];

  const items2 = [
    {label: '없음', value: '없음'},
    {label: '임산부', value: '임산부'},
    {label: '다이어터', value: '다이어터'},
    {label: '운동마니아', value: '운동마니아'},
  ];

  const [height, setHeight] = useState(160);
  const [weight, setWeight] = useState(50);
  const [age, setAge] = useState(24);
  const [gender, setGender] = useState(' ');
  const [significant, setSignificant] = useState('없음');
  const [daily_intake, setDailyIntake] = useState(weight * 30);
  const [displayName, setDisplayName] = useState('김소복');
  const [pw, setPw] = useState(' ');

  // TextInput에 숫자랑 소숫점만 입력받게 함
  const [values, setValues] = useState({});
  const handleInputChange = (id, text) => {
    if (text === '' || /^\d*\.?\d*$/.test(text)) {
      setValues(prevValues => ({...prevValues, [id]: text}));
    }
  };
<<<<<<< HEAD

  // 로그아웃 후 로그인 화면으로
  const logout = () => {
    signOutAuth();
    navigation.navigate("로그인");
  }

  const setPhysical = () => {
    database()
      .ref('/test/123')
      .set({
        height: 150,
        weight: 44,
        age: 23,
        gender: '여성'
      })
      .then(() => console.log('Data set.'));
  }

=======
>>>>>>> f21b583dd77e990ab3cc82fb5584a5ccc1ac8133

  return (
    <ScrollView style={styles.container}>
      <View style={styles.top}>
        <Text style={styles.text}>👩 김소복님 </Text>
        <Text style={styles.text_ID}>sobok_kim00</Text>
      </View>

      <View style={styles.top}>
        <View style={styles.physical}>
          <Text style={styles.text}>📝 신체 정보 설정 </Text>
          <TouchableOpacity
            //onPress={() => setCurrentIntake(currentIntake + 100)}
            
            style={{
              width: 60,
              height: 30,
              marginLeft: 80,
              marginTop: 12,
              backgroundColor: '#FFFFFF',
              borderColor: 'gray',
              borderRadius: 10,
              borderWidth: 1,
              shadowColor: '#000000',
              shadowOpacity: 0.27,
              shadowRadius: 4.65,
              shadowOffset: {
                width: 0,
                height: 3,
              },
            }}>
            <Text style={styles.textChange}>변경</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.physical}>
          <Text style={styles.text2}>신장</Text>
          <TextInput
            style={styles.TextInput}
            placeholder=" 160"
            keyboardType="numeric"
            value={values.height}
          />
          <Text style={styles.text2}>cm</Text>
          <Text style={styles.text2}>체중</Text>
          <TextInput
            style={styles.TextInput}
            placeholder=" 50"
            onChange={value => setWeight(value.nativeEvent.text)}
          />
          <Text style={styles.text2}>kg</Text>
        </View>

        <View style={styles.physical2}>
          <Text style={styles.text2}>나이</Text>
          <TextInput style={styles.TextInput} placeholder=" 24" />
          <Text style={styles.text2}>세 </Text>
          <Text style={styles.text2}>성별</Text>
          <DropDownPicker
            open={isOpen1}
            setOpen={setIsOpen1}
            items={items1}
            value={selectedValue1}
            setValue={setSelectedValue1}
            containerStyle={{height: 10, width: 102, marginLeft: 6}}
            placeholder="남/여"
            listMode="MODAL"
            modalProps={{
              animationType: 'fade',
            }}
            modalTitle="성별을 선택해주세요."
            onClose={() => setIsOpen1(false)} // 드롭다운 메뉴가 닫힐 때 setOpen 상태를 false로 설정
          />
        </View>
      </View>

      <View style={styles.top}>
        <View style={styles.physical}>
          <Text style={styles.text}>💦 일일 섭취량 설정 </Text>
          <TouchableOpacity
            //onPress={() => setCurrentIntake(currentIntake + 100)}
            style={{
              width: 60,
              height: 30,
              marginLeft: 52,
              marginTop: 12,
              backgroundColor: '#FFFFFF',
              borderColor: 'gray',
              borderRadius: 10,
              borderWidth: 1,
              shadowColor: '#000000',
              shadowOpacity: 0.27,
              shadowRadius: 4.65,
              shadowOffset: {
                width: 0,
                height: 3,
              },
            }}>
            <Text style={styles.textChange}>변경</Text>
          </TouchableOpacity>
        </View>
<<<<<<< HEAD
=======
        <View style={styles.physical3}>
          <Text style={styles.text2}>특이사항</Text>
          <DropDownPicker
            open={isOpen2}
            setOpen={setIsOpen2}
            items={items2}
            containerStyle={{height: 10, width: 120}}
            value={selectedValue2}
            setValue={setSelectedValue2}
            placeholder="선택"
            listMode="MODAL"
            modalProps={{
              animationType: 'fade',
            }}
            modalTitle="특이사항을 선택해주세요."
            onClose={() => setIsOpen2(false)} // 드롭다운 메뉴가 닫힐 때 setOpen 상태를 false로 설정
          />
        </View>
>>>>>>> f21b583dd77e990ab3cc82fb5584a5ccc1ac8133
        <View style={styles.physical}>
          <Text style={styles.text2}>일일 목표 섭취량</Text>
          <TextInput style={styles.TextInput} placeholder=" 1500" />
          <Text style={styles.text2}>ml</Text>
        </View>
      </View>

      <View style={styles.top}>
        <Text style={styles.text}>🔒 계정 설정 </Text>
        <View style={styles.physical}>
          <Text style={styles.text2}>아이디</Text>
          <Text style={styles.text2}>sobok_kim00</Text>
        </View>
        <View style={styles.physical}>
          <Text style={styles.text2}>닉네임</Text>
          <TextInput style={styles.TextInput2} placeholder=" 김소복" />
          <TouchableOpacity
      
            style={{
              width: 60,
              height: 30,
              marginLeft: 46,
              marginTop: 7,
              backgroundColor: '#FFFFFF',
              borderColor: 'gray',
              borderRadius: 10,
              borderWidth: 1,
              shadowColor: '#000000',
              shadowOpacity: 0.27,
              shadowRadius: 4.65,
              shadowOffset: {
                width: 0,
                height: 3,
              },
            }}>
            <Text style={styles.textChange}>변경</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.physical}>
          <Text style={styles.text2}>비밀번호</Text>
          <TextInput style={styles.TextInput2} placeholder=" ********" />
          <TouchableOpacity
            //onPress={() => setCurrentIntake(currentIntake + 100)}
            style={{
              width: 60,
              height: 30,
              marginLeft: 28,
              marginTop: 7,
              backgroundColor: '#FFFFFF',
              borderColor: 'gray',
              borderRadius: 10,
              borderWidth: 1,
              shadowColor: '#000000',
              shadowOpacity: 0.27,
              shadowRadius: 4.65,
              shadowOffset: {
                width: 0,
                height: 3,
              },
            }}>
            <Text style={styles.textChange}>변경</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.top}>
        <TouchableOpacity
          onPress={() => logout()}
          style={styles.logoutBtn}>
          <Text style={styles.logout}>로그아웃</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#90D7FF',
    width: '100%',
  },
  text: {
    fontFamily: 'BMJUA',
    fontSize: 24,
    margin: 15,
    color: '#000000',
  },
  text2: {
    fontFamily: 'BMJUA',
    fontSize: 22,
    margin: 10,
    color: '#000000',
  },
  text_ID: {
    fontFamily: 'BMJUA',
    fontSize: 20,
    marginLeft: 50,
    marginBottom: 10,
    marginTop: -10,
    color: 'gray',
  },
  top: {
    margin: 15,
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
  physical: {
    flexDirection: 'row',
    marginBottom: 2,
  },
  physical2: {
    flexDirection: 'row',
    marginTop: 10,
    marginBottom: 15,
  },
  physical3: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  TextInput: {
    height: 40,
    width: 70,
    margin: 3,
    borderRadius: 10,
    borderColor: 'black',
    borderWidth: 1,
    fontFamily: 'BMJUA',
    fontSize: 18,
  },
  TextInput2: {
    height: 40,
    width: 150,
    margin: 5,
    borderRadius: 10,
    borderColor: 'black',
    borderWidth: 1,
    fontFamily: 'BMJUA',
    fontSize: 18,
  },
  picker: {
    width: 90,
    height: 10,
    marginLeft: 7,
  },
  changeBtn2: {
    width: 40,
    margin: 10,
    marginLeft: 52,
    borderRadius: 2,
    borderColor: '#gray',
  },
  textChange: {
    fontFamily: 'BMJUA',
    fontSize: 15,
    textAlign: 'center',
    textAlignVertical: 'center',
    marginTop: 5,
  },
  logoutBtn: {
    margin: 10,
    borderRadius: 2,
    borderColor: '#gray',
  },
  logout: {
    fontFamily: 'BMJUA',
    fontSize: 24,
    color: '#000000',
    textAlign: 'center',
    textAlignVertical: 'center',
  },
});
