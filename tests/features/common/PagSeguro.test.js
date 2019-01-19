import React from 'react';
import { shallow } from 'enzyme';
import { PagSeguro } from '../../../src/features/common';

it('renders node with correct class name', () => {
  const renderedComponent = shallow(<PagSeguro />);
  expect(renderedComponent.find('.common-pag-seguro').length).toBe(1);
});
