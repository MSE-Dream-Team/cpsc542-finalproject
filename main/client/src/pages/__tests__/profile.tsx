import React from 'react';
import { shallow } from 'enzyme';

import {
  renderApollo,
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
  email: 'mse-mock-user@test.com',
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
    
    const { getByText } = renderApollo(<Profile />, { mocks });
    // // if the profile renders, it will have the list of missions booked
    await waitForElement(() => getByText(/test mission/i));

    // This is the new enzyme test
    // const shallowWrapper = shallow(<Profile />, { mocks });
    // console.log(shallowWrapper.debug());


    //expect(shallowWrapper.find('h1').text()).toEqual("My Trips");
  });
});
