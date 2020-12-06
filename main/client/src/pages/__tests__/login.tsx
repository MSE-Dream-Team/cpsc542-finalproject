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
    renderApollo(<Login />);
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


    const mountWrapper = renderApolloEnzyme(<Login />, {mocks, cache});
    expect(isLoggedInVar()).toBeFalsy();

    console.log(mountWrapper.debug());
    //const input = mountWrapper.find('.css-wotvke');

    //input.simulate('change', { target: { value: 'a@a.a' } });
    mountWrapper.find('.css-wotvke').simulate('change', { target: { value: 'a@a.a' } });
    //await new Promise(resolve => setTimeout(resolve, 0));
    //mountWrapper.update();
    console.log(mountWrapper.find('.css-wotvke').text());
    console.log(mountWrapper.debug());


    mountWrapper.find('.css-wwcn44').simulate('click');
    await new Promise(resolve => setTimeout(resolve, 0));
    //await waitForElement(() => getByText(/log in/i));
    mountWrapper.update();
    expect(isLoggedInVar()).toBeTruthy();

    console.log(mountWrapper.debug());



  });
});
