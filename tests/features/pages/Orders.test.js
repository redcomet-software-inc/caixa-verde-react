import React from 'react';
import { shallow } from 'enzyme';

it('renders node with correct class name', () => {
  const renderedComponent = shallow(<Orders />);
  expect(renderedComponent.find('.pages-orders').length).toBe(1);
});
