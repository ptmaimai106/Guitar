import React, {Component} from 'react';
import {Text, TouchableOpacity, StyleSheet, View} from 'react-native';
import {TABS, WHITE, RED, BLACK} from '../constant';
import Note from '../components/Note';
import IconBackground from '../components/IconBackground';

const LEVEL1 = 'LEVEL 1';
const LEVEL2 = 'LEVEL 2';
const SCALE = 'Scale';

export default class MainPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentAnswer: '',
      quality: {},
      level: LEVEL1,
      height: 0,
      width: 0,
      results: [],
    };
  }

  componentDidMount = () => {
    const {tab, levels} = this.props;
    this.generateNewAnswer(tab, levels);
  };

  // determine if user choose another tab of level
  UNSAFE_componentWillReceiveProps = nextProps => {
    const {tab, levels} = nextProps;
    if (tab !== this.props.tab || levels.length !== this.props.levels.length) {
      this.generateNewAnswer(tab, levels);
    }
  };

  getRandomArrayElement = arr => {
    var min = 0;
    var max = arr.length;
    var randIndex = Math.floor(Math.random() * (max - min)) + min;
    return arr[randIndex];
  };

  // general code for scaling app, no matter how many levels is
  generateNewAnswer = (tab, levels) => {
    // get child of TAB list that has title equal to current tab
    // assign configJson to property file of that child
    const configJson = TABS.find(t => t.title === tab).file;
    const answerJson = TABS.find(t => t.title === tab).results.results;

    // get list root in root.json
    const rootArray = require('../assets/json/root.json');

    // contain list quality that is gonna use to get random value
    let qualityArray = [];

    // levels is list of level is selected, e.g: levels = [1, 3]
    // map through each level, get list quality of this level and add to qualityArray
    levels.map(level => {
      const key = `Level${level}`;

      qualityArray = [...qualityArray, ...configJson[key]];
    });

    const randomQuality = this.getRandomArrayElement(qualityArray);
    let resultLabel = randomQuality.label;

    // determine that the random quality is belong to which level
    // TODO: fix this one if there are more than 2 levels
    const level = configJson.Level1.includes(randomQuality) ? LEVEL1 : LEVEL2;

    const answerLevel = configJson.Level1.includes(randomQuality)
      ? answerJson.Level1
      : answerJson.Level2;

    let resultsArr = [];

    answerLevel.map(r => {
      if (r.name === resultLabel) {
        resultsArr = r.image;
      }
    });
    const randomAnswer =
      this.getRandomArrayElement(rootArray) +
      `${tab === SCALE ? ' ' : ''}` +
      randomQuality.label;

    this.setState({
      currentAnswer: randomAnswer,
      quality: randomQuality,
      level,
      results: resultsArr,
    });
  };

  render() {
    const {currentAnswer, quality, level} = this.state;
    const {tab, levels, orientation, navigation} = this.props;

    const {results} = this.state || [];

    return (
      <View style={styles.container}>
        <IconBackground />
        <Note
          currentAnswer={currentAnswer}
          displayText={quality.displayText}
          level={level}
          orientation={orientation}
        />
        <View style={styles.btnWrapper}>
          <TouchableOpacity
            style={styles.showResultBtn}
            onPress={() => {
              navigation.navigate('Modal', {
                results,
                currentAnswer,
              });
            }}>
            <Text style={styles.showResultText}>SHOW RESULT</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.generateBtn}
            onPress={() => {
              this.generateNewAnswer(tab, levels);
            }}>
            <Text style={styles.generateText}>GENERATE</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: BLACK,
    paddingHorizontal: 16,
  },
  iconImage: {
    width: '100%',
    height: '100%',
    position: 'absolute',
  },
  // btnWrapper: {
  //   width: '100%',
  //   flex: -1,
  //   flexDirection: 'row',
  //   justifyContent: 'space-between',
  //   marginBottom: 16,
  // },
  generateBtn: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '48%',
    height: 50,
    backgroundColor: RED,
    borderRadius: 4,
  },
  showResultBtn: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '48%',
    backgroundColor: BLACK,
    borderRadius: 4,
    borderWidth: 1.5,
    borderColor: RED,
    height: 50,
  },
  generateText: {
    color: WHITE,
    fontFamily: 'Blinker-Bold',
    fontSize: 16,
  },
  showResultText: {
    color: RED,
    fontFamily: 'Blinker-Bold',
    fontSize: 16,
  },
  iconAnswer: {
    position: 'absolute',
    bottom: '30%',
  },
  btnWrapper: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
    paddingBottom: 24,
  },
});
