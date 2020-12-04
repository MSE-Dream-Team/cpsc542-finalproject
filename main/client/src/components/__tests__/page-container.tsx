import React from 'react';
import { shallow, mount, render } from 'enzyme';

import { cleanup } from '../../test-utils';
import PageContainer from '../page-container';

describe('Page Container', () => {
  // automatically unmount and cleanup DOM after the test is finished.
  afterEach(cleanup);

  it('renders without error', () => {
    // This is the old test
    // render(<PageContainer />);

    // New tests
    const shallowWrapper = shallow(<PageContainer />);

    console.log(shallowWrapper.debug());
    expect(shallowWrapper.find('Fragment').length).toEqual(1);
    expect(shallowWrapper.find('Styled(div)').length).toEqual(2);
  });
});
