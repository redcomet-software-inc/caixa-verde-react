import React from 'react';
import { shallow } from 'enzyme';
import { Checkout1 } from '../../../src/features/pages';

it('renders node with correct class name', () => {
  const renderedComponent = shallow(<Checkout1 />);
  expect(renderedComponent.find('.pages-checkout-1').length).toBe(1);
});
