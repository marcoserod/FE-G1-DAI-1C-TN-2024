import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import React, {useState} from 'react';
import {COLORS} from '../../../constants/colors';
import LinearGradient from 'react-native-linear-gradient';
import {useNavigation} from '@react-navigation/native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import I18n from '../../../assets/localization/i18n';
import {Button} from '../../components/commons/Button';
import {useGetFavoritesQuery} from '../../../services/user';
import {useSelector} from 'react-redux';
import {FavoriteCard} from '../../components/favorites/FavoriteCard';
import {LoadingModal} from '../../components/commons/modal/LoadingModal';
import {ProgressBar} from '@react-native-community/progress-bar-android';

export const FavoritesScreen = () => {
  const navigation = useNavigation();
  const userId = useSelector(state => state?.userSession?.userId);
  const [page, setPage] = useState(1);
  const {data, isLoading, isFetching} = useGetFavoritesQuery({userId, page});
  const totalRecords = data?.totalRecords;
  const favorites = data?.movies;

  const loadMore = () => {
    if (!isFetching && favorites && favorites.length < totalRecords) {
      setPage(prev => prev + 1);
    }
  };

  return (
    <View style={styles.container}>
      <LoadingModal isVisible={isLoading} />
      <LinearGradient colors={['#DC682E', '#762419']} style={styles.gradient}>
        <View style={styles.header}>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={styles.backButton}>
            <MaterialCommunityIcons
              name="arrow-left"
              color={COLORS.TEXT}
              size={32}
            />
          </TouchableOpacity>

          <Text style={styles.textHeader}>{I18n.t('favorites.yours')}</Text>
        </View>
      </LinearGradient>
      {isFetching && !isLoading ? (
        <ProgressBar
          styleAttr="Horizontal"
          color={COLORS.PRIMARY}
          style={{marginTop: -10}}
        />
      ) : null}
      {favorites?.length ? (
        <FlatList
          data={favorites}
          keyExtractor={item => item.id.toString()}
          horizontal={false}
          contentContainerStyle={styles.gridContainer}
          onEndReached={loadMore}
          /*  ListHeaderComponent={
            !isFetching ? (
              <ProgressBar styleAttr="Horizontal" color={COLORS.PRIMARY_2} />
            ) : null
          } */
          ListFooterComponent={
            !isLoading && isFetching ? (
              <ActivityIndicator size="large" color={COLORS.PRIMARY} />
            ) : null
          }
          onEndReachedThreshold={0.8}
          renderItem={({item}) => (
            <FavoriteCard
              refetch={() => {}}
              title={item.title}
              id={item.id}
              year={item.year}
              poster={item.poster}
              description={item.description}
            />
          )}
        />
      ) : (
        !isLoading &&
        !isFetching && (
          <View style={styles.card}>
            <Text style={styles.emptyText}>
              Aun no tienes peliculas agregadas en tus favoritos, empieza
              buscando alguna
            </Text>
            <View>
              <Button
                label="Buscar películas"
                onPress={() => navigation.navigate('Search')}
              />
            </View>
          </View>
        )
      )}
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
  gridContainer: {
    rowGap: 16,
    paddingVertical: 16,
    marginHorizontal: 16,
  },
});
