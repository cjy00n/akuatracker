import database from '@react-native-firebase/database';
export const usersReference = database().ref('/Users');
export function createUser({
  id,
  email,
  displayName,
  height,
  weight,
  age,
  gender,
  daily_intake,
  unit_intake,
}) {
  return usersReference.child(id).child('UserInfo').set({
    id: id,
    email: email,
    displayName: displayName,
    height: height,
    weight: weight,
    age: age,
    gender: gender,
    daily_intake: daily_intake,
    unit_intake: unit_intake,
  });
}

export async function getUser(id) {
  try {
    const snapshot = await usersReference
      .child(id)
      .child('UserInfo')
      .once('value');
    const data = snapshot.val();
    const userInfo = {
      email: data.email,
      displayName: data.displayName,
      height: data.height,
      weight: data.weight,
      age: data.age,
      gender: data.gender,
      daily_intake: data.daily_intake,
      unit_intake: data.unit_intake,
    };
    return userInfo;
  } catch (error) {
    console.log('Error fetching data:', error);
  }
}
