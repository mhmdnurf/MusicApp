import React, {useEffect, useState} from 'react';
import TrackPlayer, {useProgress, State} from 'react-native-track-player';
import {ScrollView, StatusBar, StyleSheet} from 'react-native';
import Footer from './src/components/Footer';
import ControlPlayer from './src/components/ControlPlayer';
import ProgressBar from './src/components/ProgressBar';
import MusicDescription from './src/components/MusicDescription';
import {tracks} from './src/lib/data';
import {getPlaybackState} from 'react-native-track-player/lib/src/trackPlayer';

export default function App() {
  const [trackTitle, setTrackTitle] = useState('');
  const [trackArtist, setTrackArtist] = useState('');
  const [trackArtwork, setTrackArtwork] = useState('');
  const [isPlaying, setIsPlaying] = useState(false);
  const {position, duration} = useProgress();

  const setupPlayer = React.useCallback(async () => {
    try {
      await TrackPlayer.setupPlayer();
      await TrackPlayer.add(tracks);
      await getCurrentTrack();
    } catch (error) {
      console.error('Error setting up TrackPlayer:', error);
    }
  }, []);

  const getCurrentTrack = async () => {
    try {
      const id = await TrackPlayer.getActiveTrackIndex();
      const track = await TrackPlayer.getTrack(id ?? 0);

      setTrackTitle(track?.title ?? '');
      setTrackArtist(track?.artist ?? '');
      setTrackArtwork(track?.artwork ?? '');
    } catch (error) {
      console.error('Error getting current track:', error);
    }
  };

  const togglePlayback = async () => {
    try {
      const state = (await getPlaybackState()).state;
      if (state === State.Playing) {
        await TrackPlayer.pause();
        setIsPlaying(false);
      } else {
        await TrackPlayer.play();
        setIsPlaying(true);
      }
    } catch (error) {
      console.error('Error toggling playback:', error);
    }
  };

  const skipToPrevious = async () => {
    try {
      const currentPosition = await TrackPlayer.getProgress().then(
        progress => progress.position,
      );
      const currentTrackIndex = await TrackPlayer.getActiveTrackIndex();
      const trackCount = (await TrackPlayer.getQueue()).length;

      if (currentPosition > 10) {
        await TrackPlayer.seekTo(0);
      } else {
        if (currentTrackIndex === 0) {
          await TrackPlayer.skip(trackCount - 1);
        } else {
          await TrackPlayer.skipToPrevious();
        }
        await TrackPlayer.play();

        await getCurrentTrack(); // Update the current track info
      }
    } catch (error) {
      console.error('Error skipping to previous track:', error);
    }
  };

  const skipToNext = async () => {
    try {
      const currentTrackIndex = await TrackPlayer.getActiveTrackIndex();
      const trackCount = (await TrackPlayer.getQueue()).length;

      if (currentTrackIndex === trackCount - 1) {
        await TrackPlayer.skip(0);
      } else {
        await TrackPlayer.skipToNext();
      }
      await TrackPlayer.play();

      await getCurrentTrack(); // Update the current track info
    } catch (error) {
      console.error('Error skipping to next track:', error);
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  useEffect(() => {
    setupPlayer();

    return () => {
      TrackPlayer.reset();
    };
  }, [setupPlayer]);

  return (
    <>
      <StatusBar backgroundColor={'#D2DAFF'} barStyle={'dark-content'} />
      <ScrollView contentContainerStyle={styles.container}>
        <MusicDescription
          trackArtist={trackArtist}
          trackArtwork={trackArtwork}
          trackTitle={trackTitle}
        />
        <ProgressBar
          duration={duration}
          formatTime={formatTime}
          position={position}
        />
        <ControlPlayer
          isPlaying={isPlaying}
          skipToNext={skipToNext}
          togglePlayback={togglePlayback}
          skipToPrevious={skipToPrevious}
        />
        <Footer />
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#D2DAFF',
  },
});
