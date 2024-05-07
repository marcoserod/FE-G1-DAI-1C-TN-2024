import {View, Text, Pressable, Image, StyleSheet} from 'react-native';
import React from 'react';
import LinearGradient from 'react-native-linear-gradient';
import {useNavigation} from '@react-navigation/native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {COLORS} from '../../../constants/colors';

interface User {
  name: string;
  nickName: string;
}

interface Props {
  user: User;
  showBack?: boolean;
  isEdit?: boolean;
}

export const ProfileHeader = ({
  user,
  showBack = false,
  isEdit = false,
}: Props) => {
  const navigation = useNavigation();
  return (
    <LinearGradient colors={['#DC682E', '#762419']} style={styles.gradient}>
      <View style={styles.header}>
        {showBack ? (
          <Pressable
            onPress={() => navigation.goBack()}
            style={styles.backButton}>
            <MaterialCommunityIcons
              name="arrow-left"
              color={COLORS.TEXT}
              size={32}
            />
          </Pressable>
        ) : null}
        <View style={styles.userName}>
          <Text style={styles.greeting}>{`Hola ${user.name}`}</Text>
          <Text style={styles.nickName}>{user.nickName}</Text>
        </View>
      </View>
      <View>
        <Image
          source={{uri: 'https://i.stack.imgur.com/l60Hf.png'}}
          style={styles.profilePicture}
        />
        {isEdit ? (
          <Pressable
            onPress={() => navigation.goBack()}
            style={styles.cameraButton}>
            <MaterialCommunityIcons
              name="camera-outline"
              color={COLORS.TEXT}
              size={20}
            />
          </Pressable>
        ) : null}
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  backButton: {
    position: 'absolute',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 20,
    marginHorizontal: 10,
    alignItems: 'center',
  },
  gradient: {
    height: 160,
    paddingTop: 20,
    marginBottom: 80,
  },
  profilePicture: {
    height: 140,
    width: 140,
    top: 20,
    marginHorizontal: 'auto',
    borderRadius: 100,
    borderWidth: 5,
    borderColor: COLORS.BG_2,
  },
  userName: {
    alignItems: 'center',
    marginHorizontal: 'auto',
  },
  greeting: {
    color: COLORS.TEXT,
    fontWeight: '600',
    fontSize: 14,
  },
  nickName: {
    color: COLORS.TEXT_2,
    fontWeight: '400',
    fontSize: 14,
  },
  cameraButton: {
    borderWidth: 1,
    marginHorizontal: 'auto',
    borderRadius: 100,
    backgroundColor: COLORS.BG_3,
    padding: 8,
    borderColor: COLORS.TEXT_2,
  },
});
