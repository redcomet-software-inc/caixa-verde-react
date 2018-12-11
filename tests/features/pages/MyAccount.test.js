import React from 'react';
import { shallow } from 'enzyme';
import { MyAccount } from '../../../src/features/pages';

it('renders node with correct class name', () => {
  const renderedComponent = shallow(<MyAccount />);
  expect(renderedComponent.find('.pages-my-account').length).toBe(1);
});
