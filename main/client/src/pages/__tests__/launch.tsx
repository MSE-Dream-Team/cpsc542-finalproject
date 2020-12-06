import React from 'react';

import {
  renderApollo,
  renderApolloEnzyme,
  cleanup,
  waitForElement,
} from '../../test-utils';
import Launch, { GET_LAUNCH_DETAILS } from '../launch';


const mockLaunch = {
  __typename: 'Launch',
  id: 1,
  isBooked: true,
  rocket: {
    __typename: 'Rocket',
    id: 1,
    name: 'tester',
    type: 'test',
  },
  mission: {
    __typename: 'Mission',
    id: 1,
    name: 'test mission',
    missionPatch: '/',
  },
  site: 'earth',
  isInCart: false,
};

describe('Launch Page', () => {
  // automatically unmount and cleanup DOM after the test is finished.
  afterEach(cleanup);

  it('renders launch', async () => {
    const mocks = [
      {
        request: { query: GET_LAUNCH_DETAILS, variables: { launchId: 1 } },
        result: { data: { launch: mockLaunch } },
      },
    ];

    // Old test

    // const { getByText } = await renderApollo(<Launch launchId={1} />, {
    //   mocks,
    //   resolvers: {}
    // });
    // await waitForElement(() => getByText(/test mission/i));

    // New enzyme test

    const mountWrapper = renderApolloEnzyme(<Launch launchId={1} />, {
      mocks,
      resolvers: {}
    });
    await new Promise(resolve => setTimeout(resolve, 0));
    mountWrapper.update();

    // expect page to render correctly
    expect(mountWrapper.exists('h2')).toBe(true);
    expect(mountWrapper.exists('LaunchDetail')).toBe(true);
    expect(mountWrapper.exists('h3')).toBe(true);
    expect(mountWrapper.exists('CancelTripButton')).toBe(true);
    expect(mountWrapper.find('.css-gfwuup').exists('h5')).toBe(true);
    expect(mountWrapper.exists('[data-testid="action-button"]')).toBe(true);

    // expect correct mission to be present via mocked response
    const h2Text = mockLaunch.mission.name;
    const h3Text = mockLaunch.rocket.name;
    const h5text = mockLaunch.site;

    expect(mountWrapper.find('h2').text()).toBe(h2Text);
    expect(mountWrapper.find('h3').text()).toContain(h3Text);
    expect(mountWrapper.find('.css-gfwuup').find('h5').text()).toBe(h5text);




  });
});
