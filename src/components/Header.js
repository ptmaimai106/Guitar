import React from 'react';
import {View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native';
import {DARK_BLUE, DARK_GRAY, WHITE} from '../constant';

const Header = ({navigation}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>GUITAR PROFICIENCY TEST</Text>
      <TouchableOpacity onPress={() => navigation.navigate('About')}>
        <Image
          style={styles.image}
          source={require('../assets/icon/info.png')}
        />
      </TouchableOpacity>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  container: {
    backgroundColor: DARK_BLUE,
    borderBottomColor: DARK_GRAY,
    borderBottomWidth: 0,
    height: 52,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  title: {
    fontWeight: 'bold',
    color: WHITE,
    fontFamily: 'Blinker-Regular',
    fontSize: 20,
    marginLeft: 16,
  },
  image: {
    width: 32,
    height: 32,
    marginRight: 15,
  },
});
