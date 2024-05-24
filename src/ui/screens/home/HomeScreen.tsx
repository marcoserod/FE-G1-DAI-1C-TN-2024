import {View, Text, StyleSheet, FlatList} from 'react-native';
import React from 'react';
import {COLORS} from '../../../constants/colors';
import {MovieCard} from '../../components/movies/MovieCard';
import IMAGES from '../../../assets/images';
import I18n from '../../../assets/localization/i18n';
import {useNowPlayingQuery} from '../../../services/movies';
import {LoadingModal} from '../../components/commons/modal/LoadingModal';

export const HomeScreen = () => {
  const {data, isLoading} = useNowPlayingQuery({});

  return (
    <View style={styles.homeContainer}>
      <View style={styles.homeHeader}>
        <Text style={styles.headerText}>{I18n.t('home.nowPlaying')}</Text>
        <IMAGES.SVG.APP_LOGO height={40} width={40} />
      </View>
      <LoadingModal isVisible={isLoading} />
      <FlatList
        data={data}
        keyExtractor={(item, index) => index.toString()}
        numColumns={2}
        contentContainerStyle={styles.gridContainer}
        columnWrapperStyle={styles.rowContainer}
        renderItem={({item}) => (
          <MovieCard
            title={item.title}
            id={item.id}
            poster={item.poster}
            rating={item.rating}
          />
        )}
      />
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
  gridContainer: {
    rowGap: 16,
    paddingVertical: 16,
    marginHorizontal: 16,
  },
  rowContainer: {
    justifyContent: 'space-between',
  },
});
