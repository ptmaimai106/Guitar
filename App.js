import React, {Component} from 'react';
import {StatusBar, View} from 'react-native';
import SplashScreen from 'react-native-splash-screen';
import AppContainer from './src/navigator/AppNavigator';
import {DARK_BLUE} from './src/constant/color';

class App extends Component {
  componentDidMount() {
    SplashScreen.hide();
  }

  render() {
    return (
      <View style={{flex: 1}}>
        <StatusBar backgroundColor={DARK_BLUE} barStyle="light-content" />
        <AppContainer />
      </View>
    );
  }
}

export default App;
