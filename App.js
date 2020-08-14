import React, { useEffect } from 'react';

import Header from './src/components/Header';
import Listing from './src/components/Listing';
import { setListData } from './src/actions';
import { connect } from 'react-redux';
import { populateList, CARD_PAIRS_VALUE } from './src/utils';

const App = ({dispatch}) => {
  useEffect( () => {
    dispatch(setListData(populateList(CARD_PAIRS_VALUE)));
  }, []);
return (
    <>
      <Header testID="header"/>
      <Listing testID="listing"/>
    </>
  );
};

export default connect()(App);
