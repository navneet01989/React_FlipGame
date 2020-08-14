import React, { useState } from 'react';
import {
    Text,
    TouchableOpacity,
    StyleSheet,
    Dimensions,
    Animated,
    Alert
  } from 'react-native';
import { setListData, updateCounter, recordPosition, refreshList, updatePairs } from '../../actions';
import { connect } from 'react-redux';
import { CARD_PAIRS_VALUE } from '../../../App';
import { populateList } from '../../utils';
const numColumns = 3;
  const ListItem = ({dispatch, data, counter, previousPositionClicked, updateListing, pairsCompleted, item, index}) => {
    const onCardPress = (item, index) => {
        flip_animation_fun();
        const tempDataSource = data;
        if(tempDataSource[index].isShowing === false) {
            if(previousPositionClicked === -1) {
                tempDataSource[index].isShowing = true;
                dispatch(setListData(tempDataSource));
                dispatch(recordPosition(index));
            } else if(tempDataSource[previousPositionClicked].number === tempDataSource[index].number) {
                tempDataSource[index].isShowing = true;
                dispatch(setListData(tempDataSource));
                dispatch(recordPosition(-1));
                dispatch(updatePairs(pairsCompleted + 1));
                showAlertOnCompletion(pairsCompleted + 1);
            } else {
                tempDataSource[index].isShowing = true;
                setTimeout(() => {
                    tempDataSource[index].isShowing = false;
                    tempDataSource[previousPositionClicked].isShowing = false;
                    dispatch(recordPosition(-1));
                }, 1000);
            }
            dispatch(updateCounter(counter + 1));
            dispatch(refreshList(!updateListing));
        }
    };
    
    const showAlertOnCompletion = (pairsCompleted) => {
        console.log('pairsCompleted', pairsCompleted, CARD_PAIRS_VALUE);
        if(pairsCompleted === CARD_PAIRS_VALUE) {
            Alert.alert(
                'Congratulation!',  
                `You won this game by ${counter + 1} steps`,  
                [  
                    {
                        text: 'OK', onPress: () => {
                        dispatch(setListData(populateList(CARD_PAIRS_VALUE)));
                        dispatch(updateCounter(0));
                        dispatch(updatePairs(0));
                    }
                },  
                ],
                {cancelable: false}   
            );
        }
    }

    const animatedValue = new Animated.Value(900);
    const [value, setValue] = useState(900);
    animatedValue.addListener(({value}) => {
        setValue(value);
    });

    const flip_animation_fun = () => {
        if(value >= 90) {
            Animated.spring(animatedValue, {
                toValue: 0, tension: 10, friction: 8, useNativeDriver: true
            }).start();
        } else {
            Animated.spring(animatedValue, {
                toValue: 900, tension: 10, friction: 8, useNativeDriver: true
            }).start();
        }
    }
    const setInterpolation = animatedValue.interpolate({
        inputRange: [0, 900],
        outputRange: ['180deg', '360deg']
    });

    const rotateYAnimation = {
        transform: [{ rotate: setInterpolation }]
    }

    return (
        <TouchableOpacity style={[rotateYAnimation, styles.item]} onPress={() => onCardPress(item, index)}>
            <Text style={styles.itemContent}>{item.isShowing ? item.number : '?'}</Text>
        </TouchableOpacity>
    )
  }
  const styles = StyleSheet.create({
    item: {
        flex: 1,
        height: Dimensions.get('window').width / numColumns,
        backgroundColor: 'blue',
        margin: 1,
        alignItems: 'center',
        justifyContent: 'center'
      },
      itemContent: {
        color: 'white',
        fontSize: 25
      }
  });
  const mapStateToProps = state => ({
    data: state.ListDataReducer.data,
    counter: state.ListDataReducer.counter,
    previousPositionClicked: state.ListDataReducer.previousPositionClicked,
    updateListing: state.ListDataReducer.updateListing,
    pairsCompleted: state.ListDataReducer.pairsCompleted,
  });
  export default connect(mapStateToProps)(ListItem);
