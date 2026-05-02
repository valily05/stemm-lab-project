import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { Text, View } from 'react-native';

export default function PasswordChecklist({ password }: { password: string }) {
  const rules = [
    { label: 'At least 8 characters', valid: password.length >= 8 },
    { label: 'Lowercase letter', valid: /[a-z]/.test(password) },
    { label: 'Uppercase letter', valid: /[A-Z]/.test(password) },
    { label: 'Number', valid: /[0-9]/.test(password) },
    { label: 'Special character', valid: /[^A-Za-z0-9]/.test(password) },
  ];

  return (
    <View style={{ marginTop: -3 }}>
      {rules.map((item, index) => (
        <View
          key={index}
          style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 4 }}
        >
          <Ionicons
            name={item.valid ? 'checkmark' : 'close'}
            size={16}
            color={item.valid ? '#22c55e' : '#9ca3af'}
            style={{ marginRight: 7 }}
          />

          <Text
            style={{
              fontSize: 12,
              color: item.valid ? '#22c55e' : '#9ca3af'
            }}
          >
            {item.label}
          </Text>
        </View>
      ))}
    </View>
  );
}