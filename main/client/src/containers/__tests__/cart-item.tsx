import React from 'react';

import {
  renderApolloEnzyme,
  cleanup
} from '../../test-utils';
import CartItem, { GET_LAUNCH } from '../cart-item';

const mockLaunch = {
  __typename: 'Launch',
  id: 1,
  isBooked: true,
  rocket: {
    id: 1,
    name: 'tester',
  },
  mission: {
    name: 'test mission',
    missionPatch: '/',
  },
};

describe('cart item', () => {
  // automatically unmount and cleanup DOM after the test is finished.
  afterEach(cleanup);

  it('queries item and renders without error', async () => {
    let mocks = [
      {
        request: { query: GET_LAUNCH, variables: { launchId: '1' } },
        result: { data: { launch: mockLaunch } },
      },
    ];

    // since we know the name of the mission, and know that name
    // will be rendered at some point, we can use getByText
    const mountWrapper = renderApolloEnzyme(      
      <CartItem launchId={'1'} />,
      { mocks, addTypename: false },
    );

    expect(mountWrapper.find('CartItem').text()).toEqual('Loading...')

    await new Promise(resolve => setTimeout(resolve, 0));

    mountWrapper.update();

    expect(mountWrapper.find('LaunchTile').exists()).toBe(true)
  });

  it('renders with error state', async () => {
    let mocks = [
      {
        request: { query: GET_LAUNCH, variables: { launchId: '1' } },
        error: new Error('aw shucks'),
      },
    ];

    // since we know the error message, we can use getByText
    // to recognize the error
    const mountWrapper = renderApolloEnzyme(      
      <CartItem launchId={'1'} />,
      { mocks, addTypename: false },
    );

    await new Promise(resolve => setTimeout(resolve, 0));

    mountWrapper.update();

    expect(mountWrapper.find('CartItem').text()).toEqual('ERROR: aw shucks')
  });
});