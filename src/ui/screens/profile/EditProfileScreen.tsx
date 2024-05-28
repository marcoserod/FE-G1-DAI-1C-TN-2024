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
  const {data, isLoading, refetch, isFetching} = useGetUserByIdQuery({userId});
  console.log(isFetching);
  console.log('userData:', data);
  const user = data;
  if (isLoading) {
    return <LoadingModal isVisible />;
  }

  return (
    <View style={styles.container}>
      <ProfileHeader user={user} showBack isEdit />
      <EditProfileForm user={user} refetch={refetch} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.BG,
  },
});
