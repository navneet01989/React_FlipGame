import React, { useEffect } from 'react';
import {
  SafeAreaView,
  StatusBar
} from 'react-native';

import Header from './src/components/Header';
import Listing from './src/components/Listing';
import { updateCounter, setListData } from './src/actions';
import { connect } from 'react-redux';
import { populateList } from './src/utils';

export const CARD_PAIRS_VALUE = 2;

const App = ({dispatch}) => {
  useEffect( () => {
    dispatch(setListData(populateList(CARD_PAIRS_VALUE)));
    dispatch(updateCounter(0));
  }, []);
return (
    <>
      <StatusBar barStyle="dark-content" />
        <SafeAreaView>
          <Header />
          <Listing />
      </SafeAreaView>
    </>
  );
};

export default connect()(App);
