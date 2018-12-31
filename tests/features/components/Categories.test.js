import React from 'react';
import { shallow } from 'enzyme';
import { Categories } from '../../../src/features/components/Categories';

describe('components/Categories', () => {
  it('renders node with correct class name', () => {
    const props = {
      components: {},
      actions: {},
    };
    const renderedComponent = shallow(
      <Categories {...props} />
    );

    expect(
      renderedComponent.find('.components-categories').length
    ).toBe(1);
  });
});
