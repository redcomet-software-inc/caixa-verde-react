import React from 'react';
import { shallow } from 'enzyme';
import { MercadoPago } from '../../../src/features/pages';

it('renders node with correct class name', () => {
  const renderedComponent = shallow(<MercadoPago />);
  expect(renderedComponent.find('.pages-mercado-pago').length).toBe(1);
});
