import React from 'react';
import { shallow } from 'enzyme';
import { MyOrders } from '../../../src/features/pages';

it('renders node with correct class name', () => {
  const renderedComponent = shallow(<MyOrders />);
  expect(renderedComponent.find('.pages-my-orders').length).toBe(1);
});
