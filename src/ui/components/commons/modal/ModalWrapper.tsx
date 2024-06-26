import {
  Modal,
  Pressable,
  StyleSheet,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import React, {PropsWithChildren} from 'react';

export interface ModalProps {
  isVisible: boolean;
  onClose: () => void;
}
export const ModalWrapper = ({
  isVisible,
  onClose,
  children,
}: PropsWithChildren<ModalProps>) => {
  return (
    <Modal visible={isVisible} transparent onRequestClose={onClose}>
      <Pressable style={styles.modalContainer} onPress={onClose}>
        <TouchableWithoutFeedback>
          <View>{children}</View>
        </TouchableWithoutFeedback>
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
});
