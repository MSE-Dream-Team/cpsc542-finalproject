import React from 'react';
import { shallow, mount, render } from 'enzyme';

import { cleanup } from '../../test-utils';
import MenuItem from '../menu-item';

describe('Menu Item', () => {
  // automatically unmount and cleanup DOM after the test is finished.
  afterEach(cleanup);

  it('renders without error', () => {
    // This is the old test
    // render(<MenuItem to="/wow" />);

    // New tests
    const shallowWrapper = shallow(<MenuItem to="/wow" />);

    console.log(shallowWrapper.debug());
    expect(shallowWrapper.find('Link').length).toEqual(1);
    expect(shallowWrapper.find('.css-1yu82wf').length).toEqual(1);
    expect(shallowWrapper.find('Link[to="/wow"]').exists()).toBe(true);
  });
});
