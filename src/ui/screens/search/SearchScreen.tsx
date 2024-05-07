import {
  View,
  StyleSheet,
  Image,
  NativeSyntheticEvent,
  TextInputSubmitEditingEventData,
} from 'react-native';
import React, {useState} from 'react';
import {COLORS} from '../../../constants/colors';
import IMAGES from '../../../assets/images';
import {SearchInput} from '../../components/commons/SearchInput';

export const SearchScreen = () => {
  const [searchValue, setSearchValue] = useState('');
  const handleSearch = ({
    nativeEvent,
  }: NativeSyntheticEvent<TextInputSubmitEditingEventData>) => {
    const {text} = nativeEvent;
    setSearchValue(text);
  };

  return (
    <View style={styles.container}>
      <SearchInput onSubmit={handleSearch} />
      {!searchValue ? (
        <Image style={styles.image} source={IMAGES.OTHERS.SEARCH_BG} />
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.BG,
    color: COLORS.TEXT,
    paddingTop: 32,
    paddingHorizontal: 16,
    alignItems: 'center',
  },
  image: {
    position: 'absolute',
    top: '30%',
  },
});
