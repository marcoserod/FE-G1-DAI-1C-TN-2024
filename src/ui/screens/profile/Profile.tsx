import {View, StyleSheet, Text} from 'react-native';
import React from 'react';
import {COLORS} from '../../../constants/colors';

export const ProfileScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={{color: COLORS.TEXT}}>Profile</Text>
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
