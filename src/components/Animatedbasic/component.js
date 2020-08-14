import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Animated
} from 'react-native';

export default class Animatedbasic extends Component {
  
  UNSAFE_componentWillMount() {
    this.animatedValue = new Animated.Value(0);
    this.value = 0;
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
      Animated.spring(this.animatedValue,{
        toValue: 0,
        friction: 8,
        tension: 10,
        useNativeDriver: true
      }).start();
    } else if(isShowing) {
      Animated.spring(this.animatedValue,{
        toValue: 180,
        friction: 8,
        tension: 10,
        useNativeDriver: true
      }).start();
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
      <View style={styles.container}>
        <TouchableOpacity onPress={() => {
            if(!isShowing) {
                this.props.onPress();
                this.flipCard();
            }
        }}>
          <Animated.View style={[styles.flipCard, frontAnimatedStyle]}>
            <Text style={styles.flipText}>
              ?
            </Text>
          </Animated.View>
          <Animated.View style={[backAnimatedStyle, styles.flipCard, styles.flipCardBack]}>
            <Text style={styles.flipText}>
              {number}
            </Text>
          </Animated.View>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  flipCard: {
    width: 200,
    height: 200,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'blue',
    backfaceVisibility: 'hidden',
  },
  flipCardBack: {
    width: 200,
    height: 200,
    backgroundColor: "red",
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