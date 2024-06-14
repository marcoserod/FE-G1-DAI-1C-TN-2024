import React, {useState} from 'react';

import YoutubePlayer from 'react-native-youtube-iframe';

import Orientation from 'react-native-orientation-locker';
import {ActivityIndicator, StyleSheet, View} from 'react-native';
import {COLORS} from '../../../constants/colors';

interface Props {
  videoId: string;
}

export const TrailerVideo = ({videoId}: Props) => {
  const [isVideoLoading, setIsVideoLoading] = useState(true);

  const handleFullScreenChange = (isFullScreen: boolean) => {
    if (isFullScreen) {
      Orientation.lockToLandscape();
    } else {
      Orientation.lockToPortrait();
    }
  };

  return (
    <View style={styles.trailerContainer}>
      {isVideoLoading ? <ActivityIndicator color={COLORS.PRIMARY} /> : null}
      <YoutubePlayer
        height={200}
        videoId={videoId}
        webViewProps={{
          allowsInlineMediaPlayback: true,
        }}
        initialPlayerParams={{
          preventFullScreen: false,
        }}
        onReady={() => setIsVideoLoading(false)}
        onFullScreenChange={handleFullScreenChange}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  trailerContainer: {
    marginVertical: 16,
  },
});
