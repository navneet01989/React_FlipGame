import React from 'react';
import renderer from 'react-test-renderer';
import App from '../App';
import { Provider } from "react-redux";
import configureStore from 'redux-mock-store';
const mockStore = configureStore([]);

describe('Listing snapshot', () => {
  let wrapper
  let store;
  beforeEach(() => {
    store = mockStore({
      ListDataReducer: {}
    });
    wrapper = renderer.create(
      <Provider store={store}>
        <App/>
      </Provider>
    );
    
  });
  afterEach(function() {
    store.clearActions()
  })
  test('render', () => {
    const header = wrapper.root.findByProps({ testID: 'header' });
    expect(header.props.testID).toBe('header');
    const listing = wrapper.root.findByProps({ testID: 'listing' });
    expect(listing.props.testID).toBe('listing');
  });
});
