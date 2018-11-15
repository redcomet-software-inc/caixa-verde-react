import React from 'react';
import { shallow } from 'enzyme';
import { Footer } from '../../../src/features/footer/Footer';

describe('footer/Footer', () => {
  it('renders node with correct class name', () => {
    const props = {
      footer: {},
      actions: {},
    };
    const renderedComponent = shallow(
      <Footer {...props} />
    );

    expect(
      renderedComponent.find('.footer-footer').length
    ).toBe(1);
  });
});
