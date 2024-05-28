import {Text, StyleSheet, Image} from 'react-native';
import React from 'react';
import LinearGradient from 'react-native-linear-gradient';
import I18n from '../../../assets/localization/i18n';
import {COLORS} from '../../../constants/colors';
import IMAGES from '../../../assets/images';

export const NoConnectionScreen = () => {
  return (
    <LinearGradient colors={['#434343', '#8D0000']} style={styles.container}>
      <Text style={styles.upsText}>{I18n.t('noConnection.ups')}</Text>
      <Image source={IMAGES.OTHERS.NO_CONNECTION_BG} />
      <Text style={styles.message}>{I18n.t('noConnection.message')}</Text>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  upsText: {
    color: COLORS.TEXT,
    fontSize: 50,
    fontWeight: '500',
  },
  message: {
    color: COLORS.TEXT,
    fontSize: 16,
    fontWeight: '600',
  },
});
