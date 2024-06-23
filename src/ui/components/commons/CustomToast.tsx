import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import React from 'react';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {COLORS} from '../../../constants/colors';
import Toast, {BaseToast} from 'react-native-toast-message';
import IMAGES from '../../../assets/images';
import I18n from '../../../assets/localization/i18n';
import LinearGradient from 'react-native-linear-gradient';

const CloseIcon = () => {
  return (
    <TouchableOpacity onPress={() => Toast.hide()}>
      <MaterialCommunityIcons name="close" color={'#979FA9'} size={24} />
    </TouchableOpacity>
  );
};

const Actions = ({onRetry}) => {
  return (
    <View style={styles.actions}>
      {onRetry ? (
        <TouchableOpacity onPress={onRetry} style={styles.retry}>
          <Text style={styles.retryText}>{I18n.t('commons.retry')}</Text>
        </TouchableOpacity>
      ) : null}
      <CloseIcon />
    </View>
  );
};

const SuccessToast = props => {
  return (
    <LinearGradient
      start={{x: 0, y: 0}}
      end={{x: 1, y: 0}}
      colors={['#32BB71', COLORS.BG_2]}
      style={styles.gradient}>
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
    </LinearGradient>
  );
};

const ErrorToast = props => {
  return (
    <LinearGradient
      start={{x: 0, y: 0}}
      end={{x: 1, y: 0}}
      colors={['#F6743E', COLORS.BG_2]}
      style={styles.gradient}>
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
    </LinearGradient>
  );
};

const InfoToast = props => {
  return (
    <LinearGradient
      start={{x: 0, y: 0}}
      end={{x: 1, y: 0}}
      colors={['#2D82B2', COLORS.BG_2]}
      style={styles.gradient}>
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
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  gradient: {
    flex: 1,
    borderRadius: 12,
  },
  commons: {
    height: 'auto',
    elevation: 0,
    borderWidth: 1,
    borderLeftWidth: 1,
    shadowRadius: 0,
    padding: 20,
    borderRadius: 12,
    backgroundColor: 'transparent',
  },
  success: {
    borderColor: '#43D590',
  },
  error: {
    borderColor: '#F4B0A1',
  },
  info: {
    borderColor: '#7BCFED',
  },
  titleStyle: {
    fontWeight: 600,
    fontSize: 14,
    color: COLORS.TEXT,
  },
  message: {
    fontWeight: 400,
    fontSize: 12,
    color: COLORS.TEXT,
  },
  actions: {
    flexDirection: 'row',
    gap: 8,
  },
  retry: {
    backgroundColor: 'rgba(0,0,0,0.2)',
    justifyContent: 'center',
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: COLORS.TEXT,
  },
  retryText: {
    color: COLORS.TEXT,
  },
});

const toastConfig = {
  success: props => <SuccessToast {...props} />,
  error: props => <ErrorToast {...props} />,
  info: props => <InfoToast {...props} />,
};

const showSuccessToast = ({
  title = I18n.t('commons.success'),
  message = '',
}) => {
  Toast.show({
    type: 'success',
    visibilityTime: 10000,
    autoHide: true,
    text1: title,
    text2: message,
  });
};

const showInfoToast = ({title = I18n.t('commons.info'), message = ''}) => {
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
  message = '',
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
