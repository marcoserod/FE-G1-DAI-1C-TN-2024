import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {COLORS} from '../../../constants/colors';
import {useNavigation} from '@react-navigation/native';
import {Button} from '../commons/Button';
import I18n from '../../../assets/localization/i18n';
import {useHandleFavorites} from './useHandleFavorites';
import {LoadingModal} from '../commons/modal/LoadingModal';
import {ConfirmModal} from '../commons/ConfirmModal';

export const FavoriteCard = ({
  title,
  year,
  poster,
  id,
  description,
  refetch,
}) => {
  const navigation = useNavigation();
  const {
    isConfirmVisible,
    handleModalVisibility,
    handleRemoveFavorite,
    isRemoveFavoriteLoading,
  } = useHandleFavorites();

  return (
    <TouchableOpacity
      onPress={() => navigation.navigate('MovieDetails', {movieId: id})}>
      <LoadingModal isVisible={isRemoveFavoriteLoading} />
      <ConfirmModal
        message={I18n.t('favorites.removeMessage')}
        isVisible={isConfirmVisible}
        onClose={handleModalVisibility}
        onConfirm={() =>
          handleRemoveFavorite({
            movieId: id,
            onSuccessCallback: refetch,
          })
        }
      />
      <View style={styles.container}>
        <Image source={{uri: poster}} style={styles.poster} />
        <View style={styles.info}>
          <Text style={styles.year}>({year})</Text>
          <Text style={styles.title}>{title}</Text>
          <Text numberOfLines={5} style={styles.description}>
            {description}
          </Text>
          <View style={styles.remove}>
            <Button
              type="text"
              label={I18n.t('favorites.delete')}
              color={COLORS.PRIMARY}
              onPress={handleModalVisibility}
            />
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderRadius: 15,
    borderColor: COLORS.BG_3,
    padding: 12,
    flexDirection: 'row',
    gap: 16,
  },
  poster: {
    height: 200,
    width: 140,
    borderRadius: 12,
  },
  info: {
    flex: 1,
    gap: 8,
  },
  year: {
    color: COLORS.TEXT_2,
  },
  title: {
    color: COLORS.TEXT,
    fontSize: 16,
  },
  description: {
    color: COLORS.TEXT,
    fontSize: 14,
  },
  remove: {
    marginVertical: 'auto',
  },
});
