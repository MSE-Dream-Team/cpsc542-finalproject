import React from 'react';

import {
  renderApollo,
  renderApolloEnzyme,
  cleanup,
  fireEvent,
  waitForElement,
} from '../../test-utils';
import Login, {LOGIN_USER} from '../login';
import { cache, isLoggedInVar } from '../../cache';

describe('Login Page', () => {
  // automatically unmount and cleanup DOM after the test is finished.
  afterEach(cleanup);

  it('renders login page', async () => {
    // Old existing test
    renderApollo(<Login />);

    // New enzyme test
    const mountWrapper = renderApolloEnzyme(<Login />);

    // Check for login page components are loaded properly
    expect(mountWrapper.exists('Styled(h1)')).toBe(true);
    expect(mountWrapper.exists('[data-testid="login-input"]')).toBe(true);

    const pageHeader = "Space Explorer";
    expect(mountWrapper.find('.css-1r0stgl').text()).toBe(pageHeader);

    expect(mountWrapper.exists('Styled(button)')).toBe(true);

    const buttonText = "Log in";
    expect(mountWrapper.find('.css-wwcn44').text()).toBe(buttonText);
  });

  it('fires login mutation and updates cache after done', async () => {
    expect(isLoggedInVar()).toBeFalsy();

    const mocks = [
      {
        request: {query: LOGIN_USER, variables: {email: 'a@a.a'}},
        result: {
          data: {
            login: {
              id: 'abc123',
              token: 'def456',
            },
          },
        },
      },
    ];

    // Old existing test

    // const {getByText, getByTestId} = await renderApollo(<Login />, {
    //   mocks,
    //   cache,
    // });
    //
    // fireEvent.change(getByTestId('login-input'), {
    //   target: {value: 'a@a.a'},
    // });
    //
    // fireEvent.click(getByText(/log in/i));
    //
    // // login is done if loader is gone
    // await waitForElement(() => getByText(/log in/i));
    //
    // expect(isLoggedInVar()).toBeTruthy();


    // New enzyme test

    const mountWrapper = renderApolloEnzyme(<Login />, {mocks, cache});
    await new Promise(resolve => setTimeout(resolve, 0));
    mountWrapper.update();

    const input = mountWrapper.find('.css-wotvke');
    const loginButton = mountWrapper.find('.css-wwcn44');

    input.simulate('change', { target: { value: 'a@a.a' } });
    await new Promise(resolve => setTimeout(resolve, 0));
    mountWrapper.update();

    loginButton.simulate('submit');
    await new Promise(resolve => setTimeout(resolve, 0));
    mountWrapper.update();
    expect(isLoggedInVar()).toBeTruthy();

  });
});
