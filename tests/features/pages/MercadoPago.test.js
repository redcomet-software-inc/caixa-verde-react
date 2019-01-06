import React from 'react';
import { shallow } from 'enzyme';
import { rootReducer } from '../../../src/features/pages';

it('renders node with correct class name', () => {
  const renderedComponent = shallow(<rootReducer />);
  expect(renderedComponent.find('.pages-mercado-pago').length).toBe(1);
});
