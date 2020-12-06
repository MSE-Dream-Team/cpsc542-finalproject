import React from 'react';

import {
  renderApolloEnzyme,
  cleanup
} from '../../test-utils';
import BookTrips, { BOOK_TRIPS } from '../book-trips';
import { GET_LAUNCH } from '../cart-item';
import { cartItemsVar } from '../../cache';

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

describe('book trips', () => {
  // automatically unmount and cleanup DOM after the test is finished.
  afterEach(cleanup);

  it('renders without error', () => {
    const mountWrapper = renderApolloEnzyme(<BookTrips cartItems={[]} />);
    expect(mountWrapper.find('.css-wwcn44').text()).toEqual("Book All")
  });

  it('completes mutation and shows message', async () => {
    let mocks = [
      {
        request: { query: BOOK_TRIPS, variables: { launchIds: ['1'] } },
        result: {
          data: {
            bookTrips: [{ success: true, message: 'success!', launches: [] }],
          },
        },
      },
      {
        // we need this query for refetchQueries
        request: { query: GET_LAUNCH, variables: { launchId: '1' } },
        result: { data: { launch: mockLaunch } },
      },
    ];
    const mountWrapper = renderApolloEnzyme(      
      <BookTrips cartItems={['1']} />,
      { mocks, addTypename: false },
    );

    mountWrapper.find('.css-wwcn44').simulate('click');
    
    await new Promise(resolve => setTimeout(resolve, 0));

    mountWrapper.update();

    expect(mountWrapper.find('[data-testid="message"]').exists()).toBe(true)
  });

  it('correctly updates cache', async () => {
    let mocks = [
      {
        request: { query: BOOK_TRIPS, variables: { launchIds: ['1'] } },
        result: {
          data: {
            bookTrips: [{ success: true, message: 'success!', launches: [] }],
          },
        },
      }
    ]
    cartItemsVar(['1']);
    const mountWrapper = renderApolloEnzyme(      
      <BookTrips cartItems={['1']} />,
      { mocks, addTypename: false },
    );
    mountWrapper.find('.css-wwcn44').simulate('click');
    
    await new Promise(resolve => setTimeout(resolve, 0));

    expect(cartItemsVar().length).toEqual(0)
  });
});
