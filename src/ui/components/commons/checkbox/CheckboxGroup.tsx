import React from 'react';
import {View, StyleSheet} from 'react-native';
import CustomCheckbox from './Checkbox';

type Option = {
  id: number;
  label: string;
};

interface Props {
  options: Option[];
  selectedOptions: number[];
  setSelectedOptions: (value: number[]) => void;
}
const CheckboxGroup = ({
  options,
  selectedOptions,
  setSelectedOptions,
}: Props) => {
  const toggleCheckbox = (option: Option) => {
    if (selectedOptions.includes(option.id)) {
      setSelectedOptions(selectedOptions.filter(item => item !== option.id));
    } else {
      setSelectedOptions([...selectedOptions, option.id]);
    }
  };

  return (
    <View style={styles.container}>
      {options?.map((option, index) => (
        <CustomCheckbox
          key={index}
          label={option.label}
          checked={selectedOptions.includes(option.id)}
          onChange={() => toggleCheckbox(option)}
        />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default CheckboxGroup;
