import React from 'react';
import { shallow } from 'enzyme';
import { Pagarme } from '../../../src/features/components';

it('renders node with correct class name', () => {
  const renderedComponent = shallow(<Pagarme />);
  expect(renderedComponent.find('.components-pagarme').length).toBe(1);
});
