import React from 'react';
import { shallow, mount, render } from 'enzyme';

import { renderApollo, cleanup } from '../../test-utils';
import Footer from '../footer';

describe('Footer', () => {
  // automatically unmount and cleanup DOM after the test is finished.
  afterEach(cleanup);

  it('renders without error', () => {
    // This is the old test
    // renderApollo(<Footer />);

    // New tests
    const shallowWrapper = shallow(<Footer />);

    console.log(shallowWrapper.debug());
    expect(shallowWrapper.find('Styled(footer)').length).toEqual(1);
    expect(shallowWrapper.find('Styled(Link)').length).toEqual(3);
    expect(shallowWrapper.find('[to="/"]').exists()).toBe(true);
    expect(shallowWrapper.find('[to="/cart"]').exists()).toBe(true);
    expect(shallowWrapper.find('[to="/profile"]').exists()).toBe(true);
    expect(shallowWrapper.find('LogoutButton').length).toEqual(1);
  });
});
