import {
  View,
  Text,
  StyleSheet,
  Image,
  NativeSyntheticEvent,
  TextInputSubmitEditingEventData,
  Pressable,
  FlatList,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {COLORS} from '../../../constants/colors';
import IMAGES from '../../../assets/images';
import {SearchInput} from '../../components/commons/SearchInput';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {FiltersDrawer} from '../../components/commons/FiltersDrawer';
import {useLazySearchQuery} from '../../../services/movies';
import {MovieCard} from '../../components/movies/MovieCard';
import {LoadingModal} from '../../components/commons/modal/LoadingModal';
import {err} from 'react-native-svg';
import {showErrorToast} from '../../components/commons/CustomToast';

export const SearchScreen = () => {
  const count = 0;
  const [searchValue, setSearchValue] = useState('');
  const [filterVisible, setFiltersVisible] = useState(false);
  const [triggerSearch, {data: movies, isLoading, error}] =
    useLazySearchQuery();
  const [manualLoading, setManualLoading] = useState(false);

  const handleSearch = async ({
    nativeEvent,
  }: NativeSyntheticEvent<TextInputSubmitEditingEventData>) => {
    const {text} = nativeEvent;
    setSearchValue(text);
    setManualLoading(true);
    await triggerSearch({searchValue: text});
    setManualLoading(false);
  };

  useEffect(() => {
    if (error) {
      showErrorToast({message: 'Error inesperado'});
    }
  }, [error]);

  return (
    <FiltersDrawer open={filterVisible} setOpen={setFiltersVisible}>
      <LoadingModal isVisible={isLoading || manualLoading} />
      <View style={styles.container}>
        <SearchInput onSubmit={handleSearch} />
        {!searchValue ? (
          <Image style={styles.image} source={IMAGES.OTHERS.SEARCH_BG} />
        ) : (
          movies && (
            <View style={styles.resultsAction}>
              <Text style={styles.textResult}>{`${count} resultados`}</Text>
              <Pressable
                onPress={() => setFiltersVisible(prevOpen => !prevOpen)}>
                <MaterialCommunityIcons
                  name="filter-outline"
                  color={COLORS.TEXT}
                  size={20}
                />
              </Pressable>
            </View>
          )
        )}
        {searchValue && movies ? (
          <FlatList
            data={movies}
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
        ) : null}
      </View>
    </FiltersDrawer>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.BG,
    color: COLORS.TEXT,
    paddingTop: 32,
    paddingHorizontal: 16,
  },
  image: {
    position: 'absolute',
    top: '30%',
    alignSelf: 'center',
  },
  resultsAction: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 36,
    paddingVertical: 6,
    backgroundColor: COLORS.BG_2,
    marginHorizontal: -16,
  },
  textResult: {
    color: COLORS.TEXT,
  },
  gridContainer: {
    rowGap: 16,
    paddingVertical: 16,
  },
  rowContainer: {
    justifyContent: 'space-between',
  },
});
