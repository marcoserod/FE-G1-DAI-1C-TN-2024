import {
  View,
  Text,
  StyleSheet,
  Pressable,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {COLORS} from '../../../constants/colors';
import Toast, {BaseToast} from 'react-native-toast-message';
import IMAGES from '../../../assets/images';
import I18n from '../../../assets/localization/i18n';

const CloseIcon = () => {
  return (
    <Pressable onPress={() => Toast.hide()}>
      <MaterialCommunityIcons name="close" color={'#979FA9'} size={24} />
    </Pressable>
  );
};

const Actions = ({onRetry}) => {
  return (
    <View style={styles.actions}>
      {onRetry ? (
        <TouchableOpacity onPress={onRetry} style={styles.retry}>
          <Text>{I18n.t('commons.retry')}</Text>
        </TouchableOpacity>
      ) : null}
      <CloseIcon />
    </View>
  );
};

const SuccessToast = props => {
  return (
    <BaseToast
      {...props}
      renderTrailingIcon={CloseIcon}
      renderLeadingIcon={() => <IMAGES.SVG.SUCCESS />}
      style={[styles.success, styles.commons]}
      text1NumberOfLines={0}
      text2NumberOfLines={2}
      text1Style={styles.titleStyle}
      text2Style={styles.message}
    />
  );
};

const ErrorToast = props => {
  return (
    <BaseToast
      {...props}
      renderTrailingIcon={() => <Actions onRetry={props.props?.onRetry} />}
      renderLeadingIcon={() => <IMAGES.SVG.ERROR />}
      text1NumberOfLines={0}
      text2NumberOfLines={2}
      style={[styles.error, styles.commons]}
      text1Style={styles.titleStyle}
      text2Style={styles.message}
    />
  );
};

const InfoToast = props => {
  return (
    <BaseToast
      {...props}
      renderTrailingIcon={CloseIcon}
      renderLeadingIcon={() => <IMAGES.SVG.INFO />}
      text1NumberOfLines={0}
      text2NumberOfLines={2}
      style={[styles.info, styles.commons]}
      text1Style={styles.titleStyle}
      text2Style={styles.message}
    />
  );
};

const styles = StyleSheet.create({
  commons: {
    height: 'auto',
    borderWidth: 2,
    borderLeftWidth: 2,
    padding: 20,
  },
  success: {
    backgroundColor: '#F6FFF9',
    borderColor: '#48C1B5',
  },
  error: {
    backgroundColor: '#FFF5F3',
    borderColor: '#F4B0A1',
  },
  info: {
    backgroundColor: '#F5F9FF',
    borderColor: '#9DC0EE',
  },
  titleStyle: {
    fontWeight: 600,
    fontSize: 14,
    color: '#27303A',
  },
  message: {
    fontWeight: 400,
    fontSize: 12,
    color: '#2F3F53',
  },
  actions: {
    flexDirection: 'row',
    gap: 8,
  },
  retry: {
    backgroundColor: COLORS.TEXT,
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '#979FA9',
  },
});

const toastConfig = {
  success: props => <SuccessToast {...props} />,
  error: props => <ErrorToast {...props} />,
  info: props => <InfoToast {...props} />,
};

const showSuccessToast = ({title = I18n.t('commons.success'), message}) => {
  Toast.show({
    type: 'success',
    visibilityTime: 10000,
    autoHide: true,
    text1: title,
    text2: message,
  });
};

const showInfoToast = ({title = I18n.t('commons.info'), message}) => {
  Toast.show({
    type: 'info',
    visibilityTime: 10000,
    autoHide: true,
    text1: title,
    text2: message,
  });
};

const showErrorToast = ({
  title = I18n.t('commons.error'),
  message,
  onRetry,
}) => {
  Toast.show({
    type: 'error',
    autoHide: false,
    text1: title,
    text2: message,
    props: {
      onRetry,
    },
  });
};

export {toastConfig, showSuccessToast, showErrorToast, showInfoToast};
