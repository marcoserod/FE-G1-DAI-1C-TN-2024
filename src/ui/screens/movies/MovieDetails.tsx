import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  View,
  Text,
  ImageBackground,
  ScrollView,
  FlatList,
  TouchableOpacity,
  Image,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {Chip} from '../../components/commons/Chip';
import {Formatter} from '../../../assets/helpers/formatter';
import {COLORS} from '../../../constants/colors';
import I18n from '../../../assets/localization/i18n';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {useNavigation} from '@react-navigation/native';
import {InfoTabs, InfoTile} from '../../components/movies/InfoTile';
import {CastActor} from '../../components/cast/CastActor';
import {RatingTile} from '../../components/movies/RatingTile';
import {useGetMovieByIdQuery, useRateMutation} from '../../../services/movies';
import {LoadingModal} from '../../components/commons/modal/LoadingModal';
import {
  showErrorToast,
  showInfoToast,
} from '../../components/commons/CustomToast';

import {TrailerVideo} from '../../components/movies/TrailerVideo';

import Share from 'react-native-share';
import IMAGES from '../../../assets/images';
import {SceneMap} from 'react-native-tab-view';
import {useImageGallery} from '../../components/movies/ImageGallery';
import {RatingModal, useRatingModal} from '../../components/movies/RatingModal';
import {useHandleFavorites} from '../../components/favorites/useHandleFavorites';
import {ConfirmModal} from '../../components/commons/ConfirmModal';

const extractVideoId = url => {
  const regex =
    /(?:https?:\/\/)?(?:www\.)?youtu(?:be\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|\.be\/)([a-zA-Z0-9_-]{11})/;
  const match = url?.match(regex);
  return match ? match[1] : null;
};

const convertToBase64 = async url => {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.onload = function () {
      const reader = new FileReader();
      reader.onloadend = function () {
        const base64Data = reader?.result?.split(',')[1];
        resolve(base64Data);
      };
      reader.onerror = function (error) {
        reject(error);
      };
      reader.readAsDataURL(xhr.response);
    };
    xhr.onerror = function (error) {
      reject(error);
    };
    xhr.open('GET', url);
    xhr.responseType = 'blob';
    xhr.send();
  });
};

