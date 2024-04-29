import {View, Text, StyleSheet} from 'react-native';
import React from 'react';
import Rating from '../commons/Rating';
import {Formatter} from '../../../assets/helpers/formatter';
import {COLORS} from '../../../constants/colors';

export const RatingTile = ({rating = 0, totalVotes = 0}) => {
  return (
    <View style={styles.container}>
      <Rating readOnly initialRating={Math.round(rating / 2)} size={14} />
      <Text style={styles.text}>{`${Formatter.rating(
        rating,
      )}/5 (${totalVotes} votos)`}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
    backgroundColor: COLORS.BG_2,
    borderRadius: 12,
    alignSelf: 'flex-start',
    justifyContent: 'center',
    alignItems: 'center',
    opacity: 0.9,
  },
  text: {
    color: COLORS.TEXT,
    fontSize: 12,
  },
});
