import React from 'react';
import {Pressable, StyleSheet, View} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

type ControlPlayer = {
  skipToPrevious: () => void;
  togglePlayback: () => void;
  skipToNext: () => void;
  isPlaying: boolean;
};

export default function ControlPlayer({
  skipToPrevious,
  togglePlayback,
  skipToNext,
  isPlaying,
}: ControlPlayer) {
  return (
    <>
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
    </>
  );
}

const styles = StyleSheet.create({
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
  playContainer: {
    padding: 20,
    borderWidth: 2,
    borderColor: '#fff',
    borderRadius: 100,
  },
  iconContainer: {
    backgroundColor: '#6867AC',
    padding: 10,
    borderRadius: 10,
  },
});
