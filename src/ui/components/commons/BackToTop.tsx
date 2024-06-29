import {
  FlatList,
  NativeScrollEvent,
  NativeSyntheticEvent,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useRef, useState} from 'react';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {COLORS} from '../../../constants/colors';

interface Props {
  onPress: () => void;
}

export const BackToTop = ({onPress}: Props) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={onPress}>
        <MaterialCommunityIcons
          name="arrow-up-bold"
          color={COLORS.PRIMARY}
          size={24}
        />
      </TouchableOpacity>
    </View>
  );
};

export const useBackToTop = () => {
  const moviesRef = useRef<FlatList>(null);
  const [showButton, setShowButton] = useState<boolean>(false);

  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const offsetY = event.nativeEvent.contentOffset.y;
    if (offsetY > 1000) {
      setShowButton(true);
    } else {
      setShowButton(false);
    }
  };

  const handleBackToTop = () => {
    moviesRef?.current?.scrollToOffset({animated: true, offset: 0});
  };
  return {
    moviesRef,
    showButton,
    handleScroll,
    handleBackToTop,
  };
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    borderRadius: 100,
    backgroundColor: `${COLORS.BG_2}`,
    right: 24,
    bottom: 24,
    padding: 8,
    elevation: 10,
  },
});
