import React from 'react';
import { InMemoryCache } from '@apollo/client';

import {
  renderApollo,
  renderApolloEnzyme,
  cleanup,
  waitForElement,
} from '../../test-utils';
import Launches, { GET_LAUNCHES } from '../launches';

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

describe('Launches Page', () => {
  // automatically unmount and cleanup DOM after the test is finished.
  afterEach(cleanup);

  it('renders launches', async () => {
    const cache = new InMemoryCache({ addTypename: false });
    const mocks = [
      {
        request: { query: GET_LAUNCHES },
        result: {
          data: {
            launches: {
              cursor: '123',
              hasMore: true,
              launches: [mockLaunch],
            },
          },
        },
      },
    ];

    // Old existing test

    // const { getByText } = await renderApollo(<Launches />, {
    //   mocks,
    //   cache,
    // });
    // await waitForElement(() => getByText(/test mission/i));

    // New enzyme test

    const mountWrapper = renderApolloEnzyme(<Launches />, {
        mocks,
        cache
    });
    await new Promise(resolve => setTimeout(resolve, 0));
    mountWrapper.update();

    // expect page to render correctly
    expect(mountWrapper.exists('h2')).toBe(true);
    expect(mountWrapper.exists('LaunchTile')).toBe(true);
    expect(mountWrapper.exists('h3')).toBe(true);
    expect(mountWrapper.find('.css-10q0vj5').exists('h5')).toBe(true);

    // expect correct mission to be present via mocked response
    const h2Text = "Space Explorer";
    const h3Text = mockLaunch.mission.name;
    const h5text = mockLaunch.rocket.name;

    expect(mountWrapper.find('h2').text()).toBe(h2Text);
    expect(mountWrapper.find('h3').text()).toContain(h3Text);
    expect(mountWrapper.find('.css-10q0vj5').find('h5').text()).toBe(h5text);

  });
});
