import React from 'react';
import renderer from 'react-test-renderer';
import ListItem from '../../../../src/components/ListItem';
import { Provider } from "react-redux";
import configureStore from 'redux-mock-store';
const mockStore = configureStore([]);

describe('Header snapshot', () => {
  let wrapper
  let store;
  beforeEach(() => {
    store = mockStore({
      ListDataReducer: {counter: 0}
    });
    const props = { item: {isShowing: true, number: 1}}
    wrapper = renderer.create(
      <Provider store={store}>
        <ListItem {...props}/>
      </Provider>
    );
  });
  afterEach(function() {
    store.clearActions()
  })
  test('render', () => {
    const result = wrapper.toJSON();
    expect(result).toMatchSnapshot();
    const card = wrapper.root.findByProps({ testID: 'listItem' });
    expect(card.type.displayName).toBe('Text');
  });
});