import {View, Text, StyleSheet} from 'react-native';
import React from 'react';
import {COLORS} from '../../../constants/colors';
import {MoviesGrid} from '../../layout/MoviesGrid';
import {MovieCard} from '../../components/movies/MovieCard';
import IMAGES from '../../../assets/images';
import I18n from '../../../assets/localization/i18n';
import {useMovies} from '../../../networking/temporal/hooks/useMovies';

export const HomeScreen = () => {
  const {nowPlaying, isLoading} = useMovies();

  return (
    <View style={styles.homeContainer}>
      <View style={styles.homeHeader}>
        <Text style={styles.headerText}>{I18n.t('home.nowPlaying')}</Text>
        <IMAGES.SVG.APP_LOGO height={40} width={40} />
      </View>
      <MoviesGrid>
        {!isLoading ? (
          nowPlaying.map(movie => (
            <MovieCard
              id={movie.id}
              key={movie.id}
              title={movie.title}
              poster={movie.poster}
              rating={movie.rating}
            />
          ))
        ) : (
          <Text>Cargando...</Text>
        )}
      </MoviesGrid>
    </View>
  );
};

const styles = StyleSheet.create({
  homeContainer: {
    paddingTop: 36,
    paddingBottom: 10,
    height: '100%',
    backgroundColor: COLORS.BG,
  },
  homeHeader: {
    borderBottomColor: COLORS.PRIMARY_2,
    borderBottomWidth: 1,
    marginHorizontal: 16,
    marginBottom: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerText: {
    fontSize: 28,
    color: COLORS.TEXT,
    lineHeight: 50,
    fontWeight: '500',
  },
});
