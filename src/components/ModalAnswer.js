/* eslint-disable react-native/no-inline-styles */
import React, {Component} from 'react';
import {
  View,
  Animated,
  StyleSheet,
  Text,
  Platform,
  Dimensions,
} from 'react-native';
import {
  PinchGestureHandler,
  State,
  ScrollView,
} from 'react-native-gesture-handler';
import {
  BLACK,
  PORTRAIT,
  ORIENTATIONS,
  SCREEN_WIDTH,
  WHITE,
  IS_IPHONE_X,
  LANDSCAPE,
} from '../constant';
import ModalHeader from './ModalHeader';
import Carousel, {Pagination} from 'react-native-snap-carousel';

class ModalAnswer extends Component {
  state = {
    rotate: 0,
    activeSlide: 0,
    height: 0,
    width: 0,
  };

  _baseScale = new Animated.Value(1);
  _pinchScale = new Animated.Value(1);

  _temp = Animated.multiply(this._baseScale, this._pinchScale);

  _scale = this._temp.interpolate({
    inputRange: [0.5, 1.5],
    outputRange: [0.5, 1.5],
    extrapolate: 'clamp',
  });
  _lastScale = 1;
  _onPinchGestureEvent = Animated.event(
    [{nativeEvent: {scale: this._pinchScale}}],
    {useNativeDriver: true},
  );

  _onPinchHandlerStateChange = event => {
    if (event.nativeEvent.oldState === State.ACTIVE) {
      this._lastScale *= event.nativeEvent.scale;
      this._baseScale.setValue(this._lastScale);
      this._pinchScale.setValue(1);
    }
  };

  onRotate = () => {
    this.setState(curState => {
      const newRotate = curState.rotate === 0 ? -90 : 0;

      return {
        rotate: newRotate,
      };
    });
  };

  onClose = () => {
    const {navigation} = this.props;
    navigation.goBack();
  };

  toggleModal = () => {
    const {setModalVisible, modalAnswer} = this.props;
    this.setState({
      rotate: 0,
      activeSlide: 0,
    });
    setModalVisible(!modalAnswer);
  };

  get pagination() {
    const {navigation} = this.props;
    const {activeSlide} = this.state;

    const results = navigation.getParam('results');
    const dotSize = results.length > 10 ? 5 : 10;

    return (
      <Pagination
        dotsLength={results.length}
        activeDotIndex={activeSlide}
        containerStyle={{
          backgroundColor: 'transparent',
          width: SCREEN_WIDTH / 2,
        }}
        dotStyle={{
          ...styles.dotStyle,
          width: dotSize,
          height: dotSize,
        }}
        inactiveDotOpacity={0.4}
        inactiveDotScale={0.6}
      />
    );
  }

  render() {
    const {navigation} = this.props;
    let {rotate, width} = this.state;
    const results = navigation.getParam('results');
    const currentAnswer = navigation.getParam('currentAnswer');

    const sliderWidth = width;
    const portrait =
      Dimensions.get('screen').height > Dimensions.get('screen').width && true;
    const orientation = portrait ? PORTRAIT : LANDSCAPE;
    return (
      <View
        style={
          orientation === PORTRAIT
            ? IS_IPHONE_X()
              ? {...styles.modalWrapper, paddingTop: 40}
              : {
                  ...styles.modalWrapper,
                  paddingTop: Platform.OS !== 'android' ? 20 : 0,
                }
            : {
                ...styles.modalWrapper,
                paddingTop: Platform.OS !== 'android' ? 20 : 0,
              }
        }
        onLayout={event => {
          this.setState({
            height: event.nativeEvent.layout.height,
            width: event.nativeEvent.layout.width,
          });
        }}>
        <ModalHeader
          currentAnswer={currentAnswer}
          orientation={orientation}
          onRotate={this.onRotate}
          onClose={this.onClose}
        />
        <View style={styles.center}>
          
          <PinchGestureHandler
            onGestureEvent={this._onPinchGestureEvent}
            onHandlerStateChange={this._onPinchHandlerStateChange}>
            <Animated.View
              collapsable={false}
              style={{
                transform: [{perspective: 200}, {scale: this._scale}],
              }}>
              <View style={styles.center}>
                {results.length > 0 ? (
                  <Carousel
                    removeClippedSubviews={false}
                    data={results}
                    renderItem={({
                      item: {component, landscapeComponent, isLandscape},
                      index,
                    }) => {
                      rotate = ORIENTATIONS.includes(orientation)
                        ? isLandscape
                          ? 0
                          : -90
                        : rotate;
                      return (
                        <View
                          key={index}
                          style={{
                            ...styles.center,
                            // transform: [{ rotate: `${rotate}deg` }]
                          }}>
                          {rotate !== 0 ? (
                            <ScrollView
                              contentContainerStyle={{
                                ...styles.center,
                                paddingHorizontal: 20,
                              }}
                              showsHorizontalScrollIndicator={false}>
                              {landscapeComponent}
                            </ScrollView>
                          ) : (
                            component
                          )}
                        </View>
                      );
                    }}
                    sliderWidth={sliderWidth || SCREEN_WIDTH}
                    itemWidth={sliderWidth || SCREEN_WIDTH}
                    onSnapToItem={index => this.setState({activeSlide: index})}
                  />
                ) : (
                  <View
                    style={{
                      flex: 1,
                      justifyContent: 'center',
                    }}>
                    <Text style={styles.noAnswer}>No answer</Text>
                  </View>
                )}
              </View>
              <View style={{height: 40, width: '100%'}} />
            </Animated.View>
          </PinchGestureHandler>
          
          
          <View style={styles.paginator}>{this.pagination}</View>
        </View>
      </View>
    );
  }
}

export default ModalAnswer;

const styles = StyleSheet.create({
  modalWrapper: {
    backgroundColor: BLACK,
    flex: 1,
  },
  center: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  dotStyle: {
    borderRadius: 5,
    marginHorizontal: 2,
    paddingHorizontal: 2,
    backgroundColor: 'rgba(255, 255, 255, 0.92)',
  },
  paginator: {
    bottom: 10,
    position: 'absolute',
  },
  noAnswer: {
    color: WHITE,
    fontSize: 20,
  },
});
