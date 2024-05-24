import {View, Text, StyleSheet} from 'react-native';
import React from 'react';
import {ProfileHeader} from '../../components/profile/ProfileHeader';

import {COLORS} from '../../../constants/colors';
import {EditProfileForm} from '../../components/profile/EditProfileForm';
import {useGetUserByIdQuery} from '../../../services/user';
import {useSelector} from 'react-redux';
import {LoadingModal} from '../../components/commons/modal/LoadingModal';

export const EditProfileScreen = () => {
  const userId = useSelector(state => state?.userSession?.userId);
  console.log(userId);
  const {data, isLoading} = useGetUserByIdQuery({userId});
  const user = data;
  if (isLoading) {
    return <LoadingModal isVisible />;
  }

  return (
    <View style={styles.container}>
      <ProfileHeader user={user} showBack isEdit />
      <EditProfileForm user={user} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.BG,
  },
});
