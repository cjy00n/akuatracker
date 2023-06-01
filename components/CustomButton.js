import {StyleSheet, Text, TouchableOpacity, Image, View} from 'react-native';

export default function CustomButton({icon, text, description, onPress}) {
  return (
    <TouchableOpacity style={styles.button} onPress={onPress}>
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <Image source={icon} style={styles.icon} />
        <View style={styles.buttonContainer}>
          <Text style={styles.buttonText}>{text}</Text>
          {description && (
            <Text style={styles.descriptionText}>{description}</Text>
          )}
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  icon: {
    width: 48,
    height: 48,
    margin: 10,
  },
  button: {
    backgroundColor: 'white',
    height: 90,
    marginTop: 10,
    marginLeft: 20,
    marginRight: 20,
    padding: 10,
    borderRadius: 20,
    elevation: 20,
  },
  buttonContainer: {
    margin: 5,
  },
  buttonText: {
    fontSize: 20,
    color: 'black',
    fontFamily: 'BMJUA',
  },
  descriptionText: {
    marginTop: 3,
    fontSize: 15,
    color: '#696969',
    fontFamily: 'BMJUA',
  },
});
