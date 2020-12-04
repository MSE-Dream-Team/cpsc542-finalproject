import React from 'react';
import { shallow } from 'enzyme';

import { cleanup } from '../../test-utils';
import Button from '../button';

describe('Button', () => {
  // automatically unmount and cleanup DOM after the test is finished.
  afterEach(cleanup);

  it('renders without error', () => {
    // This is the old test
    // render(<Button>Hello World</Button>);

    // New Test
    const shallowWrapper = shallow(<Button className='test-button'>Test button</Button>);

    expect(shallowWrapper.find('button').text()).toEqual("Test button");
    expect(shallowWrapper.find('button').length).toEqual(1);
  });
});
