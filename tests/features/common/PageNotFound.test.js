import React from 'react';
import { shallow } from 'enzyme';
import { NotFound } from '../../../src/features/common';

describe('common/not-found', () => {
  it('renders node with correct class name', () => {
    const renderedComponent = shallow(<NotFound />);

    expect(renderedComponent.find('.common-page-not-found').length).toBe(1);
  });
});
