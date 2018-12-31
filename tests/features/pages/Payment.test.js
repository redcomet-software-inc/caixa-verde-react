import React from 'react';
import { shallow } from 'enzyme';
import { Payment } from '../../../src/features/pages';

it('renders node with correct class name', () => {
  const renderedComponent = shallow(<Payment />);
  expect(renderedComponent.find('.pages-payment').length).toBe(1);
});
