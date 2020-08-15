import React from 'react';
import {
    FlatList
  } from 'react-native';
import { connect } from 'react-redux';

import ListItem from '../ListItem';

const numColumns = 3;
  
const Listing = ({data, counter}) => {
    const renderItem = (props) => <ListItem {...props} />    

    return (
        <FlatList
            testID="flatList"
            extraData={counter}
            numColumns={numColumns}
            data={data}
            renderItem={renderItem}
            keyExtractor={(item, index) => index.toString()}/>
    )
  }

  const mapStateToProps = state => ({
    data: state.ListDataReducer.data,
    counter: state.ListDataReducer.counter,
  });

  export default connect(mapStateToProps)(Listing);
