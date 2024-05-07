import {
  TextInput,
  StyleSheet,
  NativeSyntheticEvent,
  TextInputSubmitEditingEventData,
} from 'react-native';
import React from 'react';
import {COLORS} from '../../../constants/colors';
import I18n from '../../../assets/localization/i18n';

interface Props {
  onSubmit: ({
    nativeEvent,
  }: NativeSyntheticEvent<TextInputSubmitEditingEventData>) => void;
}

export const SearchInput = ({onSubmit}: Props) => {
  return (
    <TextInput
      onSubmitEditing={onSubmit}
      style={styles.input}
      placeholder={I18n.t('search.searchPlaceholder')}
      placeholderTextColor={COLORS.TEXT_2}
      inlineImageLeft="search_icon"
      inlineImagePadding={8}
    />
  );
};

const styles = StyleSheet.create({
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
});
