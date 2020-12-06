import React from 'react';

import {
  renderApollo,
  renderApolloEnzyme,
  cleanup,
  waitForElement
} from '../../test-utils';
import Cart from '../cart';
import { GET_LAUNCH } from '../../containers/cart-item';
import { cache, cartItemsVar } from '../../cache';

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

describe('Cart Page', () => {
  // automatically unmount and cleanup DOM after the test is finished.
  afterEach(cleanup);

  it('renders with message for empty carts', () => {
    const mountWrapper = renderApolloEnzyme(<Cart />, { cache })
    expect(mountWrapper.find({'data-testid':"empty-message"}).text()).toEqual("No items in your cart")
  });

  it('renders cart', async () => {
    let mocks = [
      {
        request: { query: GET_LAUNCH, variables: { launchId: '1' } },
        result: { data: { launch: mockLaunch } },
      },
    ];

    cartItemsVar(['1']);
    const mountWrapper = renderApolloEnzyme(<Cart />, { mocks, cache })

    await new Promise(resolve => setTimeout(resolve, 0));

    mountWrapper.update();

    expect(mountWrapper.find({'data-testid':"book-button", 'className': "css-wwcn44"}).text()).toEqual("Book All")
  });
});
