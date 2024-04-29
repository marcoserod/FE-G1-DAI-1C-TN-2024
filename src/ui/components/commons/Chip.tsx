import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {COLORS} from '../../../constants/colors';

interface Props {
  label: string;
  Icon?: any;
  customIcon?: boolean;
}

export const Chip = ({label, Icon, customIcon}: Props) => {
  return (
    <View style={styles.chip}>
      {Icon ? (
        <View style={styles.icon}>
          {customIcon ? <Icon width={24} height={24} /> : Icon}
        </View>
      ) : null}
      <Text style={styles.text}>{label}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  chip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    borderColor: COLORS.TEXT_2,
    borderWidth: 1,
    borderRadius: 30,
    alignSelf: 'flex-start',
    marginHorizontal: 'auto',
    backgroundColor: COLORS.BG_3,
    paddingHorizontal: 12,
  },
  text: {
    paddingVertical: 6,
    fontSize: 12,
    fontWeight: '400',
    color: COLORS.TEXT,
  },
  icon: {
    marginLeft: -8,
  },
});
