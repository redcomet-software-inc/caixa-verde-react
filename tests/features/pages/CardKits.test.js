import React from 'react';
import { shallow } from 'enzyme';
import { CardKits } from '../../../src/features/pages';

it('renders node with correct class name', () => {
  const renderedComponent = shallow(<CardKits />);
  expect(renderedComponent.find('.pages-card-kits').length).toBe(1);
});
