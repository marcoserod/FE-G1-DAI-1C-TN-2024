import {StyleSheet, Text, View} from 'react-native';
import React, {useState, PropsWithChildren} from 'react';
import {ModalProps, ModalWrapper} from './modal/ModalWrapper';
import {COLORS} from '../../../constants/colors';

import I18n from '../../../assets/localization/i18n';
import {Button} from './Button';

interface Props {
  title?: string;
  message?: string;
  subMessage?: string;
  onConfirm: () => void;
  confirmDisabled?: boolean;
}

export const ConfirmModal = ({
  title = '',
  isVisible = true,
  onClose,
  subMessage,
  message,
  onConfirm,
  children,
  confirmDisabled,
}: PropsWithChildren<ModalProps & Props>) => {
  return (
    <ModalWrapper isVisible={isVisible} onClose={onClose}>
      <View style={styles.modalContent}>
        {title ? <Text style={styles.title}>{title}</Text> : null}
        {message ? <Text style={styles.modalMessage}>{message}</Text> : null}
        {subMessage ? (
          <Text style={styles.modalSubMessage}>{subMessage}</Text>
        ) : null}
        {children || null}
        <View style={styles.buttonContainer}>
          <Button
            label={I18n.t('commons.confirm')?.toUpperCase()}
            onPress={onConfirm}
            disabled={confirmDisabled}
          />
          <Button
            type="text"
            label={I18n.t('commons.cancel')?.toUpperCase()}
            onPress={onClose}
          />
        </View>
      </View>
    </ModalWrapper>
  );
};

const styles = StyleSheet.create({
  modalContent: {
    backgroundColor: COLORS.BG_2,
    margin: 16,
    paddingVertical: 32,
    paddingHorizontal: 16,
    borderRadius: 16,
    elevation: 10,
    alignItems: 'center',
  },
  title: {
    color: COLORS.TEXT,
    fontSize: 18,
    fontWeight: '700',
  },
  modalMessage: {
    color: COLORS.TEXT,
    fontSize: 24,
    padding: 16,
    paddingBottom: 20,
  },
  modalSubMessage: {
    color: COLORS.TEXT,
    fontSize: 16,
    paddingHorizontal: 16,
    paddingBottom: 20,
  },
  buttonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'stretch',
    justifyContent: 'space-evenly',
  },
});

export const useConfirmModal = () => {
  const [isConfirmVisible, setIsConfirmVisible] = useState(false);

  const handleModalVisibility = () => {
    setIsConfirmVisible(prev => !prev);
  };

  return {
    isConfirmVisible,
    handleModalVisibility,
  };
};
