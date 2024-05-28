import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import {COLORS} from '../../../../constants/colors';

const CustomCheckbox = ({label, checked, onChange}) => {
  return (
    <TouchableOpacity style={styles.checkboxContainer} onPress={onChange}>
      <View style={[styles.checkbox, checked && styles.checkedCheckbox]}>
        {checked && <Text style={styles.checkmark}>✓</Text>}
      </View>
      <Text style={styles.label}>{label}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 2,
    backgroundColor: COLORS.BG_2,
    width: '100%',
    paddingHorizontal: 16,
    paddingVertical: 8,
    color: COLORS.TEXT,
  },
  checkbox: {
    borderRadius: 4,
    width: 24,
    height: 24,
    borderWidth: 2,
    borderColor: COLORS.TEXT_2,
    alignItems: 'center',
    marginRight: 16,
  },
  checkedCheckbox: {
    backgroundColor: COLORS.PRIMARY,
    borderColor: COLORS.PRIMARY,
  },
  checkmark: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  label: {
    fontSize: 14,
    color: COLORS.TEXT,
  },
});

export default CustomCheckbox;
