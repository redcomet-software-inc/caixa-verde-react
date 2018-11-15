import React from 'react';
import { shallow } from 'enzyme';
import { Kits } from '../../../src/features/pages';

it('renders node with correct class name', () => {
  const renderedComponent = shallow(<Kits />);
  expect(renderedComponent.find('.pages-kits').length).toBe(1);
});
