import {
  View,
  Text,
  StyleSheet,
  Image,
  Pressable,
  FlatList,
  ActivityIndicator,
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
import {showErrorToast} from '../../components/commons/CustomToast';
import I18n from '../../../assets/localization/i18n';

export const SearchScreen = () => {
  const [searchValue, setSearchValue] = useState('');
  const [page, setPage] = useState(1);
  const [filterVisible, setFiltersVisible] = useState(false);
  const [triggerSearch, {data, isLoading, error, isFetching}] =
    useLazySearchQuery();
  const [manualLoading, setManualLoading] = useState(false);
  const count = data?.totalRecords;
  const totalPages = data?.totalPages;
  const [sorting, setSorting] = useState({
    date: 'desc',
    rate: 'desc',
  });
  const [filters, setFilters] = useState([]);

  const handleSearch = async (text: string) => {
    setSearchValue(text);
    setPage(1);
    setManualLoading(true);
    setSorting({
      date: 'desc',
      rate: 'desc',
    });
    setFilters([]);
    await triggerSearch({
      searchValue: text,
      page: 1,
      dateSort: 'desc',
      rateSort: 'desc',
      filters: [],
    });
    setManualLoading(false);
  };

  const loadMore = () => {
    if (!isFetching && data && page < totalPages) {
      setPage(prev => prev + 1);
      triggerSearch({
        searchValue: searchValue,
        page: page + 1,
        dateSort: sorting.date,
        rateSort: sorting.rate,
        filters,
      });
    }
  };

  const handleFilters = async () => {
    setPage(1);
    setManualLoading(true);
    await triggerSearch({
      searchValue: searchValue,
      page: 1,
      dateSort: sorting.date,
      rateSort: sorting.rate,
      filters,
    });
    setManualLoading(false);
  };

  useEffect(() => {
    if (searchValue) {
      handleFilters();
    }
  }, [sorting, filters]);

  useEffect(() => {
    if (error) {
      showErrorToast({message: 'Error inesperado'});
    }
  }, [error]);

  return (
    <FiltersDrawer
      open={filterVisible}
      setOpen={setFiltersVisible}
      {...{setSorting, setFilters, sorting, filters}}>
      <LoadingModal isVisible={isLoading || manualLoading} />
      <View style={styles.container}>
        <SearchInput onSubmit={handleSearch} />
        {!searchValue && (
          <Image style={styles.image} source={IMAGES.OTHERS.SEARCH_BG} />
        )}

        {data?.movies?.length > 0 && (
          <View style={styles.resultsAction}>
            {count ? (
              <Text
                style={
                  styles.textResult
                }>{`${data?.movies.length} de ${count} resultados`}</Text>
            ) : null}
            <Pressable onPress={() => setFiltersVisible(prevOpen => !prevOpen)}>
              <MaterialCommunityIcons
                name="filter-outline"
                color={filters?.length ? COLORS.PRIMARY : COLORS.TEXT}
                size={20}
              />
            </Pressable>
          </View>
        )}

        {searchValue && data?.movies?.length > 0 ? (
          <FlatList
            showsVerticalScrollIndicator={false}
            data={data?.movies}
            keyExtractor={(item, index) => index.toString()}
            numColumns={2}
            contentContainerStyle={styles.gridContainer}
            columnWrapperStyle={styles.rowContainer}
            ListFooterComponent={
              isFetching && !manualLoading ? (
                <ActivityIndicator size="large" color={COLORS.PRIMARY} />
              ) : null
            }
            onEndReached={loadMore}
            onEndReachedThreshold={0.8}
            renderItem={({item}) => (
              <MovieCard
                releaseDate={item.releaseDate}
                title={item.title}
                id={item.id}
                poster={item.poster}
                rating={item.rating}
              />
            )}
          />
        ) : (
          searchValue &&
          !isLoading &&
          !isFetching && (
            <View style={styles.noResultsView}>
              <Text style={styles.noResultsText}>
                {I18n.t('search.noResults')}
              </Text>
              <Image source={IMAGES.OTHERS.NO_RESULTS} />
            </View>
          )
        )}
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
  noResultsView: {
    alignItems: 'center',
    marginVertical: 'auto',
  },
  noResultsText: {
    color: COLORS.TEXT,
    marginBottom: 32,
    fontSize: 16,
  },
});
