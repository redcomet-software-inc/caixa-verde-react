import React from 'react';
import { shallow } from 'enzyme';
import { Spinner } from '../../../src/features/common';

it('renders node with correct class name', () => {
  const renderedComponent = shallow(<Spinner />);
  expect(renderedComponent.find('.common-spinner').length).toBe(1);
});
