import React from 'react';
import { shallow } from 'enzyme';
import { ShoppingCartButton } from '../../../src/features/components';

it('renders node with correct class name', () => {
  const renderedComponent = shallow(<ShoppingCartButton />);
  expect(renderedComponent.find('.components-shopping-cart-button').length).toBe(1);
});
