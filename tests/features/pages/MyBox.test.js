import React from 'react';
import { shallow } from 'enzyme';
import { MyBox } from '../../../src/features/pages';

it('renders node with correct class name', () => {
  const renderedComponent = shallow(<MyBox />);
  expect(renderedComponent.find('.pages-my-box').length).toBe(1);
});
