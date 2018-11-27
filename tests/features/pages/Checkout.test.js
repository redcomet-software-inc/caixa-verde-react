import React from 'react';
import { shallow } from 'enzyme';
import { Checkout } from '../../../src/features/pages';

it('renders node with correct class name', () => {
  const renderedComponent = shallow(<Checkout />);
  expect(renderedComponent.find('.pages-checkout').length).toBe(1);
});
