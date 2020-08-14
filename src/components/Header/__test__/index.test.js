import React from 'react';
import renderer, { act } from 'react-test-renderer';
import Header from '../../../../src/components/Header';
import { Provider } from "react-redux";
import configureStore from 'redux-mock-store';
import { UPDATE_COUNTER } from '../../../actions';
const mockStore = configureStore([]);

describe('Header snapshot', () => {
  let wrapper
  let store;
  beforeEach(() => {
    store = mockStore({
      ListDataReducer: {counter: 0}
    });
    wrapper = renderer.create(
      <Provider store={store}>
        <Header/>
      </Provider>
    );
  });
  afterEach(function() {
    store.clearActions()
  })

  test('onResetClick', () => {
    const button = wrapper.root.findByProps({ testID: 'resetBtn' });
    const stepsCounter = wrapper.root.findByProps({ testID: 'counterText' });
    expect(stepsCounter.props.children).toBe('Steps 0');
    act(() => {
      button.props.onPress();
    });
    expect(store.getActions()[0].type).toBe(UPDATE_COUNTER);  
  });
});