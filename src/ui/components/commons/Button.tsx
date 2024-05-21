import React from 'react';
import {Pressable, StyleSheet, Text, View} from 'react-native';
import {COLORS} from '../../../constants/colors';

interface Props {
  onPress: () => void;
  label: string;
  Icon?: any;
  disabled?: boolean;
  type?: 'filled' | 'text';
  color?: string;
  style?: any;
}
interface StyleProps {
  pressed: boolean;
}

export const Button = ({
  onPress = () => {
    console.log('pressed');
  },
  type = 'filled',
  label = '',
  Icon,
  disabled,
  color,
  style,
}: Props) => {
  const getButtonStyle = ({pressed}: StyleProps) => {
    if (type === 'filled') {
      return {
        ...styles.button,
        backgroundColor: disabled
          ? COLORS.BG_DISABLED
          : pressed
          ? COLORS.PRIMARY_2
          : COLORS.PRIMARY,
      };
    }
  };
  const getLabelStyle = () => ({
    ...styles.text,
    color: disabled ? COLORS.TEXT_DISABLED : color ? color : COLORS.TEXT,
  });

  return (
    <Pressable
      style={style ? [getButtonStyle, style] : getButtonStyle}
      onPress={onPress}
      disabled={disabled}>
      <View style={styles.contentContainer}>
        {Icon ? (
          <View style={styles.iconContainer}>
            {<Icon width={18} height={18} />}
          </View>
        ) : null}
        <Text style={getLabelStyle()}>{label}</Text>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  text: {
    fontSize: 14,
    fontWeight: '700',
  },
  button: {
    borderRadius: 100,
    paddingVertical: 10,
    paddingHorizontal: 24,
    alignSelf: 'flex-start',
  },
  contentContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconContainer: {
    marginRight: 8,
  },
});
