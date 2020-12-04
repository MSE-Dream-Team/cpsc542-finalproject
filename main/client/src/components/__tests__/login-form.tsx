import React from 'react';
import { shallow, mount, render } from 'enzyme';

import { cleanup } from '../../test-utils';
import LoginForm from '../login-form';

describe('Login Form - using enzyme', () => {
  // automatically unmount and cleanup DOM after the test is finished.
  afterEach(cleanup);

  it('renders without error - using enzyme', () => {

    // This is the old test
    // render(<LoginForm login={() => {}}/>);

    // This is the new enzyme test
    const shallowWrapper = shallow(<LoginForm />);
    const mountWrapper = mount(<LoginForm />);
    const renderWrapper = render(<LoginForm />);

    expect(mountWrapper.find('div').length).toEqual(1);
    expect(shallowWrapper.find('[data-testid="login-input"]').exists()).toBe(true);
    expect(renderWrapper.find('button').text()).toEqual("Log in");
    expect(renderWrapper.find('h1').text()).toEqual("Space Explorer");
  });
});
