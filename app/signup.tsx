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

  const scrollRef = useRef<ScrollView>(null); // ✅ NEW

  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const shakeAnim = useState(new Animated.Value(0))[0];

  const passwordsMatch =
    password === confirmPassword && confirmPassword.length > 0;

  const { language, setLanguage, t } = useLanguage();
  const [modalVisible, setModalVisible] = useState(false);

  // ✅ scroll function
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
      <ImageBackground
        source={require('../assets/images/bg2.png')}
        style={{ flex: 1 }}
      >
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={{ flex: 1 }}
        >

          {/* ✅ attach ref here */}
          <ScrollView
            ref={scrollRef}
            contentContainerStyle={{
              flexGrow: 1,
              paddingTop: 60,
              paddingBottom: 40
            }}
            keyboardShouldPersistTaps="handled"
          >

            {/* Language */}
            <TouchableOpacity
              style={styles.langContainer}
              onPress={() => setModalVisible(true)}
            >
              <Image source={require('../assets/images/globe.png')} style={styles.langIcon} />
              <Text style={[styles.langText, { fontSize: FONT }]}>{language}</Text>
              <Text style={styles.langArrow}>▼</Text>
            </TouchableOpacity>

            {/* Logo */}
            <Image
              source={require('../assets/images/logo.png')}
              style={styles.logo}
              resizeMode="contain"
            />

            {/* Content */}
            <View style={styles.content}>
              <Text style={[styles.title, { fontSize: FONT }]}>{t.title}</Text>

              <AuthInput
                label={t.fullName}
                image={require('../assets/images/User.png')}
                placeholder="Enter your full name"
              />

              <AuthInput
                label={t.email}
                image={require('../assets/images/Letter.png')}
                placeholder="Enter your email"
              />

              {/* PASSWORD */}
              <AuthInput
                label={t.password}
                image={require('../assets/images/Lock.png')}
                placeholder="Create a password"
                isPassword
                value={password}
                onChangeText={setPassword}
                onFocus={() => scrollTo(450)} // ✅ AUTO SCROLL
              />

              <PasswordChecklist password={password} />
              <PasswordStrength password={password} labelEmpty={t.PS} />

              {/* CONFIRM PASSWORD */}
              <View
                style={{
                  borderRadius: 10,
                  borderWidth: passwordsMatch ? 2 : 0,
                  borderColor: '#00cc66',
                  shadowColor: '#00cc66',
                  shadowOpacity: passwordsMatch ? 0.8 : 0,
                  shadowRadius: 10,
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
                  onFocus={() => scrollTo(420)} // ✅ AUTO SCROLL
                />
              </View>

              {/* MATCH TEXT */}
              <Animated.View style={{ transform: [{ translateX: shakeAnim }] }}>
                {confirmPassword.length > 0 && (
                  <Text style={{
                    color: passwordsMatch ? '#00cc66' : '#ff4d4d',
                    marginTop: 5
                  }}>
                    {passwordsMatch
                      ? 'Passwords match ✓'
                      : 'Passwords do not match'}
                  </Text>
                )}
              </Animated.View>

              {/* BUTTON */}
              <AuthButton
                title={t.register}
                onPress={() => console.log('Registering...')}
                disabled={!passwordsMatch || password.length === 0}
              />

              {/* FOOTER */}
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

            {/* Modal */}
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
  container: { flex: 1 },
logo: {
  width: LAYOUT.width * 0.8,
  height: 120,
  alignSelf: 'center',
  marginBottom: 20,
},

  content: {
    paddingHorizontal: LAYOUT.paddingHorizontal,
  },

  title: {
    fontFamily: 'Pixel',
    color: 'white',
    marginBottom: LAYOUT.height * 0.015,
  },

  passwordHelperContainer: {
    marginBottom: LAYOUT.height * 0.01,
  },

  strengthContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  strengthBars: {
    flexDirection: 'row',
    gap: 4,
  },

  bar: {
    width: 35,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#1A1B30',
  },

  strengthLabelContainer: {
    backgroundColor: '#070418',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 10,
  },

  strengthText: {
    color: '#9D61F1',
    fontSize: 14,
  },

  footer: {
    marginTop: LAYOUT.height * 0.03,
    alignItems: 'center',
  },

  footerText: {
    color: 'white',
    marginBottom: 18,
  },

  loginLink: {
    color: 'yellow',
  },

  underline: {
    height: 3,
    backgroundColor: 'yellow',
    marginTop: 4,
  },

  langContainer: {
    position: 'absolute',
    top: LAYOUT.height * 0.08,
    right: 20,
    flexDirection: 'row',
    alignItems: 'center',
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

  option: {
    paddingVertical: 14,
  },

  optionText: {
  color: 'white',
  textAlign: 'center',
},
});