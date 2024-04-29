import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  ImageBackground,
  ScrollView,
  Pressable,
  FlatList,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {useCast, useMovie} from '../../../networking/temporal/hooks/useMovie';
import {Chip} from '../../components/commons/Chip';
import {Formatter} from '../../../assets/helpers/formatter';
import {COLORS} from '../../../constants/colors';
import I18n from '../../../assets/localization/i18n';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {useNavigation} from '@react-navigation/native';
import {InfoTile} from '../../components/movies/InfoTile';
import {CastActor} from '../../components/cast/CastActor';
import {RatingTile} from '../../components/movies/RatingTile';

const MovieDetailScreen = ({route}) => {
  const {movieId} = route.params;
  const {movie, isLoading} = useMovie(movieId);
  const {cast = []} = useCast(movieId);
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <View style={styles.backButton}>
        <Pressable onPress={() => navigation.goBack()}>
          <MaterialCommunityIcons
            name="arrow-left"
            color={COLORS.TEXT}
            size={32}
          />
        </Pressable>
      </View>
      {!isLoading ? (
        <ImageBackground
          source={{uri: movie?.poster}}
          style={styles.backgroundImage}
          imageStyle={styles.stretch}>
          <LinearGradient
            colors={['transparent', COLORS.BG]}
            style={styles.gradientOverlay}
          />
          <View style={styles.statusBarOverlay} />
          <ScrollView contentContainerStyle={styles.scrollContent}>
            <View style={styles.dateAndDuration}>
              <Chip
                label={Formatter.duration(movie?.duration || 0)}
                Icon={
                  <MaterialCommunityIcons
                    name="clock-time-five-outline"
                    color={COLORS.TEXT_2}
                    size={16}
                  />
                }
              />
              <Chip
                label={Formatter.date(movie?.releaseDate)}
                Icon={
                  <MaterialCommunityIcons
                    name="calendar-today"
                    color={COLORS.TEXT_2}
                    size={16}
                  />
                }
              />
            </View>
            <ScrollView horizontal style={styles.genres}>
              {movie?.genres.map(item => (
                <View style={{marginRight: 8}} key={item}>
                  <Chip label={item} />
                </View>
              ))}
            </ScrollView>
            <View style={styles.actionContainer}>
              <RatingTile
                rating={movie?.rating}
                totalVotes={movie?.ratingCount}
              />
              <View style={styles.actionContainerIcons}>
                <MaterialCommunityIcons
                  name="share-variant-outline"
                  color={COLORS.ACCENT}
                  size={32}
                />
                <MaterialCommunityIcons
                  name="cards-heart-outline"
                  color={COLORS.ACCENT}
                  size={32}
                />
              </View>
            </View>
            <InfoTile title={movie?.title || ''}>
              <Text style={styles.movieSubtitle}>{movie?.subtitle}</Text>
              <Text style={styles.movieOverview}>{movie?.description}</Text>
            </InfoTile>
            <InfoTile title={I18n.t('movie.cast')}>
              <FlatList
                data={cast}
                keyExtractor={item => item.id.toString()}
                horizontal
                showsHorizontalScrollIndicator={false}
                renderItem={({item}) => <CastActor actor={item} />}
              />
            </InfoTile>
          </ScrollView>
        </ImageBackground>
      ) : (
        <Text>Cargando...</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  statusBarOverlay: {
    height: 24,
    backgroundColor: 'rgba(0,0,0,0.1)',
  },
  backButton: {
    position: 'absolute',
    top: 30,
    left: 10,
    zIndex: 10,
    backgroundColor: `${COLORS.BG}80`,
    borderRadius: 100,
  },
  container: {
    flex: 1,
    backgroundColor: '#1C1C1C',
    paddingBottom: 36,
  },
  gradientOverlay: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    height: '70%',
  },
  backgroundImage: {
    flex: 1,
    opacity: 1,
    resizeMode: 'cover',
  },
  stretch: {
    width: '100%',
    height: '70%',
  },
  actionContainer: {
    marginBottom: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  actionContainerIcons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 8,
  },
  movieSubtitle: {
    marginTop: 4,
    color: COLORS.TEXT_2,
  },
  movieOverview: {
    marginTop: 14,
    fontSize: 16,
    color: COLORS.TEXT,
  },
  dateAndDuration: {
    marginTop: 270,
    flexDirection: 'row',
    gap: 8,
    alignSelf: 'flex-start',
  },
  genres: {
    marginTop: 12,
    flexDirection: 'row',
    alignSelf: 'flex-start',
    marginBottom: 16,
  },
  scrollContent: {
    paddingHorizontal: 10,
  },
});

export default MovieDetailScreen;
