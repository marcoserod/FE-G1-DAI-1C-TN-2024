import {
  View,
  Text,
  Pressable,
  StyleSheet,
  Dimensions,
  ScrollView,
} from 'react-native';
import React, {useMemo, useState} from 'react';
import {Drawer} from 'react-native-drawer-layout';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {COLORS} from '../../../constants/colors';
import {useNavigation} from '@react-navigation/native';
import {Button} from './Button';
import {AccordionItem} from './AccordionItem';
import {RadioButtonProps, RadioGroup} from 'react-native-radio-buttons-group';
import I18n from '../../../assets/localization/i18n';

import {useGenresQuery} from '../../../services/movies';
import CheckboxGroup from './checkbox/CheckboxGroup';

const baseTabBarStyle = {
  paddingTop: 4,
  backgroundColor: COLORS.BG_3,
};
const {width: windowWidth} = Dimensions.get('window');

export const FiltersDrawer = ({open, setOpen, children, setSorting}) => {
  const navigation = useNavigation();

  const {data: genres} = useGenresQuery({});
  const [selectedDateSort, setSelectedDateSort] = useState('desc');
  const [selectedRateSort, setSelectedRateSort] = useState('desc');
  const [selectedGenres, setSelectedGenres] = useState<number[]>([]);

  const options = genres?.genreList?.map(genre => ({
    id: genre.id,
    label: genre.name,
  }));

  const radioButtons: RadioButtonProps[] = useMemo(
    () => [
      {
        id: 'desc',
        label: I18n.t('filters.moreRecent'),
        value: 'desc',
        color: COLORS.PRIMARY,
        borderColor:
          selectedDateSort === 'desc' ? COLORS.PRIMARY : COLORS.TEXT_2,
        containerStyle: styles.radioStyles,
      },
      {
        id: 'asc',
        label: I18n.t('filters.lessRecent'),
        value: 'asc',
        color: COLORS.PRIMARY,
        borderColor:
          selectedDateSort === 'asc' ? COLORS.PRIMARY : COLORS.TEXT_2,
        containerStyle: styles.radioStyles,
      },
    ],
    [selectedDateSort],
  );

  const rateRadioButtons: RadioButtonProps[] = useMemo(
    () => [
      {
        id: 'desc',
        label: I18n.t('filters.bestRated'),
        value: 'desc',
        color: COLORS.PRIMARY,
        borderColor:
          selectedRateSort === 'desc' ? COLORS.PRIMARY : COLORS.TEXT_2,
        containerStyle: styles.radioStyles,
      },
      {
        id: 'asc',
        label: I18n.t('filters.worstRated'),
        value: 'asc',
        color: COLORS.PRIMARY,
        borderColor:
          selectedRateSort === 'asc' ? COLORS.PRIMARY : COLORS.TEXT_2,
        containerStyle: styles.radioStyles,
      },
    ],
    [selectedRateSort],
  );

  const handleOpen = () => {
    setOpen(true);
    navigation.setOptions({
      tabBarStyle: {
        ...baseTabBarStyle,
        display: 'none',
      },
    });
  };

  const handleClose = () => {
    setOpen(false);
    navigation.setOptions({
      tabBarStyle: {
        ...baseTabBarStyle,
        display: 'flex',
      },
    });
  };

  const handleOnApply = () => {
    setSorting({
      date: selectedDateSort,
      rate: selectedDateSort,
    });
    handleClose();
  };

  const handleOnClean = () => {
    setSorting({
      date: 'desc',
      rate: 'desc',
    });
    setSelectedGenres([]);
  };

  return (
    <Drawer
      swipeEnabled={false}
      open={open}
      onOpen={handleOpen}
      onClose={handleClose}
      drawerPosition="right"
      drawerType="front"
      drawerStyle={{
        width: windowWidth * 0.85,
      }}
      renderDrawerContent={() => {
        return (
          <View style={{width: windowWidth * 0.85, ...styles.drawerContainer}}>
            <View style={styles.topActions}>
              <Pressable onPress={handleClose}>
                <MaterialCommunityIcons
                  name="close"
                  color={COLORS.TEXT}
                  size={24}
                />
              </Pressable>
            </View>
            <ScrollView>
              <AccordionItem title={'Ordenar por'} defaultExpanded={true}>
                <Text style={styles.radioStyles}>
                  {I18n.t('filters.timeGroup')}
                </Text>
                <RadioGroup
                  containerStyle={styles.radioContainer}
                  labelStyle={styles.radioLabel}
                  radioButtons={radioButtons}
                  onPress={setSelectedDateSort}
                  selectedId={selectedDateSort}
                />
                <Text style={styles.radioStyles}>
                  {I18n.t('filters.ratingGroup')}
                </Text>
                <RadioGroup
                  containerStyle={styles.radioContainer}
                  labelStyle={styles.radioLabel}
                  radioButtons={rateRadioButtons}
                  onPress={setSelectedRateSort}
                  selectedId={selectedRateSort}
                />
              </AccordionItem>
              <AccordionItem title={'Filtrar por'}>
                <Text style={styles.radioStyles}>
                  {I18n.t('filters.genreGroup')}
                </Text>
                <CheckboxGroup
                  options={options}
                  selectedOptions={selectedGenres}
                  setSelectedOptions={setSelectedGenres}
                />
              </AccordionItem>
            </ScrollView>

            <View style={styles.actionButtons}>
              <Button
                label={I18n.t('filters.apply')?.toUpperCase()}
                type="text"
                color={COLORS.PRIMARY_2}
                onPress={handleOnApply}
              />
              <Button
                label={I18n.t('filters.clean')?.toUpperCase()}
                type="text"
                onPress={handleOnClean}
              />
            </View>
          </View>
        );
      }}>
      {children}
    </Drawer>
  );
};

const styles = StyleSheet.create({
  drawerContainer: {
    flex: 1,
    backgroundColor: COLORS.BG,
  },
  topActions: {
    marginTop: 32,
    height: 34,
    backgroundColor: COLORS.BG_2,
    justifyContent: 'center',
    paddingHorizontal: 16,
  },
  actionButtons: {
    flexDirection: 'row',
    marginTop: 'auto',
    justifyContent: 'space-evenly',
    paddingVertical: 30,
    paddingBottom: 66,
    backgroundColor: COLORS.BG_3,
  },
  radioLabel: {
    color: COLORS.TEXT,
    fontFamily: 'Roboto',
  },
  radioContainer: {
    alignItems: 'flex-start',
  },
  radioStyles: {
    alignItems: 'center',
    paddingVertical: 8,
    marginLeft: 0,
    marginVertical: 2,
    backgroundColor: COLORS.BG_2,
    width: '100%',
    paddingHorizontal: 16,
    color: COLORS.TEXT,
    fontSize: 14,
    minHeight: 40,
  },
});
