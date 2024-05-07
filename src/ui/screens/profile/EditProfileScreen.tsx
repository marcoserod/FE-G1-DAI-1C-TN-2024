import {View, Text, StyleSheet} from 'react-native';
import React from 'react';
import {ProfileHeader} from '../../components/profile/ProfileHeader';
import {mockUser} from './ProfileScreen';
import {COLORS} from '../../../constants/colors';
import {EditProfileForm} from '../../components/profile/EditProfileForm';

export const EditProfileScreen = () => {
  const user = mockUser;
  return (
    <View style={styles.container}>
      <ProfileHeader user={user} showBack isEdit />
      <EditProfileForm />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.BG,
  },
});
