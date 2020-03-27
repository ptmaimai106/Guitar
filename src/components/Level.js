import React from 'react';
import {Text, View, StyleSheet, Image, TouchableOpacity} from 'react-native';
import {RED, WHITE, GREY} from '../constant/color';

const Level = ({id, title, checked, onPressLevel}) => {
  const handleSelectLevel = id => {
    onPressLevel(id);
  };
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => handleSelectLevel(id)}>
        <View style={checked ? styles.wrapper : styles.wrapperPress}>
          <View style={styles.checked}>
            {checked ? (
              <>
                <Image
                  resizeMode="center"
                  source={require('../assets/icon/Check.png')}
                />
                <Text style={styles.text}>{title}</Text>
              </>
            ) : (
              <Text style={styles.textUnChecked}>{title}</Text>
            )}
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default Level;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    marginHorizontal: 8,
    paddingBottom: 8,
  },
  wrapper: {
    backgroundColor: RED,
    width: 100,
    height: 32,
    borderRadius: 16,
    paddingVertical: 8,
    textAlign: 'center',
  },
  wrapperPress: {
    backgroundColor: GREY,
    width: 100,
    height: 32,
    borderRadius: 16,
    paddingVertical: 8,
    textAlign: 'center',
  },
  text: {
    color: WHITE,
    fontSize: 14,
    letterSpacing: 0.23,
    fontFamily: 'Blinker-SemiBold',
    paddingLeft: 8,
  },
  checked: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  textUnChecked: {
    width: '100%',
    fontSize: 14,
    letterSpacing: 0.23,
    color: WHITE,
    fontFamily: 'Blinker-SemiBold',
    textAlign: 'center',
  },
});
