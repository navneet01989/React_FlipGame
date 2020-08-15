import 'jsdom-global/register';
import React from 'react';
import renderer from 'react-test-renderer';
import AnimatedView from '../../../../src/components/AnimatedView';
import { shallow, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { configure } from 'enzyme';
import { TouchableNativeFeedback } from 'react-native';
configure({ adapter: new Adapter() });
describe('Render without crash', () => {
  let wrapper
  beforeEach(() => {
      const onPress = jest.fn()
    const props = {item: {isShowing: false, number: 1}}
    wrapper = renderer.create(
        <AnimatedView {...props} onPress={onPress}/>
    );
  });
  test('render', async () => {
    const result = wrapper.toJSON();
    console.log('result', result)
    expect(result.type).toBe('View');

    const props1 = {item: {isShowing: false, number: 1}}
    const enz1 = shallow(<AnimatedView {...props1}/>);
    expect(enz1.find({ testID: 'boxParent' }).length).toBe(1);
    enz1.instance().value = 91;
    enz1.instance().componentDidUpdate()

    const props2 = {item: {isShowing: true, number: 1}}
    const enz2 = shallow(<AnimatedView {...props2}/>);
    enz2.instance().componentDidUpdate();

    const button = wrapper.root.findByType(TouchableNativeFeedback);
    button.props.onPress();
  });
});