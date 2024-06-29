import {TextInput, StyleSheet, View, TouchableOpacity} from 'react-native';
import React, {useRef, useState} from 'react';
import {COLORS} from '../../../constants/colors';
import I18n from '../../../assets/localization/i18n';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

interface Props {
  onSubmit: (text: string) => void;
}

export const SearchInput = ({onSubmit}: Props) => {
  const searchInputRef = useRef<TextInput>(null);
  const [innerText, setInnerText] = useState<string>('');
  const handleInputSubmit = () => {
    onSubmit(innerText);
  };
  const handleOnClear = () => {
    setInnerText('');
    searchInputRef?.current?.focus();
  };
  return (
    <View style={styles.container}>
      <TextInput
        ref={searchInputRef}
        value={innerText}
        onChangeText={text => setInnerText(text)}
        onSubmitEditing={handleInputSubmit}
        style={styles.input}
        placeholder={I18n.t('search.searchPlaceholder')}
        placeholderTextColor={COLORS.TEXT_2}
        inlineImageLeft="search_icon"
        inlineImagePadding={8}
      />
      {innerText ? (
        <TouchableOpacity onPress={handleOnClear} style={styles.closeBtn}>
          <MaterialCommunityIcons name="close" color={COLORS.TEXT} size={24} />
        </TouchableOpacity>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  input: {
    width: '100%',
    color: COLORS.TEXT,
    borderRadius: 32,
    backgroundColor: COLORS.BG_2,
    paddingHorizontal: 16,
    paddingVertical: 10,
    fontSize: 16,
    marginVertical: 10,
  },
  closeBtn: {
    position: 'absolute',
    right: 16,
  },
});
