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
    await new Promise(resolve => setTimeout(resolve, 0));
    mountWrapper.update();

    // Page loads with correct components
    expect(mountWrapper.exists('h2')).toBe(true);
    expect(mountWrapper.exists('LaunchTile')).toBe(true);
    expect(mountWrapper.exists('h3')).toBe(true);
    expect(mountWrapper.exists('h5')).toBe(true);

    // The correct mission is loaded on the page via mocked response
    const h2Text = "My Trips";
    const h3Text = mockLaunch.mission.name;
    const h5Text = mockLaunch.rocket.name;

    expect(mountWrapper.find('h2').text()).toBe(h2Text);
    expect(mountWrapper.find('h3').text()).toBe(h3Text);
    expect(mountWrapper.find('.css-10q0vj5').find('h5').text()).toBe(h5Text);

  });
});
