import React from 'react';
import { shallow } from 'enzyme';
import { Index } from '../../../src/features/home/Index';

describe('home/Index', () => {
  it('renders node with correct class name', () => {
    const props = {
      home: {},
      actions: {},
    };
    const renderedComponent = shallow(<Index {...props} />);

    expect(renderedComponent.find('.home-index').length).toBe(1);
  });
});
