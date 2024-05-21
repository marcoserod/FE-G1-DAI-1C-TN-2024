import {
  View,
  Modal,
  StyleSheet,
  Pressable,
  PermissionsAndroid,
} from 'react-native';
import React from 'react';
import {Button} from '../commons/Button';
import I18n from '../../../assets/localization/i18n';
import {COLORS} from '../../../constants/colors';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';

interface Props {
  visible: boolean;
  onClose: () => void;
}
type ImageType = {
  uri: string;
  type: string;
  name: string;
};

export const ChangePhotoModal = ({visible = true, onClose}: Props) => {
  const options = {
    mediaType: 'photo',
  };

  const handleTakePhoto = async () => {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.CAMERA,
    );

    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      const result = (await launchCamera(options as any)) as {
        assets: ImageType[];
      };
      console.log(result);
    }
  };

  const handleChoosePhoto = async () => {
    const result = (await launchImageLibrary(options as any)) as {
      assets: ImageType[];
    };
    console.log(result);
  };

  return (
    <Modal visible={visible} transparent>
      <Pressable style={styles.modalContainer} onPress={onClose}>
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
      </Pressable>
    </Modal>
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