const MovieDetailScreen = ({route}) => {
  const {movieId} = route.params;
  const {
    data: movie,
    isLoading,
    error,
    refetch,
  } = useGetMovieByIdQuery({movieId});
  const [rateMovie, {isLoading: isRateLoading}] = useRateMutation();
  const {
    handleAddFavorite,
    /*  handleRemoveFavorite, */
    isAddFavoriteLoading,
    /* isRemoveFavoriteLoading, */
  } = useHandleFavorites();
  const navigation = useNavigation();
  const videoId = extractVideoId(movie?.trailer);
  const isFavorite = movie?.isUserFavorite;
  const [shareLoading, setShareLoading] = useState(false);
  const [posterLoaded, setPosterLoaded] = useState(false);
  const tabRoutes = [
    {key: 'cast', title: I18n.t('movie.cast')},
    {key: 'direction', title: I18n.t('movie.direction')},
  ];
  const mediaTabRoutes = [
    {key: 'trailer', title: I18n.t('movie.trailer')},
    {key: 'images', title: I18n.t('movie.images')},
  ];
  const {ImageGallery, openImageViewer} = useImageGallery();
  const {rating, onRating, isConfirmVisible, handleModalVisibility} =
    useRatingModal();
  const {
    isConfirmVisible: isRemoveFavoriteVisible,
    handleModalVisibility: handleRemoveModalVisibility,
    handleRemoveFavorite,
    isRemoveFavoriteLoading,
  } = useHandleFavorites();

  const share = async () => {
    setShareLoading(true);
    try {
      const base64Image = await convertToBase64(movie?.poster);
      const dataUrl = `data:image/jpeg;base64,${base64Image}`;
      setShareLoading(false);
      const shareOptions = {
        subject: 'Mirá esta película en MoviePlay',
        title: movie?.title,
        message: `${movie?.title}\n\n${movie?.description}`,
        url: dataUrl,
        type: 'image/jpeg',
      };
      await Share.open(shareOptions);
    } catch (e) {
      console.error(e);
    }
  };

  const handleRateSubmit = async () => {
    try {
      await rateMovie({movieId, rating}).unwrap();
      showInfoToast({
        title: I18n.t('rating.success'),
        message: I18n.t('rating.message'),
      });
      handleModalVisibility();
    } catch (error) {
      console.log(error);
      showErrorToast({message: error?.data?.message});
    }
  };

  const onFavoritePress = () => {
    if (isFavorite) {
      handleRemoveModalVisibility();
      return;
    }
    handleAddFavorite({movieId, onSuccessCallback: refetch});
  };

  const Cast = () => (
    <FlatList
      data={movie?.cast}
      keyExtractor={item => item.id.toString()}
      horizontal
      showsHorizontalScrollIndicator={false}
      renderItem={({item}) => <CastActor actor={item} />}
    />
  );

  const Direction = () => (
    <FlatList
      data={movie?.direction}
      keyExtractor={item => item.id.toString()}
      horizontal
      showsHorizontalScrollIndicator={false}
      renderItem={({item}) => <CastActor actor={item} />}
    />
  );

  const renderScene = SceneMap({
    cast: Cast,
    direction: Direction,
  });

  const Trailer = () => <TrailerVideo videoId={videoId} />;
  const Images = () => (
    <FlatList
      data={movie?.images || []}
      keyExtractor={item => item}
      horizontal
      showsHorizontalScrollIndicator={false}
      renderItem={({item, index}) => (
        <TouchableOpacity onPress={() => openImageViewer(index)}>
          <Image
            source={{uri: item}}
            style={{
              marginTop: 16,
              marginRight: 10,
              width: 100,
              height: 150,
              borderRadius: 10,
            }}
          />
        </TouchableOpacity>
      )}
    />
  );

  const renderMediaScene = SceneMap({
    trailer: Trailer,
    images: Images,
  });

  useEffect(() => {
    if (error && error.status === 404) {
      showInfoToast({message: I18n.t('movie.noInfo')});
      navigation.goBack();
    }
  }, [error, navigation]);

  console.log(movie?.images);
  return (
    <View style={styles.container}>
      <View style={styles.backButton}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <MaterialCommunityIcons
            name="arrow-left"
            color={COLORS.TEXT}
            size={32}
          />
        </TouchableOpacity>
      </View>
      <LoadingModal
        isVisible={
          isLoading ||
          shareLoading ||
          isAddFavoriteLoading ||
          isRateLoading ||
          isRemoveFavoriteLoading
        }
      />
      <ConfirmModal
        message={I18n.t('favorites.removeMessage')}
        isVisible={isRemoveFavoriteVisible}
        onClose={handleRemoveModalVisibility}
        onConfirm={() =>
          handleRemoveFavorite({movieId, onSuccessCallback: refetch})
        }
      />
      {!isLoading ? (
        <ImageBackground
          onLoad={() => setPosterLoaded(true)}
          source={
            movie?.poster?.includes('null')
              ? IMAGES.OTHERS.LOGO
              : {uri: movie?.poster}
          }
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
            <View style={styles.genres}>
              {movie?.genres.map(item => (
                <View style={{marginRight: 8}} key={item}>
                  <Chip label={item} />
                </View>
              ))}
            </View>
            <View style={styles.actionContainer}>
              <RatingTile
                rating={movie?.rating}
                totalVotes={movie?.ratingCount}
              />
              <View style={styles.actionContainerIcons}>
                <TouchableOpacity onPress={handleModalVisibility}>
                  <IMAGES.SVG.RATE height={32} width={32} />
                </TouchableOpacity>
                {posterLoaded ? (
                  <TouchableOpacity onPress={share}>
                    <MaterialCommunityIcons
                      name="share-variant-outline"
                      color={COLORS.ACCENT}
                      size={32}
                    />
                  </TouchableOpacity>
                ) : null}
                <TouchableOpacity onPress={onFavoritePress}>
                  <MaterialCommunityIcons
                    name={isFavorite ? 'cards-heart' : 'cards-heart-outline'}
                    color={COLORS.ACCENT}
                    size={32}
                  />
                </TouchableOpacity>
              </View>
            </View>

            <InfoTile title={movie?.title || ''}>
              <Text style={styles.movieSubtitle}>{movie?.subtitle}</Text>
              <Text style={styles.movieOverview}>{movie?.description}</Text>
            </InfoTile>

            <InfoTabs tabRoutes={tabRoutes} renderScene={renderScene} />
            <InfoTabs
              tabRoutes={mediaTabRoutes}
              renderScene={renderMediaScene}
            />

            {/*       <InfoTile title={I18n.t('movie.cast')}>
              <FlatList
                data={movie?.cast}
                keyExtractor={item => item.id.toString()}
                horizontal
                showsHorizontalScrollIndicator={false}
                renderItem={({item}) => <CastActor actor={item} />}
              />
            </InfoTile>
            <InfoTile title={I18n.t('movie.direction')}>
              <FlatList
                data={movie?.direction}
                keyExtractor={item => item.id.toString()}
                horizontal
                showsHorizontalScrollIndicator={false}
                renderItem={({item}) => <CastActor actor={item} />}
              />
            </InfoTile> */}
            <RatingModal
              initialRating={movie?.userRating || rating}
              onRating={onRating}
              onConfirm={handleRateSubmit}
              handleModalVisibility={handleModalVisibility}
              isConfirmVisible={isConfirmVisible}
            />
            {movie?.images ? <ImageGallery images={movie?.images} /> : null}

            {/* <InfoTile title={I18n.t('movie.trailer')}>
              <TrailerVideo videoId={videoId} />
            </InfoTile> */}
          </ScrollView>
        </ImageBackground>
      ) : null}
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
    flex: 1,
    marginTop: 8,
    gap: 8,
    flexWrap: 'wrap',
    flexDirection: 'row',
    alignContent: 'flex-start',
    marginBottom: 16,
  },
  scrollContent: {
    paddingHorizontal: 10,
  },
});

export default MovieDetailScreen;
