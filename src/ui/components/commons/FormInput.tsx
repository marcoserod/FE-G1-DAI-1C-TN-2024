import {View, Text, TextInput, StyleSheet} from 'react-native';
import React from 'react';
import {COLORS} from '../../../constants/colors';
interface Props {
  label: string;
  value: string;
  editable: boolean;
}

export const FormInput = ({label, value, editable = false}: Props) => {
  return (
    <View>
      <Text style={styles.label}>{label}</Text>
      <TextInput style={styles.textInput} value={value} editable={editable} />
    </View>
  );
};

const styles = StyleSheet.create({
  label: {
    color: COLORS.TEXT,
    fontSize: 16,
    marginBottom: 6,
  },
  textInput: {
    borderWidth: 1,
    borderColor: COLORS.TEXT,
    borderRadius: 12,
    marginBottom: 16,
    color: COLORS.TEXT,
    paddingHorizontal: 10,
    fontSize: 14,
  },
});
