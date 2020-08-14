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
    const parent = wrapper.root.findByProps({ testID: 'parent' });
    expect(parent.props.testID).toBe('parent');
  });
});
