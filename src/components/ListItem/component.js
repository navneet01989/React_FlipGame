import React from 'react';
import Animatedbasic from '../Animatedbasic';

import { setListData, updateCounter, recordPosition, refreshList, updatePairs } from '../../actions';
import { connect } from 'react-redux';
import { populateList, CARD_PAIRS_VALUE } from '../../utils';
import { Alert } from 'react-native';
  const ListItem = ({dispatch, data, counter, previousPositionClicked, updateListing, pairsCompleted, item, index}) => {
    const onCardPress = (item, index) => {
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
                }, 800);
            }
            dispatch(updateCounter(counter + 1));
            dispatch(refreshList(!updateListing));
        }
    };
    
    const showAlertOnCompletion = (pairsCompleted) => {
        console.log('pairsCompleted', pairsCompleted, CARD_PAIRS_VALUE)
        if(pairsCompleted === CARD_PAIRS_VALUE) {
            Alert.alert(
                'Congratulation!',  
                `You won this game by ${counter + 1} steps`,  
                [  
                    {
                        text: 'Try another round', onPress: () => {
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

    return (
        <Animatedbasic testID="listItemParent" item={item} onPress={() => onCardPress(item, index)}/>
    )
  }
  const mapStateToProps = state => ({
    data: state.ListDataReducer.data,
    counter: state.ListDataReducer.counter,
    previousPositionClicked: state.ListDataReducer.previousPositionClicked,
    updateListing: state.ListDataReducer.updateListing,
    pairsCompleted: state.ListDataReducer.pairsCompleted,
  });
  export default connect(mapStateToProps)(ListItem);
