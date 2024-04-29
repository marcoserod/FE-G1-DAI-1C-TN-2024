import {View, StyleSheet, Image} from 'react-native';
import React from 'react';
import {COLORS} from '../../../constants/colors';
import IMAGES from '../../../assets/images';

export const SearchScreen = () => {
  return (
    <View style={styles.container}>
      <Image source={IMAGES.OTHERS.SEARCH_BG} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.BG,
    color: COLORS.TEXT,
    paddingTop: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
