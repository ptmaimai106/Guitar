/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {WHITE, IS_IPAD, PORTRAIT} from '../constant';

const Note = ({level, currentAnswer, displayText, orientation}) => {
  if (!displayText) return null;

  const displays = displayText.split('; ');
  return (
    <>
      {orientation === PORTRAIT ? (
        <View style={styles.portraitContainer}>
          <View style={styles.iconBackground}>
            <View
              style={{
                width: '75%',
                height: '100%',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <Text style={styles.levelText}>{level}</Text>
              <Text style={styles.answerText}>{currentAnswer}</Text>
              {displays.map((text, index) => {
                let display = text.charAt(0).toUpperCase() + text.slice(1);
                display = displays.length > 1 ? `- ${display}` : display;

                return (
                  <Text key={index} style={styles.descriptionText}>
                    {display}
                  </Text>
                );
              })}
            </View>
          </View>
        </View>
      ) : (
        <View style={styles.landscapeContainer}>
          <View style={{...styles.portraitContainer, alignItems: 'center'}}>
            <Text style={styles.levelText}>{level}</Text>
            <Text style={styles.answerText}>{currentAnswer}</Text>
          </View>
          <View style={styles.portraitContainer}>
            <View
              style={{
                width: '100%',
                height: '100%',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              {displays.map((text, index) => {
                let display = text.charAt(0).toUpperCase() + text.slice(1);
                display = displays.length > 1 ? `- ${display}` : display;

                return (
                  <Text key={index} style={styles.descriptionText}>
                    {display}
                  </Text>
                );
              })}
            </View>
          </View>
        </View>
      )}
    </>
  );
};

export default Note;

const styles = StyleSheet.create({
  portraitContainer: {
    flex: 1,
    justifyContent: 'center',
    width: '100%',
  },
  landscapeContainer: {
    flex: 1,
    flexDirection: 'row',
  },
  iconBackground: {
    flex: 0.5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  levelText: {
    color: WHITE,
    fontSize: IS_IPAD ? 20 : 16,
    fontFamily: 'Blinker-SemiBold',
  },
  answerText: {
    fontSize: IS_IPAD ? 60 : 45,
    letterSpacing: 0.5,
    color: WHITE,
    textAlign: 'center',
    fontFamily: 'Blinker-ExtraBold',
  },
  descriptionText: {
    fontSize: IS_IPAD ? 20 : 16,
    color: WHITE,
    paddingTop: 5,
    textAlign: 'center',
    letterSpacing: 0.44,
    fontFamily: 'Blinker-Regular',
  },
});
