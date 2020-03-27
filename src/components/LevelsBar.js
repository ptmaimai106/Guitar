/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {StyleSheet, ScrollView, TouchableOpacity, Image} from 'react-native';
import Level from './Level';
import {LEVELS, ORIENTATIONS} from '../constant';

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
});

const LevelsBar = ({selected, onPressLevel, orientation, navigation}) => {
  return (
    <ScrollView
      showsHorizontalScrollIndicator={false}
      horizontal
      scrollEnabled={false}
      style={styles.container}
      ref={ref => {
        // eslint-disable-next-line no-undef
        ScrollViewRef = ref;
      }}>
      {ORIENTATIONS.includes(orientation) && (
        <TouchableOpacity onPress={() => navigation.navigate('About')}>
          <Image
            style={{width: 32, height: 32}}
            source={require('../assets/icon/info.png')}
          />
        </TouchableOpacity>
      )}
      {LEVELS.map(({id, title}) => (
        <Level
          key={id}
          id={id}
          title={title}
          checked={!!selected.includes(id)}
          onPressLevel={onPressLevel}
        />
      ))}
    </ScrollView>
  );
};

export default LevelsBar;
