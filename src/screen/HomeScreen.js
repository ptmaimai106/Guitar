/* eslint-disable react/no-string-refs */
/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Dimensions,
} from 'react-native';
import MainPage from '../page/MainPage';
import LevelsBar from '../components/LevelsBar';
import {
  TABS,
  IS_IPAD,
  LIGHT_WHITE,
  RED,
  BLACK,
  PORTRAIT,
  ORIENTATIONS,
  LANDSCAPE,
} from '../constant';
import {SafeAreaView} from 'react-navigation';
import Header from '../components/Header';

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tabSelect: 1,
      width: 0,
      selected: [1],
      height: 0,
    };
  }

  onTabPressed = (id, title) => {
    this.setState({tabSelect: id});
    const {width} = this.state;

    if (title === 'Triad Chords') {
      this.refs.topNavigator.scrollTo({x: 0, y: 0, animated: true});
    }
    if (title === 'Triad Arpeggios') {
      this.refs.topNavigator.scrollTo({x: width / 4, y: 0, animated: true});
    }
    if (title === '4-Part Chords') {
      this.refs.topNavigator.scrollTo({x: width / 1.5, y: 0, animated: true});
    }
    if (title === '4-Part Arpeggios') {
      this.refs.topNavigator.scrollToEnd({animated: true, duration: 500});
    }
  };

  onPressLevel = id => {
    const {selected} = this.state;

    if (selected.includes(id)) {
      if (selected.length === 1) {
        return;
      }
      const newSelected = selected.filter(i => i !== id);
      this.setState({selected: newSelected});
    } else {
      const newSelected = [...selected, id];
      this.setState({selected: newSelected});
    }
  };

  render() {
    const {tabSelect, selected} = this.state;
    const {navigation} = this.props;

    const portrait =
      Dimensions.get('screen').height > Dimensions.get('screen').width && true;
    const orientation = portrait ? PORTRAIT : LANDSCAPE;
    console.log(orientation);

    return (
      <SafeAreaView
        style={styles.wrapper}
        onLayout={event => {
          const {height} = event.nativeEvent.layout;
          this.setState({height});
        }}>
        {orientation === PORTRAIT && <Header navigation={navigation} />}
        <View
          style={{
            ...styles.levelBarContainer,
            marginTop: orientation === PORTRAIT ? 12 : 20,
          }}>
          <LevelsBar
            selected={selected}
            onPressLevel={this.onPressLevel}
            orientation={orientation}
            navigation={navigation}
          />
        </View>
        <View style={styles.tabWrapper}>
          <ScrollView
            contentContainerStyle={
              IS_IPAD || ORIENTATIONS.includes(orientation)
                ? {flex: 1, justifyContent: 'space-between'}
                : {}
            }
            horizontal
            showsHorizontalScrollIndicator={false}
            ref="topNavigator"
            onLayout={event => {
              const layout = event.nativeEvent.layout;
              this.setState({width: layout.width});
            }}>
            {TABS.map(({id, title}) => (
              <TouchableOpacity
                key={id}
                style={styles.button}
                onPress={() => this.onTabPressed(id, title)}>
                <View style={id === tabSelect ? styles.buttonSelected : {}}>
                  <Text
                    style={
                      id === tabSelect
                        ? [styles.buttonTitle, styles.buttonSelectedTitle]
                        : styles.buttonTitle
                    }>
                    {title}
                  </Text>
                </View>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
        <MainPage
          tab={TABS[tabSelect - 1].title}
          levels={selected}
          orientation={orientation}
          navigation={navigation}
        />
      </SafeAreaView>
    );
  }
}

export default Home;

const styles = StyleSheet.create({
  levelBarContainer: {
    height: 48,
    paddingHorizontal: 12,
  },
  tabWrapper: {
    height: 48,
    backgroundColor: '#2B2B2B',
    zIndex: 100,
  },
  wrapper: {
    flex: 1,
    backgroundColor: BLACK,
  },
  buttonTitle: {
    color: LIGHT_WHITE,
    fontSize: 16,
    lineHeight: 48,
    marginBottom: 8,
    fontFamily: 'Blinker-Regular',
  },
  buttonSelectedTitle: {
    color: RED,
    fontFamily: 'Blinker-SemiBold',
  },
  button: {
    paddingHorizontal: 16,
  },
  buttonSelected: {
    borderBottomColor: RED,
    borderBottomWidth: 4,
    height: '100%',
  },
});
