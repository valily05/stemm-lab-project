import { Dimensions, Text, TouchableOpacity, View } from 'react-native';

export default function HomeScreen() {
  const { width, height } = Dimensions.get('window');

  const FONT = width * 0.035;

  return (
    <View style={{
      flex: 1,
      backgroundColor: '#0b1f3a', // match your theme
      alignItems: 'center',
      justifyContent: 'center',
      padding: width * 0.05
    }}>

      {/* 🧪 TITLE */}
      <Text style={{
        fontFamily: 'Pixel',
        fontSize: FONT * 1.5,
        color: 'white',
        marginBottom: height * 0.05,
        textAlign: 'center'
      }}>
        STEMM LAB
      </Text>

     
      <TouchableOpacity style={{
        width: width * 0.7,
        paddingVertical: height * 0.02,
        backgroundColor: '#40A560',
        marginBottom: height * 0.02,
        alignItems: 'center'
      }}>
        <Text style={{
          fontFamily: 'Pixel',
          fontSize: FONT,
          color: 'white'
        }}>
          START EXPERIMENT
        </Text>
      </TouchableOpacity>

     
      <TouchableOpacity style={{
        width: width * 0.7,
        paddingVertical: height * 0.02,
        backgroundColor: '#2f7d4f',
        alignItems: 'center'
      }}>
        <Text style={{
          fontFamily: 'Pixel',
          fontSize: FONT,
          color: 'white'
        }}>
          JOIN TEAM
        </Text>
      </TouchableOpacity>

     
      <Text style={{
        position: 'absolute',
        bottom: height * 0.03,
        fontFamily: 'Wix',
        fontSize: FONT * 0.7,
        color: 'white',
        opacity: 0.6
      }}>
        Welcome to STEMM Lab
      </Text>

    </View>
  );
}