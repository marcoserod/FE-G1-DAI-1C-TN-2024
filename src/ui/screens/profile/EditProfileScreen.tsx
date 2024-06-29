import {StyleSheet, Platform, KeyboardAvoidingView} from 'react-native';
import React from 'react';
import {ProfileHeader} from '../../components/profile/ProfileHeader';

import {COLORS} from '../../../constants/colors';
import {EditProfileForm} from '../../components/profile/EditProfileForm';
import {useGetUserByIdQuery} from '../../../services/user';
import {useSelector} from 'react-redux';
import {LoadingModal} from '../../components/commons/modal/LoadingModal';

export const EditProfileScreen = () => {
  const userId = useSelector(state => state?.userSession?.userId);
  const {data, isLoading, refetch, error} = useGetUserByIdQuery({userId});
  const user = data;
  if (isLoading && !error) {
    return <LoadingModal isVisible />;
  }

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}>
      <ProfileHeader user={user} showBack isEdit />
      <EditProfileForm user={user} refetch={refetch} />
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.BG,
  },
});
