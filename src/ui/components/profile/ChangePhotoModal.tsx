import {View, StyleSheet, PermissionsAndroid} from 'react-native';
import React from 'react';
import {Button} from '../commons/Button';
import I18n from '../../../assets/localization/i18n';
import {COLORS} from '../../../constants/colors';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import {ModalProps, ModalWrapper} from '../commons/modal/ModalWrapper';
import {useEditUserMutation, useGetUserByIdQuery} from '../../../services/user';
import {useSelector} from 'react-redux';
import {showSuccessToast} from '../commons/CustomToast';
import {useNavigation} from '@react-navigation/native';
import {LoadingModal} from '../commons/modal/LoadingModal';

type ImageType = {
  uri: string;
  type: string;
  name: string;
};

export const ChangePhotoModal = ({isVisible, onClose}: ModalProps) => {
  const userId = useSelector(state => state?.userSession?.userId);
  const {refetch} = useGetUserByIdQuery({userId});
  const [editUser, {isLoading}] = useEditUserMutation();
  const options = {
    mediaType: 'photo',
    maxHeight: 500,
    maxWidth: 500,
  };
  const navigation = useNavigation();

  const handleUploadPhoto = async result => {
    const image = result.assets[0];
    const payload = {
      profileImage: {
        uri: image.uri,
        type: image.type,
        name: image.fileName,
      },
    };

    try {
      await editUser({userId, payload});
      showSuccessToast({message: I18n.t('profile.editProfileSuccess')});
      await refetch();
      navigation.navigate('Profile');
    } catch (error) {
      console.log(error);
    }
  };

  const handleTakePhoto = async () => {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.CAMERA,
    );
    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      const result = (await launchCamera(options as any)) as {
        assets: ImageType[];
      };
      if (result.didCancel) {
        console.log('User cancelled camera');
        onClose();
        return;
      }
      if (result.error) {
        console.log('Camera Error: ', result.error);
        onClose();
        return;
      }
      return handleUploadPhoto(result);
    }
  };

  const handleChoosePhoto = async () => {
    const result = (await launchImageLibrary(options as any)) as {
      assets: ImageType[];
    };
    if (result.didCancel) {
      console.log('User cancelled camera');
      onClose();
      return;
    }
    if (result.error) {
      console.log('Camera Error: ', result.error);
      onClose();
      return;
    }
    return handleUploadPhoto(result);
  };

  return (
    <ModalWrapper isVisible={isVisible} onClose={onClose}>
      <LoadingModal isVisible={isLoading} />
      <View style={styles.buttonContainer}>
        <Button
          onPress={handleTakePhoto}
          style={styles.buttonStyle}
          type="text"
          label={I18n.t('profile.takePhoto')?.toUpperCase()}
        />
        <Button
          onPress={handleChoosePhoto}
          style={{...styles.buttonStyle, paddingTop: 0}}
          type="text"
          label={I18n.t('profile.chooseExisting')?.toUpperCase()}
        />
      </View>
    </ModalWrapper>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    flex: 1,
    justifyContent: 'center',
  },
  buttonContainer: {
    elevation: 10,
    backgroundColor: COLORS.BG_2,
    marginHorizontal: 16,
    borderRadius: 15,
  },
  buttonStyle: {
    padding: 20,
    width: '100%',
    alignItems: 'flex-start',
  },
});
