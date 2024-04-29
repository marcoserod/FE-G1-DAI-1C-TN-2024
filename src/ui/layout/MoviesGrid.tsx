import {View, Text, StyleSheet, ScrollView} from 'react-native';
import React from 'react';

export const MoviesGrid = ({children}) => {
  return (
    <ScrollView contentContainerStyle={styles.gridContainer}>
      {children}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  gridContainer: {
    justifyContent: 'center',
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 24,
  },
});
