import React from 'react';
import {
    Text,
    View,
    TouchableOpacity,
    StyleSheet
  } from 'react-native';
import { connect } from 'react-redux';
import { setListData, updateCounter } from '../../actions';
import { CARD_PAIRS_VALUE } from '../../../App';
import { populateList } from '../../utils';

const Header = ({dispatch, counter}) => {
    const onResetClick = () => {
      dispatch(updateCounter(0));
      dispatch(setListData(populateList(CARD_PAIRS_VALUE)));
    }
    return (
        <View style={styles.header}>
          <TouchableOpacity testID="resetBtn" onPress={onResetClick}><Text style={styles.reset}>Reset</Text></TouchableOpacity>
          <Text testID="counterText" style={styles.counterItem}>{`Steps ${counter}`}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    header: {
      flexDirection: 'row',
    },
    reset: {
      fontSize: 25,
      textAlign: 'left',
      flex:1,
      paddingLeft: 10,
      paddingRight:10,
      backgroundColor: 'cyan',
      color: 'black'
    },
    counterItem: {
      fontSize: 25,
      textAlign: 'right',
      flex:1,
      paddingLeft: 10,
      paddingRight:10,
    }
  });

  const mapStateToProps = state => ({
    counter: state.ListDataReducer.counter
  });

  export default connect(mapStateToProps)(Header);
