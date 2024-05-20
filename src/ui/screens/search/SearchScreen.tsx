import {
  View,
  Text,
  StyleSheet,
  Image,
  NativeSyntheticEvent,
  TextInputSubmitEditingEventData,
  Pressable,
} from 'react-native';
import React, {useState} from 'react';
import {COLORS} from '../../../constants/colors';
import IMAGES from '../../../assets/images';
import {SearchInput} from '../../components/commons/SearchInput';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {FiltersDrawer} from '../../components/commons/FiltersDrawer';

export const SearchScreen = () => {
  const count = 0;
  const [searchValue, setSearchValue] = useState('');
  const [filterVisible, setFiltersVisible] = useState(false);

  const handleSearch = ({
    nativeEvent,
  }: NativeSyntheticEvent<TextInputSubmitEditingEventData>) => {
    const {text} = nativeEvent;
    setSearchValue(text);
  };

  return (
    <FiltersDrawer open={filterVisible} setOpen={setFiltersVisible}>
      <View style={styles.container}>
        <SearchInput onSubmit={handleSearch} />
        {!searchValue ? (
          <Image style={styles.image} source={IMAGES.OTHERS.SEARCH_BG} />
        ) : null}
        <View style={styles.resultsAction}>
          <Text style={styles.textResult}>{`${count} resultados`}</Text>
          <Pressable onPress={() => setFiltersVisible(prevOpen => !prevOpen)}>
            <MaterialCommunityIcons
              name="filter-outline"
              color={COLORS.TEXT}
              size={20}
            />
          </Pressable>
        </View>
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
});
