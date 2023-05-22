import firestore from '@react-native-firebase/firestore';

export const usersCollection = firestore().collection('users');

export function createUser({
  id,
  displayName,
  height,
  weight,
  age,
  gender,
  significant,
  daily_intake,
  unit_intake,
}) {
  return usersCollection.doc(id).set({
    id,
    displayName,
    height,
    weight,
    age,
    gender,
    significant,
    daily_intake,
    unit_intake,
  });
}

export async function getUser(id) {
  const doc = await usersCollection.doc(id).get();
  const data = doc.data();
  const userInfo = {
    displayName: data.displayName,
    height: data.height,
    weight: data.weight,
    age: data.age,
    gender: data.gender,
    significant: data.significant,
    daily_intake: data.daily_intake,
    unit_intake: data.unit_intake,
  };
  return userInfo;
}
