import Slider from '@react-native-community/slider';
import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import TrackPlayer from 'react-native-track-player';

type ProgressBar = {
  position: number;
  duration: number;
  formatTime: (seconds: number) => string;
};

export default function ProgressBar({
  position,
  duration,
  formatTime,
}: ProgressBar) {
  return (
    <>
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
    </>
  );
}

const styles = StyleSheet.create({
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
});
