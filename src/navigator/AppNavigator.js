/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {Image, Text, TouchableOpacity, Platform} from 'react-native';
import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import AboutScreen from '../screen/AboutScreen';
import {DARK_BLUE, WHITE} from '../constant';
import HomeScreen from '../screen/HomeScreen';
import ModalAnswer from '../components/ModalAnswer';

const MusicNavigator = createStackNavigator(
  {
    Home: HomeScreen,
    Modal: ModalAnswer,
  },
  {
    mode: 'modal',
    defaultNavigationOptions: {
      header: null,
    },
  },
);

const AppNavigator = createStackNavigator(
  {
    Home: {
      screen: MusicNavigator,
      path: 'people/:name',
      navigationOptions: () => ({
        header: null,
      }),
    },
    About: {
      screen: AboutScreen,
      path: 'people/:name',
      navigationOptions: ({navigation}) => ({
        headerLeft: (
          <>
            <TouchableOpacity
              style={{
                paddingLeft: 16,
                flexDirection: 'row',
                alignItems: 'center',
              }}
              onPress={() => navigation.navigate('Home')}>
              <Image
                style={{width: 32, height: 32}}
                source={require('../assets/icon/back-icon.png')}
              />
            </TouchableOpacity>
            <Text
              style={{
                color: WHITE,
                marginLeft: 16,
                fontSize: 18,
                fontFamily: 'Blinker-Regular',
              }}>
              ABOUT GUITAR PROFICIENCY TEST
            </Text>
          </>
        ),
        headerStyle: {
          backgroundColor: DARK_BLUE,
          height: 52,
          marginTop: Platform.OS === 'android' ? 0 : 10,
        },
      }),
    },
  },
  {
    initialRouteName: 'Home',
    defaultNavigationOptions: {
      headerStyle: {
        backgroundColor: DARK_BLUE,
      },
      headerTintColor: WHITE,
      headerTitleStyle: {
        color: WHITE,
      },
    },
  },
);

const AppContainer = createAppContainer(AppNavigator);

export default AppContainer;
