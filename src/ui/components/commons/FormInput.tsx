import {View, Text, TextInput, StyleSheet, TextInputProps} from 'react-native';
import React from 'react';
import {COLORS} from '../../../constants/colors';
interface Props {
  label: string;
  value: string;
  editable: boolean;
  error?: boolean;
}

export const FormInput = ({
  label,
  editable = false,
  error,
  ...props
}: TextInputProps & Props) => {
  return (
    <View>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        style={{
          ...styles.textInput,
          borderColor: error ? 'red' : '#A9A9A9',
          color: editable ? COLORS.TEXT : '#787579',
        }}
        editable={editable}
        {...props}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  label: {
    color: COLORS.TEXT,
    fontSize: 16,
  },
  textInput: {
    borderWidth: 1,
    borderColor: '#A9A9A9',
    borderRadius: 12,
    marginBottom: 16,
    color: COLORS.TEXT,
    paddingHorizontal: 10,
    fontSize: 14,
  },
});
