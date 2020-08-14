import React from 'react';
import renderer, { act } from 'react-test-renderer';
import Listing from '../../../../src/components/Listing';
import { Provider } from "react-redux";
import configureStore from 'redux-mock-store';
const mockStore = configureStore([]);

describe('Listing snapshot', () => {
  let wrapper
  let store;
  beforeEach(() => {
    store = mockStore({
      ListDataReducer: {updateListing: false, data: [{item: {isShowing: true, number: 1}}]}
    });
    wrapper = renderer.create(
      <Provider store={store}>
        <Listing/>
      </Provider>
    );
  });
  afterEach(function() {
    store.clearActions()
  })
  test('render', () => {
    const flatList = wrapper.root.findByProps({ testID: 'flatList' });
    expect(flatList.props.testID).toBe('flatList');
    
  });
});