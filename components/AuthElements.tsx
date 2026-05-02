import React, { useState } from 'react';
import {
  Image,
  ImageSourcePropType,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';
import { AUTH_COLORS, COLORS, LAYOUT } from '../constants/layout';

interface AuthInputProps {
  label: string;
  image: ImageSourcePropType;
  secure?: boolean;
  isPassword?: boolean;
  placeholder?: string;
  onChangeText?: (text: string) => void;
  value?: string;
}

export const AuthInput: React.FC<AuthInputProps> = ({
  label,
  image,
  secure,
  isPassword,
  placeholder,
  onChangeText,
  value
}) => {
  const FONT = LAYOUT.width * 0.035;

  const [hidePassword, setHidePassword] = useState(true);

  return (
    <View style={styles.inputContainer}>
      
      {/* LABEL */}
      <View style={styles.labelRow}>
        <Image source={image} style={styles.icon} />
        <Text style={[styles.labelText, { fontSize: FONT * 0.9 }]}>
          {label}
        </Text>
      </View>

      {/* INPUT + EYE */}
      <View style={styles.inputWrapper}>
        <TextInput
          placeholder={placeholder}
          placeholderTextColor={COLORS.lightPurple}
          secureTextEntry={isPassword ? hidePassword : secure}
          style={[
            styles.inputField,
            { height: LAYOUT.inputHeight, fontSize: FONT * 1.3 }
          ]}
          value={value}
          onChangeText={onChangeText}
          autoCorrect={false}
          autoCapitalize="none"

          textContentType="oneTimeCode"
          autoComplete="off"
        />

        {/* 👁 PNG TOGGLE */}
        {isPassword && (
          <TouchableOpacity
            style={styles.eyeButton}
            onPress={() => setHidePassword(!hidePassword)}
          >
            <Image
              source={
                hidePassword
                  ? require('../assets/images/eye-off.png')
                  : require('../assets/images/eye.png')
              }
              style={styles.eyeIcon}
            />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

export const AuthButton: React.FC<{
  title: string;
  onPress: () => void;
  disabled?: boolean;
}> = ({ title, onPress, disabled }) => (
  <TouchableOpacity
  onPress={onPress}
  disabled={disabled}
  style={[
    styles.button,
    { height: LAYOUT.inputHeight },
    disabled && { opacity: 0.5 }
  ]}
>
    <Text style={[styles.buttonText, { fontSize: LAYOUT.width * 0.035 }]}>
      {title}
    </Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  inputContainer: {
    marginBottom: LAYOUT.height * 0.02
  },

  labelRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4
  },

  icon: {
    width: 30,
    height: 30,
    marginRight: 8
  },

  labelText: {
    fontFamily: 'Pixel',
    color: 'white'
  },

  inputWrapper: {
    position: 'relative',
    justifyContent: 'center'
  },

  inputField: {
    borderWidth: 2,
    borderColor: AUTH_COLORS.inputBorder,
    borderRadius: 8,
    paddingHorizontal: 18,
    paddingRight: 45, // space for eye icon
    color: 'white',
    backgroundColor: AUTH_COLORS.inputBg,

    fontFamily: 'PixelOperator',
    letterSpacing:0.5,
  },

  eyeButton: {
    position: 'absolute',
    right: 15
  },

  eyeIcon: {
    width: 22,
    height: 22,
    tintColor: '#9D61F1' // remove if your PNG already has color
  },

  button: {
    marginTop: LAYOUT.height * 0.003,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: AUTH_COLORS.buttonPurple
  },

  buttonText: {
    fontFamily: 'Pixel',
    color: 'white'
  }
});