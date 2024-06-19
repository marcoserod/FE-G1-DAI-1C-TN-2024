import React from 'react';
import {View, TouchableOpacity, Text, StyleSheet} from 'react-native';
import {COLORS} from '../../../constants/colors';

const Rating = ({
  total = 5,
  initialRating = 0,
  readOnly = false,
  onRating = (value: number) => console.log(value),
  size = 24,
  spacing = 4,
}) => {
  const [rating, setRating] = React.useState(initialRating);

  const handleRating = (rate: number) => {
    setRating(rate);
    if (onRating) {
      onRating(rate);
    }
  };

  return (
    <View style={styles.container}>
      {[...Array(total).keys()].map(index => (
        <TouchableOpacity
          key={index}
          onPress={() => handleRating(index + 1)}
          disabled={readOnly}>
          <Text
            style={[
              styles.star,
              {
                fontSize: size,
                color: index < rating ? COLORS.ACCENT : 'grey',
                marginRight: index === total - 1 ? 0 : spacing,
              },
            ]}>
            {index < rating ? '★' : '☆'}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  star: {
    // Add additional styling if needed
  },
});

export default Rating;
