import React from 'react';
import renderer, { act } from 'react-test-renderer';
import ListItem from '../../../../src/components/ListItem';
import { Provider } from "react-redux";
import configureStore from 'redux-mock-store';
const mockStore = configureStore([]);

describe('Header snapshot', () => {
  let wrapper
  let store;
  beforeEach(() => {
    store = mockStore({
      ListDataReducer: {counter: 0, data: [{item: {isShowing: true, number: 1}}]}
    });
    const props = { item: {isShowing: true, number: 1}, index: 0}
    wrapper = renderer.create(
      <Provider store={store}>
        <ListItem {...props}/>
      </Provider>
    );
  });
  afterEach(function() {
    store.clearActions()
  })
  test('render', async () => {
    const card = wrapper.root.findByProps({ testID: 'listItem' });
    expect(card.type.displayName).toBe('Text');
    
    const listItemParent = wrapper.root.findByProps({ testID: 'listItemParent' });
    act(() => {
        listItemParent.props.onPress();
    });
    // console.log('store.getActions()', store.getActions());
    // // expect(store.getActions()[0].type).toBe(UPDATE_COUNTER);  
  });
});