import {
  View,
  Text,
  StyleSheet,
  Pressable,
  TouchableOpacity,
} from 'react-native';
import React, {useState} from 'react';
import {Button} from '../commons/Button';
import I18n from '../../../assets/localization/i18n';
import {COLORS} from '../../../constants/colors';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {useNavigation} from '@react-navigation/native';
import {ConfirmModal, useConfirmModal} from '../commons/ConfirmModal';
import {useDispatch, useSelector} from 'react-redux';
import {useLogoutMutation} from '../../../services/auth';
import {LoadingModal} from '../commons/modal/LoadingModal';
import {logOut} from '../../../store/authSlice';
import {showErrorToast, showSuccessToast} from '../commons/CustomToast';
import {useDeleteUserMutation} from '../../../services/user';

const logoutModalData = {
  modalMessage: I18n.t('logout.message'),
  modalSubMessage: '',
  onConfirm: () => {},
};
export const ProfileContent = () => {
  const navigation = useNavigation();
  const {isConfirmVisible, handleModalVisibility} = useConfirmModal();
  const [confirmModalData, setConfirmModalData] = useState(logoutModalData);
  const refreshToken = useSelector(state => state?.userSession?.refreshToken);
  const userId = useSelector(state => state?.userSession?.userId);
  const [logoutMutation, {isLoading: isLoggingOut}] = useLogoutMutation();
  const [deleteMutation, {isLoading: isDeleting}] = useDeleteUserMutation();
  const dispatch = useDispatch();

  const handleLogout = async () => {
    try {
      await logoutMutation(refreshToken).unwrap();
      dispatch(logOut());
      showSuccessToast({message: I18n.t('profile.logoutSuccess')});
    } catch (error) {
      showErrorToast({
        message: I18n.t('profile.logoutError'),
        onRetry: handleLogout,
      });
    }
  };

  const handleDelete = async () => {
    try {
      await deleteMutation({userId}).unwrap();
      dispatch(logOut());
      showSuccessToast({message: I18n.t('profile.deleteSuccess')});
    } catch (error) {
      showErrorToast({
        message: I18n.t('profile.deleteError'),
        onRetry: handleLogout,
      });
    }
  };
  const handleOnLogout = () => {
    setConfirmModalData({
      ...logoutModalData,
      onConfirm: handleLogout,
    });
    handleModalVisibility();
  };

  const handleOnDelete = () => {
    setConfirmModalData({
      modalMessage: I18n.t('delete.message'),
      modalSubMessage: I18n.t('delete.subMessage'),
      onConfirm: handleDelete,
    });
    handleModalVisibility();
  };

  return (
    <View style={styles.container}>
      <LoadingModal isVisible={isLoggingOut || isDeleting} />
      <ConfirmModal
        onConfirm={confirmModalData.onConfirm}
        message={confirmModalData.modalMessage}
        subMessage={confirmModalData.modalSubMessage}
        isVisible={isConfirmVisible}
        onClose={handleModalVisibility}
      />
      <View style={{marginHorizontal: 'auto'}}>
        <Button
          label={I18n.t('profile.edit')}
          onPress={() => navigation.navigate('EditProfile')}
        />
      </View>
      <View style={{...styles.menuHeader, marginTop: 16}}>
        <Text style={styles.menuHeaderText}>{I18n.t('profile.content')}</Text>
      </View>
      <TouchableOpacity onPress={() => navigation.navigate('Favorites')}>
        <View style={styles.menuItem}>
          <MaterialCommunityIcons
            name="heart-outline"
            color={COLORS.TEXT}
            size={16}
          />
          <Text style={styles.menuItemText}>{I18n.t('profile.favorites')}</Text>
        </View>
      </TouchableOpacity>
      <View style={styles.menuHeader}>
        <Text style={styles.menuHeaderText}>{I18n.t('profile.session')}</Text>
      </View>
      <TouchableOpacity onPress={handleOnLogout}>
        <View style={styles.menuItem}>
          <MaterialCommunityIcons name="logout" color={COLORS.TEXT} size={16} />
          <Text style={styles.menuItemText}>{I18n.t('profile.logout')}</Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity onPress={handleOnDelete}>
        <View style={styles.menuItem}>
          <MaterialCommunityIcons
            name="trash-can-outline"
            color={'red'}
            size={16}
          />
          <Text style={{...styles.menuItemText, color: 'red'}}>
            {I18n.t('profile.delete')}
          </Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 16,
  },
  menuHeader: {
    backgroundColor: COLORS.BG_3,
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  menuHeaderText: {
    color: COLORS.TEXT,
    fontSize: 16,
    fontWeight: '600',
  },
  menuItem: {
    flexDirection: 'row',
    paddingVertical: 16,
    paddingHorizontal: 20,
    alignItems: 'center',
    gap: 20,
  },
  menuItemText: {
    color: COLORS.TEXT,
    fontSize: 15,
    fontWeight: '500',
  },
});
