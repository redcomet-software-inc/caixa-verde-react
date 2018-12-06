import React from 'react';
import { shallow } from 'enzyme';
import { Loading } from '../../../src/features/common';

it('renders node with correct class name', () => {
  const renderedComponent = shallow(<Loading />);
  expect(renderedComponent.find('.common-loading').length).toBe(1);
});
