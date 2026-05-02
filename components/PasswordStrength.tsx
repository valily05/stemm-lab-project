import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

type Props = {
password: string;
  labelEmpty?: string; // optional (for t.PS)
};

export default function PasswordStrength({ password, labelEmpty }: Props) {

const getStrength = (password: string) => {
    let strength = 0;
    if (password.length >= 8) strength++;
    if (/[a-z]/.test(password)) strength++;
    if (/[A-Z]/.test(password)) strength++;
    if (/[0-9]/.test(password)) strength++;
    if (/[^A-Za-z0-9]/.test(password)) strength++;
    return strength;
};

const strength = getStrength(password);

const getStrengthLabel = () => {
    switch (strength) {
    case 0: return "Very Weak";
    case 1: return "Weak";
    case 2: return "Okay";
    case 3: return "Good";
    case 4: return "Strong";
    case 5: return "Very Strong";
    default: return "";
    }
};

return (
    <View style={styles.container}>

      {/* BARS */}
    <View style={styles.row}>
        <View style={styles.bars}>
        {[...Array(5)].map((_, index) => {
            let color = '#1A1B30';

            if (index < strength) {
            color =
                strength <= 1 ? '#ff4d4d' :
                strength <= 3 ? '#ffaa00' :
                '#22c55e';
            }

            return (
            <View
                key={index}
                style={[styles.bar, { backgroundColor: color }]}
            />
            );
        })}
        </View>

        {/* LABEL */}
        <View style={styles.labelBox}>
        <Text style={styles.labelText}>
            {password.length === 0
            ? labelEmpty || 'Password Strength'
            : getStrengthLabel()}
        </Text>
        </View>
    </View>

    </View>
);
}

const styles = StyleSheet.create({
container: {
    marginTop: 2,
    marginBottom: 8,
},

row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
},

bars: {
    flexDirection: 'row',
    gap: 5,
},

bar: {
    width: 35,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#1A1B30',
},

labelBox: {
    backgroundColor: '#070418',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 10,
},

labelText: {
    color: '#9D61F1',
    fontSize: 14,
},
});