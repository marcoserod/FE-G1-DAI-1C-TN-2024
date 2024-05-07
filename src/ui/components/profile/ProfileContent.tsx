import {View, Text, StyleSheet, Pressable} from 'react-native';
import React from 'react';
import {Button} from '../commons/Button';
import I18n from '../../../assets/localization/i18n';
import {COLORS} from '../../../constants/colors';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {useNavigation} from '@react-navigation/native';

const handlePressableStyle = ({pressed}) => [
  {
    backgroundColor: pressed ? `${COLORS.BG_3}20` : COLORS.BG,
  },
];
export const ProfileContent = () => {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <Button
        label={I18n.t('profile.edit')}
        onPress={() => navigation.navigate('EditProfile')}
      />
      <View style={{...styles.menuHeader, marginTop: 16}}>
        <Text style={styles.menuHeaderText}>{I18n.t('profile.content')}</Text>
      </View>
      <Pressable
        style={handlePressableStyle}
        onPress={() => navigation.navigate('Favorites')}>
        <View style={styles.menuItem}>
          <MaterialCommunityIcons
            name="heart-outline"
            color={COLORS.TEXT}
            size={16}
          />
          <Text style={styles.menuItemText}>{I18n.t('profile.favorites')}</Text>
        </View>
      </Pressable>
      <View style={styles.menuHeader}>
        <Text style={styles.menuHeaderText}>{I18n.t('profile.session')}</Text>
      </View>
      <Pressable style={handlePressableStyle}>
        <View style={styles.menuItem}>
          <MaterialCommunityIcons name="logout" color={COLORS.TEXT} size={16} />
          <Text style={styles.menuItemText}>{I18n.t('profile.logout')}</Text>
        </View>
      </Pressable>
      <Pressable style={handlePressableStyle}>
        <View style={styles.menuItem}>
          <MaterialCommunityIcons
            name="trash-can-outline"
            color={'red'}
            size={16}
          />
          <Text style={{...styles.menuItemText, color: 'red'}}>
            {I18n.t('profile.delete')}
          </Text>
        </View>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 16,
  },
  menuHeader: {
    backgroundColor: COLORS.BG_3,
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  menuHeaderText: {
    color: COLORS.TEXT,
    fontSize: 16,
    fontWeight: '600',
  },
  menuItem: {
    flexDirection: 'row',
    paddingVertical: 16,
    paddingHorizontal: 20,
    alignItems: 'center',
    gap: 20,
  },
  menuItemText: {
    color: COLORS.TEXT,
    fontSize: 15,
    fontWeight: '500',
  },
});
