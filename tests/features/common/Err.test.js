import React from 'react';
import { shallow } from 'enzyme';
import { Err } from '../../../src/features/common';

it('renders node with correct class name', () => {
  const renderedComponent = shallow(<Err />);
  expect(renderedComponent.find('.common-err').length).toBe(1);
});
