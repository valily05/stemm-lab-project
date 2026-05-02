import { Dimensions, Image, Text, TextInput, TouchableOpacity, View } from 'react-native';

export default function LoginScreen() {
  const { width, height } = Dimensions.get('window');

  const FONT = width * 0.035;
  const INPUT_HEIGHT = height * 0.06;

  return (
    <View style={{ flex: 1, backgroundColor: 'black' }}>

      {/* Background */}
      <Image
        source={require('@/assets/images/bg2.png')}
        style={{
          position: 'absolute',
          width: '100%',
          height: '100%',
        }}
        resizeMode="cover"
      />



      {/* 🧪 Logo */}
      <Image 
        source={require('../assets/images/logo.png')}
        style={{
          position:'absolute',
          bottom: height * 0.68,
          width: width * 0.86,
          height: height * 0.4,
          alignSelf: 'center',
          zIndex: 10,
        }}
        resizeMode="contain"
      />

      <View style={{
        flex: 1,
        paddingHorizontal: width * 0.08,
        paddingTop: height * 0.19
      }}>

        {/* TITLE */}
        <Text style={{
          fontFamily: 'Pixel',
          fontSize: FONT,
          color: 'white',
          marginBottom: height * 0.03
        }}>
          CREATE ACCOUNT
        </Text>

        {/* 🔤 INPUT FIELDS */}
        {[
          { label: 'FULL NAME', icon: require('@/assets/images/User.png') },
          { label: 'EMAIL', icon: require('@/assets/images/Letter.png') },
          { label: 'PASSWORD', icon: require('@/assets/images/Lock.png'), secure: true },
          { label: 'CONFIRM PASSWORD', icon: require('@/assets/images/Lock.png'), secure: true },
        ].map((item, index) => (
          <View key={index} style={{ marginBottom: height * 0.02 }}>

            {/* 🔥 LABEL + ICON */}
            <View style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginBottom: 6
            }}>
              {typeof item.icon === 'string' ? (
                <Text style={{
                  fontSize: 18,
                  marginRight: 8
                }}>
                  {item.icon}
                </Text>
              ) : (
                <Image
                  source={item.icon}
                  style={{
                    width: 21,
                    height: 21,
                    marginRight: 8,
                    tintColor: 'white'
                  }}
                />
              )}

              <Text style={{
                fontFamily: 'Pixel',
                color: 'white',
                fontSize: FONT * 0.9,
              }}>
                {item.label}
              </Text>
            </View>

            {/* INPUT BOX */}
            <TextInput
              placeholderTextColor="#aaa"
              secureTextEntry={item.secure}
              style={{
                height: INPUT_HEIGHT,
                borderWidth: 2,
                borderColor: '#4a6fa5',
                borderRadius: 6,
                paddingHorizontal: 12,
                color: 'white',
                backgroundColor: '#0b1f3a',
                fontFamily: 'Pixel',
                fontSize: FONT * 0.9,
              }}
            />

          </View>
        ))}

        {/* 🎮 REGISTER BUTTON */}
        <TouchableOpacity style={{
          marginTop: height * 0.02,
          height: INPUT_HEIGHT,
          borderRadius: 8,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: '#a855f7'
        }}>
          <Text style={{
            fontFamily: 'Pixel',
            fontSize: FONT,
            color: 'white'
          }}>
            REGISTER
          </Text>
        </TouchableOpacity>

        {/* 🔗 LOGIN LINK */}
        <View style={{
          marginTop: height * 0.03,
          alignItems: 'center'
        }}>
          <Text style={{
            fontFamily: 'Pixel',
            color: 'white',
            fontSize: FONT * 0.8,
            marginBottom: 18
          }}>
            Already have an account?
          </Text>

          <Text style={{
            fontFamily: 'Pixel',
            color: 'yellow',
            fontSize: FONT,
          }}>
            LOGIN HERE →
          </Text>



        </View>
  <View style={{
    height: 3, // 🔥 thickness here
    backgroundColor: 'yellow',
    width: '50%',
    marginTop: 3,
    marginLeft:80,
  }} />

      </View>
    </View>
  );
}