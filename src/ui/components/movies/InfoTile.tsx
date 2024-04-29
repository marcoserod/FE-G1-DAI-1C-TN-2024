import {View, Text, StyleSheet} from 'react-native';
import React, {PropsWithChildren} from 'react';
import {COLORS} from '../../../constants/colors';

interface Props {
  title: string;
}

export const InfoTile = ({title, children}: PropsWithChildren<Props>) => {
  return (
    <View style={styles.container}>
      <View style={styles.infoTile}>
        <Text style={styles.infoTitle}>{title}</Text>
        {children}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginBottom: 16,
    borderRadius: 16,
  },
  infoTile: {
    opacity: 0.85,
    backgroundColor: `${COLORS.BG_2}`,
    borderRadius: 16,
    padding: 10,
  },
  infoTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: COLORS.TEXT,
  },
});
