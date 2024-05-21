import {View, StyleSheet} from 'react-native';
import React from 'react';
import {COLORS} from '../../../constants/colors';

import {ProfileHeader} from '../../components/profile/ProfileHeader';
import {ProfileContent} from '../../components/profile/ProfileContent';

export const mockUser = {
  name: 'Franco',
  nickName: '@photoman',
};

export const ProfileScreen = () => {
  const user = mockUser;
  return (
    <View style={styles.container}>
      <ProfileHeader user={user} />
      <ProfileContent />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.BG,
    color: COLORS.TEXT,
  },
});
