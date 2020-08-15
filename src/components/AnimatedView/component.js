import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  Animated,
  Dimensions,
  TouchableNativeFeedback,
  View
} from 'react-native';

export default class Animatedbasic extends Component {
  
  UNSAFE_componentWillMount() {
    this.animatedValue = new Animated.Value(0);
    this.value = 0;
    this.AnimationInprogress = false;
    this.animatedValue.addListener(({ value }) => {
      this.value = value;
    })
    this.frontInterpolate = this.animatedValue.interpolate({
      inputRange: [0, 180],
      outputRange: ['0deg', '180deg'],
    })
    this.backInterpolate = this.animatedValue.interpolate({
      inputRange: [0, 180],
      outputRange: ['180deg', '360deg']
    })
  }
  
  componentDidUpdate() {
    this.flipCard();
  }

  flipCard() {
    const {item: {isShowing}} = this.props;
    if (this.value >= 90 && !isShowing) {
        this.AnimationInprogress = true;
        Animated.spring(this.animatedValue,{
            toValue: 0,
            friction: 8,
            tension: 10,
            useNativeDriver: true
        }).start(() => this.AnimationInprogress = false);
    } else if(isShowing) {
        this.AnimationInprogress = true;
        Animated.spring(this.animatedValue,{
            toValue: 180,
            friction: 8,
            tension: 10,
            useNativeDriver: true
        }).start(() => this.AnimationInprogress = false);
    }
  }
  
  render() {
    const {item: {isShowing, number}} = this.props;
    const frontAnimatedStyle = {
      transform: [
        { rotateY: this.frontInterpolate}
      ]
    }
    const backAnimatedStyle = {
      transform: [
        { rotateY: this.backInterpolate }
      ]
    }
    return (
        <TouchableNativeFeedback
          background={TouchableNativeFeedback.Ripple('#fff')}
          disabled={isShowing}
          onPress={() => {
              if(!isShowing && this.AnimationInprogress === false) {
                  this.props.onPress();
                  this.flipCard();
              }
          }}>
          <View style={styles.container}>
            <Animated.View style={[styles.flipCard, frontAnimatedStyle]}>
            <Text style={styles.flipText}>
                {'?'}
            </Text>
            </Animated.View>
            <Animated.View style={[backAnimatedStyle, styles.flipCard, styles.flipCardBack]}>
            <Text style={styles.flipText}>
                {number}
            </Text>
            </Animated.View>
            </View>
        </TouchableNativeFeedback>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: 'grey',
    margin: 1,
    height: Dimensions.get('window').width / 3,
  },
  flipCard: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backfaceVisibility: 'hidden',
    height: Dimensions.get('window').width / 3,
  },
  flipCardBack: {
    position: "absolute",
    top: 0,
  },
  flipText: {
    fontSize: 45,
    fontWeight: 'bold', 
    color: 'white'
  }
});

AppRegistry.registerComponent('animatedbasic', () => animatedbasic);