import {
  View,
  Text,
  Pressable,
  StyleSheet,
  Dimensions,
  useWindowDimensions,
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
import es from '../../../assets/localization/translations/es';

const baseTabBarStyle = {
  paddingTop: 4,
  backgroundColor: COLORS.BG_3,
};
const windowWidth = Dimensions.get('window').width;

export const FiltersDrawer = ({open, setOpen, children}) => {
  const navigation = useNavigation();
  const [selectedId, setSelectedId] = useState<string | undefined>();

  const radioButtons: RadioButtonProps[] = useMemo(
    () => [
      {
        id: '1', // acts as primary key, should be unique and non-empty string
        label: I18n.t('filters.moreRecent'),
        value: 'option1',
        color: COLORS.PRIMARY,
        borderColor: selectedId === '1' ? COLORS.PRIMARY : COLORS.TEXT_2,
        containerStyle: styles.radioStyles,
      },
      {
        id: '2',
        label: I18n.t('filters.lessRecent'),
        value: 'option2',
        color: COLORS.PRIMARY,
        borderColor: selectedId === '2' ? COLORS.PRIMARY : COLORS.TEXT_2,
        containerStyle: styles.radioStyles,
      },
    ],
    [selectedId],
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
            <AccordionItem title={'Ordenar por'}>
              <Text style={styles.radioStyles}>
                {I18n.t('filters.timeGroup')}
              </Text>
              <RadioGroup
                containerStyle={styles.radioContainer}
                labelStyle={styles.radioLabel}
                radioButtons={radioButtons}
                onPress={setSelectedId}
                selectedId={selectedId}
              />
              <Text style={styles.radioStyles}>
                {I18n.t('filters.ratingGroup')}
              </Text>
              <RadioGroup
                containerStyle={styles.radioContainer}
                labelStyle={styles.radioLabel}
                radioButtons={radioButtons}
                onPress={setSelectedId}
                selectedId={selectedId}
              />
            </AccordionItem>

            <View style={styles.actionButtons}>
              <Button label="APLICAR" type="text" color={COLORS.PRIMARY_2} />
              <Button label="BORRAR" type="text" />
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
