import React from 'react';
import { shallow } from 'enzyme';
import { Warning } from '../../../src/features/common';

it('renders node with correct class name', () => {
  const renderedComponent = shallow(<Warning />);
  expect(renderedComponent.find('.common-warning').length).toBe(1);
});
