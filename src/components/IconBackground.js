import React from 'react';
import {View, Image, StyleSheet} from 'react-native';
import {IS_IPAD} from '../constant';

const IconBackground = () => {
  const size = IS_IPAD ? 400 : 270;
  return (
    <View style={styles.container}>
      <Image
        source={require('../assets/icon/center-icon.png')}
        style={{width: size, height: size}}
      />
    </View>
  );
};

export default IconBackground;

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    paddingBottom: 56,
  },
});
