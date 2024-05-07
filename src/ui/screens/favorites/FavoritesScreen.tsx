import {View, Text, StyleSheet, Pressable} from 'react-native';
import React from 'react';
import {COLORS} from '../../../constants/colors';
import LinearGradient from 'react-native-linear-gradient';
import {useNavigation} from '@react-navigation/native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import I18n from '../../../assets/localization/i18n';
import {Button} from '../../components/commons/Button';

export const FavoritesScreen = () => {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <LinearGradient colors={['#DC682E', '#762419']} style={styles.gradient}>
        <View style={styles.header}>
          <Pressable
            onPress={() => navigation.goBack()}
            style={styles.backButton}>
            <MaterialCommunityIcons
              name="arrow-left"
              color={COLORS.TEXT}
              size={32}
            />
          </Pressable>

          <Text style={styles.textHeader}>{I18n.t('favorites.yours')}</Text>
        </View>
      </LinearGradient>
      <View style={styles.card}>
        <Text style={styles.emptyText}>
          Aun no tienes peliculas agregadas en tus favoritos, empieza buscando
          alguna
        </Text>
        <Button label="Buscar peliculas" />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.BG,
  },
  header: {
    flex: 1,
    flexDirection: 'row',
    marginHorizontal: 10,
    alignItems: 'center',
  },
  gradient: {
    height: 90,
    paddingTop: 20,
  },
  textHeader: {
    marginHorizontal: 'auto',
    color: COLORS.TEXT,
    fontWeight: '600',
    fontSize: 14,
  },
  backButton: {
    position: 'absolute',
  },
  card: {
    height: 250,
    borderStyle: 'dashed',
    borderColor: COLORS.TEXT_DISABLED,
    borderWidth: 1,
    borderRadius: 12,
    marginHorizontal: 20,
    marginVertical: 'auto',
    padding: 16,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 16,
  },
  emptyText: {
    color: COLORS.TEXT_2,
    textAlign: 'center',
  },
});
