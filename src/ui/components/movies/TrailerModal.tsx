import React, {useState} from 'react';
import {ModalWrapper} from '../commons/modal/ModalWrapper';
import YoutubePlayer from 'react-native-youtube-iframe';
import {LoadingModal} from '../commons/modal/LoadingModal';
import Orientation from 'react-native-orientation-locker';

interface Props {
  videoId: string;
  isVisible: boolean;
  onClose: () => void;
}

export const TrailerModal = ({videoId, isVisible, onClose}: Props) => {
  const [isVideoLoading, setIsVideoLoading] = useState(true);

  const handleFullScreenChange = (isFullScreen: boolean) => {
    if (isFullScreen) {
      Orientation.lockToLandscape();
    } else {
      Orientation.lockToPortrait();
    }
  };

  return (
    <ModalWrapper {...{isVisible, onClose}}>
      <LoadingModal isVisible={isVideoLoading} transparent />
      <YoutubePlayer
        height={300}
        videoId={videoId}
        onReady={() => setIsVideoLoading(false)}
        onFullScreenChange={handleFullScreenChange}
      />
    </ModalWrapper>
  );
};

export const useTrailerModal = () => {
  const [isTrailerVisible, setIsTrailerVisible] = useState(false);
  const handleTrailerModalVisibility = () => {
    setIsTrailerVisible(prev => !prev);
  };

  return {
    TrailerModal: ({videoId}: Props) => (
      <TrailerModal
        videoId={videoId}
        isVisible={isTrailerVisible}
        onClose={handleTrailerModalVisibility}
      />
    ),
    handleTrailerModalVisibility,
  };
};
