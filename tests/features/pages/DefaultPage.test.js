import React from 'react';
import { shallow } from 'enzyme';
import { DefaultPage } from '../../../src/features/pages/DefaultPage';

describe('pages/DefaultPage', () => {
  it('renders node with correct class name', () => {
    const props = {
      pages: {},
      actions: {},
    };
    const renderedComponent = shallow(
      <DefaultPage {...props} />
    );

    expect(
      renderedComponent.find('.pages-default-page').length
    ).toBe(1);
  });
});
