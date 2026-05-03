import { useRouter } from 'expo-router';
import React, { useRef, useState } from 'react';
import {
  Animated,
  Image,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View
} from 'react-native';

import { AuthButton, AuthInput } from '../components/AuthElements';
import { LAYOUT } from '../constants/layout';
import { useLanguage } from '../context/LanguageContext';

export default function LoginScreen() {
  const router = useRouter();
  const FONT = LAYOUT.width * 0.035;

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const { language, setLanguage, t } = useLanguage();

  // ⭐ SAME STAR SYSTEM (copied from your register)
  const STAR_COLORS = ['#ffffff','#60A5FA','#FACC15','#FB923C'];
  const SPECIAL_COLORS = ['#C084FC','#F472B6','#A78BFA'];

  const staticStars = useRef(
    Array.from({ length: 30 }).map(() => {
      const isSpecial = Math.random() > 0.6;
      return {
        x: Math.random() * LAYOUT.width,
        y: Math.random() * LAYOUT.height,
        size: isSpecial ? Math.random() * 3 + 2.5 : Math.random() * 2 + 1.5,
        opacity: isSpecial ? 1 : Math.random() * 0.8 + 0.3,
        color: isSpecial
          ? SPECIAL_COLORS[Math.floor(Math.random()*SPECIAL_COLORS.length)]
          : STAR_COLORS[Math.floor(Math.random()*STAR_COLORS.length)],
        isSparkle: Math.random() > 0.7,
      };
    })
  ).current;

  const stars = useRef(
    Array.from({ length: 80 }).map(() => ({
      x: Math.random() * LAYOUT.width,
      y: Math.random() * LAYOUT.height,
      size: Math.random() * 1.5 + 0.5,
      opacity: new Animated.Value(Math.random()),
    }))
  ).current;

  React.useEffect(() => {
    stars.forEach((star) => {
      Animated.loop(
        Animated.sequence([
          Animated.timing(star.opacity, {
            toValue: 0.7,
            duration: 2000,
            useNativeDriver: true,
          }),
          Animated.timing(star.opacity, {
            toValue: 0.3,
            duration: 2000,
            useNativeDriver: true,
          }),
        ])
      ).start();
    });
  }, []);

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={{ flex: 1, backgroundColor: '#020617' }}>

        {/* ⭐ BACKGROUND */}
        <View style={StyleSheet.absoluteFillObject} pointerEvents="none">

          {staticStars.map((star, i) => (
            <View key={i} style={{
              position:'absolute',
              left:star.x,
              top:star.y,
              width:star.size,
              height:star.size,
              alignItems:'center',
              justifyContent:'center',
              opacity:star.opacity
            }}>
              {star.isSparkle ? (
                <>
                  <View style={{width:2,height:star.size*2,backgroundColor:star.color}}/>
                  <View style={{width:star.size*2,height:2,backgroundColor:star.color}}/>
                </>
              ) : (
                <View style={{
                  width:star.size,
                  height:star.size,
                  borderRadius:50,
                  backgroundColor:star.color
                }}/>
              )}
            </View>
          ))}

          {stars.map((star,i)=>(
            <Animated.View key={i} style={{
              position:'absolute',
              left:star.x,
              top:star.y,
              width:star.size,
              height:star.size,
              borderRadius:50,
              backgroundColor:'#fff',
              opacity:star.opacity
            }}/>
          ))}

        </View>

        {/* UI */}
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={{ flex: 1 }}
        >
          <ScrollView contentContainerStyle={{ paddingTop:60,paddingBottom:40 }}>

            {/* 🌐 Language */}
            <TouchableOpacity style={styles.langContainer}>
              <Image source={require('../assets/images/globe.png')} style={styles.langIcon}/>
              <Text style={styles.langText}>{language}</Text>
            </TouchableOpacity>

            {/* 🎮 Logo */}
            <Image source={require('../assets/images/logo.png')} style={styles.logo}/>

            <Text style={styles.title}>WELCOME BACK !</Text>
            <Text style={styles.subtitle}>LOGIN TO CONTINUE YOUR MISSION</Text>

            <View style={styles.content}>

              <AuthInput
                label="EMAIL ADDRESS"
                image={require('../assets/images/Letter.png')}
                placeholder="Enter your email"
                value={email}
                onChangeText={setEmail}
              />

              <AuthInput
                label="PASSWORD"
                image={require('../assets/images/Lock.png')}
                placeholder="Enter your password"
                isPassword
                value={password}
                onChangeText={setPassword}
              />
   {/* 🔵 Forgot + Line */}
              <View style={styles.forgotContainer}>
  <TouchableOpacity>
    <Text style={styles.forgot}>FORGOT PASSWORD?</Text>
  </TouchableOpacity>

  <View style={styles.topLine} />
</View>
              <AuthButton title="LOGIN" onPress={()=>{}}/>

              <Text style={styles.or}>OR</Text>

<TouchableOpacity style={styles.googleBtn} activeOpacity={0.8}>
    <View style={styles.googleContent}>
    <Image
      source={require('../assets/images/google.png')}
      style={styles.googleIcon}
    />
    <Text style={styles.googleText}>Login with Google</Text>
  </View>
</TouchableOpacity>

              <View style={styles.footer}>
                <Text style={styles.footerText}>Don't have an account?</Text>
                <TouchableOpacity onPress={()=>router.push('/signup')}>
  <View style={{ alignItems: 'center' }}>
    <Text style={styles.register}>REGISTER NOW →</Text>
    <View style={styles.registerUnderline} />
  </View>
</TouchableOpacity>
              </View>

              <TouchableOpacity style={styles.teacher}>
                <Text style={{color:'white'}}>TEACHER / ADMIN LOGIN</Text>
              </TouchableOpacity>

            </View>

          </ScrollView>
        </KeyboardAvoidingView>

      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
logo:{
  width: LAYOUT.width * 0.95,
  height: 100,
  alignSelf: 'center',
  resizeMode: 'contain',
  marginBottom: 8,
  marginTop:20,
},  content:{paddingHorizontal:20},
  title:{color:'white',textAlign:'center',fontFamily:'Pixel',fontSize:18},
  subtitle:{color:'#FACC15',textAlign:'center',marginBottom:20,fontFamily:'Pixel',fontSize:11,marginTop:13,},
/* 🔵 FORGOT */
forgotContainer:{
  alignSelf:'flex-start',
  marginBottom:15,
    backgroundColor:'rgba(0,0,0,0.9)',

},

forgot:{
  color:'#60A5FA',
  fontFamily:'Pixel',
  fontSize:10,
},

registerUnderline: {
  height: 2,
  backgroundColor: '#FACC15', 
  width: '100%',
  marginTop: 3,
  opacity: 1,
},

topLine:{
  width:160,
  height:2,
  backgroundColor:'#60A5FA',
  marginTop:6,
  borderRadius:2,

  shadowColor:'#60A5FA',
  shadowOpacity:0.8,
  shadowRadius:6,
},
or:{
  color:'white',
  textAlign:'center',
  marginTop: 18,
  marginBottom: 8,
  
},  footer:{alignItems:'center',marginTop:20},
  footerText:{color:'white',fontFamily:'Pixel'},
register:{
  color:'yellow',
  marginTop:5,
  fontFamily:'Pixel',
},  teacher:{marginTop:30,padding:15,borderWidth:1,borderColor:'#8B7CFF',borderRadius:20,alignItems:'center',fontFamily:'Pixel'},

  langContainer:{
    position:'absolute',top:60,right:20,flexDirection:'row',
    backgroundColor:'rgba(0,0,0,0.9)',padding:8,borderRadius:20
  },
  langIcon:{width:18,height:18,marginRight:6},
  langText:{color:'#E6E6FA'},
googleBtn: {
  marginTop: 15,
  borderRadius: 30,
  paddingVertical: 16,
  alignItems: 'center',
  justifyContent: 'center',

  backgroundColor: 'rgba(255,255,255,0.12)', // ⭐ glass
  borderWidth: 1.2,
  borderColor: 'rgba(255,255,255,0.25)',

  shadowColor: '#fff',
  shadowOpacity: 0.1,
  shadowRadius: 6,
},

googleContent: {
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'center',
},

googleIcon: {
  width: 20,
  height: 20,
  marginRight: 12, // better spacing from text
},

googleText: {
  color: '#ffffff', 
  fontSize: 15,
  letterSpacing: 0.5,
},
});