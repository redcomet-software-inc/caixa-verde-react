import React from 'react';
import { shallow } from 'enzyme';
import { CheckoutPage } from '../../../src/features/pages';

it('renders node with correct class name', () => {
  const renderedComponent = shallow(<CheckoutPage />);
  expect(renderedComponent.find('.pages-checkout-page').length).toBe(1);
});
