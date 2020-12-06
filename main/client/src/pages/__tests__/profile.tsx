import React from 'react';
import toJSON from 'enzyme-to-json';

import {
  renderApollo,
  renderApolloEnzyme,
  cleanup,
  waitForElement,
} from '../../test-utils';
import Profile, { GET_MY_TRIPS } from '../profile';

const mockLaunch = {
  __typename: 'Launch',
  id: 1,
  isBooked: true,
  rocket: {
    __typename: 'Rocket',
    id: 1,
    name: 'tester',
  },
  mission: {
    __typename: 'Mission',
    id: 1,
    name: 'test mission',
    missionPatch: '/',
  },
};

const mockMe = {
  __typename: 'User',
  id: 1,
  email: 'a@a.a',
  trips: [mockLaunch],
};

describe('Profile Page', () => {
  // automatically unmount and cleanup DOM after the test is finished.
  afterEach(cleanup);

  it('renders profile page', async () => {
    const mocks = [
      {
        request: { query: GET_MY_TRIPS },
        result: { data: { me: mockMe } },
      },
    ];

    // This is the old test

    //const { getByText } = renderApollo(<Profile />, { mocks: mocks });
    // if the profile renders, it will have the list of missions booked
    //await waitForElement(() => getByText(/test mission/i));

    // This is the new enzyme test
    const mountWrapper = renderApolloEnzyme(<Profile />, { mocks });
    await waitForElement(() => {
        expect(mountWrapper.exists('Profile')).toBe(true);
    });
    console.log(mountWrapper.debug());


  });
});
