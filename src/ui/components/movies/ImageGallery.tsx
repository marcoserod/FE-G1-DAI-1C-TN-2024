import React, {useState} from 'react';
import {View, StyleSheet, TouchableOpacity, Text} from 'react-native';
import ImageView from 'react-native-image-viewing';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {COLORS} from '../../../constants/colors';

interface Props {
  images: string[];
  currentIndex: number;
  visible: boolean;
  setVisible: (value: boolean) => void;
}
const ImageGallery = ({images, currentIndex, visible, setVisible}: Props) => {
  // eslint-disable-next-line react/no-unstable-nested-components
  const HeaderComponent = ({imageIndex}: {imageIndex: number}) => (
    <View style={styles.header}>
      <TouchableOpacity onPress={() => setVisible(false)}>
        <MaterialCommunityIcons name="close" color={COLORS.TEXT} size={24} />
      </TouchableOpacity>
      <Text style={styles.counter}>{`${imageIndex + 1} / ${
        images.length
      }`}</Text>
    </View>
  );
  return (
    <ImageView
      images={images.map((image: string) => ({uri: image}))}
      imageIndex={currentIndex}
      visible={visible}
      onRequestClose={() => setVisible(false)}
      HeaderComponent={HeaderComponent}
      presentationStyle="fullScreen"
    />
  );
};

export const useImageGallery = () => {
  const [visible, setVisible] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  const openImageViewer = (index: number) => {
    setCurrentIndex(index);
    setVisible(true);
  };
  return {
    ImageGallery: ({images}: Props) => (
      <ImageGallery {...{images, currentIndex, visible, setVisible}} />
    ),
    openImageViewer,
  };
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    padding: 10,
    position: 'absolute',
    top: 0,
    zIndex: 1,
  },
  closeButton: {
    color: 'white',
    fontSize: 18,
    paddingHorizontal: 10,
  },
  counter: {
    color: 'white',
    fontSize: 18,
    paddingHorizontal: 10,
  },
});
