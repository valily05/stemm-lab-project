import { useRouter } from 'expo-router';
import React, { useRef, useState } from 'react';
import {
  Animated,
  Image,
  ImageBackground,
  Keyboard,
  KeyboardAvoidingView,
  Modal,
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
const confirmY = useRef(0);
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

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <ImageBackground source={require('../assets/images/bg2.png')} style={{ flex: 1 }}>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={{ flex: 1 }}
        >
          <ScrollView
            ref={scrollRef}
            contentContainerStyle={{ flexGrow: 1, paddingTop: 60, paddingBottom: 40 }}
            keyboardShouldPersistTaps="handled"
          >

            <TouchableOpacity
              style={styles.langContainer}
              onPress={() => setModalVisible(true)}
            >
              <Image source={require('../assets/images/globe.png')} style={styles.langIcon} />
              <Text style={[styles.langText, { fontSize: FONT }]}>{language}</Text>
              <Text style={styles.langArrow}>▼</Text>
            </TouchableOpacity>

            <Image
              source={require('../assets/images/logo.png')}
              style={styles.logo}
              resizeMode="contain"
            />

            <View style={styles.content}>

              <AuthInput
                label={t.fullName}
                image={require('../assets/images/User.png')}
                placeholder="Enter your full name"
                value={fullName}
                onChangeText={setFullName}
              />

              <AuthInput
                label={t.email}
                image={require('../assets/images/Letter.png')}
                placeholder="Enter your email"
                value={email}
                onChangeText={setEmail}
              />

              <AuthInput
                label={t.password}
                image={require('../assets/images/Lock.png')}
                placeholder="Create a password"
                isPassword
                value={password}
                onChangeText={setPassword}
                onFocus={() => scrollTo(450)}
                borderColor={borderColor}
              />

              <PasswordChecklist password={password} />
              <PasswordStrength password={password} labelEmpty={t.PS} />

            <View
  onLayout={(event) => {
    confirmY.current = event.nativeEvent.layout.y;
  }}
>
  <AuthInput
    label={t.confirmPassword}
    image={require('../assets/images/Lock.png')}
    placeholder="Confirm your password"
    isPassword
    value={confirmPassword}
    onChangeText={(text) => {
      setConfirmPassword(text);
      if (text.length > 0 && text !== password) triggerShake();
    }}
    onFocus={() => scrollTo(confirmY.current - 110)}
    borderColor={borderColor}
  />
</View>
<Animated.View
  style={{
    transform: [{ translateX: shakeAnim }],
    marginTop: 6,
    marginLeft: 4,
    opacity: confirmPassword.length > 0 ? 0.9 : 0
  }}
>
  <Text
    style={{
      fontFamily: 'BebasNeue',
      fontSize: 14,
      color: isMatch ? '#22c55e' : '#ef4444',
      top:-13,
      backgroundColor: 'rgba(0,0,0,0.9)',    }}
  >
{isMatch ? '✓ Passwords match' : '✕ Passwords do not match'}  </Text>
</Animated.View>

            <AuthButton
  title={t.register}
  onPress={() => {
    if (!isFormValid) return;

    console.log('Registering...');

    router.replace('/homescreen'); 
  }}
  disabled={!isFormValid}
/>

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
            </View>

            <Modal transparent animationType="fade" visible={modalVisible}>
              <TouchableWithoutFeedback onPress={() => setModalVisible(false)}>
                <View style={styles.modalOverlay}>
                  <View style={styles.modalContent}>
                    <TouchableOpacity onPress={() => { setLanguage('English'); setModalVisible(false); }}>
                      <Text style={styles.optionText}>English</Text>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => { setLanguage('Bahasa Indonesia'); setModalVisible(false); }}>
                      <Text style={styles.optionText}>Bahasa Indonesia</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </TouchableWithoutFeedback>
            </Modal>

          </ScrollView>
        </KeyboardAvoidingView>
      </ImageBackground>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  logo: {
    width: LAYOUT.width * 0.9,
    height: 120,
    alignSelf: 'center',
    marginTop: LAYOUT.height * 0.03,
  },

  content: {
    paddingHorizontal: LAYOUT.paddingHorizontal,
  },

  footer: {
    marginTop: LAYOUT.height * 0.03,
    alignItems: 'center',
  },

  footerText: {
    color: 'white',
    marginBottom: 18,
    fontFamily: 'Pixel',
  },

  loginLink: {
    color: 'yellow',
    fontFamily: 'Pixel',
  },

  underline: {
    height: 3,
    backgroundColor: 'yellow',
    marginTop: 4,
  },

  langContainer: {
    position: 'absolute',
    top: LAYOUT.height * 0.08,
    right: LAYOUT.width * 0.05,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 8,
    backgroundColor: 'rgba(0,0,0,0.9)',
    borderRadius: 20,
    borderWidth: 1.5,
    borderColor: '#899AF7',
    shadowColor: '#899AF7',
    shadowOpacity: 0.6,
    shadowRadius: 6,
    elevation: 5,
  },

  langIcon: {
    width: 19,
    height: 19,
    marginRight: 8,
  },

  langText: {
    color: '#E6E6FA',
    marginRight: 8,
  },

  langArrow: {
    fontSize: 10,
    color: '#899AF7',
  },

  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.9)',
    justifyContent: 'center',
    alignItems: 'center',
  },

  modalContent: {
    padding: 25,
  },

  optionText: {
    color: 'white',
    textAlign: 'center',
    padding: 15,
    fontFamily: 'Wix',
  },
  matchContainer: {
  alignSelf: 'center',
  marginTop: 12,
  marginBottom: 8,

  paddingHorizontal: 14,
  paddingVertical: 6,

  borderRadius: 20,
  backgroundColor: 'rgba(0,0,0,0.4)',

  borderWidth: 1,
  borderColor: 'rgba(255,255,255,0.1)',
},

matchText: {
  fontFamily: 'Wix',
  fontSize: 12,
},
});