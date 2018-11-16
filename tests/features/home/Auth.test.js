import React from 'react';
import { shallow } from 'enzyme';
import { Auth } from '../../../src/features/home';

it('renders node with correct class name', () => {
  const renderedComponent = shallow(<Auth />);
  expect(renderedComponent.find('.home-auth').length).toBe(1);
});
