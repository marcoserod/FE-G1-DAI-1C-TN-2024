import React from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import {Cast} from '../../../networking/temporal/core/entities/cast.entity';
import {COLORS} from '../../../constants/colors';

interface Props {
  actor: Cast;
}

export const CastActor = ({actor}: Props) => {
  return (
    <View style={styles.container}>
      <Image source={{uri: actor.avatar}} style={styles.avatar} />

      <View style={styles.actorInfo}>
        <Text numberOfLines={2} style={styles.actorName}>
          {actor.name}
        </Text>
        <Text numberOfLines={2} style={styles.actorCharacter}>
          {actor.character}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 16,
    marginRight: 10,
    display: 'flex',
    flexDirection: 'column',
    width: 100,
  },
  avatar: {
    width: 100,
    height: 150,
    borderRadius: 10,
  },
  actorInfo: {
    marginLeft: 10,
    marginTop: 4,
  },
  actorName: {
    fontSize: 15,
    fontWeight: 'bold',
    color: COLORS.TEXT,
    height: 40,
  },
  actorCharacter: {
    fontSize: 12,
    color: COLORS.TEXT_2,
  },
});
