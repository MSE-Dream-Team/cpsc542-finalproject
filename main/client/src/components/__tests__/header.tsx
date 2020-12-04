import React from 'react';
import { shallow } from 'enzyme';

import { cleanup } from '../../test-utils';
import Header from '../header';

describe('Header', () => {
  // automatically unmount and cleanup DOM after the test is finished.
  afterEach(cleanup);

  it('renders without error', () => {

    // This is the old test
    // render(<Header />);

    // New tests
    const shallowWrapper = shallow(<Header />);

    expect(shallowWrapper.find('Styled(div)').length).toEqual(1);
    expect(shallowWrapper.find('Styled(h5)').length).toEqual(1);
    expect(shallowWrapper.find('h2').length).toEqual(1);
    expect(shallowWrapper.find('Styled(img)').length).toEqual(1);

    expect(shallowWrapper.find('h2').text()).toEqual("Space Explorer");
    expect(shallowWrapper.find('Styled(img)[src="dog-3.png"]').exists()).toBe(true);
    expect(shallowWrapper.find('Styled(img)[alt="Space dog"]').exists()).toBe(true);
  });
});
