import React from 'react';
import { shallow } from 'enzyme';

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

    expect(shallowWrapper.exists('Styled(div)')).toBe(true);
    expect(shallowWrapper.exists('Styled(header)')).toBe(true);
    expect(shallowWrapper.find('Styled(form)').exists('Styled(input)')).toBe(true);
    expect(shallowWrapper.find('Styled(button)').exists('Styled(button)')).toBe(true);

    const logInText = shallowWrapper.find('Styled(button)').find('Styled(button)').children().text();
    expect(logInText).toBe("Log in");

    expect(shallowWrapper.find('[data-testid="login-input"]').exists()).toBe(true);

    const h1Text = shallowWrapper.find('Styled(h1)').children().text();
    expect(h1Text).toBe("Space Explorer");
  });
});
