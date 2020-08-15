import React from 'react';
import AnimatedView from '../AnimatedView';

import { setListData, updateCounter, recordPosition, updatePairs} from '../../actions';
import { connect } from 'react-redux';
import { populateList, CARD_PAIRS_VALUE } from '../../utils';
import { Alert } from 'react-native';
  const ListItem = ({dispatch, data, counter, previousPositionClicked, pairsCompleted, item, index}) => {
    const onCardPress = (clickedItem, index) => {
        const tempDataSource = [...data];
        if(clickedItem.isShowing === false) {
            if(previousPositionClicked === -1) {
                clickedItem.isShowing = true;
                dispatch(recordPosition(index));
            } else if(tempDataSource[previousPositionClicked].number === clickedItem.number) {
                clickedItem.isShowing = true;
                dispatch(recordPosition(-1));
                dispatch(updatePairs(pairsCompleted + 1));
                showAlertOnCompletion(pairsCompleted + 1);
            } else {
                const futurePositions = [];
                futurePositions.push(index);
                futurePositions.push(previousPositionClicked);
                clickedItem.isShowing = true;
                setTimeout(() => {
                    for(let i=0;i<futurePositions.length;i++) {
                        tempDataSource[futurePositions[i]].isShowing = false;
                    }
                    dispatch(recordPosition(-1));
                    console.log('futurePositions', futurePositions)
                    futurePositions.splice(0, futurePositions.length);
                    console.log('futurePositions >', futurePositions)
                }, 600);
            }
            dispatch(updateCounter(counter + 1));
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
        <AnimatedView testID="listItemParent" item={item} onPress={() => onCardPress(item, index)}/>
    )
  }
  const mapStateToProps = state => ({
    data: state.ListDataReducer.data,
    counter: state.ListDataReducer.counter,
    previousPositionClicked: state.ListDataReducer.previousPositionClicked,
    pairsCompleted: state.ListDataReducer.pairsCompleted
  });
  export default connect(mapStateToProps)(ListItem);
