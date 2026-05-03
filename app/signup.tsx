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
import PasswordChecklist from '../components/PasswordChecklist';
import PasswordStrength from '../components/PasswordStrength';
import { LAYOUT } from '../constants/layout';
import { useLanguage } from '../context/LanguageContext';

export default function RegisterScreen() {
  const router = useRouter();
  const FONT = LAYOUT.width * 0.035;
  const scrollRef = useRef<ScrollView>(null);
  const confirmRef = useRef(null);

  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const shakeAnim = useState(new Animated.Value(0))[0];

  const hasTypedConfirm = confirmPassword.length > 0;
  const isMatch = password === confirmPassword && hasTypedConfirm;
  const isMismatch = password !== confirmPassword && hasTypedConfirm;

  const borderColor = isMatch
    ? '#22c55e'
    : isMismatch
    ? '#ef4444'
    : '#8B7CFF';

  const isPasswordValid =
    password.length >= 8 &&
    /[a-zA-Z]/.test(password) &&
    /\d/.test(password);

  const isFormValid =
    fullName.trim().length > 0 &&
    email.trim().length > 0 &&
    isPasswordValid &&
    confirmPassword.length > 0 &&
    isMatch;

  const { language, setLanguage, t } = useLanguage();
  const [modalVisible, setModalVisible] = useState(false);

  const scrollTo = (y: number) => {
    scrollRef.current?.scrollTo({ y, animated: true });
  };

  const triggerShake = () => {
    Animated.sequence([
      Animated.timing(shakeAnim, { toValue: 10, duration: 50, useNativeDriver: true }),
      Animated.timing(shakeAnim, { toValue: -10, duration: 50, useNativeDriver: true }),
      Animated.timing(shakeAnim, { toValue: 6, duration: 50, useNativeDriver: true }),
      Animated.timing(shakeAnim, { toValue: -6, duration: 50, useNativeDriver: true }),
      Animated.timing(shakeAnim, { toValue: 0, duration: 50, useNativeDriver: true }),
    ]).start();
  };

  const STAR_COLORS = [
  '#ffffff',
  '#60A5FA', // blue
  '#FACC15', // yellow
  '#FB923C', // orange
];

const SPECIAL_COLORS = [
  '#C084FC', // purple
  '#F472B6', // pink
  '#A78BFA', // soft violet
];
  const staticStars = useRef(
  Array.from({ length: 30 }).map(() => {
    const isSpecial = Math.random() > 0.6; 

    return {
      x: Math.random() * LAYOUT.width,
      y: Math.random() * LAYOUT.height,
      size: isSpecial
        ? Math.random() * 3 + 2.5   
        : Math.random() * 2 + 1.5,
      opacity: isSpecial ? 1 : Math.random() * 0.8 + 0.3,
      color: isSpecial
        ? SPECIAL_COLORS[Math.floor(Math.random() * SPECIAL_COLORS.length)]
        : STAR_COLORS[Math.floor(Math.random() * STAR_COLORS.length)],
      isSparkle: Math.random() > 0.7,
    };
  })
).current;

const stars = useRef(
  Array.from({ length: 90 }).map(() => {
    const isSpecial = Math.random() > 0.7;

    return {
      x: Math.random() * LAYOUT.width,
      y: Math.random() * LAYOUT.height,
      size: isSpecial
        ? Math.random() * 2 + 1.5
        : Math.random() * 1.5 + 0.5,
      opacity: new Animated.Value(Math.random()),
      scale: new Animated.Value(1), 
      isSpecial,
      color: isSpecial
        ? SPECIAL_COLORS[Math.floor(Math.random() * SPECIAL_COLORS.length)]
        : STAR_COLORS[Math.floor(Math.random() * STAR_COLORS.length)],
    };
  })
).current;

React.useEffect(() => {
  stars.forEach((star) => {
    const minOpacity = star.isSpecial ? 0.15 : Math.random() * 0.2 + 0.05;
    const maxOpacity = star.isSpecial ? 1 : Math.random() * 0.4 + 0.6;
    const fadeOutDur = 800 + Math.random() * 2400;
    const fadeInDur  = 600 + Math.random() * 1800;
    const holdDur    = Math.random() * 1200;

    const twinkle = Animated.loop(
      Animated.sequence([
        Animated.timing(star.opacity, {
          toValue: maxOpacity,
          duration: fadeInDur,
          useNativeDriver: true,
        }),
        Animated.delay(holdDur),
        Animated.timing(star.opacity, {
          toValue: minOpacity,
          duration: fadeOutDur,
          useNativeDriver: true,
        }),
        Animated.delay(Math.random() * 800),
      ])
    );

    // stagger start so stars don't all sync up
    setTimeout(() => twinkle.start(), Math.random() * 3000);

    if (star.isSpecial) {
      Animated.loop(
        Animated.sequence([
          Animated.timing(star.scale, {
            toValue: 1.3,
            duration: 1200 + Math.random() * 800,
            useNativeDriver: true,
          }),
          Animated.timing(star.scale, {
            toValue: 0.85,
            duration: 1200 + Math.random() * 800,
            useNativeDriver: true,
          }),
        ])
      ).start();
    }
  });
}, []);

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={{ flex: 1, backgroundColor: '#020617' }}>

        {/* ⭐ STAR BACKGROUND */}
        <View style={StyleSheet.absoluteFillObject} pointerEvents="none">

          {/* STATIC STARS */}
          {staticStars.map((star, index) => (
            <View
              key={'static-' + index}
              style={{
                position: 'absolute',
                left: star.x,
                top: star.y,
                width: star.size,
                height: star.size,
                opacity: star.opacity,
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              {star.isSparkle ? (
                <>
                  {/* vertical */}
                  <View style={{
                    position: 'absolute',
                    width: 2,
                    height: star.size * 2,
                    backgroundColor: star.color,
                    shadowColor: star.color,
                    shadowOpacity: 0.6,
                    shadowRadius: 8,
                  }} />
                  {/* horizontal */}
                  <View style={{
                    position: 'absolute',
                    width: star.size * 2,
                    height: 2,
                    backgroundColor: star.color,
                    shadowColor: star.color,
                    shadowOpacity: 0.6,
                    shadowRadius: 8,
                  }} />
                </>
              ) : (
                <View style={{
                  width: star.size,
                  height: star.size,
                  borderRadius: 50,
                  backgroundColor: star.color,
                  shadowColor: star.color,
                  shadowOpacity: 1,
                  shadowRadius: 6,
                }} />
              )}
            </View>
          ))}

          {/* ANIMATED STARS */}
          {stars.map((star, index) => (
            <Animated.View
              key={index}
  style={{
  position: 'absolute',
  left: star.x,
  top: star.y,
  width: star.size,
  height: star.size,
  borderRadius: 50,
  backgroundColor: star.color,
  opacity: star.opacity,
  transform: [{ scale: star.scale || 1 }], 
  shadowColor: star.color,
  shadowOpacity: 1,
  shadowRadius: star.isSpecial ? 8 : 4,
}}
            />
          ))}

        </View>

        {/* UI stays unchanged below */}
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={{ flex: 1 }}
        >
          <ScrollView
            ref={scrollRef}
            contentContainerStyle={{ flexGrow: 1, paddingTop: 60, paddingBottom: 40 }}
            keyboardShouldPersistTaps="handled"
          >

            <TouchableOpacity style={styles.langContainer} onPress={() => setModalVisible(true)}>
              <Image source={require('../assets/images/globe.png')} style={styles.langIcon} />
              <Text style={[styles.langText, { fontSize: FONT }]}>{language}</Text>
              <Text style={styles.langArrow}>▼</Text>
            </TouchableOpacity>

            <Image source={require('../assets/images/logo.png')} style={styles.logo} resizeMode="contain" />

            <View style={styles.content}>
              <AuthInput label={t.fullName} image={require('../assets/images/User.png')} placeholder="Enter your full name" value={fullName} onChangeText={setFullName} />
              <AuthInput label={t.email} image={require('../assets/images/Letter.png')} placeholder="Enter your email" value={email} onChangeText={setEmail} />
              <AuthInput label={t.password} image={require('../assets/images/Lock.png')} placeholder="Create a password" isPassword value={password} onChangeText={setPassword} onFocus={() => scrollTo(100)} borderColor={borderColor} />

              <PasswordChecklist password={password} />
              <PasswordStrength password={password} labelEmpty={t.PS} />

              <View ref={confirmRef}>
                <AuthInput label={t.confirmPassword} image={require('../assets/images/Lock.png')} placeholder="Confirm your password" isPassword value={confirmPassword} onChangeText={(text) => {
                  setConfirmPassword(text);
                  if (text.length > 0 && text !== password) triggerShake();
                }} onFocus={() => scrollTo(260)} borderColor={borderColor} />
              </View>

              <Animated.View style={{ transform: [{ translateX: shakeAnim }], marginTop: 6, marginLeft: 4, opacity: confirmPassword.length > 0 ? 0.9 : 0 }}>
                <Text style={{ fontFamily: 'BebasNeue', fontSize: 14, color: isMatch ? '#22c55e' : '#ef4444', top: -13, backgroundColor: 'rgba(0,0,0,0.9)' }}>
                  {isMatch ? '✓ Passwords match' : '✕ Passwords do not match'}
                </Text>
              </Animated.View>

              <AuthButton title={t.register} onPress={() => { if (!isFormValid) return; router.replace('/homescreen'); }} disabled={!isFormValid} />
            </View>

            <View style={styles.footer}>
  <Text style={[styles.footerText, { fontSize: FONT * 0.8 }]}>
    {t.already}
  </Text>

  <TouchableOpacity onPress={() => router.push('/login')}>
    <Text style={[styles.loginLink, { fontSize: FONT }]}>
      {t.login}
    </Text>
    <View style={styles.underline} />
  </TouchableOpacity>
</View>

          </ScrollView>
        </KeyboardAvoidingView>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  logo: { width: LAYOUT.width * 0.9, height: 120, alignSelf: 'center', marginTop: LAYOUT.height * 0.03 },
  content: { paddingHorizontal: LAYOUT.paddingHorizontal },
  footer: { marginTop: LAYOUT.height * 0.03, alignItems: 'center' },
  footerText: { color: 'white', marginBottom: 18, fontFamily: 'Pixel' },
  loginLink: { color: 'yellow', fontFamily: 'Pixel' },
  underline: { height: 3, backgroundColor: 'yellow', marginTop: 4 },
  langContainer: {
    position: 'absolute', top: LAYOUT.height * 0.08, right: LAYOUT.width * 0.05,
    flexDirection: 'row', alignItems: 'center', paddingHorizontal: 12, paddingVertical: 8,
    backgroundColor: 'rgba(0,0,0,0.9)', borderRadius: 20, borderWidth: 1.5,
    borderColor: '#899AF7', shadowColor: '#899AF7', shadowOpacity: 0.6, shadowRadius: 6, elevation: 5
  },
  langIcon: { width: 19, height: 19, marginRight: 8 },
  langText: { color: '#E6E6FA', marginRight: 8 },
  langArrow: { fontSize: 10, color: '#899AF7' },
  modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.9)', justifyContent: 'center', alignItems: 'center' },
  modalContent: { padding: 25 },
  optionText: { color: 'white', textAlign: 'center', padding: 15, fontFamily: 'Wix' },
});