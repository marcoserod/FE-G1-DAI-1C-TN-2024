import React from 'react';
import {ActivityIndicator, Modal, StyleSheet, View} from 'react-native';
import {COLORS} from '../../../../constants/colors';

export interface ModalLoadingProps {
  isVisible: boolean;
  transparent?: boolean;
}
export const LoadingModal = ({isVisible, transparent}: ModalLoadingProps) => {
  return (
    <Modal visible={isVisible} transparent>
      <View
        style={{
          ...styles.modalContainer,
          ...(transparent ? {backgroundColor: 'transparent'} : {}),
        }}>
        <ActivityIndicator size="large" color={COLORS.PRIMARY} />
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    flex: 1,
    justifyContent: 'center',
  },
});
