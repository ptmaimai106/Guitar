import React from 'react';
import {View, Text, TouchableOpacity, Image, StyleSheet} from 'react-native';
import {WHITE, PORTRAIT} from '../constant';
import {IS_IPAD} from '../constant';

const ModalHeader = ({currentAnswer, orientation, onRotate, onClose}) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity style={{zIndex: 100}} onPress={onClose}>
        <Image
          source={require('../assets/icon/cancel.png')}
          style={styles.image}
        />
      </TouchableOpacity>
      <Text style={styles.modalAnswerText}>{currentAnswer}</Text>
      {orientation === PORTRAIT && (
        <TouchableOpacity onPress={onRotate} style={{zIndex: 100}}>
          <Image
            source={require('../assets/icon/rotate.png')}
            style={styles.image}
          />
        </TouchableOpacity>
      )}
    </View>
  );
};

export default ModalHeader;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 44,
    paddingVertical: IS_IPAD ? 20 : 10,
    paddingHorizontal: 16,
    zIndex: 100,
    backgroundColor: 'rgba(256,256,256,0.1)',
    width: '100%',
  },
  modalAnswerText: {
    fontSize: 24,
    letterSpacing: 0.4,
    fontFamily: 'Blinker-Bold',
    color: WHITE,
    position: 'absolute',
    width: '100%',
    textAlign: 'center',
    lineHeight: 30,
  },
  image: {width: 32, height: 32},
});
