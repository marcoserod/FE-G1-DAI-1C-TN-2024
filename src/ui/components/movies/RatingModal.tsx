import {StyleSheet, View} from 'react-native';
import React, {useState} from 'react';

import Rating from '../commons/Rating';
import {ConfirmModal, useConfirmModal} from '../commons/ConfirmModal';
import I18n from '../../../assets/localization/i18n';

interface Props {
  onRating: (value: number) => void;
  initialRating: number;
  onConfirm: () => void;
  handleModalVisibility: () => void;
  isConfirmVisible: boolean;
  confirmDisabled: boolean;
}

export const RatingModal = ({
  onRating,
  initialRating,
  onConfirm,
  handleModalVisibility,
  isConfirmVisible,
  confirmDisabled,
}: Props) => {
  const [rating, setRating] = useState(initialRating);

  const handleRating = (value: number) => {
    setRating(value);
    onRating(value);
  };

  const handleClose = () => {
    setRating(0);
    handleModalVisibility();
  };

  return (
    <ConfirmModal
      title={I18n.t('rating.title')}
      onConfirm={onConfirm}
      onClose={handleClose}
      isVisible={isConfirmVisible}
      confirmDisabled={confirmDisabled}>
      <View style={styles.container}>
        <Rating initialRating={rating} size={36} onRating={handleRating} />
      </View>
    </ConfirmModal>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    paddingVertical: 40,
  },
});

export const useRatingModal = () => {
  const {isConfirmVisible, handleModalVisibility} = useConfirmModal();
  const [rating, setRating] = useState<number>(0);

  const onRating = (value: number) => {
    setRating(value);
  };

  return {
    handleModalVisibility,
    isConfirmVisible,
    rating,
    onRating,
  };
};
