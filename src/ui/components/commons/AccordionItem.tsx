import React, {useState} from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
} from 'react-native-reanimated';
import {COLORS} from '../../../constants/colors';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

export const AccordionItem = ({title, children}) => {
  const [expanded, setExpanded] = useState(false);
  const height = useSharedValue(0);

  const animatedStyles = useAnimatedStyle(() => {
    return {
      height: height.value,
      overflow: 'hidden',
    };
  });

  const toggleExpand = () => {
    setExpanded(!expanded);
    height.value = withTiming(expanded ? 0 : '100%', {duration: 300});
  };

  return (
    <View>
      <TouchableOpacity onPress={toggleExpand} style={styles.row}>
        <Text style={styles.title}>{title}</Text>

        <MaterialCommunityIcons
          name={expanded ? 'chevron-up' : 'chevron-down'}
          color={COLORS.TEXT}
          size={16}
        />
      </TouchableOpacity>
      <Animated.View style={[animatedStyles]}>{children}</Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  row: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 10,
    backgroundColor: COLORS.BG_3,
    height: 40,
  },
  title: {
    color: COLORS.TEXT,
    fontSize: 12,
    fontWeight: '600',
  },
});
