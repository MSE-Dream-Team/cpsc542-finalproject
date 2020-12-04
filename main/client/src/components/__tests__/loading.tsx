import React from 'react';
import { shallow } from 'enzyme';

import { cleanup } from '../../test-utils';
import Loading from '../loading';

describe('Loading', () => {
  // automatically unmount and cleanup DOM after the test is finished.
  afterEach(cleanup);

  it('renders without error', () => {
    // This is the old test
    // render(<Loading />);

    // New tests
    const shallowWrapper = shallow(<Loading />);

    expect(shallowWrapper.find('ForwardRef(SvgLogo)').length).toEqual(1);
    expect(shallowWrapper.find('.css-kahotv').length).toEqual(1);
  });
});
