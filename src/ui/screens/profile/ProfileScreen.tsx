import {View, StyleSheet} from 'react-native';
import React from 'react';
import {COLORS} from '../../../constants/colors';

import {ProfileHeader} from '../../components/profile/ProfileHeader';
import {ProfileContent} from '../../components/profile/ProfileContent';
import {useSelector} from 'react-redux';
import {useGetUserByIdQuery} from '../../../services/user';
import {LoadingModal} from '../../components/commons/modal/LoadingModal';

export const ProfileScreen = () => {
  const userId = useSelector(state => state?.userSession?.userId);
  console.log(userId);
  const {data, isLoading, error} = useGetUserByIdQuery({userId});
  const user = data;
  if (isLoading && !error) {
    return <LoadingModal isVisible />;
  }

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
