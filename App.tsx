import React, {useEffect, useState} from 'react';
import TrackPlayer, {useProgress, State} from 'react-native-track-player';
import {
  Image,
  Pressable,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
  ImageSourcePropType,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Slider from '@react-native-community/slider';

export default function App() {
  const [trackTitle, setTrackTitle] = useState('...');
  const [trackArtist, setTrackArtist] = useState('...');
  const [trackArtwork, setTrackArtwork] = useState<ImageSourcePropType>(
    require('./src/assets/images/gray.png'),
  );
  const [isPlaying, setIsPlaying] = useState(false);
  const {position, duration} = useProgress();

  useEffect(() => {
    async function setupPlayer() {
      try {
        await TrackPlayer.setupPlayer();

        const track1 = {
          url: require('./src/assets/songs/Keep_Going.mp3'),
          title: 'Keep Going',
          artist: 'Swørn',
          artwork: require('./src/assets/images/cover_keep_going.jpeg'),
          duration: 270,
        };

        const track2 = {
          url: require('./src/assets/songs/Sorry.mp3'),
          title: 'Sorry',
          artist: 'Swørn',
          artwork: require('./src/assets/images/cover_sorry.png'),
          duration: 259,
        };

        const track3 = {
          url: require('./src/assets/songs/Maple_Leaf_Pt.2.mp3'),
          title: 'Maple Leaf Pt.2',
          artist: 'Philanthrope',
          artwork: require('./src/assets/images/cover_maple_leaf_pt.2.jpeg'),
          duration: 240,
        };

        await TrackPlayer.add([track1, track2, track3]);

        await TrackPlayer.play();
        setIsPlaying(true);
      } catch (error) {
        console.error('Error setting up TrackPlayer:', error);
      }
    }

    async function getCurrentTrack() {
      const id = await TrackPlayer.getCurrentTrack();
      const track = await TrackPlayer.getTrack(id ?? 0);

      setTrackTitle(track?.title ?? '');
      setTrackArtist(track?.artist ?? '');
      setTrackArtwork(
        track?.artwork ??
          require('./src/assets/images/cover_maple_leaf_pt.2.jpeg'),
      );
    }

    setupPlayer();
    getCurrentTrack();

    return () => {
      TrackPlayer.reset();
    };
  }, []);

  const togglePlayback = async () => {
    const state = await TrackPlayer.getState();
    if (state === State.Playing) {
      await TrackPlayer.pause();
      setIsPlaying(false);
    } else {
      await TrackPlayer.play();
      setIsPlaying(true);
    }
  };

  const skipToPrevious = async () => {
    try {
      await TrackPlayer.skipToPrevious();
      await TrackPlayer.play();
      const id = await TrackPlayer.getCurrentTrack();
      const track = await TrackPlayer.getTrack(id ?? 0);
      setTrackTitle(track?.title ?? '');
      setTrackArtist(track?.artist ?? '');
      setTrackArtwork(
        track?.artwork ??
          require('./src/assets/images/cover_maple_leaf_pt.2.jpeg'),
      );
    } catch (error) {
      console.error('Error skipping to previous track:', error);
    }
  };

  const skipToNext = async () => {
    try {
      await TrackPlayer.skipToNext();
      await TrackPlayer.play();
      const id = await TrackPlayer.getCurrentTrack();
      const track = await TrackPlayer.getTrack(id ?? 0);
      setTrackTitle(track?.title ?? '');
      setTrackArtist(track?.artist ?? '');
      setTrackArtwork(
        track?.artwork ??
          require('./src/assets/images/cover_maple_leaf_pt.2.jpeg'),
      );
    } catch (error) {
      console.error('Error skipping to next track:', error);
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  return (
    <>
      <StatusBar backgroundColor={'#D2DAFF'} barStyle={'dark-content'} />
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.headerText}>Now Playing</Text>
        <View style={styles.imageContainer}>
          <Image source={trackArtwork} style={styles.image} />
        </View>
        <View style={styles.textContainer}>
          <Text style={styles.trackTitle}>{trackTitle}</Text>
          <Text style={styles.trackArtist}>{trackArtist}</Text>
        </View>
        <View style={styles.progressContainer}>
          <Text>{formatTime(position)}</Text>
          <Slider
            style={styles.slider}
            minimumValue={0}
            maximumValue={duration}
            value={position}
            minimumTrackTintColor="#A594F9"
            maximumTrackTintColor="#6867AC"
            thumbTintColor="#A594F9"
            onSlidingComplete={async value => {
              await TrackPlayer.seekTo(value);
            }}
          />
          <Text>{formatTime(duration)}</Text>
        </View>
        <View style={styles.playbackContainer}>
          <Pressable
            style={({pressed}) => [
              styles.iconContainer,
              {opacity: pressed ? 0.5 : 1},
            ]}
            onPress={skipToPrevious}>
            <Icon name="skip-previous" size={30} color={'white'} />
          </Pressable>
          <Pressable style={styles.playContainer} onPress={togglePlayback}>
            <Icon
              name={isPlaying ? 'pause' : 'play'}
              size={40}
              color={'#6867AC'}
            />
          </Pressable>
          <Pressable
            style={({pressed}) => [
              styles.iconContainer,
              {opacity: pressed ? 0.5 : 1},
            ]}
            onPress={skipToNext}>
            <Icon name="skip-next" size={30} color={'white'} />
          </Pressable>
        </View>
        <View style={styles.footerContainer}>
          <Text style={styles.footerText}>
            Music provided by Chillhop Music
          </Text>
          <Text style={styles.footerText}>
            https://chillhop.ffm.to/creatorcred
          </Text>
        </View>
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
  headerText: {
    fontSize: 30,
    color: '#6867AC',
    fontFamily: 'Poppins-Bold',
    marginVertical: 20,
  },
  textContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 20,
  },
  trackTitle: {
    fontSize: 40,
    color: '#6867AC',
    fontFamily: 'Poppins-Bold',
  },
  trackArtist: {
    fontSize: 20,
    color: '#A594F9',
    fontFamily: 'Poppins-Regular',
  },
  iconContainer: {
    backgroundColor: '#6867AC',
    padding: 10,
    borderRadius: 10,
  },
  imageContainer: {
    width: 300,
    height: 300,
    backgroundColor: 'white',
    borderRadius: 75,
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: 30,
    resizeMode: 'cover',
  },
  playbackContainer: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    marginTop: 40,
  },
  progressContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '80%',
    marginVertical: 20,
  },
  slider: {
    flex: 1,
    marginHorizontal: 10,
  },
  footerContainer: {
    marginVertical: 30,
  },
  footerText: {
    color: '#6867AC',
    fontFamily: 'Poppins-Regular',
    textAlign: 'center',
  },
  playContainer: {
    padding: 20,
    borderWidth: 2,
    borderColor: '#fff',
    borderRadius: 100,
  },
});
