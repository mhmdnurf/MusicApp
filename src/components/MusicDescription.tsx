import React from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';

type MusicDescription = {
  trackTitle: string;
  trackArtist: string;
  trackArtwork: string;
};

export default function MusicDescription({
  trackTitle,
  trackArtist,
  trackArtwork,
}: MusicDescription) {
  return (
    <>
      <View style={styles.imageContainer}>
        {trackArtwork && (
          <Image
            source={{
              uri: trackArtwork,
            }}
            style={styles.image}
          />
        )}
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.trackTitle}>{trackTitle}</Text>
        <Text style={styles.trackArtist}>{trackArtist}</Text>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  imageContainer: {
    width: 300,
    height: 300,
    backgroundColor: 'white',
    borderRadius: 30,
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
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
});
