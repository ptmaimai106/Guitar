import React, {Component} from 'react';
import {Text, StyleSheet, Image, ImageBackground} from 'react-native';

export default class AboutScreen extends Component {
  render() {
    return (
      <ImageBackground
        source={require('../assets/app-background/about-background.jpg')}
        style={styles.container}>
        <Image
          source={require('../assets/icon/logo-red.png')}
          style={styles.imageAbout}
        />
        <Text style={styles.textAbout}>
          Guitar Proficiency Test is an application developed by Designveloper,
          where guitar players use for quizzing themeselves on fretboard
          knowledge. This app was designed based on Berklee curriculum.
        </Text>
        <Text style={styles.version}>Version 2.0</Text>
      </ImageBackground>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: '25%',
  },
  imageAbout: {
    width: 70,
    height: 70,
  },
  textAbout: {
    marginTop: 24,
    textAlign: 'center',
    width: '70%',
    color: 'white',
    fontFamily: 'Blinker-Regular',
    lineHeight: 20,
    fontSize: 16,
  },
  version: {
    marginTop: 12,
    textAlign: 'center',
    width: '70%',
    color: 'white',
    fontFamily: 'Blinker-Regular',
    fontSize: 16,
  },
});
