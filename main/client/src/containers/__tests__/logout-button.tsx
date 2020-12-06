import React from 'react';
import LogoutButton from '../logout-button';

import { renderApolloEnzyme, cleanup } from '../../test-utils';
import { cache, isLoggedInVar } from '../../cache';

describe('logout button', () => {
  // automatically unmount and cleanup DOM after the test is finished.
  afterEach(cleanup);

  it('renders logout button', async () => {
    const mountWrapper = renderApolloEnzyme(<LogoutButton />)
    expect(mountWrapper.find('LogoutButton').exists()).toBe(true)
  });

  it('complete logout', async () => {
    isLoggedInVar(true);
    localStorage.setItem('token', 'testTokenValue');
    localStorage.setItem('userId', 'abc123');

    const mountWrapper = renderApolloEnzyme(<LogoutButton />, { cache })

    mountWrapper.find('.css-1y0wpq9').simulate('click');
    
    await new Promise(resolve => setTimeout(resolve, 0));

    mountWrapper.update();

    expect(isLoggedInVar()).toBeFalsy();
    expect(localStorage.getItem('token')).toBeNull();
    expect(localStorage.getItem('userId')).toBeNull();
  });
});
