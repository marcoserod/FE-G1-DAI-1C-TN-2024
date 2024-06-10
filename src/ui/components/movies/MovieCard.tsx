import {View, Text, StyleSheet, Image, Pressable} from 'react-native';
import React from 'react';
import {COLORS} from '../../../constants/colors';
import {Dimensions} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {Formatter} from '../../../assets/helpers/formatter';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
const {width} = Dimensions.get('window');

interface Props {
  title: string;
  poster: string;
  rating: number;
  id: number;
  releaseDate?: string;
}

export const MovieCard = ({title, poster, rating, id, releaseDate}: Props) => {
  const navigation = useNavigation();
  return (
    <Pressable
      onPress={() => navigation.navigate('MovieDetails', {movieId: id})}
      style={({pressed}) => ({
        opacity: pressed ? 0.9 : 1,
      })}>
      <View style={styles.card}>
        <Image
          style={styles.poster}
          source={{uri: poster}}
          onError={e =>
            console.error('Error loading image:', e.nativeEvent.error)
          }
        />
        <View style={styles.ratingContainer}>
          <MaterialCommunityIcons name="star" color={COLORS.ACCENT} size={12} />
          <Text style={styles.rating}>{Formatter.rating(rating)}</Text>
          {releaseDate ? (
            <Text style={styles.year}>{Formatter.year(releaseDate)}</Text>
          ) : null}
        </View>
        <Text numberOfLines={1} style={styles.title}>
          {title}
        </Text>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  card: {
    width: width / 2 - 24,
    backgroundColor: COLORS.BG_3,
    borderRadius: 15,
  },
  poster: {
    width: 'auto',
    height: 250,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    resizeMode: 'cover',
  },
  ratingContainer: {
    flexDirection: 'row',
    marginVertical: 8,
    marginHorizontal: 12,
    alignItems: 'center',
    gap: 8,
  },
  rating: {
    color: COLORS.TEXT_2,
    fontSize: 12,
  },
  title: {
    color: COLORS.TEXT,
    fontSize: 14,
    marginHorizontal: 12,
    marginBottom: 6,
  },
  year: {
    color: COLORS.TEXT_2,
    fontSize: 12,
    marginLeft: 'auto',
  },
});
