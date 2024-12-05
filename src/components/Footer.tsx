import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

export default function Footer() {
  return (
    <>
      <View style={styles.footerContainer}>
        <Text style={styles.footerText}>Music provided by Chillhop Music</Text>
        <Text style={styles.footerText}>
          https://chillhop.ffm.to/creatorcred
        </Text>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  footerContainer: {
    marginVertical: 30,
  },
  footerText: {
    color: '#6867AC',
    fontFamily: 'Poppins-Regular',
    textAlign: 'center',
  },
});
