import React from 'react';
import {ActivityIndicator, Modal, StyleSheet, View} from 'react-native';
import {COLORS} from '../../../../constants/colors';

export interface ModalLoadingProps {
  isVisible: boolean;
}
export const LoadingModal = ({isVisible}: ModalLoadingProps) => {
  return (
    <Modal visible={isVisible} transparent>
      <View style={styles.modalContainer}>
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
